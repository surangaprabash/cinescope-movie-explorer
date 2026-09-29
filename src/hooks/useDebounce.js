import { useEffect, useState } from "react";

// Waits until the user stops typing before returning the new value.
// This avoids firing an API request on every single keystroke.
export default function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}