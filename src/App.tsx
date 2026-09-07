import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { SnippetForm } from './components/SnippetForm';
import { FilterBar } from './components/FilterBar';
import { SnippetList } from './components/SnippetList';
import { Toast } from './components/Toast';
import { Snippet, CategoryFilter } from './types/snippet';
import { SnippetFormData } from './schemas/snippetSchema';
import { INITIAL_SNIPPETS } from './data/initialSnippets';

const LOCAL_STORAGE_KEY = 'snippetcraft_items_v1';
const DARK_MODE_KEY = 'snippetcraft_dark_mode';

export function App() {
  // Dark Mode State
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(DARK_MODE_KEY);
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return true; // Default to dark mode for developer aesthetic
  });

  // Snippets List State
  const [snippets, setSnippets] = useState<Snippet[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    return INITIAL_SNIPPETS;
  });

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize Dark Mode Class on documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(darkMode));
  }, [darkMode]);

  // Synchronize Snippets in localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(snippets));
  }, [snippets]);

  // Toggle Dark Mode Handler
  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Add Snippet Handler
  const handleAddSnippet = (formData: SnippetFormData) => {
    const newSnippet: Snippet = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.category,
      code: formData.code,
      notes: formData.notes || '',
      createdAt: new Date().toISOString(),
    };

    setSnippets((prev) => [newSnippet, ...prev]);
    triggerToast(`Added snippet: "${formData.title}"`);
  };

  // Delete Snippet Handler
  const handleDeleteSnippet = (id: string) => {
    const target = snippets.find((s) => s.id === id);
    setSnippets((prev) => prev.filter((s) => s.id !== id));
    if (target) {
      triggerToast(`Deleted "${target.title}"`);
    }
  };

  // Toast trigger helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  // Filtered Snippets Logic
  const filteredSnippets = useMemo(() => {
    return snippets.filter((snippet) => {
      // Category check
      const matchesCategory =
        selectedCategory === 'All' || snippet.category === selectedCategory;

      // Search query check
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        snippet.title.toLowerCase().includes(q) ||
        snippet.code.toLowerCase().includes(q) ||
        (snippet.notes && snippet.notes.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [snippets, selectedCategory, searchQuery]);

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryFilter, number> = {
      All: snippets.length,
      React: 0,
      Python: 0,
      'AI Prompts': 0,
      CSS: 0,
      General: 0,
    };

    snippets.forEach((s) => {
      if (counts[s.category] !== undefined) {
        counts[s.category] += 1;
      }
    });

    return counts;
  }, [snippets]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'All';

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Header
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        totalCount={snippets.length}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form Component */}
        <SnippetForm onAddSnippet={handleAddSnippet} />

        {/* Live Search & Filter Bar */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          categoryCounts={categoryCounts}
        />

        {/* Interactive Snippet Cards Grid */}
        <SnippetList
          snippets={filteredSnippets}
          onDeleteSnippet={handleDeleteSnippet}
          onCopyNotice={triggerToast}
          hasFilters={hasActiveFilters}
          onClearFilters={handleClearFilters}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-16 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>SnippetCraft &mdash; High-Contrast WCAG 2.1 AA Accessible Developer &amp; AI Prompt Organizer</p>
      </footer>

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

export default App;
