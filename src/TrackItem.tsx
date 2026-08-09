import cover1 from "./assets/images/1975.jpg";
import type { KeyboardEvent } from "react";

interface Track {
  title: string;
  artist: string;
  genre: string;
  notes?: string;
  gradient?: string;
  src?: string;
  image: string;
}

interface TrackItemProps {
  track: Track;
  active: boolean;
  onPlay: () => void;
}

export default function TrackItem({
  track,
  active,
  onPlay,
}: TrackItemProps): React.ReactElement {
  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPlay();
    }
  }

  return (
    <div
      onClick={onPlay}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={`cursor-pointer flex items-center gap-2 p-2 rounded-xl border transition
        ${
          active
            ? "bg-blue-500/10 border-blue-400/30"
            : "bg-white/5 border-white/10 hover:bg-white/10"
        }
      `}
    >
      <div
        className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center">
        <img
          className="rounded-lg"
          src={track.image || cover1}
          alt={track.title}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm text-white truncate leading-tight">
          {track.title}
        </p>

        <p className="text-[11px] text-white/50 truncate leading-tight mt-0.5">
          {track.artist} • {track.genre}
        </p>
      </div>

      <span
        className={`shrink-0 whitespace-nowrap inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded-full 
          ${
            active
              ? "bg-blue-500/20 text-blue-200"
              : "bg-white/10 text-white/70"
          }
        `}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0
            ${active ? "bg-blue-400" : "bg-white/40"}
          `}
        />

        {active ? "Current" : "Ready"}
      </span>
    </div>
  );
}