import React, { useState } from 'react';
import { WeddingData } from '../types.ts';
import { ArabesqueDivider, FloralCorner } from './IslamicMotifs.tsx';
import { MapPin, Navigation, Copy, Check, Car, ExternalLink } from 'lucide-react';

interface VenueAndGoogleMapsSectionProps {
  weddingData: WeddingData;
}

export const VenueAndGoogleMapsSection: React.FC<VenueAndGoogleMapsSectionProps> = ({ weddingData }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const venues = [
    {
      id: 'venue-manja',
      name: 'G SUBHAN PALACE (OUR RESIDENCE)',
      event: 'Manja Ceremony – 3 January 2027',
      address:
        'Beside HP Petrol Pump, Opposite Aditya Hospital, Hyderabad Road, Pregnapur, Gajwel, Siddipet District, Telangana – 502278.',
      parking: weddingData.parkingInfoManja,
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=G+Subhan+Palace+Beside+HP+Petrol+Pump+Opposite+Aditya+Hospital+Hyderabad+Road+Pregnapur+Gajwel+Siddipet+District+Telangana+502278',
      embedQuery: 'Beside+HP+Petrol+Pump+Opposite+Aditya+Hospital+Hyderabad+Road+Pregnapur+Gajwel+Telangana+502278',
      themeBadge: 'Manja Ceremony Venue',
    },
    {
      id: 'venue-nikah',
      name: 'TYR GARDEN',
      event: 'Wedding / Nikah – 4 January 2027',
      address:
        'Beside Balaji Electronics, Gajwel – Pragnapur Road, Gajwel, Siddipet District, Telangana – 502278.',
      parking: weddingData.parkingInfoNikah,
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=TYR+Garden+Beside+Balaji+Electronics+Gajwel+Pragnapur+Road+Gajwel+Siddipet+District+Telangana+502278',
      embedQuery: 'TYR+Garden+Beside+Balaji+Electronics+Gajwel+Pragnapur+Road+Gajwel+Telangana+502278',
      themeBadge: 'Wedding & Nikah Venue',
    },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="venues" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FDFBF7]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C6212] mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Locations &amp; Directions</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#2B231A] tracking-tight">
            Find Your Way to Our Celebrations
          </h2>

          <p className="font-serif-luxury italic text-base sm:text-lg text-[#6B502A] mt-2">
            We eagerly await your gracious arrival and warm presence.
          </p>

          <ArabesqueDivider className="w-48 mx-auto my-4" />
        </div>

        {/* Two Venue Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EC] rounded-[2.5rem] p-6 sm:p-9 border border-[#D4B989]/60 shadow-xl gold-border-glow flex flex-col justify-between"
            >
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0D0] text-[#8C6212] text-xs font-semibold tracking-wider uppercase mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{venue.themeBadge}</span>
                </div>

                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2B231A] tracking-wide mb-1">
                  {venue.name}
                </h3>

                <p className="font-serif-luxury italic text-sm sm:text-base text-[#785E39] mb-4">
                  {venue.event}
                </p>

                {/* Complete Address Card */}
                <div className="p-4 rounded-2xl bg-white/90 border border-[#D4B989]/30 text-sm mb-5 shadow-sm">
                  <p className="text-[10px] tracking-wider uppercase font-semibold text-[#8C6212] mb-1">
                    Complete Address
                  </p>
                  <p className="text-sm text-[#3D2C17] leading-relaxed">
                    {venue.address}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(venue.id, `${venue.name}\n${venue.address}`)}
                      className="inline-flex items-center gap-1.5 text-xs text-[#8C6212] hover:text-[#5B3E08] font-medium transition-colors"
                    >
                      {copiedId === venue.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Address Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Embedded Responsive Map */}
                <div className="relative w-full h-52 sm:h-64 rounded-2xl overflow-hidden border border-[#D4B989]/40 shadow-inner mb-5">
                  <iframe
                    title={`Map of ${venue.name}`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${venue.embedQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full filter saturate-90 contrast-95"
                  />
                </div>

                {/* Parking Information Section */}
                {venue.parking && (
                  <div className="p-3.5 rounded-xl bg-[#F5EEDB]/60 border border-[#D4B989]/40 flex items-start gap-2.5 text-xs text-[#5C4524] mb-5">
                    <Car className="w-4 h-4 text-[#8C6212] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold uppercase tracking-wider text-[10px] text-[#8C6212] block">
                        Parking Information
                      </span>
                      <span>{venue.parking}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Get Directions Button */}
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#C5A059] to-[#996515] hover:from-[#D4B989] hover:to-[#8C6212] text-[#241A0B] text-xs font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-center"
              >
                <Navigation className="w-4 h-4 text-[#241A0B]" />
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#241A0B]/80" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
