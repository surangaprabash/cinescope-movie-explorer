import { useMemo, useState } from "react";
import SearchBar from "../components/movies/SearchBar";
import GenreFilter from "../components/movies/GenreFilter";
import TrendingRow from "../components/movies/TrendingRow";
import MovieGrid from "../components/movies/MovieGrid";
import EmptyState from "../components/common/EmptyState";
import { dummyMovies, dummyGenres } from "../data/dummyMovies";

export default function Home() {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState(null);

  // Dummy filtering. In Step 3 this becomes real API search.
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return dummyMovies.filter(
      (m) =>
        (!q || m.title.toLowerCase().includes(q)) &&
        (!genre || m.genres.some((g) => g.id === genre))
    );
  }, [query, genre]);

  const isSearching = query.trim() !== "" || genre !== null;

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

      {/* Trending is hidden while the user is searching/filtering */}
      {!isSearching && <TrendingRow movies={dummyMovies} />}

      <section className="space-y-4">
        <h2 className="text-xl font-bold">
          {isSearching ? "Results" : "Browse Movies"}
        </h2>
        <GenreFilter genres={dummyGenres} selected={genre} onSelect={setGenre} />

        {results.length > 0 ? (
          <MovieGrid movies={results} />
        ) : (
          <EmptyState
            title="No movies found"
            subtitle="Try a different title or genre."
          />
        )}
      </section>
    </div>
  );
}