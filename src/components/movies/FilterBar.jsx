const THIS_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: THIS_YEAR - 1950 + 1 }, (_, i) => THIS_YEAR - i);
const RATINGS = [5, 6, 7, 8];

const selectClass =
  "rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900";

// Values come from fixed lists, so no free text ever reaches the API
export default function FilterBar({ year, rating, onYear, onRating, onClear, showClear }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <select
        value={year}
        onChange={(e) => onYear(e.target.value)}
        aria-label="Filter by release year"
        className={selectClass}
      >
        <option value="">Any year</option>
        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <select
        value={rating}
        onChange={(e) => onRating(Number(e.target.value))}
        aria-label="Filter by minimum rating"
        className={selectClass}
      >
        <option value={0}>Any rating</option>
        {RATINGS.map((r) => (
          <option key={r} value={r}>
            ★ {r}+
          </option>
        ))}
      </select>

      {showClear && (
        <button
          onClick={onClear}
          className="rounded-full px-3 py-1.5 text-sm text-brand-500 transition hover:bg-brand-500/10"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}