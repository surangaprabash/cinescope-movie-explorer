import SearchBar from "../components/movies/SearchBar";
import GenreFilter from "../components/movies/GenreFilter";
import FilterBar from "../components/movies/FilterBar";
import ScrollModeToggle from "../components/movies/ScrollModeToggle";
import TrendingRow from "../components/movies/TrendingRow";
import MovieGrid from "../components/movies/MovieGrid";
import SkeletonCard from "../components/common/SkeletonCard";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import useFetch from "../hooks/useFetch";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { useMovies } from "../context/MovieContext";
import { getTrending, getGenres } from "../api/tmdb";

const gridClass =
  "grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5";

function SkeletonGrid({ count }) {
  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export default function Home() {
  // Search, filters and the movie list live in MovieContext
  const {
    query, setQuery, debouncedQuery, isSearching,
    genre, setGenre, year, setYear, rating, setRating,
    hasFilters, clearFilters,
    mode, setMode,
    items, loading, loadingMore, error, hasMore, loadMore, retry,
  } = useMovies();

  // Trending and genre chips are independent, they load once
  const trending = useFetch((signal) => getTrending(signal), []);
  const genres = useFetch((signal) => getGenres(signal), []);

  // Only watch the sentinel when there is something to load and nothing in flight
  const sentinelRef = useInfiniteScroll(
    loadMore,
    mode === "infinite" && hasMore && !loading && !loadingMore && !error
  );

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="p-6 text-white shadow-lg rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 sm:p-10">
        <h1 className="text-2xl font-extrabold sm:text-4xl">
          Discover your next favorite film
        </h1>
        <p className="max-w-xl mt-2 text-sm text-white/80 sm:text-base">
          Search thousands of movies, watch trailers and save your favorites.
        </p>
      </section>

      <SearchBar value={query} onChange={setQuery} onClear={() => setQuery("")} />

      {/* Trending row: hidden while searching or filtering */}
      {!isSearching && !hasFilters && (
        <>
          {trending.loading && (
            <div className="flex gap-4 overflow-x-auto no-scrollbar">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-40 shrink-0 sm:w-48">
                  <SkeletonCard />
                </div>
              ))}
            </div>
          )}
          {trending.error && (
            <ErrorMessage message={trending.error} onRetry={trending.retry} />
          )}
          {trending.data && <TrendingRow movies={trending.data} />}
        </>
      )}

      {/* Main list */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold">
            {isSearching ? `Results for "${debouncedQuery}"` : "Browse Movies"}
          </h2>
          <ScrollModeToggle mode={mode} onChange={setMode} />
        </div>

        <GenreFilter genres={genres.data ?? []} selected={genre} onSelect={setGenre} />

        <FilterBar
          year={year}
          rating={rating}
          onYear={setYear}
          onRating={setRating}
          onClear={clearFilters}
          showClear={hasFilters}
        />

        {loading && <SkeletonGrid count={10} />}

        {items.length > 0 && <MovieGrid movies={items} />}

        {loadingMore && <SkeletonGrid count={5} />}

        {error && <ErrorMessage message={error} onRetry={retry} />}

        {!loading && !error && items.length === 0 && (
          <EmptyState
            title="No movies found"
            subtitle="Try a different title, genre, year or rating."
          />
        )}

        {/* Invisible marker that triggers the next page in infinite mode */}
        {mode === "infinite" && <div ref={sentinelRef} aria-hidden="true" className="h-1" />}

        {/* Load More button mode */}
        {mode === "loadmore" && hasMore && !loading && !loadingMore && !error && (
          <div className="text-center">
            <button
              onClick={loadMore}
              className="rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 active:scale-95"
            >
              Load more
            </button>
          </div>
        )}

        {!hasMore && !loading && !error && items.length > 0 && (
          <p className="text-sm text-center text-slate-500 dark:text-slate-400">
            You've reached the end 🎬
          </p>
        )}
      </section>
    </div>
  );
}