import { z } from 'zod';

export const CATEGORIES = ['React', 'Python', 'AI Prompts', 'CSS', 'General'] as const;

export const snippetSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters'),
  category: z.enum(CATEGORIES, {
    errorMap: () => ({ message: 'Please select a valid category' }),
  }),
  code: z
    .string()
    .min(1, 'Code / Prompt text is required')
    .min(5, 'Code / Prompt text must be at least 5 characters'),
  notes: z.string().optional(),
});

export type SnippetFormData = z.infer<typeof snippetSchema>;
