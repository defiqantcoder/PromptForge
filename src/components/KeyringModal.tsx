import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { CheckCircle2, Eye, EyeOff, KeyRound, ShieldCheck, X } from 'lucide-react';
import { setSecureKey } from '../services/tauriBridge';

interface KeyringModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hasKey: boolean;
  onSaved: () => void;
}

export function KeyringModal({ open, onOpenChange, hasKey, onSaved }: KeyringModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClose = (next: boolean) => {
    if (!next) {
      setApiKey('');
      setShowKey(false);
      setError(null);
    }
    onOpenChange(next);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError('Please paste a valid Gemini API key before saving.');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await setSecureKey('gemini', apiKey.trim());
      setApiKey('');
      setShowKey(false);
      onSaved();
      onOpenChange(false);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : 'Could not save the API key to your desktop keyring.'
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm animate-in fade-in-0 duration-150" />
        <Dialog.Content className="pf-modal fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl p-6 text-[#E6DFF5] focus:outline-none">
          <div className="flex items-start justify-between gap-4 pb-4 mb-4 border-b border-[#C084FC]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#D0BCFF]">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <Dialog.Title className="text-base font-semibold text-white tracking-tight">
                  Desktop Gemini Keyring
                </Dialog.Title>
                <Dialog.Description className="text-xs text-[#CBC3D7]">
                  Stored locally in your Ubuntu system keyring (`libsecret`)
                </Dialog.Description>
              </div>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close keyring dialog"
                className="p-1.5 rounded-lg text-[#958EA0] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0F0C1B]/80 border border-[#C084FC]/20 text-xs">
              {hasKey ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#34D399] shrink-0" />
                  <span className="text-[#E6DFF5]">
                    A Gemini key is saved in your keyring. Enter a new key below to replace it.
                  </span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#A78BFA] shrink-0" />
                  <span className="text-[#CBC3D7]">
                    Paste your Gemini API key once so AI features work natively without Node/Express.
                  </span>
                </>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="desktop-gemini-key" className="block text-xs font-medium text-white">
                Gemini API Key
              </label>
              <div className="relative">
                <input
                  id="desktop-gemini-key"
                  type={showKey ? 'text' : 'password'}
                  autoComplete="off"
                  spellCheck={false}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIza..."
                  className="w-full pr-10 pl-3 py-2.5 rounded-xl bg-[#0F0C1B] border border-[#C084FC]/25 text-xs text-white placeholder-[#958EA0] focus:outline-none focus:border-[#8B5CF6]"
                />
                <button
                  type="button"
                  onClick={() => setShowKey((prev) => !prev)}
                  aria-label={showKey ? 'Hide API key' : 'Show API key'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#958EA0] hover:text-white cursor-pointer"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="text-xs text-[#FFB4AB] bg-[#EF4444]/15 border border-[#EF4444]/35 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full text-xs font-medium text-[#CBC3D7] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={saving}
                className="pf-btn-primary px-4 py-2 rounded-full text-xs font-semibold cursor-pointer disabled:opacity-50"
              >
                {saving ? 'Saving to Keyring...' : 'Save to Keyring'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
