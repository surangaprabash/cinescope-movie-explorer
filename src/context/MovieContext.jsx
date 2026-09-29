import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { searchMovies, discoverMovies } from "../api/tmdb";
import useDebounce from "../hooks/useDebounce";

const MovieContext = createContext();

// Small safe wrappers, storage can be blocked in private mode
const read = (key, fallback) => {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
};
const write = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
};

export function MovieProvider({ children }) {
  // Persisted: the last search text and the scroll mode
  const [query, setQuery] = useState(() => read("lastSearch", "").slice(0, 100));
  const [mode, setMode] = useState(() =>
    read("scrollMode", "infinite") === "loadmore" ? "loadmore" : "infinite"
  );

  // Session only filters
  const [genre, setGenre] = useState(null);
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(0);

  // List state
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState({
    loading: true,
    loadingMore: false,
    error: "",
  });
  const [reloadKey, setReloadKey] = useState(0);

  const debouncedQuery = useDebounce(query.trim(), 500);
  const isSearching = debouncedQuery.length >= 2;

  const abortRef = useRef(null); // cancels in-flight requests when filters change
  const busyRef = useRef(false); // blocks duplicate "load more" calls

  useEffect(() => write("lastSearch", debouncedQuery), [debouncedQuery]);
  useEffect(() => write("scrollMode", mode), [mode]);

  // Fetch one page for the current search / filters
  const request = useCallback(
    async (pageNum, signal) => {
      if (isSearching) {
        const res = await searchMovies(
          { query: debouncedQuery, year, page: pageNum },
          signal
        );
        // Search can't filter by genre or rating, so do it here
        const results = res.results.filter(
          (m) =>
            (!genre || m.genre_ids?.includes(genre)) &&
            (!rating || m.vote_average >= rating)
        );
        return { ...res, results };
      }
      return discoverMovies({ genre, year, minRating: rating, page: pageNum }, signal);
    },
    [isSearching, debouncedQuery, genre, year, rating]
  );

  // First page: runs whenever the search or any filter changes
  useEffect(() => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    busyRef.current = true;

    setItems([]);
    setPage(1);
    setTotalPages(1);
    setStatus({ loading: true, loadingMore: false, error: "" });

    request(1, controller.signal)
      .then((res) => {
        if (controller.signal.aborted) return;
        setItems(res.results);
        setPage(res.page);
        setTotalPages(res.totalPages);
        busyRef.current = false;
        setStatus({ loading: false, loadingMore: false, error: "" });
      })
      .catch((err) => {
        if (controller.signal.aborted) return; // intentional cancel
        busyRef.current = false;
        setStatus({ loading: false, loadingMore: false, error: err.message });
      });

    return () => controller.abort();
  }, [request, reloadKey]);

  // Next page: used by infinite scroll and the Load More button
  const loadMore = useCallback(() => {
    const controller = abortRef.current;
    if (!controller || busyRef.current || page >= totalPages) return;

    busyRef.current = true;
    setStatus((s) => ({ ...s, loadingMore: true, error: "" }));

    request(page + 1, controller.signal)
      .then((res) => {
        if (controller.signal.aborted) return;
        // Skip duplicates, TMDb popularity order can shift between pages
        setItems((prev) => {
          const seen = new Set(prev.map((m) => m.id));
          return [...prev, ...res.results.filter((m) => !seen.has(m.id))];
        });
        setPage(res.page);
        setTotalPages(res.totalPages);
        busyRef.current = false;
        setStatus((s) => ({ ...s, loadingMore: false }));
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        busyRef.current = false;
        setStatus({ loading: false, loadingMore: false, error: err.message });
      });
  }, [page, totalPages, request]);

  // Retry the first page, or the next page if we already have results
  const retry = () => (items.length > 0 ? loadMore() : setReloadKey((k) => k + 1));

  const clearFilters = () => {
    setGenre(null);
    setYear("");
    setRating(0);
  };

  const value = {
    query, setQuery, debouncedQuery, isSearching,
    genre, setGenre, year, setYear, rating, setRating,
    hasFilters: genre !== null || year !== "" || rating > 0,
    clearFilters,
    mode, setMode,
    items,
    hasMore: page < totalPages,
    ...status,
    loadMore,
    retry,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
}

export const useMovies = () => useContext(MovieContext);