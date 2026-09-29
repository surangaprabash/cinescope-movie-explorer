export default function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="relative">
      <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2 text-slate-400">
        🔍
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for a movie..."
        aria-label="Search movies"
        maxLength={100} // simple input limit
        className="w-full py-3 pr-10 text-sm transition bg-white border rounded-full shadow-sm outline-none border-slate-300 pl-11 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900"
      />
      {value && (
        <button
          onClick={onClear}
          aria-label="Clear search"
          className="absolute -translate-y-1/2 right-4 top-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
        >
          ✕
        </button>
      )}
    </div>
  );
}