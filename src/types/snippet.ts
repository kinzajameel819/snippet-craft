export type SnippetCategory = 'React' | 'Python' | 'AI Prompts' | 'CSS' | 'General';

export interface Snippet {
  id: string;
  title: string;
  category: SnippetCategory;
  code: string;
  notes?: string;
  createdAt: string;
}

export type CategoryFilter = 'All' | SnippetCategory;
