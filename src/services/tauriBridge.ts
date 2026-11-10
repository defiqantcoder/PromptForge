import { invoke } from '@tauri-apps/api/core';
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
export function canonicalizeLinuxPath(rawPath: string): {
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

  // Reject directory traversal sequences as required by AGENTS.md security rules
  if (trimmed.includes('..')) {
    return {
      valid: false,
      canonicalPath: trimmed,
      error: 'Security Policy Violation: Directory traversal ("../") is blocked by canonical path guard.',
    };
  }

  // Expand ~ to /home/ubuntu for clean canonical display
  const expanded = trimmed.startsWith('~/')
    ? `/home/ubuntu/${trimmed.slice(2)}`
    : trimmed === '~'
    ? '/home/ubuntu'
    : trimmed.startsWith('/')
    ? trimmed
    : `/home/ubuntu/${trimmed}`;

  const normalized = expanded.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  return {
    valid: true,
    canonicalPath: normalized,
  };
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
  const pathCheck = canonicalizeLinuxPath(targetDir);
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
