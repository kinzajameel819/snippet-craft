# ⚡ SnippetCraft — Developer Code Snippet & AI Prompt Organizer

SnippetCraft is a modern, WCAG 2.1 AA accessible single-page web application built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. It enables developers and prompt engineers to store, organize, search, filter, and copy code snippets and LLM prompts effortlessly with high contrast light/dark mode support and real-time form validation.

---

## ✨ Features

- 📝 **Form Management & Validation**: Add snippets with Title, Category, Code/Prompt text, and optional Notes powered by **React Hook Form** and **Zod** schema validation.
- ⚡ **Live Search & Category Filtering**: Instantly search by keywords or filter by category pills (`React`, `Python`, `AI Prompts`, `CSS`, `General`) with dynamic counter badges.
- 📋 **1-Click Copy to Clipboard**: Interactive snippet cards with instant copy feedback ("Copied!") and high-contrast language badges.
- 🌓 **High-Contrast Dark & Light Mode**: WCAG 2.1 AA compliant theme switcher with persistent preference storage and focus indicators.
- 💾 **Local Storage Persistence**: Automatically saves custom snippets locally so data remains intact across sessions.
- 🧪 **Comprehensive Vitest Suite**: Pre-configured unit tests covering core rendering, Zod validation errors, and category filtering.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | UI Library |
| **Vite 6** | Build Tool & Dev Server |
| **TypeScript** | Type Safety |
| **Tailwind CSS** | Styling & Theme Management |
| **Lucide Icons** | Accessible Icon Suite |
| **React Hook Form** | Dynamic Form Handling |
| **Zod** | Schema Validation |
| **Vitest & React Testing Library** | Unit Testing Suite |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone or navigate to the repository directory:
   ```bash
   cd "Snnipit craft"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

---

## 🧪 Running Tests

To run the Vitest unit testing suite (`src/__tests__/App.test.tsx`):

```bash
npm run test
```

### Test Specifications Covered:
1. **Render Test**: Renders main title ("SnippetCraft") and input form properly.
2. **Validation Test**: Validates form submission error triggers on empty input.
3. **Filter Test**: Tests filtering functionality by category (`React`, `Python`, etc.).

---

## ♿ Accessibility (WCAG 2.1 AA)

- Accessible ARIA labels and roles (`role="alert"`, `aria-label`, `aria-pressed`, `aria-invalid`).
- Contrast ratio compliant colors for both Light and Dark themes.
- Visible focus rings (`focus-visible:ring-2 focus-visible:ring-indigo-500`) for complete keyboard navigation support.

---

## 📄 License

MIT License. Crafted with care for developers and prompt engineers.
