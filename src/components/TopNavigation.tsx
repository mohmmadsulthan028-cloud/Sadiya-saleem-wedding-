import React, { useState } from 'react';
import { Lock, Menu, X, CalendarCheck, Heart } from 'lucide-react';

interface TopNavigationProps {
  onOpenAdmin: () => void;
  onOpenRsvp: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ onOpenAdmin, onOpenRsvp }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#D4B989]/30 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-wide text-[#2B231A] whitespace-nowrap shrink-0 hover:text-[#996515] transition-colors"
        >
          Abdul Saleem <span className="text-[#C5A059] italic font-normal">&amp;</span> Sadiya
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs lg:text-sm font-medium text-[#644D29]">
          <a
            href="#celebrations"
            className="hover:text-[#996515] transition-colors whitespace-nowrap shrink-0 tracking-wider uppercase text-[11px]"
          >
            Celebrations
          </a>
          <a
            href="#countdown"
            className="hover:text-[#996515] transition-colors whitespace-nowrap shrink-0 tracking-wider uppercase text-[11px]"
          >
            Countdown
          </a>
          <a
            href="#venues"
            className="hover:text-[#996515] transition-colors whitespace-nowrap shrink-0 tracking-wider uppercase text-[11px]"
          >
            Venues &amp; Maps
          </a>
          <a
            href="#moments"
            className="hover:text-[#996515] transition-colors whitespace-nowrap shrink-0 tracking-wider uppercase text-[11px]"
          >
            Moments
          </a>
          <a
            href="#rsvp"
            className="hover:text-[#996515] transition-colors whitespace-nowrap shrink-0 tracking-wider uppercase text-[11px]"
          >
            RSVP
          </a>
        </nav>

        {/* Zone 3: 1 primary action + discreet admin key */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenRsvp}
            className="px-4 sm:px-5 py-2 text-xs font-semibold tracking-wider uppercase text-[#2B231A] bg-gradient-to-r from-[#D4B989] to-[#C5A059] hover:from-[#E5C378] hover:to-[#B8860B] rounded-full shadow-sm hover:shadow transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            RSVP Now
          </button>

          <button
            onClick={onOpenAdmin}
            aria-label="Admin Dashboard"
            title="Admin Login"
            className="p-2 text-[#8C6212]/70 hover:text-[#5B3E08] hover:bg-[#F0E6D2] rounded-full transition-colors cursor-pointer"
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#644D29] hover:text-[#2B231A]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#D4B989]/30 bg-[#FFFDF9] px-6 py-4 space-y-3">
          <a
            href="#celebrations"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#5B3E08] py-1 uppercase tracking-wider"
          >
            Celebrations (Manja &amp; Nikah)
          </a>
          <a
            href="#countdown"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#5B3E08] py-1 uppercase tracking-wider"
          >
            Live Countdown
          </a>
          <a
            href="#venues"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#5B3E08] py-1 uppercase tracking-wider"
          >
            Venues &amp; Directions
          </a>
          <a
            href="#moments"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#5B3E08] py-1 uppercase tracking-wider"
          >
            Photo Gallery
          </a>
          <a
            href="#rsvp"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#5B3E08] py-1 uppercase tracking-wider"
          >
            RSVP Attendance
          </a>
        </div>
      )}
    </header>
  );
};
