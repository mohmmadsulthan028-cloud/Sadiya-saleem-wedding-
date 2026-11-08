import React, { useState } from 'react';
import { ArabesqueDivider, FloralCorner } from './IslamicMotifs.tsx';
import { CheckCircle2, Heart, Users, Phone, User, MessageSquare, Send, CalendarCheck } from 'lucide-react';

interface RSVPSectionProps {
  onSuccess?: () => void;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({ onSuccess }) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [attending, setAttending] = useState<'Yes' | 'No'>('Yes');
  const [eventChoice, setEventChoice] = useState<'Both' | 'Manja' | 'Nikah'>('Both');
  const [personalMessage, setPersonalMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!mobileNumber.trim() || mobileNumber.trim().length < 8) {
      setErrorMsg('Please enter a valid mobile number');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          mobileNumber: mobileNumber.trim(),
          guestCount,
          attending,
          eventChoice,
          personalMessage: personalMessage.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit RSVP');
      }

      setSuccessMsg(
        data.message ||
          'Alhamdulillah! Thank you for your response. We look forward to celebrating this beautiful occasion with you.'
      );
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while submitting your RSVP. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#FDFBF7] relative">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#8C6212] mb-3">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Kindly Respond</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[#2B231A] tracking-tight">
            Celebrate With Us
          </h2>

          <p className="font-serif-luxury italic text-base sm:text-lg text-[#6B502A] mt-2">
            Your presence and duas will make our celebration even more special.
          </p>

          <ArabesqueDivider className="w-48 mx-auto my-4" />
        </div>

        {/* Card Form Container */}
        <div className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EEDB] rounded-[2.5rem] p-6 sm:p-12 border-2 border-[#D4B989]/60 shadow-xl gold-border-glow overflow-hidden">
          <FloralCorner position="top-left" className="absolute top-2 left-2 w-16 h-16 sm:w-20 sm:h-20" />
          <FloralCorner position="top-right" className="absolute top-2 right-2 w-16 h-16 sm:w-20 sm:h-20" />

          {successMsg ? (
            <div className="py-12 px-4 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#EAF2E5] border border-[#A3B899] flex items-center justify-center text-[#4B6B40] mb-5 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="font-arabic text-3xl text-[#8C6212] block mb-2" dir="rtl">
                الْحَمْدُ لِلَّهِ
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2B231A] mb-3">
                Attendance Confirmed!
              </h3>
              <p className="text-sm sm:text-base text-[#4F3F2C] leading-relaxed max-w-md mx-auto mb-6">
                {successMsg}
              </p>
              <button
                onClick={() => {
                  setSuccessMsg(null);
                  setFullName('');
                  setMobileNumber('');
                  setPersonalMessage('');
                }}
                className="px-6 py-2.5 rounded-full border border-[#D4B989] bg-white text-xs font-semibold uppercase tracking-wider text-[#6B502A] hover:bg-[#FAF6EE] transition-colors"
              >
                Submit Another Response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {errorMsg}
                </div>
              )}

              {/* Guest Full Name */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#6B502A] mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#8C6212]" />
                  <span>Guest Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Salman Ahmed & Family"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/95 border border-[#D4B989]/60 text-sm text-[#2B231A] placeholder-[#A08C75] focus:outline-none focus:border-[#8C6212] shadow-sm transition-colors"
                />
              </div>

              {/* Mobile Number & Guest Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-[#6B502A] mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#8C6212]" />
                    <span>Mobile Number *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98490 00000"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/95 border border-[#D4B989]/60 text-sm text-[#2B231A] placeholder-[#A08C75] focus:outline-none focus:border-[#8C6212] shadow-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-[#6B502A] mb-1.5 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#8C6212]" />
                    <span>Number of Guests</span>
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl bg-white/95 border border-[#D4B989]/60 text-sm text-[#2B231A] focus:outline-none focus:border-[#8C6212] shadow-sm transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Will You Attend? (Yes / No) */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#6B502A] mb-2">
                  Will You Attend? *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttending('Yes')}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase border transition-all ${
                      attending === 'Yes'
                        ? 'bg-[#EBF2E7] border-[#708238] text-[#344E2C] shadow-sm'
                        : 'bg-white/80 border-[#D4B989]/40 text-[#6B502A] hover:bg-white'
                    }`}
                  >
                    Yes, Joyfully Attending
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttending('No')}
                    className={`py-3 px-4 rounded-xl text-xs font-semibold tracking-wider uppercase border transition-all ${
                      attending === 'No'
                        ? 'bg-[#F9ECEC] border-rose-400 text-rose-800 shadow-sm'
                        : 'bg-white/80 border-[#D4B989]/40 text-[#6B502A] hover:bg-white'
                    }`}
                  >
                    Regretfully Unable
                  </button>
                </div>
              </div>

              {/* Which Event? (Manja / Nikah / Both) */}
              {attending === 'Yes' && (
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase text-[#6B502A] mb-2">
                    Which Event Will You Grace? *
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { id: 'Both', label: 'Both Events' },
                      { id: 'Manja', label: 'Manja (3 Jan)' },
                      { id: 'Nikah', label: 'Nikah (4 Jan)' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setEventChoice(opt.id as any)}
                        className={`py-3 px-2 rounded-xl text-xs font-medium tracking-wide border text-center transition-all ${
                          eventChoice === opt.id
                            ? 'bg-[#FAF0D0] border-[#996515] text-[#5B3E08] font-bold shadow-sm'
                            : 'bg-white/80 border-[#D4B989]/40 text-[#6B502A] hover:bg-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Personal Message or Dua */}
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase text-[#6B502A] mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#8C6212]" />
                  <span>Personal Message or Dua for the Couple</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="May Allah bless this union with boundless joy, love, and barakah..."
                  value={personalMessage}
                  onChange={(e) => setPersonalMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/95 border border-[#D4B989]/60 text-sm text-[#2B231A] placeholder-[#A08C75] focus:outline-none focus:border-[#8C6212] shadow-sm transition-colors resize-none"
                />
              </div>

              {/* Confirm Attendance Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 rounded-full bg-gradient-to-r from-[#C5A059] via-[#E5C378] to-[#996515] hover:from-[#D4B989] hover:to-[#8C6212] text-[#241A0B] text-sm font-bold tracking-widest uppercase shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Recording Your RSVP...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#241A0B]" />
                    <span>CONFIRM ATTENDANCE</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
