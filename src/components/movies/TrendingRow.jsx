import { Link } from "react-router-dom";
import { getImageUrl, formatRating } from "../../utils/helpers";

// Horizontal scrolling strip of trending movies
export default function TrendingRow({ movies }) {
  return (
    <section aria-labelledby="trending-title">
      <h2 id="trending-title" className="mb-3 text-xl font-bold">
        🔥 Trending Now
      </h2>
      <div className="flex gap-4 px-4 pb-2 -mx-4 overflow-x-auto no-scrollbar snap-x sm:mx-0 sm:px-0">
        {movies.map((m) => (
          <Link
            key={m.id}
            to={`/movie/${m.id}`}
            className="relative w-40 overflow-hidden group shrink-0 snap-start rounded-xl sm:w-48"
          >
            <img
              src={getImageUrl(m.poster_path)}
              alt={`${m.title} poster`}
              loading="lazy"
              className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 p-3 pt-10 bg-gradient-to-t from-black/90 to-transparent">
              <p className="text-sm font-semibold text-white line-clamp-1">
                {m.title}
              </p>
              <p className="text-xs text-yellow-400">★ {formatRating(m.vote_average)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}