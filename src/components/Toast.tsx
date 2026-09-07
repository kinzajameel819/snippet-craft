import React from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-700 animate-slideUp"
    >
      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
      <p className="text-sm font-semibold">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="ml-2 text-slate-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none rounded-md"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
