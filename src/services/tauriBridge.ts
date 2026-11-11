import { invoke } from '@tauri-apps/api/core';
import { homeDir } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/plugin-dialog';
import { SaveBundleResult } from '../types/project';

/**
 * Checks if the application is currently executing inside a native Tauri v2 desktop shell.
 */
export function isTauriEnvironment(): boolean {
  return typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;
}

/**
 * Canonicalizes a Linux/Ubuntu directory path and rejects directory traversal ('..') sequences.
 */
export function canonicalizeLinuxPath(
  rawPath: string,
  homeDirPath = '/home/ubuntu'
): {
  valid: boolean;
  canonicalPath: string;
  error?: string;
} {
  const trimmed = rawPath.trim();
  if (!trimmed) {
    return {
      valid: false,
      canonicalPath: '',
      error: 'Target directory path cannot be empty.',
    };
  }

  // Reject directory traversal sequences across '/' or '\' segments as required by AGENTS.md
  const normalizedSlashes = trimmed.replace(/\\/g, '/');
  if (normalizedSlashes.split('/').some((segment) => segment === '..')) {
    return {
      valid: false,
      canonicalPath: trimmed,
      error: 'Security Policy Violation: Directory traversal ("../") is blocked by canonical path guard.',
    };
  }

  const cleanHome = homeDirPath.replace(/\/+$/, '') || '/home/ubuntu';
  const expanded = trimmed.startsWith('~/')
    ? `${cleanHome}/${trimmed.slice(2)}`
    : trimmed === '~'
    ? cleanHome
    : trimmed.startsWith('/')
    ? trimmed
    : `${cleanHome}/${trimmed}`;

  const normalized = expanded.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  return {
    valid: true,
    canonicalPath: normalized,
  };
}

/**
 * Resolves the active user's home directory when running inside Tauri.
 */
export async function getNativeHomeDir(): Promise<string | undefined> {
  if (!isTauriEnvironment()) {
    return undefined;
  }
  try {
    const dir = await homeDir();
    return dir ? dir.replace(/\/+$/, '') : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Opens the native Ubuntu directory selector via @tauri-apps/plugin-dialog.
 */
export async function pickUbuntuDirectory(defaultPath?: string): Promise<string | null> {
  if (!isTauriEnvironment()) {
    return null;
  }
  const selected = await open({
    directory: true,
    multiple: false,
    title: 'Choose Export Folder for PromptForge Specs',
    defaultPath,
  });
  return typeof selected === 'string' ? selected : null;
}

function computePreviewHash(content: string): string {
  let hash = 2166136261;
  for (let i = 0; i < content.length; i++) {
    hash ^= content.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

export function triggerBrowserFileDownload(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Invokes Tauri `save_spec_bundle` when running natively, or performs canonical validation
 * and direct file downloads in the web preview environment.
 */
export async function saveSpecBundle(
  targetDir: string,
  files: Record<string, string>,
  downloadFilesInBrowser = true
): Promise<SaveBundleResult> {
  const nativeHome = await getNativeHomeDir();
  const pathCheck = canonicalizeLinuxPath(targetDir, nativeHome);
  if (!pathCheck.valid) {
    throw new Error(pathCheck.error);
  }

  const filesMetadata = Object.entries(files).map(([name, content]) => ({
    name,
    bytes: new TextEncoder().encode(content).length,
    sha256Preview: computePreviewHash(content),
  }));

  if (isTauriEnvironment()) {
    await invoke<boolean>('save_spec_bundle', {
      targetDir: pathCheck.canonicalPath,
      files,
    });

    return {
      saved: true,
      canonicalDir: pathCheck.canonicalPath,
      filesWritten: filesMetadata,
      mode: 'tauri-native',
      timestamp: new Date().toISOString(),
    };
  }

  // In web preview mode: download the compiled specification bundle or individual files
  if (downloadFilesInBrowser) {
    Object.entries(files).forEach(([filename, content], index) => {
      setTimeout(() => {
        triggerBrowserFileDownload(filename, content);
      }, index * 140);
    });
  }

  return {
    saved: true,
    canonicalDir: pathCheck.canonicalPath,
    filesWritten: filesMetadata,
    mode: 'browser-simulated',
    timestamp: new Date().toISOString(),
  };
}

/**
 * Checks whether an API credential is configured in the desktop OS keyring (or env fallback).
 */
export async function hasSecureKey(service = 'gemini'): Promise<boolean> {
  if (!isTauriEnvironment()) {
    return false;
  }
  return invoke<boolean>('has_secure_key', { service });
}

/**
 * Stores an API credential securely in the desktop OS keyring (libsecret / GNOME Keyring).
 */
export async function setSecureKey(service: string, key: string): Promise<void> {
  if (!isTauriEnvironment()) {
    throw new Error('Desktop keyring storage is only available inside the native Tauri app.');
  }
  await invoke<void>('set_secure_key', { service, key });
}
