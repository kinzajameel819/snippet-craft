import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusCircle, AlertCircle, RotateCcw, FileCode, CheckCircle2 } from 'lucide-react';
import { snippetSchema, SnippetFormData, CATEGORIES } from '../schemas/snippetSchema';
import { SnippetCategory } from '../types/snippet';

interface SnippetFormProps {
  onAddSnippet: (data: SnippetFormData) => void;
}

export const SnippetForm: React.FC<SnippetFormProps> = ({ onAddSnippet }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SnippetFormData>({
    resolver: zodResolver(snippetSchema),
    defaultValues: {
      title: '',
      category: 'React' as SnippetCategory,
      code: '',
      notes: '',
    },
  });

  const onSubmit = (data: SnippetFormData) => {
    onAddSnippet(data);
    reset({
      title: '',
      category: data.category, // Keep last selected category for user convenience
      code: '',
      notes: '',
    });
  };

  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm mb-8 transition-colors duration-200">
      <div className="flex items-center justify-between mb-5 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Add Code Snippet or AI Prompt
          </h2>
        </div>
        {isSubmitSuccessful && (
          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-300 dark:border-emerald-800 animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5" /> Added!
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Add snippet form" className="space-y-4">
        {/* Row 1: Title & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Title Field */}
          <div className="sm:col-span-2 space-y-1">
            <label
              htmlFor="snippet-title"
              className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
            >
              Title <span className="text-red-600 dark:text-red-400" aria-hidden="true">*</span>
            </label>
            <input
              id="snippet-title"
              type="text"
              placeholder="e.g. React Custom Hook for LocalStorage"
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? 'title-error' : undefined}
              {...register('title')}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm transition-colors bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
                errors.title
                  ? 'border-red-500 dark:border-red-400 bg-red-50/50 dark:bg-red-950/30'
                  : 'border-slate-300 dark:border-slate-700'
              }`}
            />
            {errors.title && (
              <p
                id="title-error"
                role="alert"
                className="flex items-center gap-1 text-xs font-semibold text-red-700 dark:text-red-400 mt-1"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="space-y-1">
            <label
              htmlFor="snippet-category"
              className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
            >
              Category <span className="text-red-600 dark:text-red-400" aria-hidden="true">*</span>
            </label>
            <select
              id="snippet-category"
              aria-invalid={!!errors.category}
              aria-describedby={errors.category ? 'category-error' : undefined}
              {...register('category')}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-medium transition-colors bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
                errors.category
                  ? 'border-red-500 dark:border-red-400'
                  : 'border-slate-300 dark:border-slate-700'
              }`}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p
                id="category-error"
                role="alert"
                className="flex items-center gap-1 text-xs font-semibold text-red-700 dark:text-red-400 mt-1"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Code / Prompt Text Area */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <label
              htmlFor="snippet-code"
              className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
            >
              Code Snippet / AI Prompt Text <span className="text-red-600 dark:text-red-400" aria-hidden="true">*</span>
            </label>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Min 5 characters
            </span>
          </div>
          <textarea
            id="snippet-code"
            rows={5}
            placeholder="Paste your source code, SQL query, or LLM system prompt here..."
            aria-invalid={!!errors.code}
            aria-describedby={errors.code ? 'code-error' : undefined}
            {...register('code')}
            className={`w-full px-3.5 py-2.5 rounded-lg border font-mono text-sm transition-colors bg-slate-900 text-slate-100 placeholder-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${
              errors.code
                ? 'border-red-500 dark:border-red-400'
                : 'border-slate-700'
            }`}
          />
          {errors.code && (
            <p
              id="code-error"
              role="alert"
              className="flex items-center gap-1 text-xs font-semibold text-red-700 dark:text-red-400 mt-1"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.code.message}
            </p>
          )}
        </div>

        {/* Row 3: Optional Notes */}
        <div className="space-y-1">
          <label
            htmlFor="snippet-notes"
            className="block text-sm font-semibold text-slate-800 dark:text-slate-200"
          >
            Notes / Usage Instructions <span className="text-xs font-normal text-slate-500 dark:text-slate-400">(Optional)</span>
          </label>
          <input
            id="snippet-notes"
            type="text"
            placeholder="e.g. Requires aiohttp dependency or LLM temperature set to 0.2"
            {...register('notes')}
            className="w-full px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm transition-colors bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm transition-all duration-150 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusCircle className="w-4 h-4" />
            Add Snippet
          </button>
        </div>
      </form>
    </section>
  );
};
