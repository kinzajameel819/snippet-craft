# AI-Assisted Development Log: SnippetCraft

**Project Name:** SnippetCraft (Code & Prompt Manager)  
**Track:** FlyRank Front-End AI Track  
**Mentor Session Reference:** React Frontend Development with AI w/ Ishak  

---

## 1. Overview of AI Assistance
For **SnippetCraft**, AI served as a rapid pair-programming assistant to:
- Scaffold the Vite + React + TypeScript project layout.
- Generate accessible Tailwind CSS components for snippet management.
- Build React Hook Form validation schemas with Zod.
- Create initial unit tests using Vitest and React Testing Library.

---

## 2. Prompts Used During Development

### Prompt 1: Project Architecture & Core UI
> **Prompt:**  
> "Build a 1-page React + Vite + TypeScript application named SnippetCraft. Allow users to save, filter, and copy developer code snippets and AI prompts. Use React Hook Form with Zod validation and Tailwind CSS with high contrast colors."

### Prompt 2: Copy-to-Clipboard & Filter Logic
> **Prompt:**  
> "Create a state-driven search filter component and add a copy-to-clipboard handler with ARIA dynamic live regions so screen readers announce when text is copied."

---

## 3. Manual Improvements & Refactoring (Post-AI Review)

Following Mentor Ishak's guidelines on reviewing AI-generated code:

1. **Accessibility (WCAG AA) Enhancements:**
   - **AI Issue:** Initial badge tags used low-contrast text pairs (`bg-blue-100 text-blue-300`).
   - **Fix:** Manually updated to high-contrast palette (`bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100`) and added visible `focus:ring-2` focus rings on all interactive buttons.

2. **Type-Safety Strictness:**
   - **AI Issue:** AI assigned `any` to event handlers and snippet items.
   - **Fix:** Defined strict interfaces in `src/types/snippet.ts` (`SnippetItem`, `CategoryType`) to eliminate runtime type errors.

3. **Validation & Trim Logic:**
   - **AI Issue:** Whitespace-only submissions were passing form validation.
   - **Fix:** Updated Zod schema constraints to include `.trim().min(3)` to enforce valid input text.
   - 
