"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Music, VolumeX, Loader2 } from "lucide-react";

const TRACKS = ["/LinawDinigTheme(upbeat).mp3", "/LinawDinig5thAnniversary.mp3"];
const STORAGE_KEY = "ld_music_muted";

function pickRandom(exclude?: string) {
  const pool = exclude ? TRACKS.filter((t) => t !== exclude) : TRACKS;
  return pool[Math.floor(Math.random() * pool.length)] ?? TRACKS[0];
}

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentRef = useRef<string>("");
  const [userOff, setUserOff] = useState(false);
  const [audible, setAudible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [hintOpen, setHintOpen] = useState(true);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    audio.volume = 0.35;
    audio.preload = "auto";

    const first = pickRandom();
    currentRef.current = first;
    audio.src = first;

    const startOff = typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "1";
    setUserOff(startOff);

    const syncAudible = () => setAudible(!audio.paused && !audio.muted);
    const onLoadStart = () => setLoading(true);
    const onReady = () => setLoading(false);
    const onWaiting = () => setLoading(true);
    const onPlaying = () => { setLoading(false); syncAudible(); };
    const onPause = () => setAudible(false);
    const onVolumeChange = syncAudible;
    const onEnded = () => {
      const next = pickRandom(currentRef.current);
      currentRef.current = next;
      audio.src = next;
      audio.play().catch(() => {});
    };

    audio.addEventListener("loadstart", onLoadStart);
    audio.addEventListener("canplay", onReady);
    audio.addEventListener("canplaythrough", onReady);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("volumechange", onVolumeChange);
    audio.addEventListener("ended", onEnded);

    // Try to play automatically. Browsers block audible autoplay until a user
    // gesture, so if that's refused we fall back to a (permitted) muted autoplay
    // and unmute on the very first interaction with the page.
    let removeGesture = () => {};
    if (!startOff) {
      audio.muted = false;
      audio.play().catch(() => {
        audio.muted = true;
        audio.play().catch(() => {});
        const start = () => {
          if (localStorage.getItem(STORAGE_KEY) === "1") return removeGesture();
          audio.muted = false;
          if (audio.paused) audio.play().catch(() => {});
          removeGesture();
        };
        window.addEventListener("pointerdown", start, { once: true });
        window.addEventListener("keydown", start, { once: true });
        window.addEventListener("touchstart", start, { once: true });
        removeGesture = () => {
          window.removeEventListener("pointerdown", start);
          window.removeEventListener("keydown", start);
          window.removeEventListener("touchstart", start);
        };
      });
    } else {
      setLoading(false);
    }

    return () => {
      removeGesture();
      audio.pause();
      audio.removeEventListener("loadstart", onLoadStart);
      audio.removeEventListener("canplay", onReady);
      audio.removeEventListener("canplaythrough", onReady);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("volumechange", onVolumeChange);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // Auto-hide the first-load hint after a few seconds.
  useEffect(() => {
    if (!hintOpen) return;
    const t = setTimeout(() => setHintOpen(false), 6000);
    return () => clearTimeout(t);
  }, [hintOpen]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setHintOpen(false);
    if (!userOff && !audio.paused && !audio.muted) {
      audio.pause();
      setUserOff(true);
      localStorage.setItem(STORAGE_KEY, "1");
    } else {
      audio.muted = false;
      audio.play().catch(() => {});
      setUserOff(false);
      localStorage.setItem(STORAGE_KEY, "0");
    }
  }, [userOff]);

  const isLoading = loading && !userOff && !audible;
  const showBubble = hintOpen || hovered;
  const bubbleText = userOff
    ? "Music off — tap to play"
    : isLoading
      ? "Loading music…"
      : audible
        ? "Music on — tap to mute"
        : "Tap to play music";
  const label = audible ? "Mute background music" : "Play background music";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <div
        aria-hidden
        className={
          "max-w-[60vw] rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-soft transition-all duration-300 " +
          (showBubble ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-2 opacity-0")
        }
      >
        {bubbleText}
      </div>

      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {audible && (
          <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center" aria-hidden>
            <span className="ld-note absolute text-lg text-accent" style={{ "--nx": "-16px", animationDelay: "0s" } as React.CSSProperties}>♪</span>
            <span className="ld-note absolute text-xl text-primary" style={{ "--nx": "12px", animationDelay: "0.55s" } as React.CSSProperties}>♫</span>
            <span className="ld-note absolute text-base text-accent" style={{ "--nx": "2px", animationDelay: "1.15s" } as React.CSSProperties}>♩</span>
          </div>
        )}
        <button
          type="button"
          onClick={toggle}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          aria-label={label}
          aria-pressed={audible}
          title={label}
          className="relative grid size-14 place-items-center rounded-full bg-cta text-cta-foreground shadow-soft transition hover:bg-cta-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {isLoading ? (
            <Loader2 className="size-6 animate-spin" />
          ) : userOff || !audible ? (
            userOff ? <VolumeX className="size-6" /> : <Music className="size-6" />
          ) : (
            <Music className="size-6 ld-spin-slow" />
          )}
        </button>
      </div>
    </div>
  );
}
