import { useState } from "react";
import SearchBar from "../components/movies/SearchBar";
import GenreFilter from "../components/movies/GenreFilter";
import TrendingRow from "../components/movies/TrendingRow";
import MovieGrid from "../components/movies/MovieGrid";
import SkeletonCard from "../components/common/SkeletonCard";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";
import useFetch from "../hooks/useFetch";
import useDebounce from "../hooks/useDebounce";
import {
  getTrending,
  getGenres,
  searchMovies,
  discoverMovies,
} from "../api/tmdb";

const SKELETON_COUNT = 10;

export default function Home() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState(null);

  // Wait 500ms after typing stops, and ignore 1-character searches
  const debouncedQuery = useDebounce(query.trim(), 500);
  const isSearching = debouncedQuery.length >= 2;

  // Trending and genres load once
  const trending = useFetch((signal) => getTrending(signal), []);
  const genres = useFetch((signal) => getGenres(signal), []);

  // Main list: search results if searching, otherwise the discover list
  const list = useFetch(
    (signal) =>
      isSearching
        ? searchMovies(debouncedQuery, 1, signal)
        : discoverMovies({ genre, page: 1 }, signal),
    [debouncedQuery, genre]
  );

  let movies = list.data?.results ?? [];
  // The search endpoint can't filter by genre, so do it on the client
  if (isSearching && genre) {
    movies = movies.filter((m) => m.genre_ids?.includes(genre));
  }

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

      <SearchBar
        value={query}
        onChange={setQuery}
        onClear={() => setQuery("")}
      />

      {/* Trending row: hidden while searching */}
      {!isSearching && (
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
        <h2 className="text-xl font-bold">
          {isSearching ? `Results for "${debouncedQuery}"` : "Browse Movies"}
        </h2>

        <GenreFilter
          genres={genres.data ?? []}
          selected={genre}
          onSelect={setGenre}
        />

        {list.loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {list.error && <ErrorMessage message={list.error} onRetry={list.retry} />}

        {!list.loading && !list.error && movies.length > 0 && (
          <MovieGrid movies={movies} />
        )}

        {!list.loading && !list.error && movies.length === 0 && (
          <EmptyState
            title="No movies found"
            subtitle="Try a different title or genre."
          />
        )}
      </section>
    </div>
  );
}