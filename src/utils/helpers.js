const TMDB_IMG_BASE = "https://image.tmdb.org/t/p";

// Works with dummy full URLs now and TMDb relative paths later
export const getImageUrl = (path, size = "w500") => {
  if (!path) return null;
  return path.startsWith("http") ? path : `${TMDB_IMG_BASE}/${size}${path}`;
};

// "2024-05-12" -> "2024"
export const getYear = (date) => (date ? date.slice(0, 4) : "N/A");

// 8.234 -> "8.2"
export const formatRating = (rating) =>
  typeof rating === "number" ? rating.toFixed(1) : "N/A";

// Keep only characters valid in a YouTube video id.
// This stops odd values from ending up inside an iframe URL.
export const isValidYouTubeKey = (key) => /^[A-Za-z0-9_-]{6,20}$/.test(key || "");

// 125 -> "2h 5m"
export const formatRuntime = (minutes) => {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
};