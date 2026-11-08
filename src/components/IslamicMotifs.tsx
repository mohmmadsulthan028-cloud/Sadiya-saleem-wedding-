import React from 'react';

export const BismillahCalligraphy: React.FC<{ className?: string }> = ({ className = 'h-16' }) => (
  <div className={`flex flex-col items-center justify-center ${className}`}>
    <span
      className="font-arabic text-3xl md:text-5xl lg:text-6xl text-[#996515] leading-relaxed tracking-wider select-none"
      dir="rtl"
      style={{
        textShadow: '0 2px 10px rgba(197, 160, 89, 0.25)',
      }}
    >
      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
    </span>
  </div>
);

export const ArabesqueDivider: React.FC<{ className?: string }> = ({ className = 'w-64 my-4' }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059] to-[#8C6212] opacity-60" />
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#C5A059] shrink-0">
      <path
        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
        fill="currentColor"
        opacity="0.85"
      />
      <circle cx="12" cy="12" r="2.5" fill="#FAF7F2" stroke="currentColor" strokeWidth="0.75" />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C5A059] to-[#8C6212] opacity-60" />
  </div>
);

export const CrescentMoonStar: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`text-[#C5A059] ${className}`}
  >
    <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C14.83 21 17.36 19.69 19 17.65C14.7 17.15 11.35 13.52 11.35 9.07C11.35 6.47 12.63 4.17 14.6 2.76C13.78 2.27 12.91 2 12 2V3Z" />
    <polygon points="18,3.5 19,6 21.5,6.5 19.5,8.2 20.2,10.7 18,9.3 15.8,10.7 16.5,8.2 14.5,6.5 17,6" fill="currentColor" />
  </svg>
);

export const HangingLantern: React.FC<{ className?: string }> = ({ className = 'w-8 h-20' }) => (
  <svg viewBox="0 0 40 100" fill="none" className={`text-[#C5A059] ${className}`}>
    <line x1="20" y1="0" x2="20" y2="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
    <circle cx="20" cy="35" r="3" fill="currentColor" />
    <path d="M10 42 C10 40, 30 40, 30 42 L28 47 L12 47 Z" fill="currentColor" />
    <path d="M12 47 L28 47 L33 65 L20 80 L7 65 Z" fill="#FDFBF7" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="20" cy="62" r="5" fill="#FFEAA7" opacity="0.9" />
    <circle cx="20" cy="62" r="8" fill="#F39C12" opacity="0.25" />
    <path d="M20 80 L20 88" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="20" cy="90" r="2" fill="currentColor" />
  </svg>
);

export const FloralCorner: React.FC<{
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position = 'top-left', className = 'w-24 h-24' }) => {
  const rotation = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }[position];

  return (
    <div className={`pointer-events-none select-none text-[#C5A059] opacity-75 ${rotation} ${className}`}>
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        {/* Outer border curve */}
        <path d="M5 95 L5 20 C5 11.7 11.7 5 20 5 L95 5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 95 L12 25 C12 17.8 17.8 12 25 12 L95 12" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        {/* Floral sprigs */}
        <path d="M5 5 C25 25, 45 10, 55 25 C40 30, 25 45, 5 5" fill="currentColor" opacity="0.2" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
        <path d="M20 20 Q35 15 42 22 Q35 30 20 20" fill="currentColor" opacity="0.3" />
        <circle cx="48" cy="24" r="2" fill="currentColor" />
        <circle cx="24" cy="48" r="2" fill="currentColor" />
      </svg>
    </div>
  );
};

export const FloatingPetals: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20 select-none">
      {[...Array(14)].map((_, i) => {
        const left = (i * 7.5 + 3) % 96;
        const delay = (i * 1.3) % 7;
        const duration = 12 + (i % 6) * 3;
        const size = 12 + (i % 4) * 4;
        return (
          <div
            key={i}
            className="absolute top-[-40px] opacity-40 animate-float-slow"
            style={{
              left: `${left}%`,
              animation: `petalFall ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8 6 6 12 12 22C18 12 16 6 12 2Z"
                fill="#D4B989"
                opacity={0.45}
                transform={`rotate(${i * 25} 12 12)`}
              />
            </svg>
          </div>
        );
      })}
      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(40px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
