import { Link, useParams } from "react-router-dom";
import { dummyMovies } from "../data/dummyMovies";
import { useFavorites } from "../context/FavoritesContext";
import TrailerEmbed from "../components/movies/TrailerEmbed";
import EmptyState from "../components/common/EmptyState";
import { getImageUrl, getYear, formatRating } from "../utils/helpers";

export default function MovieDetails() {
  const { id } = useParams();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Dummy lookup. Later: fetch details from TMDb by id.
  const movie = dummyMovies.find((m) => String(m.id) === id);

  if (!movie) {
    return (
      <EmptyState
        icon="😕"
        title="Movie not found"
        subtitle="It may have been removed or the link is wrong."
      />
    );
  }

  const fav = isFavorite(movie.id);

  return (
    <article className="space-y-8 animate-fadeUp">
      <Link
        to="/"
        className="text-sm text-slate-500 hover:text-brand-500 dark:text-slate-400"
      >
        ← Back to movies
      </Link>

      {/* Backdrop + poster + main info */}
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={getImageUrl(movie.backdrop_path, "w1280")}
          alt=""
          className="absolute inset-0 object-cover w-full h-full opacity-30 blur-sm"
        />
        <div className="relative flex flex-col gap-6 p-5 text-white bg-gradient-to-t from-slate-950/80 to-slate-950/30 sm:flex-row sm:p-8">
          <img
            src={getImageUrl(movie.poster_path)}
            alt={`${movie.title} poster`}
            className="w-48 mx-auto shadow-2xl rounded-xl sm:mx-0 sm:w-56"
          />

          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-extrabold sm:text-4xl">
              {movie.title}{" "}
              <span className="font-normal text-white/60">
                ({getYear(movie.release_date)})
              </span>
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-sm font-bold text-black bg-yellow-400 rounded-full">
                ★ {formatRating(movie.vote_average)}
              </span>
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
              {movie.overview}
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
      <section>
        <h2 className="mb-3 text-xl font-bold">Cast</h2>
        <ul className="flex flex-wrap gap-2">
          {movie.cast.map((name) => (
            <li
              key={name}
              className="rounded-full bg-slate-200 px-3 py-1.5 text-sm dark:bg-slate-800"
            >
              {name}
            </li>
          ))}
        </ul>
      </section>

      {/* Trailer */}
      <section>
        <h2 className="mb-3 text-xl font-bold">Trailer</h2>
        <TrailerEmbed videoKey={movie.trailerKey} title={movie.title} />
      </section>
    </article>
  );
}