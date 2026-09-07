import React, { useState } from 'react';
import { Copy, Check, Trash2, StickyNote, Clock } from 'lucide-react';
import { Snippet, SnippetCategory } from '../types/snippet';

interface SnippetCardProps {
  snippet: Snippet;
  onDelete: (id: string) => void;
  onCopyNotice: (text: string) => void;
}

export const SnippetCard: React.FC<SnippetCardProps> = ({ snippet, onDelete, onCopyNotice }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      onCopyNotice(`Copied "${snippet.title}" to clipboard!`);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getCategoryBadgeStyle = (category: SnippetCategory) => {
    switch (category) {
      case 'React':
        return 'bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-950 dark:text-cyan-200 dark:border-cyan-800';
      case 'Python':
        return 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800';
      case 'AI Prompts':
        return 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950 dark:text-purple-200 dark:border-purple-800';
      case 'CSS':
        return 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950 dark:text-rose-200 dark:border-rose-800';
      case 'General':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-200 dark:border-emerald-800';
      default:
        return 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-200 dark:border-indigo-800';
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Header: Category Badge & Delete Button */}
        <div className="flex items-center justify-between mb-3 gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getCategoryBadgeStyle(
              snippet.category
            )}`}
          >
            {snippet.category}
          </span>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400 dark:text-slate-500">
              <Clock className="w-3 h-3" aria-hidden="true" />
              {formatDate(snippet.createdAt)}
            </span>
            <button
              type="button"
              onClick={() => onDelete(snippet.id)}
              aria-label={`Delete snippet ${snippet.title}`}
              className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2 leading-tight">
          {snippet.title}
        </h3>

        {/* Optional Notes */}
        {snippet.notes && (
          <div className="mb-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-2">
            <StickyNote className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
              {snippet.notes}
            </p>
          </div>
        )}

        {/* Code / Prompt Block Container */}
        <div className="relative mt-3 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
          <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/90 border-b border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              {snippet.category === 'AI Prompts' ? 'Prompt Text' : 'Source Code'}
            </span>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? 'Copied code to clipboard' : 'Copy code to clipboard'}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all duration-150 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
                copied
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-3.5 text-xs text-slate-200 font-mono overflow-x-auto max-h-56 leading-relaxed whitespace-pre-wrap break-words">
            <code>{snippet.code}</code>
          </pre>
        </div>
      </div>
    </article>
  );
};
