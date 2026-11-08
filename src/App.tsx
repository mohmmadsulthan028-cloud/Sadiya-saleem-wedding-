import React, { useState, useEffect } from 'react';
import { WeddingData } from './types.ts';
import { defaultWeddingData } from './defaultWeddingData.ts';
import { OpeningExperience } from './components/OpeningExperience.tsx';
import { TopNavigation } from './components/TopNavigation.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { WelcomeInvitationSection } from './components/WelcomeInvitationSection.tsx';
import { LiveCountdownSection } from './components/LiveCountdownSection.tsx';
import { WeddingCelebrationsSection } from './components/WeddingCelebrationsSection.tsx';
import { VenueAndGoogleMapsSection } from './components/VenueAndGoogleMapsSection.tsx';
import { PhotoGallerySection } from './components/PhotoGallerySection.tsx';
import { RSVPSection } from './components/RSVPSection.tsx';
import { FooterSection } from './components/FooterSection.tsx';
import { FloatingMusicPlayer } from './components/FloatingMusicPlayer.tsx';
import { WhatsAppShareButton } from './components/WhatsAppShareButton.tsx';
import { AdminDashboardModal } from './components/AdminDashboardModal.tsx';
import { FloatingPetals } from './components/IslamicMotifs.tsx';
import { ScrollProgressBar } from './components/ScrollProgressBar.tsx';

export default function App() {
  const [weddingData, setWeddingData] = useState<WeddingData>(defaultWeddingData);
  const [hasOpenedInvitation, setHasOpenedInvitation] = useState<boolean>(false);
  const [audioTrigger, setAudioTrigger] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Fetch live wedding data from backend
  const fetchWeddingData = async () => {
    try {
      const res = await fetch('/api/wedding-data');
      if (res.ok) {
        const data = await res.json();
        setWeddingData(data);
      }
    } catch (err) {
      console.warn('Using default wedding data:', err);
    }
  };

  useEffect(() => {
    fetchWeddingData();
  }, []);

  const handleOpenInvitation = () => {
    setHasOpenedInvitation(true);
    setAudioTrigger(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCelebrations = () => {
    const el = document.getElementById('celebrations');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToRsvp = () => {
    const el = document.getElementById('rsvp');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B231A] selection:bg-[#E5C378] selection:text-[#241A0B] relative">
      {/* Floating Petals Ambient Animation */}
      <FloatingPetals />

      {/* Opening Handcrafted Luxury Invitation Experience Screen */}
      {!hasOpenedInvitation ? (
        <OpeningExperience
          weddingData={weddingData}
          onOpen={handleOpenInvitation}
        />
      ) : (
        <div className="relative flex flex-col min-h-screen">
          {/* Thin, elegant gold-colored scroll progress bar at the very top */}
          <ScrollProgressBar />

          {/* Top Bar Contract Navigation */}
          <TopNavigation
            onOpenAdmin={() => setIsAdminOpen(true)}
            onOpenRsvp={scrollToRsvp}
          />

          {/* Main Website Sections */}
          <main className="flex-1">
            {/* 1. Hero Luxury Card */}
            <HeroSection
              weddingData={weddingData}
              onExploreClick={scrollToCelebrations}
              onRsvpClick={scrollToRsvp}
            />

            {/* 2. Welcome & Blessings of Allah */}
            <WelcomeInvitationSection weddingData={weddingData} />

            {/* 3. Live Countdown Section */}
            <LiveCountdownSection
              targetDate={weddingData.countdownDate}
              countdownLabel={weddingData.countdownLabel}
            />

            {/* 4. Wedding Celebrations (Manja & Nikah) */}
            <WeddingCelebrationsSection events={weddingData.events} />

            {/* 5. Venues, Addresses & Google Maps */}
            <VenueAndGoogleMapsSection weddingData={weddingData} />

            {/* 6. Photo Gallery: Moments of Love */}
            <PhotoGallerySection
              galleryImages={weddingData.galleryImages}
              onOpenAdmin={() => setIsAdminOpen(true)}
            />

            {/* 7. RSVP Attendance Form */}
            <RSVPSection onSuccess={fetchWeddingData} />

            {/* 8. WhatsApp Sharing In-Page Banner */}
            <div className="px-4 sm:px-6">
              <WhatsAppShareButton
                message={weddingData.whatsappMessage}
                variant="banner"
                className="max-w-3xl mx-auto my-12"
              />
            </div>
          </main>

          {/* 9. Light Ivory Footer */}
          <FooterSection
            weddingData={weddingData}
            onOpenAdmin={() => setIsAdminOpen(true)}
          />

          {/* Floating Controls */}
          {/* A. Mandatory Shukran Allah Background Music Player */}
          <FloatingMusicPlayer
            audioUrl={weddingData.audioUrl}
            songTitle={weddingData.songTitle}
            autoPlayTrigger={audioTrigger}
          />

          {/* B. Floating WhatsApp Share Button */}
          <WhatsAppShareButton
            message={weddingData.whatsappMessage}
            variant="floating"
          />

          {/* Admin Dashboard Modal */}
          <AdminDashboardModal
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            currentData={weddingData}
            onDataUpdated={(updated) => setWeddingData(updated)}
          />
        </div>
      )}
    </div>
  );
}
