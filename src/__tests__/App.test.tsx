import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../App';

describe('SnippetCraft Main App Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  // Test 1: Renders main title and input form properly
  it('Test 1: Renders main title and input form properly', () => {
    render(<App />);

    // Check main title
    const titleElement = screen.getByRole('heading', { level: 1, name: /SnippetCraft/i });
    expect(titleElement).toBeInTheDocument();

    // Check header subtitle
    expect(screen.getByText(/Developer Code Snippet & AI Prompt Organizer/i)).toBeInTheDocument();

    // Check form heading
    expect(screen.getByRole('heading', { level: 2, name: /Add Code Snippet or AI Prompt/i })).toBeInTheDocument();

    // Check form input fields exist
    expect(screen.getByRole('textbox', { name: /^Title/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /^Category/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Code Snippet \/ AI Prompt Text/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Snippet/i })).toBeInTheDocument();
  });

  // Test 2: Validates form submission error triggers on empty input
  it('Test 2: Validates form submission error triggers on empty input', async () => {
    const user = userEvent.setup();
    render(<App />);

    const submitButton = screen.getByRole('button', { name: /Add Snippet/i });

    // Click submit without filling required fields
    await user.click(submitButton);

    // Verify Zod validation error messages appear for empty Title and Code
    await waitFor(() => {
      expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Code \/ Prompt text is required/i)).toBeInTheDocument();
    });
  });

  // Test 3: Tests filtering functionality by category
  it('Test 3: Tests filtering functionality by category', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Initial load contains sample items from all categories including "React" and "Python"
    expect(screen.getByText(/React Custom LocalStorage Hook/i)).toBeInTheDocument();
    expect(screen.getByText(/Python Async Concurrent Requests Fetcher/i)).toBeInTheDocument();

    // Find and click the "Python" category filter pill button
    const pythonFilterBtn = screen.getByRole('button', { name: /Filter by Python/i });
    await user.click(pythonFilterBtn);

    // Verify Python item remains visible while React item is filtered out
    await waitFor(() => {
      expect(screen.getByText(/Python Async Concurrent Requests Fetcher/i)).toBeInTheDocument();
      expect(screen.queryByText(/React Custom LocalStorage Hook/i)).not.toBeInTheDocument();
    });

    // Click "All" filter pill to reset filter view
    const allFilterBtn = screen.getByRole('button', { name: /Filter by All/i });
    await user.click(allFilterBtn);

    // Verify all initial items are back
    await waitFor(() => {
      expect(screen.getByText(/React Custom LocalStorage Hook/i)).toBeInTheDocument();
      expect(screen.getByText(/Python Async Concurrent Requests Fetcher/i)).toBeInTheDocument();
    });
  });
});
