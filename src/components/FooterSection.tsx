import React from 'react';
import { WeddingData } from '../types.ts';
import { ArabesqueDivider, CrescentMoonStar, FloralCorner } from './IslamicMotifs.tsx';
import { Heart, Sparkles, Lock } from 'lucide-react';

interface FooterSectionProps {
  weddingData: WeddingData;
  onOpenAdmin: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ weddingData, onOpenAdmin }) => {
  return (
    <footer className="relative bg-[#F5EEDB] border-t-2 border-[#D4B989]/50 py-16 px-4 sm:px-6 text-center overflow-hidden">
      {/* Background Islamic pattern */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-20 pointer-events-none" />

      {/* Decorative Floral Corners */}
      <FloralCorner position="top-left" className="absolute top-2 left-2 w-20 h-20 text-[#D4B989] opacity-40" />
      <FloralCorner position="top-right" className="absolute top-2 right-2 w-20 h-20 text-[#D4B989] opacity-40" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Crescent */}
        <div className="flex justify-center mb-3 text-[#C5A059]">
          <CrescentMoonStar size={30} />
        </div>

        {/* Heading */}
        <p className="font-serif-luxury italic text-xl sm:text-2xl text-[#6B502A] mb-2">
          With Love, Blessings &amp; Duas
        </p>

        {/* Couple Names */}
        <div className="py-2">
          <h3 className="font-serif-luxury text-3xl sm:text-5xl font-bold tracking-wide text-[#2B231A] gold-gradient-text">
            {weddingData.groomName}
          </h3>
          <span className="font-serif-luxury text-2xl italic text-[#C5A059] my-1 inline-block">
            &amp;
          </span>
          <h3 className="font-serif-luxury text-3xl sm:text-5xl font-bold tracking-wide text-[#2B231A] gold-gradient-text">
            {weddingData.brideName}
          </h3>
        </div>

        <ArabesqueDivider className="w-48 mx-auto my-4" />

        {/* Hosted with love */}
        <p className="text-xs sm:text-sm uppercase tracking-widest text-[#785E39] font-medium">
          Hosted with love by{' '}
          <strong className="text-[#3D2C17] font-bold">{weddingData.invitationFrom}</strong>
        </p>

        {/* Final Dua */}
        <p className="font-serif-luxury italic text-base sm:text-lg text-[#5B4628] max-w-xl mx-auto my-4 leading-relaxed">
          &ldquo;{weddingData.footerMessage}&rdquo;
        </p>

        {/* Wedding Hashtag */}
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/70 border border-[#D4B989]/50 text-xs font-semibold tracking-wider text-[#8C6212] my-3">
          {weddingData.hashtag}
        </div>

        {/* Bottom copyright & admin access */}
        <div className="pt-8 mt-6 border-t border-[#D4B989]/30 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8C6212]/75 gap-3">
          <span>&copy; 2027 Mohammad Subhan &amp; Family. All rights reserved.</span>
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1 hover:text-[#5B3E08] transition-colors"
          >
            <Lock className="w-3 h-3" />
            <span>Admin Control Panel</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
