import React, { useState } from 'react';
import { GalleryItem } from '../types.ts';
import { ArabesqueDivider } from './IslamicMotifs.tsx';
import { Camera, Eye, X, Upload, Sparkles, Heart } from 'lucide-react';

interface PhotoGallerySectionProps {
  galleryImages: GalleryItem[];
  onOpenAdmin: () => void;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({
  galleryImages,
  onOpenAdmin,
}) => {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  return (
    <section id="moments" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C6212] mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Memories &amp; Aesthetics</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#2B231A] tracking-tight">
            Moments of Love
          </h2>

          <p className="font-serif-luxury italic text-base sm:text-lg text-[#6B502A] mt-2">
            A celebration of elegance, Islamic heritage, and timeless grace.
          </p>

          <ArabesqueDivider className="w-48 mx-auto my-4" />
        </div>

        {/* 6 Arch-shaped Image Frames Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveImage(item)}
              className="group relative cursor-pointer bg-white rounded-[2rem] p-3 border-2 border-[#D4B989]/50 shadow-lg hover:shadow-2xl hover:border-[#B8860B] transition-all duration-300 flex flex-col"
            >
              {/* Arch Shaped Picture Frame */}
              <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-[#FAF6EE]">
                <img
                  src={item.imageUrl}
                  alt={item.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle scrim & hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <span className="text-white text-xs font-medium tracking-wide flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Photo</span>
                  </span>
                </div>
              </div>

              {/* Title & Category Below Frame */}
              <div className="px-2 pt-3 pb-1 text-center">
                <span className="text-[10px] uppercase tracking-wider text-[#8C6212] font-semibold block">
                  {item.category}
                </span>
                <h4 className="font-serif-luxury text-lg font-bold text-[#2B231A] mt-0.5 group-hover:text-[#996515] transition-colors">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Admin note & upload invitation banner */}
        <div className="mt-12 text-center p-6 rounded-3xl bg-white/70 border border-[#D4B989]/40 max-w-xl mx-auto shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="text-xs font-semibold text-[#3D2C17] uppercase tracking-wider">
              Family Photo Customization
            </p>
            <p className="text-xs text-[#785E39] mt-0.5">
              The host can upload and replace these aesthetic themes with personal photographs.
            </p>
          </div>
          <button
            onClick={onOpenAdmin}
            className="px-4 py-2 rounded-full border border-[#C5A059] bg-[#FAF0D9]/80 hover:bg-[#FAF0D9] text-[#6B502A] text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5 text-[#8C6212]" />
            <span>Manage Photos</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#FFFDF9] rounded-3xl p-4 sm:p-6 border-2 border-[#D4B989] shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#FAF5EC] text-[#5B3E08] hover:bg-[#F0E4CE] transition-colors"
              aria-label="Close photo view"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-2xl overflow-hidden max-h-[70vh] bg-black/5 flex items-center justify-center">
              <img
                src={activeImage.imageUrl}
                alt={activeImage.alt}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>

            <div className="mt-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8C6212]">
                {activeImage.category}
              </span>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#2B231A] mt-1">
                {activeImage.title}
              </h3>
              <p className="text-xs text-[#785E39] mt-1 italic">
                {activeImage.alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
