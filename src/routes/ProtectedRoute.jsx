import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MovieProvider } from "../context/MovieContext";

// Redirects to /login if there is no logged-in user
// MovieProvider lives here so movie data is only loaded after login.
export default function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  // return user ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/login" replace state={{ from: location }} />
  // );

  return user ? (
    <MovieProvider>
      <Outlet />
    </MovieProvider>
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}