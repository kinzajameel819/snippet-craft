import React from 'react';
import { Search, X, Filter } from 'lucide-react';
import { CategoryFilter } from '../types/snippet';
import { CATEGORIES } from '../schemas/snippetSchema';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: CategoryFilter;
  onCategorySelect: (category: CategoryFilter) => void;
  categoryCounts: Record<CategoryFilter, number>;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategorySelect,
  categoryCounts,
}) => {
  const categoryFilters: CategoryFilter[] = ['All', ...CATEGORIES];

  const getCategoryColor = (cat: CategoryFilter, isSelected: boolean) => {
    if (!isSelected) {
      return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700';
    }

    switch (cat) {
      case 'All':
        return 'bg-indigo-600 dark:bg-indigo-500 text-white border-indigo-600 dark:border-indigo-500 font-bold';
      case 'React':
        return 'bg-cyan-600 dark:bg-cyan-500 text-white border-cyan-600 dark:border-cyan-500 font-bold';
      case 'Python':
        return 'bg-amber-600 dark:bg-amber-500 text-white border-amber-600 dark:border-amber-500 font-bold';
      case 'AI Prompts':
        return 'bg-purple-600 dark:bg-purple-500 text-white border-purple-600 dark:border-purple-500 font-bold';
      case 'CSS':
        return 'bg-rose-600 dark:bg-rose-500 text-white border-rose-600 dark:border-rose-500 font-bold';
      case 'General':
        return 'bg-emerald-600 dark:bg-emerald-500 text-white border-emerald-600 dark:border-emerald-500 font-bold';
      default:
        return 'bg-indigo-600 text-white font-bold';
    }
  };

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs mb-6 transition-colors duration-200" aria-label="Search and Filter">
      <div className="flex flex-col gap-4">
        
        {/* Search Input */}
        <div className="relative">
          <label htmlFor="search-snippets" className="sr-only">
            Search snippets or prompts
          </label>
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
            <Search className="w-5 h-5" aria-hidden="true" />
          </div>
          <input
            id="search-snippets"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, code content, or notes..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search input"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div>
          <div className="flex items-center gap-1.5 mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <Filter className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Filter by Category:</span>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Category Filter Options">
            {categoryFilters.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count = categoryCounts[cat] || 0;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => onCategorySelect(cat)}
                  aria-pressed={isSelected}
                  aria-label={`Filter by ${cat} (${count} items)`}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${getCategoryColor(
                    cat,
                    isSelected
                  )}`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
