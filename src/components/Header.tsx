import React from 'react';
import { Sparkles, Sun, Moon, Code2, Terminal } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  totalCount: number;
}

export const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode, totalCount }) => {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl shadow-md flex items-center justify-center">
              <Code2 className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  SnippetCraft
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
                  <Sparkles className="w-3 h-3 mr-1 text-indigo-600 dark:text-indigo-400" />
                  Pro
                </span>
              </div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Developer Code Snippet &amp; AI Prompt Organizer
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-3 self-end sm:self-center">
            {/* Snippet counter badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300">
              <Terminal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              <span>{totalCount} {totalCount === 1 ? 'Item' : 'Items'}</span>
            </div>

            {/* Dark Mode Toggle Switch */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
              aria-pressed={darkMode}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium text-sm transition-all duration-150 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
            >
              {darkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-600" aria-hidden="true" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
