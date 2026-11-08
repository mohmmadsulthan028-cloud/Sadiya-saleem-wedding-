import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WeddingData } from '../types.ts';
import { BismillahCalligraphy, CrescentMoonStar, FloralCorner, HangingLantern } from './IslamicMotifs.tsx';
import { Volume2, Sparkles, Heart } from 'lucide-react';

interface OpeningExperienceProps {
  weddingData: WeddingData;
  onOpen: () => void;
}

export const OpeningExperience: React.FC<OpeningExperienceProps> = ({ weddingData, onOpen }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Elegant choreographed timing
    const t1 = setTimeout(() => setStep(1), 300);   // Bismillah & arch
    const t2 = setTimeout(() => setStep(2), 900);   // Mohammad Subhan & Family
    const t3 = setTimeout(() => setStep(3), 1400);  // Groom ABDUL SALEEM
    const t4 = setTimeout(() => setStep(4), 1900);  // Bride SADIYA
    const t5 = setTimeout(() => setStep(5), 2400);  // Tagline & Button

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF7F2] overflow-y-auto px-4 py-8">
      {/* Background ambient Islamic geometry and floating stars */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-40 pointer-events-none" />

      {/* Floating lanterns in top corners */}
      <div className="absolute top-0 left-6 hidden sm:block opacity-70">
        <HangingLantern className="w-8 h-28" />
      </div>
      <div className="absolute top-0 right-6 hidden sm:block opacity-70">
        <HangingLantern className="w-8 h-28" />
      </div>

      {/* Skip button for immediate entry */}
      <button
        onClick={onOpen}
        className="absolute top-5 right-5 z-20 text-xs font-medium tracking-wider uppercase text-[#8C6212] hover:text-[#5B3E08] px-3 py-1.5 rounded-full border border-[#D4B989]/50 bg-white/70 backdrop-blur-sm shadow-sm transition-all duration-300"
      >
        Skip Intro &rarr;
      </button>

      {/* Central Luxury Card with Arch */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-xl mx-auto my-auto bg-gradient-to-b from-[#FFFDF9] via-[#FCF9F3] to-[#F8F3EA] rounded-[2.5rem] shadow-2xl p-6 sm:p-10 text-center border-2 border-[#D4B989]/60 gold-border-glow overflow-hidden"
      >
        {/* Four floral gold corners */}
        <FloralCorner position="top-left" className="absolute top-2 left-2 w-16 h-16 sm:w-20 sm:h-20" />
        <FloralCorner position="top-right" className="absolute top-2 right-2 w-16 h-16 sm:w-20 sm:h-20" />
        <FloralCorner position="bottom-left" className="absolute bottom-2 left-2 w-16 h-16 sm:w-20 sm:h-20" />
        <FloralCorner position="bottom-right" className="absolute bottom-2 right-2 w-16 h-16 sm:w-20 sm:h-20" />

        {/* Inner Arch Line Decoration */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Top Crescent & Stars */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : -10 }}
            transition={{ duration: 0.6 }}
            className="mb-2 flex items-center justify-center text-[#C5A059]"
          >
            <CrescentMoonStar size={34} />
          </motion.div>

          {/* Arabic Calligraphy: Bismillahir Rahmanir Raheem */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 10 }}
            transition={{ duration: 0.8 }}
            className="mb-2"
          >
            <span
              className="font-arabic text-2xl sm:text-4xl text-[#8C6212] tracking-wider block"
              dir="rtl"
            >
              {weddingData.islamicGreetingArabic}
            </span>
            <p className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#A07A38] mt-1 font-medium">
              {weddingData.islamicGreetingEnglish}
            </p>
          </motion.div>

          {/* Golden Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: step >= 1 ? 1 : 0 }}
            transition={{ duration: 0.7 }}
            className="w-48 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent my-3 opacity-75"
          />

          {/* Invitation From: Mohammad Subhan & Family */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 2 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#8C6212] font-semibold">
              {weddingData.invitationFrom}
            </p>
            <p className="text-[11px] sm:text-xs tracking-wider text-[#735A38] font-normal italic mt-0.5">
              cordially invite you to celebrate the joyous union of
            </p>
          </motion.div>

          {/* Groom & Bride Names - GROOM FIRST, BRIDE SECOND */}
          <div className="my-2 sm:my-3 py-2 px-4 rounded-2xl bg-[#FFFDF9]/60 border border-[#D4B989]/30 w-full max-w-md">
            {/* Groom Name: ABDUL SALEEM */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 15 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold tracking-wide text-[#2B231A] gold-gradient-text">
                {weddingData.groomName}
              </h2>
            </motion.div>

            {/* Elegant Ampersand */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: step >= 4 ? 1 : 0, rotate: step >= 4 ? 0 : -20 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="my-1 flex items-center justify-center gap-3"
            >
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#C5A059]" />
              <span className="font-serif-luxury text-2xl sm:text-3xl italic text-[#B8860B] font-medium">
                &
              </span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#C5A059]" />
            </motion.div>

            {/* Bride Name: SADIYA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 15 }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold tracking-wide text-[#2B231A] gold-gradient-text">
                {weddingData.brideName}
              </h2>
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: step >= 5 ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif-luxury italic text-base sm:text-xl text-[#785E39] my-2"
          >
            &ldquo;{weddingData.tagline}&rdquo;
          </motion.p>

          {/* Events Summary Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: step >= 5 ? 1 : 0, y: step >= 5 ? 0 : 10 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#5B4628] font-medium mt-1 mb-6"
          >
            <span className="px-3 py-1 rounded-full bg-[#F5EEDB] border border-[#D4B989]/50">
              Manja · 3 Jan 2027
            </span>
            <span className="text-[#C5A059] font-bold">·</span>
            <span className="px-3 py-1 rounded-full bg-[#EBF0E6] border border-[#A3B899]/50 text-[#3C5135]">
              Nikah · 4 Jan 2027
            </span>
          </motion.div>

          {/* OPEN YOUR INVITATION Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: step >= 5 ? 1 : 0, scale: step >= 5 ? 1 : 0.9 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.4 }}
            onClick={onOpen}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#C5A059] via-[#E5C378] to-[#996515] text-[#241A0B] font-semibold text-sm sm:text-base tracking-widest uppercase shadow-lg hover:shadow-2xl hover:shadow-[#C5A059]/40 transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Sparkles className="w-5 h-5 text-[#241A0B] animate-pulse" />
            <span className="font-serif-luxury font-bold tracking-wider text-[#241A0B]">
              OPEN YOUR INVITATION
            </span>
            <Volume2 className="w-4 h-4 text-[#241A0B]/80 group-hover:scale-110 transition-transform" />
          </motion.button>

          <p className="text-[11px] text-[#8C6212]/75 mt-3 flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-[#8C6212]" />
            Includes background wedding music &middot; Shukran Allah
          </p>
        </div>
      </motion.div>
    </div>
  );
};
