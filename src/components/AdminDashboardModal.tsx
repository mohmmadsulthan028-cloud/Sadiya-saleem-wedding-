import React, { useState, useEffect } from 'react';
import { WeddingData, RSVP, GalleryItem } from '../types.ts';
import {
  X,
  Lock,
  Save,
  Download,
  Trash2,
  Upload,
  RefreshCw,
  CheckCircle2,
  Users,
  Calendar,
  Music,
  Image as ImageIcon,
  ShieldCheck,
  Eye,
} from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: WeddingData;
  onDataUpdated: (newData: WeddingData) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  currentData,
  onDataUpdated,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tabs
  const [activeTab, setActiveTab] = useState<'details' | 'events' | 'gallery' | 'rsvps' | 'security'>(
    'details'
  );

  // Editable Form State
  const [formData, setFormData] = useState<WeddingData>(currentData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // RSVPs State
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [isLoadingRsvps, setIsLoadingRsvps] = useState(false);
  const [rsvpFilter, setRsvpFilter] = useState<'all' | 'attending' | 'declined'>('all');

  // Change Password State
  const [newPassword, setNewPassword] = useState('');
  const [pwStatus, setPwStatus] = useState<string | null>(null);

  // Sync formData when currentData changes
  useEffect(() => {
    setFormData(currentData);
  }, [currentData]);

  // Load RSVPs once authenticated
  useEffect(() => {
    if (authToken) {
      fetchRsvps();
    }
  }, [authToken]);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Incorrect password');
      }
      setAuthToken(data.token);
      setPasswordInput('');
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const fetchRsvps = async () => {
    if (!authToken) return;
    setIsLoadingRsvps(true);
    try {
      const res = await fetch('/api/rsvps', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        const data = await res.json();
        setRsvps(data);
      }
    } catch (err) {
      console.error('Error fetching RSVPs:', err);
    } finally {
      setIsLoadingRsvps(false);
    }
  };

  const handleSaveData = async () => {
    if (!authToken) return;
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const res = await fetch('/api/wedding-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Failed to save changes');
      }
      onDataUpdated(formData);
      setSaveStatus('Changes saved and published successfully!');
      setTimeout(() => setSaveStatus(null), 4000);
    } catch (err: any) {
      setSaveStatus(`Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteRsvp = async (id: string) => {
    if (!authToken || !window.confirm('Are you sure you want to delete this RSVP?')) return;
    try {
      const res = await fetch(`/api/rsvps/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.ok) {
        setRsvps((prev) => prev.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleExportCsv = () => {
    if (!authToken) return;
    window.location.href = `/api/rsvps/export-csv?token=${authToken}`;
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authToken || !newPassword) return;
    setPwStatus(null);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPwStatus('Admin password successfully updated!');
      setNewPassword('');
    } catch (err: any) {
      setPwStatus(`Error: ${err.message}`);
    }
  };

  const handleImageFileUpload = async (index: number, file: File) => {
    if (!authToken) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      try {
        const res = await fetch('/api/upload-image', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ dataUrl, filename: `gallery_${index + 1}` }),
        });
        const data = await res.json();
        if (data.success && data.url) {
          const updatedGallery = [...formData.galleryImages];
          updatedGallery[index] = {
            ...updatedGallery[index],
            imageUrl: data.url,
          };
          setFormData({ ...formData, galleryImages: updatedGallery });
        }
      } catch (err) {
        alert('Failed to upload image. Please check file format.');
      }
    };
    reader.readAsDataURL(file);
  };

  // RSVP stats
  const totalGuests = rsvps
    .filter((r) => r.attending === 'Yes')
    .reduce((acc, curr) => acc + (curr.guestCount || 1), 0);
  const attendingCount = rsvps.filter((r) => r.attending === 'Yes').length;
  const declinedCount = rsvps.filter((r) => r.attending === 'No').length;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#FFFDF9] rounded-3xl border-2 border-[#D4B989] shadow-2xl flex flex-col overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#F5EEDB] via-[#FAF6EE] to-[#F5EEDB] border-b border-[#D4B989]/50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#D4B989]/60 flex items-center justify-center text-[#8C6212]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#2B231A]">
                Wedding Admin Dashboard
              </h3>
              <p className="text-[11px] text-[#785E39]">
                Abdul Saleem &amp; Sadiya &middot; Host Control Center
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#6B502A] hover:bg-[#FAF0D9] transition-colors"
            aria-label="Close Admin Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        {!authToken ? (
          /* Password Authentication Gate */
          <div className="p-8 sm:p-14 text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-full bg-[#FAF0D0] border border-[#D4B989] flex items-center justify-center text-[#8C6212] mx-auto mb-4">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h4 className="font-serif-luxury text-2xl font-bold text-[#2B231A] mb-1">
              Admin Access Required
            </h4>
            <p className="text-xs text-[#785E39] mb-6">
              Enter your family administrative password to customize details or manage RSVPs. (Default:{' '}
              <code className="bg-[#FAF0D0] px-1.5 py-0.5 rounded text-[#8C6212] font-mono">
                subhanfamily2027
              </code>
              )
            </p>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter admin password..."
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#D4B989]/60 bg-white text-sm text-center tracking-wider text-[#2B231A] focus:outline-none focus:border-[#8C6212]"
                autoFocus
              />
              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#C5A059] to-[#996515] text-[#241A0B] text-xs font-bold tracking-widest uppercase shadow hover:shadow-md transition-all cursor-pointer"
              >
                {isLoggingIn ? 'Verifying...' : 'Unlock Dashboard'}
              </button>
            </form>
          </div>
        ) : (
          /* Logged In Dashboard Interface */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Top Navigation Tabs */}
            <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 pt-3 border-b border-[#D4B989]/30 bg-[#FAF7F2] overflow-x-auto">
              {[
                { id: 'details', label: 'Wedding Details', icon: Calendar },
                { id: 'events', label: 'Events & Venues', icon: Calendar },
                { id: 'gallery', label: 'Gallery & Music', icon: ImageIcon },
                { id: 'rsvps', label: `RSVPs (${rsvps.length})`, icon: Users },
                { id: 'security', label: 'Security', icon: ShieldCheck },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 sm:px-4 py-2.5 text-xs font-semibold uppercase tracking-wider border-b-2 whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'border-[#996515] text-[#8C6212] bg-white rounded-t-lg'
                        : 'border-transparent text-[#785E39] hover:text-[#2B231A]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Contents Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {saveStatus && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{saveStatus}</span>
                </div>
              )}

              {/* TAB 1: DETAILS */}
              {activeTab === 'details' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B502A] mb-1">
                        Groom's Name (First)
                      </label>
                      <input
                        type="text"
                        value={formData.groomName}
                        onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B502A] mb-1">
                        Bride's Name (Second)
                      </label>
                      <input
                        type="text"
                        value={formData.brideName}
                        onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B502A] mb-1">
                        Bride's Father Name
                      </label>
                      <input
                        type="text"
                        value={formData.brideFather}
                        onChange={(e) => setFormData({ ...formData, brideFather: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B502A] mb-1">
                        Invitation From
                      </label>
                      <input
                        type="text"
                        value={formData.invitationFrom}
                        onChange={(e) => setFormData({ ...formData, invitationFrom: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B502A] mb-1">
                      Wedding Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B502A] mb-1">
                        Live Countdown Target (ISO format)
                      </label>
                      <input
                        type="text"
                        value={formData.countdownDate}
                        onChange={(e) => setFormData({ ...formData, countdownDate: e.target.value })}
                        placeholder="2027-01-04T00:00:00+05:30"
                        className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B502A] mb-1">
                        Countdown Notice Label
                      </label>
                      <input
                        type="text"
                        value={formData.countdownLabel}
                        onChange={(e) => setFormData({ ...formData, countdownLabel: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B502A] mb-1">
                      Welcome Invitation Message
                    </label>
                    <textarea
                      rows={4}
                      value={formData.welcomeMessage}
                      onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B502A] mb-1">
                        Wedding Hashtag
                      </label>
                      <input
                        type="text"
                        value={formData.hashtag}
                        onChange={(e) => setFormData({ ...formData, hashtag: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B502A] mb-1">
                        Footer Closing Dua
                      </label>
                      <input
                        type="text"
                        value={formData.footerMessage}
                        onChange={(e) => setFormData({ ...formData, footerMessage: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B502A] mb-1">
                      WhatsApp Invitation Message Template
                    </label>
                    <textarea
                      rows={5}
                      value={formData.whatsappMessage}
                      onChange={(e) => setFormData({ ...formData, whatsappMessage: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm font-sans"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: EVENTS & VENUES */}
              {activeTab === 'events' && (
                <div className="space-y-6">
                  {formData.events.map((evt, idx) => (
                    <div
                      key={evt.id}
                      className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#D4B989]/60 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-[#D4B989]/30 pb-2">
                        <h4 className="font-serif-luxury text-lg font-bold text-[#2B231A]">
                          Event {idx + 1}: {evt.title}
                        </h4>
                        <span className="text-xs uppercase font-medium text-[#8C6212]">
                          ID: {evt.id}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase text-[#6B502A] mb-1">
                            Date
                          </label>
                          <input
                            type="text"
                            value={evt.date}
                            onChange={(e) => {
                              const updated = [...formData.events];
                              updated[idx].date = e.target.value;
                              setFormData({ ...formData, events: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase text-[#6B502A] mb-1">
                            Time
                          </label>
                          <input
                            type="text"
                            value={evt.time}
                            onChange={(e) => {
                              const updated = [...formData.events];
                              updated[idx].time = e.target.value;
                              setFormData({ ...formData, events: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase text-[#6B502A] mb-1">
                            Venue Name
                          </label>
                          <input
                            type="text"
                            value={evt.venue}
                            onChange={(e) => {
                              const updated = [...formData.events];
                              updated[idx].venue = e.target.value;
                              setFormData({ ...formData, events: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase text-[#6B502A] mb-1">
                            Dress Code
                          </label>
                          <input
                            type="text"
                            value={evt.dressCode}
                            onChange={(e) => {
                              const updated = [...formData.events];
                              updated[idx].dressCode = e.target.value;
                              setFormData({ ...formData, events: updated });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-[#6B502A] mb-1">
                          Complete Address
                        </label>
                        <input
                          type="text"
                          value={evt.address}
                          onChange={(e) => {
                            const updated = [...formData.events];
                            updated[idx].address = e.target.value;
                            setFormData({ ...formData, events: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-[#6B502A] mb-1">
                          Google Maps URL
                        </label>
                        <input
                          type="text"
                          value={evt.mapsUrl}
                          onChange={(e) => {
                            const updated = [...formData.events];
                            updated[idx].mapsUrl = e.target.value;
                            setFormData({ ...formData, events: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase text-[#6B502A] mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={evt.description}
                          onChange={(e) => {
                            const updated = [...formData.events];
                            updated[idx].description = e.target.value;
                            setFormData({ ...formData, events: updated });
                          }}
                          className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: GALLERY & MUSIC */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  {/* Background Music Config */}
                  <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4B989]/60 space-y-3">
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-[#8C6212]" />
                      <h4 className="font-serif-luxury text-base font-bold text-[#2B231A]">
                        Background Music Settings
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-[#6B502A] mb-1">
                          Song Title
                        </label>
                        <input
                          type="text"
                          value={formData.songTitle}
                          onChange={(e) => setFormData({ ...formData, songTitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-[#6B502A] mb-1">
                          Audio Source URL
                        </label>
                        <input
                          type="text"
                          value={formData.audioUrl}
                          onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 6 Gallery Items */}
                  <h4 className="font-serif-luxury text-lg font-bold text-[#2B231A] pt-2">
                    Gallery Picture Frames (6 Frames)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formData.galleryImages.map((img, idx) => (
                      <div
                        key={img.id}
                        className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#D4B989]/50 flex flex-col justify-between"
                      >
                        <div>
                          <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-2 border border-[#D4B989]/30">
                            <img
                              src={img.imageUrl}
                              alt={img.alt}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <label className="block text-[11px] font-semibold text-[#8C6212] uppercase mb-0.5">
                            Title
                          </label>
                          <input
                            type="text"
                            value={img.title}
                            onChange={(e) => {
                              const updated = [...formData.galleryImages];
                              updated[idx].title = e.target.value;
                              setFormData({ ...formData, galleryImages: updated });
                            }}
                            className="w-full px-2 py-1 text-xs rounded border border-[#D4B989]/40 mb-2"
                          />

                          <label className="block text-[11px] font-semibold text-[#8C6212] uppercase mb-0.5">
                            Image URL / Path
                          </label>
                          <input
                            type="text"
                            value={img.imageUrl}
                            onChange={(e) => {
                              const updated = [...formData.galleryImages];
                              updated[idx].imageUrl = e.target.value;
                              setFormData({ ...formData, galleryImages: updated });
                            }}
                            className="w-full px-2 py-1 text-[11px] font-mono rounded border border-[#D4B989]/40 mb-2"
                          />
                        </div>

                        {/* File Upload trigger */}
                        <div className="pt-2 border-t border-[#D4B989]/20">
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF0D9] hover:bg-[#F3E5C2] text-[#6B502A] text-[11px] font-semibold cursor-pointer transition-colors w-full justify-center">
                            <Upload className="w-3 h-3 text-[#8C6212]" />
                            <span>Upload New Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleImageFileUpload(idx, e.target.files[0]);
                                }
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: RSVPS */}
              {activeTab === 'rsvps' && (
                <div className="space-y-4">
                  {/* Stats Bar */}
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FFFDF9] border border-[#D4B989]/40 text-center">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-[#8C6212]">
                        Total Submissions
                      </p>
                      <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#2B231A]">
                        {rsvps.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700">
                        Attending Guests
                      </p>
                      <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-emerald-800">
                        {totalGuests}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-semibold text-rose-700">
                        Declined
                      </p>
                      <p className="font-serif-luxury text-2xl sm:text-3xl font-bold text-rose-800">
                        {declinedCount}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Filters */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-[#785E39] font-medium">Filter:</span>
                      <button
                        onClick={() => setRsvpFilter('all')}
                        className={`px-2.5 py-1 rounded-full ${
                          rsvpFilter === 'all'
                            ? 'bg-[#8C6212] text-white'
                            : 'bg-[#FAF0D9] text-[#6B502A]'
                        }`}
                      >
                        All ({rsvps.length})
                      </button>
                      <button
                        onClick={() => setRsvpFilter('attending')}
                        className={`px-2.5 py-1 rounded-full ${
                          rsvpFilter === 'attending'
                            ? 'bg-emerald-700 text-white'
                            : 'bg-[#FAF0D9] text-[#6B502A]'
                        }`}
                      >
                        Attending ({attendingCount})
                      </button>
                      <button
                        onClick={() => setRsvpFilter('declined')}
                        className={`px-2.5 py-1 rounded-full ${
                          rsvpFilter === 'declined'
                            ? 'bg-rose-700 text-white'
                            : 'bg-[#FAF0D9] text-[#6B502A]'
                        }`}
                      >
                        Declined ({declinedCount})
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={fetchRsvps}
                        className="p-1.5 rounded-lg border border-[#D4B989]/50 text-[#8C6212] hover:bg-[#FAF0D9] transition-colors"
                        title="Refresh RSVPs"
                      >
                        <RefreshCw className={`w-4 h-4 ${isLoadingRsvps ? 'animate-spin' : ''}`} />
                      </button>
                      <button
                        onClick={handleExportCsv}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#C5A059] to-[#996515] text-[#241A0B] text-xs font-semibold tracking-wider uppercase shadow hover:shadow-md transition-all cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#241A0B]" />
                        <span>Export CSV</span>
                      </button>
                    </div>
                  </div>

                  {/* RSVPs Table */}
                  <div className="rounded-2xl border border-[#D4B989]/50 overflow-hidden bg-white shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#FAF5EC] border-b border-[#D4B989]/30 text-[#8C6212] uppercase tracking-wider text-[10px]">
                          <tr>
                            <th className="p-3">Guest Name</th>
                            <th className="p-3">Mobile</th>
                            <th className="p-3">Guests</th>
                            <th className="p-3">Attending</th>
                            <th className="p-3">Event Choice</th>
                            <th className="p-3">Personal Dua / Message</th>
                            <th className="p-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D4B989]/20 text-[#2B231A]">
                          {rsvps
                            .filter((r) => {
                              if (rsvpFilter === 'attending') return r.attending === 'Yes';
                              if (rsvpFilter === 'declined') return r.attending === 'No';
                              return true;
                            })
                            .map((r) => (
                              <tr key={r.id} className="hover:bg-[#FAF7F2]">
                                <td className="p-3 font-semibold">{r.fullName}</td>
                                <td className="p-3 font-mono">{r.mobileNumber}</td>
                                <td className="p-3 tabular-nums font-medium">{r.guestCount}</td>
                                <td className="p-3">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                                      r.attending === 'Yes'
                                        ? 'bg-emerald-100 text-emerald-800'
                                        : 'bg-rose-100 text-rose-800'
                                    }`}
                                  >
                                    {r.attending}
                                  </span>
                                </td>
                                <td className="p-3">{r.eventChoice}</td>
                                <td className="p-3 max-w-xs truncate text-[#6B502A]">
                                  {r.personalMessage || '-'}
                                </td>
                                <td className="p-3 text-right">
                                  <button
                                    onClick={() => handleDeleteRsvp(r.id)}
                                    className="p-1 rounded text-rose-600 hover:bg-rose-50"
                                    title="Delete RSVP"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          {rsvps.length === 0 && (
                            <tr>
                              <td colSpan={7} className="p-8 text-center text-[#785E39]">
                                No RSVPs received yet.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: SECURITY */}
              {activeTab === 'security' && (
                <div className="max-w-md mx-auto py-4 space-y-4">
                  <h4 className="font-serif-luxury text-xl font-bold text-[#2B231A]">
                    Change Admin Password
                  </h4>
                  <p className="text-xs text-[#785E39]">
                    Set a new secure password for accessing this invitation management console.
                  </p>

                  {pwStatus && (
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-800">
                      {pwStatus}
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase text-[#6B502A] mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="At least 4 characters..."
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#D4B989]/60 bg-white text-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      className="py-2 px-5 rounded-full bg-[#8C6212] hover:bg-[#6B4B0C] text-white text-xs font-semibold uppercase tracking-wider"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Bottom Sticky Action Footer */}
            <div className="p-4 sm:p-5 bg-[#FAF7F2] border-t border-[#D4B989]/40 flex items-center justify-between">
              <span className="text-xs text-[#785E39]">
                All changes reflect live on the published website.
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-full border border-[#D4B989] text-xs font-semibold uppercase tracking-wider text-[#6B502A] hover:bg-white"
                >
                  Close &amp; Preview
                </button>

                <button
                  onClick={handleSaveData}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C5A059] to-[#996515] hover:from-[#D4B989] hover:to-[#8C6212] text-[#241A0B] text-xs font-bold tracking-widest uppercase shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 text-[#241A0B]" />
                  <span>{isSaving ? 'Saving...' : 'Save & Publish'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
