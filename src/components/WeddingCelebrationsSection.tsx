import React from 'react';
import { WeddingEvent } from '../types.ts';
import { ArabesqueDivider, FloralCorner, HangingLantern } from './IslamicMotifs.tsx';
import { Calendar, Clock, MapPin, Sparkles, Navigation, Bookmark, Heart } from 'lucide-react';

interface WeddingCelebrationsSectionProps {
  events: WeddingEvent[];
}

export const WeddingCelebrationsSection: React.FC<WeddingCelebrationsSectionProps> = ({ events }) => {
  const getGoogleCalendarUrl = (event: WeddingEvent) => {
    // Manja: 20270103, Nikah: 20270104
    const isManja = event.id === 'manja';
    const dates = isManja ? '20270103T053000Z/20270103T163000Z' : '20270104T053000Z/20270104T163000Z';
    const title = encodeURIComponent(`${event.title} - Abdul Saleem & Sadiya`);
    const details = encodeURIComponent(`${event.description}\n\nVenue: ${event.venue}\nDress Code: ${event.dressCode}`);
    const location = encodeURIComponent(`${event.venue}, ${event.address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  return (
    <section id="celebrations" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF7F2] relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EEDB] border border-[#D4B989]/50 text-xs font-semibold tracking-widest uppercase text-[#8C6212] mb-3">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Itinerary</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#2B231A] tracking-tight">
            Two Beautiful Celebrations
          </h2>

          <p className="font-serif-luxury italic text-base sm:text-lg text-[#6B502A] mt-2">
            Join us as we celebrate happiness, love, family, and blessings.
          </p>

          <ArabesqueDivider className="w-48 mx-auto my-4" />
        </div>

        {/* Exactly TWO Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {events.map((evt, idx) => {
            const isManja = evt.id === 'manja';

            return (
              <div
                key={evt.id}
                className={`relative rounded-[2.5rem] p-8 sm:p-10 shadow-xl border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isManja
                    ? 'bg-gradient-to-b from-[#FFFDF2] via-[#FAF6E6] to-[#F5EED2] border-[#E8D499]/80 hover:border-[#D4B989]'
                    : 'bg-gradient-to-b from-[#FBFDF9] via-[#F4F8F0] to-[#EAF2E5] border-[#B9CCA9]/80 hover:border-[#8FA87D]'
                }`}
              >
                {/* Decorative Floral Corner */}
                <FloralCorner
                  position="top-right"
                  className={`absolute top-2 right-2 w-20 h-20 ${isManja ? 'text-[#D4B989]' : 'text-[#8FA87D]'}`}
                />

                <div>
                  {/* Event Order & Theme Badge */}
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span
                      className={`text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full ${
                        isManja
                          ? 'bg-[#FAF0D0] text-[#8C6212] border border-[#D4B989]/50'
                          : 'bg-[#E3EFE0] text-[#3B5433] border border-[#A3B899]/50'
                      }`}
                    >
                      {isManja ? 'Pre-Wedding Celebration' : 'The Sacred Union'}
                    </span>
                    <span className="font-serif-luxury italic text-sm text-[#785E39]">
                      Event {idx + 1} of 2
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif-luxury text-2xl sm:text-4xl font-bold text-[#2B231A] tracking-wide mb-3">
                    {evt.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-[#4F3F2C] leading-relaxed mb-6 font-normal whitespace-pre-line">
                    {evt.description}
                  </p>

                  {/* Key Metadata Details */}
                  <div className="space-y-4 pt-4 border-t border-[#D4B989]/30 text-sm">
                    {/* Date */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-white/80 border border-[#D4B989]/40 flex items-center justify-center text-[#8C6212] shrink-0 mt-0.5">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] tracking-wider uppercase font-semibold text-[#8C6212]">
                          Date
                        </p>
                        <p className="font-serif-luxury text-base font-bold text-[#2B231A]">
                          {evt.date}
                        </p>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-white/80 border border-[#D4B989]/40 flex items-center justify-center text-[#8C6212] shrink-0 mt-0.5">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] tracking-wider uppercase font-semibold text-[#8C6212]">
                          Time
                        </p>
                        <p className="text-sm font-semibold text-[#2B231A]">
                          {evt.time}
                        </p>
                      </div>
                    </div>

                    {/* Venue & Address */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-white/80 border border-[#D4B989]/40 flex items-center justify-center text-[#8C6212] shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] tracking-wider uppercase font-semibold text-[#8C6212]">
                          Venue
                        </p>
                        <p className="font-serif-luxury text-base font-bold text-[#2B231A]">
                          {evt.venue}
                        </p>
                        <p className="text-xs text-[#5C4B37] mt-1 leading-relaxed">
                          {evt.address}
                        </p>
                      </div>
                    </div>

                    {/* Dress Code */}
                    <div className="flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xl bg-white/80 border border-[#D4B989]/40 flex items-center justify-center text-[#8C6212] shrink-0 mt-0.5">
                        <Bookmark className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] tracking-wider uppercase font-semibold text-[#8C6212]">
                          Dress Code
                        </p>
                        <p className="text-xs font-medium text-[#3D2C17]">
                          {evt.dressCode}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Buttons: GET DIRECTIONS & ADD TO CALENDAR */}
                <div className="mt-8 pt-5 border-t border-[#D4B989]/30 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={evt.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3 px-5 rounded-full bg-gradient-to-r from-[#C5A059] to-[#996515] hover:from-[#D4B989] hover:to-[#8C6212] text-[#241A0B] text-xs font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-center"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#241A0B]" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={getGoogleCalendarUrl(evt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3 px-4 rounded-full border border-[#D4B989]/60 bg-white/80 hover:bg-white text-[#5B3E08] text-xs font-medium tracking-wider transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#8C6212]" />
                    <span>Add to Calendar</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
