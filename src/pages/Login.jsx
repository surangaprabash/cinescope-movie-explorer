import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // Already logged in? Skip the form.
  if (user) return <Navigate to="/" replace />;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(form.username, form.password);
    if (!result.ok) return setError(result.message);
    // Send the user back to where they came from (or home)
    navigate(location.state?.from?.pathname || "/", { replace: true });
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900";

  return (
    <div className="max-w-sm p-6 mx-auto mt-10 bg-white border shadow-xl animate-fadeUp rounded-2xl border-slate-200 dark:border-slate-800 dark:bg-slate-900 sm:mt-20 sm:p-8">
      <h1 className="text-2xl font-extrabold">Welcome back 🎬</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Log in to explore movies.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
        <div>
          <label htmlFor="username" className="block mb-1 text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            value={form.username}
            onChange={handleChange}
            maxLength={30}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            maxLength={64}
            className={inputClass}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-brand-500 py-2.5 font-semibold text-white transition hover:bg-brand-600 active:scale-[0.98]"
        >
          Log in
        </button>
        <p className="text-xs text-center text-slate-400">
          Demo: any username (3+ chars) and password (6+ chars)
        </p>
      </form>
    </div>
  );
}