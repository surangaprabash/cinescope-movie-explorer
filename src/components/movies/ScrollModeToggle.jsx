// Lets the user pick between infinite scroll and a "Load More" button
export default function ScrollModeToggle({ mode, onChange }) {
  const btn = (value, label) => (
    <button
      onClick={() => onChange(value)}
      aria-pressed={mode === value}
      className={`rounded-full px-3 py-1 text-xs font-medium transition ${
        mode === value
          ? "bg-brand-500 text-white"
          : "text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div
      role="group"
      aria-label="Loading style"
      className="inline-flex items-center gap-1 p-1 border rounded-full border-slate-300 dark:border-slate-700"
    >
      {btn("infinite", "Infinite scroll")}
      {btn("loadmore", "Load more")}
    </div>
  );
}