import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import ThemeToggle from "./ThemeToggle";

// Small helper so the active link is highlighted
const linkClass = ({ isActive }) =>
  `rounded-full px-3 py-1.5 text-sm font-medium transition ${
    isActive
      ? "bg-brand-500 text-white"
      : "text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="flex items-center justify-between gap-3 px-4 py-3 mx-auto max-w-7xl sm:px-6">
        <Link to="/" className="text-xl font-extrabold tracking-tight">
          Cine<span className="text-brand-500">Scope</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {user && (
            <>
              <NavLink to="/" end className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/favorites" className={linkClass}>
                Favorites{favorites.length > 0 && ` (${favorites.length})`}
              </NavLink>
            </>
          )}
          <ThemeToggle />
          {user && (
            <button
              onClick={handleLogout}
              className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium transition hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}