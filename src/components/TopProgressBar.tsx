"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * A slim loading bar that runs left-to-right across the top of the page while
 * navigating between routes. The App Router has no built-in router events, so we
 * anticipate navigation from link clicks / history changes and finish the bar
 * once the new route's pathname (or query) has committed.
 */
function TopProgressBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const runningRef = useRef(false);
  const trickleRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (trickleRef.current) {
      clearInterval(trickleRef.current);
      trickleRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    clearTimers();
    setVisible(true);
    setProgress(8);
    // Creep towards 90% with ever-smaller steps so the bar keeps moving while we
    // wait for the route to commit, without ever "arriving" prematurely.
    trickleRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return p;
        const step = Math.max(0.4, (90 - p) * 0.06);
        return Math.min(90, p + step);
      });
    }, 160);
  }, [clearTimers]);

  const done = useCallback(() => {
    if (!runningRef.current) return;
    runningRef.current = false;
    clearTimers();
    setProgress(100);
    // Hold the full bar briefly, fade out, then reset width off-screen.
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      timeoutRef.current = setTimeout(() => setProgress(0), 250);
    }, 220);
  }, [clearTimers]);

  // Finish the bar whenever the committed route (path or query) changes.
  useEffect(() => {
    done();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  // Start the bar on same-origin navigations we can anticipate.
  useEffect(() => {
    const isSameDestination = (url: URL) =>
      url.pathname === window.location.pathname && url.search === window.location.search;

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      // Ignore modified clicks (new tab / download / middle-click, etc.).
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
        return;

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      if (anchor.getAttribute("rel")?.includes("external")) return;

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return; // external link
      if (isSameDestination(url)) return; // same page / hash-only

      start();
    };

    // Catch programmatic navigation (e.g. router.push) and back/forward.
    const originalPush = window.history.pushState;
    const originalReplace = window.history.replaceState;

    const wrap = (fn: typeof window.history.pushState): typeof window.history.pushState =>
      function (this: History, ...args) {
        try {
          const next = args[2];
          if (next != null) {
            const url = new URL(String(next), window.location.href);
            if (url.origin === window.location.origin && !isSameDestination(url)) start();
          }
        } catch {
          /* ignore malformed URLs */
        }
        return fn.apply(this, args);
      };

    window.history.pushState = wrap(originalPush);
    window.history.replaceState = wrap(originalReplace);

    const handlePopState = () => start();

    document.addEventListener("click", handleClick, { capture: true });
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      window.history.pushState = originalPush;
      window.history.replaceState = originalReplace;
      clearTimers();
    };
  }, [start, clearTimers]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-9999 h-0.75"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 250ms ease" }}
    >
      <div
        className="relative h-full rounded-r-full bg-linear-to-r from-primary via-primary to-cta"
        style={{
          width: `${progress}%`,
          transition: "width 200ms ease-out",
          boxShadow: "0 0 10px var(--cta), 0 0 4px var(--primary)",
        }}
      >
        {/* Bright leading-edge glow that trails the bar as it advances. */}
        <span className="absolute right-0 top-0 h-full w-20 rounded-full bg-cta opacity-80 blur-[3px]" />
      </div>
    </div>
  );
}

export function TopProgressBar() {
  // useSearchParams requires a Suspense boundary to avoid opting the whole tree
  // into client rendering during static generation.
  return (
    <Suspense fallback={null}>
      <TopProgressBarInner />
    </Suspense>
  );
}
