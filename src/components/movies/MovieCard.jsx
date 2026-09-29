import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { getImageUrl, getYear, formatRating } from "../../utils/helpers";

export default function MovieCard({ movie, index = 0 }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(movie.id);
  const poster = getImageUrl(movie.poster_path);

  const handleFavorite = (e) => {
    // Button sits inside a Link, so stop the navigation
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="block group animate-fadeUp"
      // Small stagger so cards appear one after another
      style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-slate-200 shadow-md transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl dark:bg-slate-800">
        {poster ? (
          <img
            src={poster}
            alt={`${movie.title} poster`}
            loading="lazy"
            className="object-cover w-full h-full transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-4xl">🎞️</div>
        )}

        {/* Rating badge */}
        <span className="absolute px-2 py-1 text-xs font-bold text-yellow-400 rounded-full left-2 top-2 bg-black/70 backdrop-blur">
          ★ {formatRating(movie.vote_average)}
        </span>

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={fav}
          className="absolute flex items-center justify-center w-8 h-8 text-base transition rounded-full right-2 top-2 bg-black/60 backdrop-blur hover:scale-110"
        >
          {fav ? "❤️" : "🤍"}
        </button>
      </div>

      <h3 className="mt-3 text-sm font-semibold line-clamp-1 sm:text-base">
        {movie.title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        {getYear(movie.release_date)}
      </p>
    </Link>
  );
}