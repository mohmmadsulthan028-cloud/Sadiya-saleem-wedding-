import React from 'react';
import { WeddingData } from '../types.ts';
import { BismillahCalligraphy, FloralCorner, ArabesqueDivider, CrescentMoonStar } from './IslamicMotifs.tsx';
import { Calendar, Heart, ArrowDown, CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  weddingData: WeddingData;
  onExploreClick: () => void;
  onRsvpClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  weddingData,
  onExploreClick,
  onRsvpClick,
}) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background soft glow and subtle Islamic pattern */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E5C378]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Luxury Wedding Invitation Card Container */}
      <div className="relative w-full max-w-3xl mx-auto bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EEDB] rounded-[2.5rem] sm:rounded-[3.5rem] p-8 sm:p-14 lg:p-16 border-2 border-[#D4B989]/70 shadow-2xl gold-border-glow text-center">
        {/* Four intricate ornamental gold corners */}
        <FloralCorner position="top-left" className="absolute top-3 left-3 w-16 h-16 sm:w-24 sm:h-24" />
        <FloralCorner position="top-right" className="absolute top-3 right-3 w-16 h-16 sm:w-24 sm:h-24" />
        <FloralCorner position="bottom-left" className="absolute bottom-3 left-3 w-16 h-16 sm:w-24 sm:h-24" />
        <FloralCorner position="bottom-right" className="absolute bottom-3 right-3 w-16 h-16 sm:w-24 sm:h-24" />

        {/* Decorative crescent icon */}
        <div className="flex justify-center mb-3">
          <CrescentMoonStar size={36} className="text-[#C5A059] animate-pulse-glow" />
        </div>

        {/* Bismillah Calligraphy */}
        <div className="mb-2">
          <span
            className="font-arabic text-3xl sm:text-5xl lg:text-6xl text-[#8C6212] tracking-wide block select-none"
            dir="rtl"
            style={{ textShadow: '0 2px 12px rgba(197, 160, 89, 0.25)' }}
          >
            {weddingData.islamicGreetingArabic}
          </span>
          <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#A07A38] font-medium mt-1">
            {weddingData.islamicGreetingEnglish}
          </p>
        </div>

        {/* With the blessings of Almighty Allah */}
        <div className="my-4">
          <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#6B502A] font-semibold">
            WITH THE BLESSINGS OF ALMIGHTY ALLAH
          </p>
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wider text-[#3D2C17] uppercase mt-1">
            {weddingData.invitationFrom}
          </h3>
          <p className="font-serif-luxury italic text-sm sm:text-base text-[#785E39] mt-0.5">
            CORDIALLY INVITE YOU TO CELEBRATE THE WEDDING OF
          </p>
        </div>

        <ArabesqueDivider className="w-48 sm:w-64 mx-auto my-3" />

        {/* Couple Names Card - Groom First, Bride Second */}
        <div className="my-5 py-4 px-6 sm:px-10 rounded-3xl bg-white/70 backdrop-blur-sm border border-[#D4B989]/40 shadow-sm max-w-xl mx-auto">
          {/* Groom: ABDUL SALEEM */}
          <div className="relative">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#A07A38] font-semibold mb-1">
              Groom
            </p>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#2B231A] gold-gradient-text">
              {weddingData.groomName}
            </h1>
          </div>

          {/* Golden Ampersand */}
          <div className="my-2 sm:my-3 flex items-center justify-center gap-4">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#C5A059]" />
            <span className="font-serif-luxury text-3xl sm:text-4xl italic text-[#B8860B] font-semibold px-2">
              &amp;
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#C5A059]" />
          </div>

          {/* Bride: SADIYA */}
          <div className="relative">
            <h2 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#2B231A] gold-gradient-text">
              {weddingData.brideName}
            </h2>
            <p className="text-xs sm:text-sm font-serif-luxury italic text-[#785E39] mt-1.5">
              Daughter of {weddingData.brideFather}
            </p>
          </div>
        </div>

        {/* Wedding Tagline */}
        <p className="font-serif-luxury italic text-lg sm:text-2xl text-[#6B502A] my-4">
          &ldquo;{weddingData.tagline}&rdquo;
        </p>

        {/* Event Dates strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto my-6 text-left">
          {/* Manja Date */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-[#E5C378]/60 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FBF4E4] border border-[#D4B989]/50 flex items-center justify-center text-[#996515] shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] tracking-wider uppercase font-semibold text-[#8C6212]">
                MANJA CEREMONY
              </p>
              <p className="font-serif-luxury text-base font-bold text-[#2B231A]">
                3 JANUARY 2027
              </p>
            </div>
          </div>

          {/* Nikah Date */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-[#A3B899]/60 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#EBF2E7] border border-[#A3B899]/50 flex items-center justify-center text-[#4B6B40] shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] tracking-wider uppercase font-semibold text-[#4B6B40]">
                WEDDING / NIKAH
              </p>
              <p className="font-serif-luxury text-base font-bold text-[#2B231A]">
                4 JANUARY 2027
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons: EXPLORE INVITATION & RSVP NOW */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#8C6212]/40 bg-white/90 hover:bg-white text-[#5B3E08] font-semibold text-xs sm:text-sm tracking-widest uppercase shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Explore Invitation</span>
            <ArrowDown className="w-4 h-4 text-[#8C6212]" />
          </button>

          <button
            onClick={onRsvpClick}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C5A059] via-[#E5C378] to-[#996515] hover:from-[#D4B989] hover:to-[#8C6212] text-[#241A0B] font-semibold text-xs sm:text-sm tracking-widest uppercase shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-[#241A0B]" />
            <span>RSVP Now</span>
          </button>
        </div>
      </div>
    </section>
  );
};
