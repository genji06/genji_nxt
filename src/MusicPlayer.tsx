import TrackItem from "./TrackItem.tsx";
import { useState, useRef } from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/outline";

import living from "./assets/musics/living.mp3";
import sanctuary from "./assets/musics/sanctuary.mp3";
import ilysb from "./assets/musics/ilysb.mp3";

import cover1 from "./assets/images/joji.jpg";
import cover2 from "./assets/images/1975.jpg";
import cover3 from "./assets/images/lany.jpg";


type Track = {
  title: string;
  artist: string;
  genre: string;
  gradient: string;
  notes: string;
  src: string;
  image: string;
};


export default function MusicPlayer(): React.ReactElement {

  const audioRef = useRef<HTMLAudioElement | null>(null);


  const tracks: Track[] = [
    {
      title: "Sanctuary",
      artist: "Joji",
      genre: "Alternative R&B",
      gradient: "from-sky-400 to-blue-600",
      src: sanctuary,
      notes: "Dreamy, warm, and nostalgic with a smooth electronic atmosphere that feels like a late-night journey.",
      image: cover1,
    },
    {
      title: "It's Not Living (If It's Not With You)",
      artist: "The 1975",
      genre: "Polished alt-pop",
      gradient: "from-sky-400 to-blue-600",
      src: living,
      notes: "A lively sound that balances happiness, sadness, and nostalgia perfectly.",
      image: cover2,
    },
    {
      title: "ILYSB",
      artist: "Lany",
      genre: "Dream Pop",
      gradient: "from-sky-400 to-blue-600",
      src: ilysb,
      notes: "A dreamy, mellow love song about deep affection, longing, and being emotionally attached to someone.",
      image: cover3,
    },
  ];


  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);



  const displayIndex = currentIndex ?? 0;
  const displayTrack = tracks[displayIndex];



  function handlePlay(index: number): void {

    setCurrentIndex(index);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.src = tracks[index].src;
      audioRef.current.load();
    }

    setIsPlaying(false);
  }



  function togglePlay(): void {

    if (!audioRef.current) return;


    if (currentIndex === null) {

      setCurrentIndex(0);

      audioRef.current.src = tracks[0].src;
      audioRef.current.load();

      return;
    }


    if (isPlaying) {

      audioRef.current.pause();
      setIsPlaying(false);

    } else {

      audioRef.current.play();
      setIsPlaying(true);

    }

  }



  function handleSeek(
    e: React.ChangeEvent<HTMLInputElement>
  ): void {

    const time = Number(e.target.value);

    setCurrentTime(time);


    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }

  }



  function formatTime(time: number): string {

    if (!time || Number.isNaN(time)) {
      return "0:00";
    }


    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");


    return `${minutes}:${seconds}`;

  }



  const progressPct =
    duration
      ? (currentTime / duration) * 100
      : 0;



  return (
    <div
      className="w-full max-w-xlmx-auto p-3 sm:p-5 rounded-2xl bg-white/5 backdrop-blur border border-white/10">

      <audio
        ref={audioRef}

        onTimeUpdate={(e) => {

          if (!isSeeking) {
            setCurrentTime(
              e.currentTarget.currentTime
            );
          }
        }}

        onLoadedMetadata={(e) => {
          setDuration(
            e.currentTarget.duration
          );
        }}

        onEnded={() => {
          setIsPlaying(false);
        }}
      />

      {/* REST OF YOUR JSX REMAINS THE SAME */}
            {/* TOP SECTION */}
      <div
        className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 mb-5 sm:mb-6">


        {/* ARTWORK */}
        <div
          className={`relative w-full sm:w-28 aspect-square sm:aspect-auto sm:h-28 max-w-[9rem] sm:max-w-none shrink-0 rounded-2xl overflow-visible `}>
            
            {/* Album Image */}
            <img
              src={displayTrack.image}
              alt={displayTrack.title}
              className="absolute inset-0 w-full h-full object-cover rounded-2xl"/>

          {/* "Music" tag overlay */}
          <span
            className="absolute top-2 left-2 ext-[10px] font-medium tracking-wide uppercase text-white bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
            Music
          </span>

          {/* Vinyl */}
          <div className="absolute -bottom-5 -right-4 z-20">
            <div
              className="w-12 h-12 m:w-12 sm:h-12 rounded-full bg-black/70 border border-white/20 flex items-center justify-center vinyl-spin"
              style={{
                animationPlayState: isPlaying ? "running" : "paused",
              }}>
              <div className="absolute w-12 h-12 rounded-full border border-white/10" />
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center z-10">
                <span className="text-white text-xs">♫</span>
              </div>
            </div>
          </div>

          {/* Title overlay */}
          <div
            className="absolute bottom-0 inset-x-0  px-2.5 pb-2 pt-6 bg-gradient-to-t from-black/70 to-transparent rounded-2xl">
            <p className="text-white text-xs font-semibold truncate">
              {displayTrack.title}
            </p>
            <p className="text-white/70 text-[10px] uppercase tracking-wide truncate">
              {displayTrack.artist}
            </p>
          </div>
        </div>

        {/* NOTES */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3">
            <span className="text-xs px-3 py-1 rounded-full bg-white/10">
              Live Audio
            </span>

            <span className="text-xs px-3 py-1 rounded-full bg-white/10">
              {displayTrack.genre}
            </span>
          </div>

          <p className="text-xs tracking-[0.25em] text-white/40 mb-2">
            LISTENING NOTES
          </p>

          <p className="text-sm text-white/80">
            {displayTrack.notes}
          </p>
        </div>
      </div>

      {/* PLAYER CONTROL */}
      <div
        className="p-3 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-5">
        <p className="text-xs tracking-widest text-white/60">
          {isPlaying ? "NOW PLAYING" : "PRESS TO PLAY"}
        </p>

        <p className="text-sm text-white mt-2 truncate">
          {displayTrack.title}
        </p>
        <p className="text-xs text-white/50 truncate">
          {displayTrack.artist} • {displayTrack.genre}
        </p>

        {/* PLAYER ROW */}
        <div className="flex items-center gap-3 mt-4">


          {/* Play Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition
              ${
                isPlaying
                  ? "bg-blue-500/20 text-blue-200 ring-1 ring-blue-400/40"
                  : "bg-white/10 text-white hover:bg-white/20"
              }
            `}
          >
            {isPlaying ? <PauseIcon className="w-4 h-4"/> : <PlayIcon className="w-4 h-4"/>}
          </button>

          {/* Progress + Time */}
          <div className="flex-1 min-w-0">
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onPointerDown={() => setIsSeeking(true)}
              onPointerUp={() => setIsSeeking(false)}
              onChange={handleSeek}
              disabled={currentIndex === null}
              aria-label="Seek"
              style={{
                background:  `linear-gradient(to right, rgb(59 130 246) ${progressPct}%, rgba(255,255,255,0.1) ${progressPct}%)`,
              }}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer disabled:cursor-default [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-400 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(251,113,133,0.6)] [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-400 [&::-moz-range-thumb]:border-0"/>

            <div className="flex justify-between text-xs text-white/40 mt-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* TRACK LIST */}
      <div className="space-y-2.5 sm:space-y-3">
        {tracks.map((track, index) => (
          <TrackItem
            key={index}
            track={track}
            onPlay={() => handlePlay(index)}
            active={displayIndex === index}
          />
        ))}
      </div>
    </div>
  );
}