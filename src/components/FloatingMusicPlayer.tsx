import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Music, Disc } from 'lucide-react';

interface FloatingMusicPlayerProps {
  audioUrl: string;
  songTitle: string;
  autoPlayTrigger?: boolean;
}

export const FloatingMusicPlayer: React.FC<FloatingMusicPlayerProps> = ({
  audioUrl,
  songTitle,
  autoPlayTrigger = false,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  // Play attempt on user open
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !hasInteracted) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 5000);
        })
        .catch((err) => {
          console.warn('Audio autoplay blocked by browser policy:', err);
        });
    }
  }, [autoPlayTrigger, hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setHasInteracted(true);
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
        })
        .catch((err) => {
          console.error('Play error:', err);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={audioUrl}
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      {/* Floating Widget at bottom-right */}
      <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex flex-col items-end">
        {/* Toast / Song info pill */}
        {showToast && (
          <div className="mb-2 px-3 py-1.5 rounded-xl bg-white/95 border border-[#D4B989]/60 shadow-lg backdrop-blur-sm text-xs font-serif-luxury text-[#5B3E08] animate-bounce flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-ping" />
            <span>Now Playing: <strong>{songTitle}</strong></span>
          </div>
        )}

        <div className="relative group">
          {/* Animated floating musical notes when playing */}
          {isPlaying && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none flex justify-center gap-2 text-[#C5A059]">
              <span className="text-base animate-bounce" style={{ animationDelay: '0.1s' }}>♪</span>
              <span className="text-sm animate-bounce" style={{ animationDelay: '0.4s' }}>♫</span>
              <span className="text-base animate-bounce" style={{ animationDelay: '0.7s' }}>♩</span>
            </div>
          )}

          {/* Main Circular Button */}
          <div className="flex items-center gap-2 bg-[#FFFDF9]/95 backdrop-blur-md p-1.5 pr-3 rounded-full border-2 border-[#D4B989] shadow-xl hover:shadow-2xl hover:border-[#B8860B] transition-all duration-300">
            {/* Rotating Circular Vinyl / Badge */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause wedding song' : 'Play our wedding song'}
              className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#996515] via-[#E5C378] to-[#C5A059] flex items-center justify-center text-white shadow-md focus:outline-none cursor-pointer"
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#2B231A] flex items-center justify-center text-[#E5C378] transition-transform ${
                  isPlaying ? 'animate-spin-slow' : ''
                }`}
              >
                {isPlaying ? (
                  <Disc className="w-5 h-5 text-[#E5C378]" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5 text-[#E5C378]" />
                )}
              </div>

              {/* Status Indicator */}
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-white border border-[#D4B989] flex items-center justify-center">
                {isPlaying ? (
                  <Pause className="w-2 h-2 text-[#8C6212] fill-current" />
                ) : (
                  <Play className="w-2 h-2 text-[#8C6212] fill-current ml-0.5" />
                )}
              </div>
            </button>

            {/* Song title & label */}
            <div className="flex flex-col text-left pl-1">
              <span className="text-[10px] uppercase tracking-wider text-[#8C6212] font-semibold leading-none">
                {isPlaying ? 'Wedding Song' : 'Play Our Wedding Song'}
              </span>
              <span className="text-xs font-serif-luxury font-bold text-[#2B231A] leading-tight flex items-center gap-1">
                {songTitle}
              </span>
            </div>

            {/* Mute / Unmute Button */}
            {isPlaying && (
              <button
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="p-1 rounded-full text-[#8C6212] hover:bg-[#F5EEDB] transition-colors ml-1"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
