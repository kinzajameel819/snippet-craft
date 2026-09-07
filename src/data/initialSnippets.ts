import { Snippet } from '../types/snippet';

export const INITIAL_SNIPPETS: Snippet[] = [
  {
    id: '1',
    title: 'React Custom LocalStorage Hook',
    category: 'React',
    code: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}`,
    notes: 'Persists state seamlessly across browser reloads with TypeScript generic support.',
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'Senior Code Reviewer AI Prompt',
    category: 'AI Prompts',
    code: `You are an expert Principal Software Engineer. Review the following code for:
1. Security vulnerabilities and memory leaks
2. Time & Space complexity analysis (Big-O)
3. Readability, edge-case resilience, and adherence to clean code standards
4. Provide concrete improved refactored snippets with explanation notes.`,
    notes: 'Use this system prompt when pasting complex code blocks for thorough review.',
    createdAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
  },
  {
    id: '3',
    title: 'Python Async Concurrent Requests Fetcher',
    category: 'Python',
    code: `import asyncio
import aiohttp

async function fetch_url(session, url):
    async with session.get(url) as response:
        return await response.json()

async function fetch_all(urls):
    async with aiohttp.ClientSession() as session:
        tasks = [fetch_url(session, url) for url in urls]
        return await asyncio.gather(*tasks)

# Example usage
# results = asyncio.run(fetch_all(['https://api.example.com/data1', 'https://api.example.com/data2']))`,
    notes: 'High performance asynchronous HTTP request pool using asyncio and aiohttp.',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: '4',
    title: 'Glassmorphism Card Effect',
    category: 'CSS',
    code: `.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1rem;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
}`,
    notes: 'Modern UI frosted glass effect that adapts seamlessly in dark themes.',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: '5',
    title: 'Git Conventional Commits Cheat Sheet',
    category: 'General',
    code: `feat(ui): add high-contrast dark mode toggle
fix(auth): resolve session expiration token leak
docs(readme): add setup and architectural breakdown
style(components): enforce focus visible WCAG rings
refactor(store): simplify state slice logic`,
    notes: 'Standardized commit format for clear git history and automated release logs.',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  }
];
