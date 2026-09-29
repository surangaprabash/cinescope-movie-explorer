import { Link, useParams } from "react-router-dom";
import { getMovieDetails } from "../api/tmdb";
import useFetch from "../hooks/useFetch";
import { useFavorites } from "../context/FavoritesContext";
import TrailerEmbed from "../components/movies/TrailerEmbed";
import ErrorMessage from "../components/common/ErrorMessage";
import {
  getImageUrl,
  getYear,
  formatRating,
  formatRuntime,
} from "../utils/helpers";

// Loading placeholder that matches the final layout
function DetailsSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex flex-col gap-6 p-8 rounded-2xl bg-slate-200 dark:bg-slate-800 sm:flex-row">
        <div className="w-48 mx-auto h-72 rounded-xl bg-slate-300 dark:bg-slate-700" />
        <div className="flex-1 space-y-3">
          <div className="w-2/3 h-8 rounded bg-slate-300 dark:bg-slate-700" />
          <div className="w-1/3 h-4 rounded bg-slate-300 dark:bg-slate-700" />
          <div className="w-full h-4 rounded bg-slate-300 dark:bg-slate-700" />
          <div className="w-5/6 h-4 rounded bg-slate-300 dark:bg-slate-700" />
        </div>
      </div>
    </div>
  );
}

export default function MovieDetails() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();

  const { data: movie, loading, error, retry } = useFetch(
    (signal) => {
      // The id comes from the URL, so make sure it's only digits
      if (!/^\d+$/.test(id)) {
        return Promise.reject(new Error("That movie link isn't valid."));
      }
      return getMovieDetails(id, signal);
    },
    [id]
  );

  const backLink = (
    <Link
      to="/"
      className="text-sm text-slate-500 hover:text-brand-500 dark:text-slate-400"
    >
      ← Back to movies
    </Link>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        {backLink}
        <DetailsSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        {backLink}
        <ErrorMessage message={error} onRetry={retry} />
      </div>
    );
  }

  const fav = isFavorite(movie.id);
  const runtime = formatRuntime(movie.runtime);

  return (
    <article className="space-y-8 animate-fadeUp">
      {backLink}

      {/* Backdrop + poster + main info */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900">
        {movie.backdrop_path && (
          <img
            src={getImageUrl(movie.backdrop_path, "w1280")}
            alt=""
            className="absolute inset-0 object-cover w-full h-full opacity-30 blur-sm"
          />
        )}
        <div className="relative flex flex-col gap-6 p-5 text-white bg-gradient-to-t from-slate-950/80 to-slate-950/30 sm:flex-row sm:p-8">
          {movie.poster_path ? (
            <img
              src={getImageUrl(movie.poster_path)}
              alt={`${movie.title} poster`}
              className="w-48 mx-auto shadow-2xl rounded-xl sm:mx-0 sm:w-56"
            />
          ) : (
            <div className="flex items-center justify-center w-48 mx-auto text-5xl h-72 rounded-xl bg-slate-800 sm:mx-0">
              🎞️
            </div>
          )}

          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl font-extrabold sm:text-4xl">
                {movie.title}{" "}
                <span className="font-normal text-white/60">
                  ({getYear(movie.release_date)})
                </span>
              </h1>
              {movie.tagline && (
                <p className="mt-1 text-sm italic text-white/70">{movie.tagline}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-sm font-bold text-black bg-yellow-400 rounded-full">
                ★ {formatRating(movie.vote_average)}
              </span>
              {runtime && (
                <span className="px-3 py-1 text-sm rounded-full bg-white/15 backdrop-blur">
                  {runtime}
                </span>
              )}
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 text-sm rounded-full bg-white/15 backdrop-blur"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <p className="max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
              {movie.overview || "No overview available yet."}
            </p>

            <button
              onClick={() => toggleFavorite(movie)}
              aria-pressed={fav}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition active:scale-95 ${
                fav
                  ? "bg-white text-slate-900"
                  : "bg-brand-500 text-white hover:bg-brand-600"
              }`}
            >
              {fav ? "❤️ In Favorites" : "🤍 Add to Favorites"}
            </button>
          </div>
        </div>
      </div>

      {/* Cast */}
      {movie.cast.length > 0 && (
        <section>
          <h2 className="mb-3 text-xl font-bold">Cast</h2>
          <ul className="flex gap-4 px-4 pb-2 -mx-4 overflow-x-auto no-scrollbar sm:mx-0 sm:px-0">
            {movie.cast.map((person) => (
              <li key={person.id} className="w-24 text-center shrink-0">
                {person.profile_path ? (
                  <img
                    src={getImageUrl(person.profile_path, "w185")}
                    alt={person.name}
                    loading="lazy"
                    className="object-cover w-24 h-24 mx-auto rounded-full shadow"
                  />
                ) : (
                  <div className="flex items-center justify-center w-24 h-24 mx-auto text-2xl font-bold rounded-full bg-slate-200 dark:bg-slate-800">
                    {person.name.charAt(0)}
                  </div>
                )}
                <p className="mt-2 text-xs font-semibold line-clamp-2">{person.name}</p>
                <p className="text-xs line-clamp-1 text-slate-500 dark:text-slate-400">
                  {person.character}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Trailer */}
      <section>
        <h2 className="mb-3 text-xl font-bold">Trailer</h2>
        {movie.trailerKey ? (
          <TrailerEmbed videoKey={movie.trailerKey} title={movie.title} />
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No trailer available for this movie.
          </p>
        )}
      </section>
    </article>
  );
}