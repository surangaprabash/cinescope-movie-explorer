import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import MovieGrid from "../components/movies/MovieGrid";
import EmptyState from "../components/common/EmptyState";

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <section className="space-y-5">
      <h1 className="text-2xl font-extrabold">❤️ Your Favorites</h1>

      {favorites.length > 0 ? (
        <MovieGrid movies={favorites} />
      ) : (
        <EmptyState
          icon="🍿"
          title="No favorites yet"
          subtitle="Tap the heart on any movie to save it here."
        />
      )}

      {favorites.length === 0 && (
        <div className="text-center">
          <Link
            to="/"
            className="px-5 py-2 text-sm font-semibold text-white rounded-full bg-brand-500 hover:bg-brand-600"
          >
            Browse movies
          </Link>
        </div>
      )}
    </section>
  );
}