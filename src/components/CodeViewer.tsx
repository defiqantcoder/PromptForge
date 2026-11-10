import React, { useState } from 'react';
import { Check, Copy, Download, Edit3 } from 'lucide-react';
import { triggerBrowserFileDownload } from '../services/tauriBridge';

interface CodeViewerProps {
  filename: string;
  content: string;
  badgeLabel?: string;
  templateVariables?: Record<string, string>;
  onUpdateVariable?: (key: string, value: string) => void;
}

export function CodeViewer({
  filename,
  content,
  badgeLabel,
  templateVariables,
  onUpdateVariable,
}: CodeViewerProps) {
  const [copied, setCopied] = useState(false);
  const [editingVarKey, setEditingVarKey] = useState<string | null>(null);
  const [tempVarValue, setTempVarValue] = useState('');

  const approxTokens = Math.max(1, Math.round(content.length / 4));
  const lineCount = content.split('\n').length;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback copy
    }
  };

  const handleDownloadSingle = () => {
    const cleanName = filename.includes('/') ? filename.split('/').pop()! : filename;
    triggerBrowserFileDownload(cleanName, content);
  };

  const startEditingVar = (key: string, currentVal: string) => {
    setEditingVarKey(key);
    setTempVarValue(currentVal);
  };

  const commitVarEdit = () => {
    if (editingVarKey && onUpdateVariable) {
      onUpdateVariable(editingVarKey, tempVarValue.trim() || editingVarKey);
    }
    setEditingVarKey(null);
  };

  return (
    <div className="rounded-xl bg-[#0F0C1B]/95 border border-[#C084FC]/25 overflow-hidden flex flex-col">
      {/* Code Viewer Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-[#1D1929]/90 border-b border-[#C084FC]/20">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-mono font-semibold text-white truncate">
            {filename}
          </span>
          {badgeLabel && (
            <span className="text-[11px] text-[#A78BFA] whitespace-nowrap shrink-0">
              · {badgeLabel}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Token Counter Pill */}
          <span
            title="Estimated prompt token count and line count"
            className="px-2.5 py-0.5 rounded-full text-[11px] font-mono tabular-nums bg-[#0F0C1B] text-[#A78BFA] border border-[#C084FC]/20 whitespace-nowrap shrink-0"
          >
            {approxTokens.toLocaleString()} tokens · {lineCount} lines
          </span>

          <button
            type="button"
            onClick={handleDownloadSingle}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-[#E9D5FF] hover:bg-[#8B5CF6]/15 border border-[#C084FC]/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title={`Download ${filename}`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-[#8B5CF6] text-white hover:bg-[#9366F9] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#34D399]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Variable Token Bar (Design System {{variable}} pills in #EC4899) */}
      {templateVariables && Object.keys(templateVariables).length > 0 && (
        <div className="px-3.5 py-2 bg-[#141120] border-b border-[#C084FC]/15 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-[#958EA0] mr-1">
            Interactive Tokens:
          </span>
          {Object.entries(templateVariables).map(([key, val]) => {
            const isEditing = editingVarKey === key;
            if (isEditing) {
              return (
                <div
                  key={key}
                  className="inline-flex items-center gap-1 bg-[#EC4899]/20 border border-[#EC4899]/50 rounded-full px-2 py-0.5"
                >
                  <span className="text-[11px] font-mono text-[#FFB0CD]">{`{{${key}}}=`}</span>
                  <input
                    type="text"
                    value={tempVarValue}
                    onChange={(e) => setTempVarValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') commitVarEdit();
                      if (e.key === 'Escape') setEditingVarKey(null);
                    }}
                    onBlur={commitVarEdit}
                    autoFocus
                    className="w-28 bg-transparent text-[11px] font-mono text-white focus:outline-none"
                  />
                </div>
              );
            }

            return (
              <button
                key={key}
                type="button"
                onClick={() => startEditingVar(key, val)}
                title="Click to edit live variable token across all compiled contracts"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#EC4899]/15 text-[#EC4899] hover:bg-[#EC4899]/25 border border-[#EC4899]/30 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>{`{{${key}}}`}</span>
                <span className="text-white/75">={val}</span>
                <Edit3 className="w-2.5 h-2.5 opacity-75" />
              </button>
            );
          })}
        </div>
      )}

      {/* Highlighted Markdown / Code Content */}
      <div className="p-4 overflow-x-auto max-h-[540px] overflow-y-auto">
        <pre className="text-[12.5px] leading-[1.55] font-mono text-[#E9D5FF] whitespace-pre-wrap break-words">
          {content.split('\n').map((line, i) => {
            const isHeading = line.startsWith('#');
            const isBlockquote = line.startsWith('>');
            const isBullet = line.trim().startsWith('- ') || /^\d+\.\s/.test(line.trim());

            return (
              <div
                key={i}
                className="grid grid-cols-[2.25rem_1fr] gap-2 hover:bg-white/[0.03] px-1 rounded"
              >
                <span className="text-[11px] text-[#958EA0]/50 select-none text-right pr-2 tabular-nums">
                  {i + 1}
                </span>
                <span
                  className={
                    isHeading
                      ? 'text-white font-semibold'
                      : isBlockquote
                      ? 'text-[#A78BFA]'
                      : isBullet
                      ? 'text-[#E6DFF5]'
                      : 'text-[#CBC3D7]'
                  }
                >
                  {line || ' '}
                </span>
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
