import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="w-full px-4 pt-6 pb-16 mx-auto max-w-7xl sm:px-6">
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Everything below requires a logged-in user */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="py-6 text-xs text-center border-t border-slate-200 text-slate-500 dark:border-slate-800 dark:text-slate-400">
        This product uses the TMDb API but is not endorsed or certified by TMDb.
      </footer>
    </>
  );
}