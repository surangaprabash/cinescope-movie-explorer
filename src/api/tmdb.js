import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// One shared axios instance: base URL, timeout and default query params
const client = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
  params: { api_key: API_KEY, language: "en-US" },
});

// Turn any axios error into a short, user-friendly message.
const toFriendlyMessage = (error) => {
  if (error.code === "ECONNABORTED") {
    return "The request took too long. Please try again.";
  }
  if (!error.response) {
    return "Can't reach the movie service. Check your internet connection.";
  }
  switch (error.response.status) {
    case 401:
      return "The movie service rejected our API key.";
    case 404:
      return "We couldn't find what you were looking for.";
    case 429:
      return "Too many requests. Please wait a moment and try again.";
    default:
      return error.response.status >= 500
        ? "The movie service is having problems. Try again shortly."
        : "Something unexpected happened. Please try again.";
  }
};

// SECURITY: a raw axios error contains the request config, which includes
// our api_key. We throw a brand new Error with only the message, so the key
// can never end up in the UI or in a console log by accident.
client.interceptors.response.use(
  (res) => res,
  (error) => {
    if (axios.isCancel(error)) return Promise.reject(error); // request was aborted on purpose
    return Promise.reject(new Error(toFriendlyMessage(error)));
  }
);

// Small wrapper used by every call below
const get = async (url, params = {}, signal) => {
  if (!API_KEY) {
    throw new Error(
      "TMDb API key is missing. Add REACT_APP_TMDB_API_KEY to your .env file and restart."
    );
  }
  const { data } = await client.get(url, { params, signal });
  return data;
};

// TMDb only serves the first 500 pages, so cap it
const toPage = (data) => ({
  results: data.results ?? [],
  page: data.page,
  totalPages: Math.min(data.total_pages ?? 1, 500),
});

// Trending movies this week (used by the trending row)
export const getTrending = async (signal) => {
  const data = await get("/trending/movie/week", {}, signal);
  return data.results ?? [];
};

// Search by title
export const searchMovies = async (query, page = 1, signal) =>
  toPage(await get("/search/movie", { query, page, include_adult: false }, signal));

// Browse list, optionally filtered by genre (search can't filter by genre, discover can)
export const discoverMovies = async ({ genre, page = 1 } = {}, signal) =>
  toPage(
    await get(
      "/discover/movie",
      {
        sort_by: "popularity.desc",
        with_genres: genre || undefined, // undefined params are dropped by axios
        page,
        include_adult: false,
      },
      signal
    )
  );

// Genre list for the filter chips
export const getGenres = async (signal) => {
  const data = await get("/genre/movie/list", {}, signal);
  return data.genres ?? [];
};

// Full details, cast and videos in ONE request via append_to_response
export const getMovieDetails = async (id, signal) => {
  const data = await get(
    `/movie/${encodeURIComponent(id)}`,
    { append_to_response: "videos,credits" },
    signal
  );

  // Prefer an official YouTube trailer, fall back to any YouTube video
  const videos = (data.videos?.results ?? []).filter((v) => v.site === "YouTube");
  const trailer =
    videos.find((v) => v.type === "Trailer" && v.official) ||
    videos.find((v) => v.type === "Trailer") ||
    videos[0];

  // Keep only what the UI needs (top 12 cast members)
  const cast = (data.credits?.cast ?? []).slice(0, 12).map((c) => ({
    id: c.id,
    name: c.name,
    character: c.character,
    profile_path: c.profile_path,
  }));

  return {
    id: data.id,
    title: data.title,
    tagline: data.tagline,
    overview: data.overview,
    release_date: data.release_date,
    runtime: data.runtime,
    vote_average: data.vote_average,
    poster_path: data.poster_path,
    backdrop_path: data.backdrop_path,
    genres: data.genres ?? [],
    cast,
    trailerKey: trailer?.key ?? null,
  };
};