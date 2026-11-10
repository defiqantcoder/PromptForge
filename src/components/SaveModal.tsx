import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Folder,
  FolderOpen,
  HardDrive,
  ShieldCheck,
  Terminal,
  X,
} from 'lucide-react';
import { ProjectState, SaveBundleResult } from '../types/project';
import {
  compileAgentsMd,
  compilePlanMd,
  compileSpecMd,
  compileTasksMd,
} from '../services/compiler';
import {
  canonicalizeLinuxPath,
  saveSpecBundle,
  triggerBrowserFileDownload,
} from '../services/tauriBridge';

interface SaveModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  state: ProjectState;
}

const UBUNTU_QUICK_DIRS = [
  {
    label: 'Projects Workspace',
    path: '~/Projects/promptforge-specs',
    description: 'Recommended Ubuntu developer folder',
  },
  {
    label: 'Current Repository Root',
    path: '/home/ubuntu/workspace/app-spec',
    description: 'Direct handoff for Antigravity / Copilot',
  },
  {
    label: 'Documents Blueprints',
    path: '~/Documents/PromptForge-Exports',
    description: 'Personal offline markdown archive',
  },
];

export function SaveModal({ open, onOpenChange, state }: SaveModalProps) {
  const [targetDir, setTargetDir] = useState(
    state.proConfig.templateVariables.export_dir || '~/Projects/promptforge-specs'
  );
  const [downloadOnSave, setDownloadOnSave] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveResult, setSaveResult] = useState<SaveBundleResult | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const compiledFiles: Record<string, string> = {
    'AGENTS.md': compileAgentsMd(state),
    'spec.md': compileSpecMd(state),
    'plan.md': compilePlanMd(state),
    'tasks.md': compileTasksMd(state),
  };

  const pathCheck = canonicalizeLinuxPath(targetDir);

  const fileRows = Object.entries(compiledFiles).map(([name, content]) => ({
    name,
    bytes: new TextEncoder().encode(content).length,
    lines: content.split('\n').length,
    content,
  }));

  const totalBytes = fileRows.reduce((acc, f) => acc + f.bytes, 0);

  const handleConfirmSave = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const result = await saveSpecBundle(targetDir, compiledFiles, downloadOnSave);
      setSaveResult(result);
    } catch (err: any) {
      setSaveError(err?.message || 'Failed to write specification bundle.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          setSaveResult(null);
          setSaveError(null);
        }
        onOpenChange(next);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm animate-in fade-in-0 duration-150" />
        <Dialog.Content className="pf-modal fixed left-1/2 top-1/2 z-50 w-[94vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 text-[#E6DFF5] focus:outline-none">
          {/* Ubuntu Window Header */}
          <div className="flex items-start justify-between gap-4 pb-4 mb-5 border-b border-[#C084FC]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#D0BCFF]">
                <HardDrive className="w-5 h-5" />
              </div>
              <div>
                <Dialog.Title className="text-lg font-semibold text-white tracking-tight">
                  Save Specification Bundle to Computer
                </Dialog.Title>
                <Dialog.Description className="text-xs text-[#CBC3D7]">
                  Ubuntu Directory Selector & Tauri IPC Atomic Writer (`save_spec_bundle`)
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close modal"
                className="p-1.5 rounded-lg text-[#958EA0] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          {/* Ubuntu Nautilus Quick Folder Presets */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white mb-2">
                1. Choose Ubuntu Destination Directory
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
                {UBUNTU_QUICK_DIRS.map((dir) => {
                  const selected = targetDir === dir.path;
                  return (
                    <button
                      key={dir.path}
                      type="button"
                      onClick={() => {
                        setTargetDir(dir.path);
                        setSaveResult(null);
                        setSaveError(null);
                      }}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selected
                          ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white'
                          : 'bg-[#141120]/90 border-[#C084FC]/20 text-[#CBC3D7] hover:border-[#C084FC]/40'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {selected ? (
                          <FolderOpen className="w-4 h-4 text-[#D0BCFF] shrink-0" />
                        ) : (
                          <Folder className="w-4 h-4 text-[#A78BFA] shrink-0" />
                        )}
                        <span className="text-xs font-semibold truncate">{dir.label}</span>
                      </div>
                      <p className="text-[11px] font-mono text-[#A78BFA] truncate">{dir.path}</p>
                    </button>
                  );
                })}
              </div>

              {/* Manual Path Input + Canonical Guard Preview */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#A78BFA] shrink-0" />
                  <input
                    type="text"
                    value={targetDir}
                    onChange={(e) => {
                      setTargetDir(e.target.value);
                      setSaveResult(null);
                      setSaveError(null);
                    }}
                    placeholder="/home/ubuntu/Projects/my-app-spec"
                    className="w-full px-3 py-2 rounded-lg bg-[#0F0C1B] border border-[#C084FC]/25 text-xs font-mono text-white focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]"
                  />
                </div>

                {pathCheck.valid ? (
                  <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-[#34D399]/10 border border-[#34D399]/30 text-[11px]">
                    <span className="inline-flex items-center gap-1.5 text-[#34D399] font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      Canonical Rust Path Verified:
                    </span>
                    <span className="font-mono text-white truncate">{pathCheck.canonicalPath}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#EF4444]/15 border border-[#EF4444]/40 text-xs text-[#FFB4AB]">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-[#EF4444]" />
                    <span>{pathCheck.error}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Files to Write Table */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white">
                  2. Specification Bundle Manifest (4 Files)
                </span>
                <span className="text-xs font-mono text-[#A78BFA] tabular-nums">
                  Total Payload: {(totalBytes / 1024).toFixed(2)} KB ({totalBytes.toLocaleString()} bytes)
                </span>
              </div>

              <div className="rounded-xl bg-[#0F0C1B]/90 border border-[#C084FC]/20 divide-y divide-[#C084FC]/15">
                {fileRows.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between gap-3 px-3.5 py-2.5 text-xs"
                  >
                    <div className="min-w-0">
                      <span className="font-mono font-semibold text-white">{file.name}</span>
                      <span className="text-[#958EA0] ml-2 font-mono tabular-nums">
                        · {file.lines} lines · {file.bytes.toLocaleString()} B
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => triggerBrowserFileDownload(file.name, file.content)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-[#E9D5FF] hover:bg-[#8B5CF6]/20 border border-[#C084FC]/20 transition-colors cursor-pointer shrink-0"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download {file.name}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Browser Direct Download Toggle */}
            <label className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#141120] border border-[#C084FC]/20 cursor-pointer">
              <div>
                <div className="text-xs font-medium text-white">
                  Trigger direct browser downloads for all 4 files on save
                </div>
                <div className="text-[11px] text-[#958EA0]">
                  Automatically downloads AGENTS.md, spec.md, plan.md, and tasks.md while previewing in browser
                </div>
              </div>
              <input
                type="checkbox"
                checked={downloadOnSave}
                onChange={(e) => setDownloadOnSave(e.target.checked)}
                className="w-4 h-4 accent-[#8B5CF6] rounded cursor-pointer"
              />
            </label>

            {saveError && (
              <div className="p-3 rounded-xl bg-[#EF4444]/15 border border-[#EF4444]/40 text-xs text-[#FFB4AB] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{saveError}</span>
              </div>
            )}

            {saveResult && (
              <div className="p-3.5 rounded-xl bg-[#34D399]/10 border border-[#34D399]/35 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[#34D399] font-semibold">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Specification Bundle Saved Successfully
                  </span>
                  <span className="font-mono text-[11px] tabular-nums">
                    {saveResult.mode === 'tauri-native' ? 'Tauri IPC Native' : 'Ubuntu Preview + Direct Download'}
                  </span>
                </div>
                <p className="text-[#E9D5FF] font-mono text-[11px]">
                  Target: {saveResult.canonicalDir}/&#123;AGENTS.md, spec.md, plan.md, tasks.md&#125;
                </p>
              </div>
            )}

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="pf-btn-secondary px-4 py-2 rounded-full text-xs font-medium cursor-pointer"
                >
                  Close
                </button>
              </Dialog.Close>
              <button
                type="button"
                disabled={!pathCheck.valid || saving}
                onClick={handleConfirmSave}
                className="pf-btn-primary inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold disabled:opacity-50 cursor-pointer"
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>{saving ? 'Writing Bundle...' : 'Write Bundle to Disk'}</span>
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
