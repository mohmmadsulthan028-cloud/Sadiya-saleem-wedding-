import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const currentProgress = Math.min(
              100,
              Math.max(0, (window.scrollY / totalHeight) * 100)
            );
            setScrollProgress(currentProgress);
          } else {
            setScrollProgress(0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check in case page is already scrolled
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none overflow-hidden bg-[#FAF7F2]/60"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#996515] via-[#E5C378] to-[#C5A059] transition-[width] duration-100 ease-out relative"
        style={{
          width: `${scrollProgress}%`,
          boxShadow: '0 0 10px rgba(229, 195, 120, 0.8), 0 0 3px rgba(184, 134, 11, 0.9)',
        }}
      >
        {/* Subtle glowing jewel head on the right edge */}
        {scrollProgress > 1 && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FFFDF9] shadow-[0_0_8px_rgba(255,255,255,1),0_0_4px_rgba(197,160,89,1)] opacity-90" />
        )}
      </div>
    </div>
  );
};
