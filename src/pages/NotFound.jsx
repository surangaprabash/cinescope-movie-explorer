import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="py-20 text-center">
      <p className="text-6xl font-extrabold text-brand-500">404</p>
      <p className="mt-2 text-slate-500 dark:text-slate-400">
        This page doesn't exist.
      </p>
      <Link to="/" className="inline-block mt-4 text-brand-500 hover:underline">
        Go home
      </Link>
    </div>
  );
}