// Horizontal scrollable chips (works nicely on phones)
export default function GenreFilter({ genres, selected, onSelect }) {
  const chip = (active) =>
    `shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${
      active
        ? "bg-brand-500 text-white shadow"
        : "bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
    }`;

  return (
    <div className="flex gap-2 py-1 overflow-x-auto no-scrollbar">
      <button className={chip(selected === null)} onClick={() => onSelect(null)}>
        All
      </button>
      {genres.map((g) => (
        <button
          key={g.id}
          className={chip(selected === g.id)}
          onClick={() => onSelect(g.id)}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}