import React, { useState, useEffect } from 'react';
import { ArabesqueDivider } from './IslamicMotifs.tsx';
import { Calendar, Clock, Sparkles } from 'lucide-react';

interface LiveCountdownSectionProps {
  targetDate: string;
  countdownLabel?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export const LiveCountdownSection: React.FC<LiveCountdownSectionProps> = ({
  targetDate,
  countdownLabel = 'Date-only countdown (Nikah time to be announced)',
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const cards = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto text-center">
        {/* Subtle kicker */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C6212] mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>The Blessed Day Awaits</span>
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#2B231A] tracking-tight">
          Counting Down to Our Beautiful Beginning
        </h2>

        <p className="font-serif-luxury italic text-base sm:text-lg text-[#6B502A] mt-2">
          Monday, 4 January 2027 &middot; Wedding / Nikah
        </p>

        <ArabesqueDivider className="w-48 mx-auto my-5" />

        {/* Minimal Gold Countdown Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto my-8">
          {cards.map((item, index) => (
            <div
              key={index}
              className="relative p-5 sm:p-7 rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EC] border-2 border-[#D4B989]/50 shadow-md gold-border-glow hover:border-[#B8860B] transition-all duration-300"
            >
              {/* Corner accent */}
              <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#C5A059]" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t border-r border-[#C5A059]" />
              <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b border-l border-[#C5A059]" />
              <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#C5A059]" />

              <span className="font-serif-luxury text-4xl sm:text-6xl font-bold tracking-tight text-[#2B231A] tabular-nums block gold-gradient-text">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#8C6212] mt-2 block">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Important Date-Only Label Notice */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF0D9]/80 border border-[#D4B989]/60 text-xs text-[#6B502A] max-w-lg mx-auto">
          <Calendar className="w-3.5 h-3.5 text-[#996515] shrink-0" />
          <span className="font-medium">{countdownLabel}</span>
        </div>
      </div>
    </section>
  );
};
