import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message, type = "info") => {
    const id = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    setToasts((current) => [...current, { id, message, type }]);
    setTimeout(() => removeToast(id), 3600);
  }, [removeToast]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-5 top-5 z-[80] flex w-[320px] flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur ${
              toast.type === "success"
                ? "border-emerald-300/30 bg-emerald-500/15 text-emerald-50"
                : toast.type === "error"
                ? "border-rose-300/30 bg-rose-500/15 text-rose-50"
                : toast.type === "warning"
                ? "border-amber-300/30 bg-amber-500/15 text-amber-50"
                : "border-sky-300/30 bg-sky-500/15 text-sky-50"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm leading-6">{toast.message}</p>
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="rounded-full px-2 text-lg leading-none opacity-70 transition hover:opacity-100"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const value = useContext(ToastContext);
  if (!value) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return value;
}
