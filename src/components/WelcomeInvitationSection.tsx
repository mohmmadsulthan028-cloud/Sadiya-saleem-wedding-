import React from 'react';
import { WeddingData } from '../types.ts';
import { ArabesqueDivider, FloralCorner, HangingLantern } from './IslamicMotifs.tsx';
import { Heart, Sparkles } from 'lucide-react';

interface WelcomeInvitationSectionProps {
  weddingData: WeddingData;
}

export const WelcomeInvitationSection: React.FC<WelcomeInvitationSectionProps> = ({ weddingData }) => {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF7F2]">
      {/* Decorative background geometry */}
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EC] rounded-3xl sm:rounded-[3rem] p-8 sm:p-14 border border-[#D4B989]/50 shadow-xl gold-border-glow text-center overflow-hidden">
          {/* Floral Corners */}
          <FloralCorner position="top-left" className="absolute top-2 left-2 w-16 h-16 sm:w-20 sm:h-20" />
          <FloralCorner position="top-right" className="absolute top-2 right-2 w-16 h-16 sm:w-20 sm:h-20" />
          <FloralCorner position="bottom-left" className="absolute bottom-2 left-2 w-16 h-16 sm:w-20 sm:h-20" />
          <FloralCorner position="bottom-right" className="absolute bottom-2 right-2 w-16 h-16 sm:w-20 sm:h-20" />

          {/* Section Kicker */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#F5EEDB] border border-[#D4B989]/40 text-[#8C6212] text-xs font-semibold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Union</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#2B231A] tracking-tight mb-2">
            {weddingData.welcomeSubtitle}
          </h2>

          <ArabesqueDivider className="w-56 mx-auto my-4" />

          {/* Alhamdulillah Callout */}
          <div className="my-4">
            <span
              className="font-arabic text-3xl sm:text-4xl text-[#8C6212] block mb-2"
              dir="rtl"
            >
              الْحَمْدُ لِلَّهِ
            </span>
            <p className="font-serif-luxury text-xl sm:text-2xl italic font-semibold text-[#6B502A]">
              Alhamdulillah!
            </p>
          </div>

          {/* Invitation Prose */}
          <div className="max-w-2xl mx-auto text-[#4A3B29] text-base sm:text-lg leading-relaxed font-normal my-6 space-y-4">
            <p>
              With the infinite blessings of Almighty Allah, and with immense happiness and gratitude,
              we cordially invite you to join us in celebrating the wedding of our beloved family member.
            </p>

            {/* Couple names highlighted */}
            <div className="py-4 my-2">
              <p className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#2B231A] tracking-wider gold-gradient-text">
                {weddingData.groomName}
              </p>
              <p className="font-serif-luxury italic text-2xl text-[#C5A059] my-1">&amp;</p>
              <p className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#2B231A] tracking-wider gold-gradient-text">
                {weddingData.brideName}
              </p>
            </div>

            <p>
              Your gracious presence, love, and heartfelt duas will make this beautiful occasion even
              more memorable.
            </p>
            <p className="font-medium text-[#3D2C17]">
              We warmly welcome you and your family to share our happiness.
            </p>
          </div>

          {/* Signoff: MOHAMMAD SUBHAN & FAMILY */}
          <div className="mt-8 pt-6 border-t border-[#D4B989]/30 inline-block">
            <p className="text-[11px] tracking-[0.25em] uppercase text-[#8C6212] font-semibold">
              WARMLY HOSTED BY
            </p>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2B231A] tracking-wide mt-1">
              MOHAMMAD SUBHAN
            </h3>
            <p className="font-serif-luxury text-lg italic text-[#6B502A] tracking-widest uppercase">
              &amp; FAMILY
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
