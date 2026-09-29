import { useEffect, useRef } from "react";

// Returns a ref for an invisible "sentinel" element placed under the grid.
// When it scrolls near the viewport, onIntersect() is called.
export default function useInfiniteScroll(onIntersect, enabled) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onIntersect();
      },
      { rootMargin: "300px" } // start loading a little before the user reaches the end
    );

    observer.observe(node);
    return () => observer.disconnect();
    // onIntersect changes after every page, so the observer is recreated and
    // checks again. This keeps loading if the sentinel is still on screen.
  }, [enabled, onIntersect]);

  return ref;
}