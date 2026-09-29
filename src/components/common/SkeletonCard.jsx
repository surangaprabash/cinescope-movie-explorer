// Placeholder shown while movies are loading
export default function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] rounded-xl bg-slate-200 dark:bg-slate-800" />
      <div className="w-3/4 h-4 mt-3 rounded bg-slate-200 dark:bg-slate-800" />
      <div className="w-1/3 h-3 mt-2 rounded bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}