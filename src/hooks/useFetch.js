import { useCallback, useEffect, useState } from "react";
import axios from "axios";

// Generic data-loading hook.
// fetcher(signal) must return a promise. It re-runs whenever deps change.
export default function useFetch(fetcher, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: "" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // AbortController cancels the old request when deps change or the
    // component unmounts, so a slow response can't overwrite a newer one.
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true, error: "" }));

    fetcher(controller.signal)
      .then((data) => setState({ data, loading: false, error: "" }))
      .catch((err) => {
        if (axios.isCancel(err)) return; // ignore intentional cancels
        setState({ data: null, loading: false, error: err.message });
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  // Calling retry() re-runs the request (used by the "Try again" button)
  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, retry };
}