import React from 'react';
import { Snippet } from '../types/snippet';
import { SnippetCard } from './SnippetCard';
import { SearchX, Inbox } from 'lucide-react';

interface SnippetListProps {
  snippets: Snippet[];
  onDeleteSnippet: (id: string) => void;
  onCopyNotice: (text: string) => void;
  hasFilters: boolean;
  onClearFilters: () => void;
}

export const SnippetList: React.FC<SnippetListProps> = ({
  snippets,
  onDeleteSnippet,
  onCopyNotice,
  hasFilters,
  onClearFilters,
}) => {
  if (snippets.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center transition-colors duration-200">
        {hasFilters ? (
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
              <SearchX className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No matching snippets or prompts found
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Try adjusting your search keywords or category filters to find what you are looking for.
            </p>
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Your library is currently empty
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Use the form above to add your first code snippet or AI prompt to SnippetCraft!
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <section aria-label="Snippet Collection">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        {snippets.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            onDelete={onDeleteSnippet}
            onCopyNotice={onCopyNotice}
          />
        ))}
      </div>
    </section>
  );
};
