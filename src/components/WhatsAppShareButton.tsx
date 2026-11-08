import React from 'react';
import { Share2, MessageCircle } from 'lucide-react';

interface WhatsAppShareButtonProps {
  message: string;
  className?: string;
  variant?: 'floating' | 'banner';
}

export const WhatsAppShareButton: React.FC<WhatsAppShareButtonProps> = ({
  message,
  className = '',
  variant = 'floating',
}) => {
  const handleShare = () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    const fullMessage = `${message}\n\n🔗 View Online Invitation: ${currentUrl}`;
    const encoded = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  if (variant === 'banner') {
    return (
      <div className={`p-6 rounded-3xl bg-gradient-to-r from-[#25D366]/10 via-[#FFFDF9] to-[#D4B989]/10 border border-[#25D366]/30 text-center ${className}`}>
        <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#2B231A]">
          Share With Family &amp; Friends
        </h3>
        <p className="text-xs sm:text-sm text-[#5C4524] max-w-md mx-auto my-2">
          Spread the blessed news! Send this digital wedding invitation directly to relatives via WhatsApp.
        </p>
        <button
          onClick={handleShare}
          className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-semibold tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>SHARE THIS INVITATION</span>
        </button>
      </div>
    );
  }

  // Floating button
  return (
    <div className={`fixed bottom-5 left-5 sm:bottom-7 sm:left-7 z-30 ${className}`}>
      <button
        onClick={handleShare}
        aria-label="Share this invitation on WhatsApp"
        className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/60 cursor-pointer"
      >
        <MessageCircle className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
        <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap">
          Share Invitation
        </span>
      </button>
    </div>
  );
};
