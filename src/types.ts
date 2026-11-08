export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  dressCode: string;
  description: string;
  mapsUrl: string;
  accentColor: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  alt: string;
}

export interface WeddingData {
  groomName: string;
  brideName: string;
  brideFather: string;
  invitationFrom: string;
  tagline: string;
  islamicGreetingEnglish: string;
  islamicGreetingArabic: string;
  welcomeSubtitle: string;
  welcomeMessage: string;
  countdownDate: string;
  countdownLabel: string;
  events: WeddingEvent[];
  galleryImages: GalleryItem[];
  audioUrl: string;
  songTitle: string;
  hashtag: string;
  whatsappMessage: string;
  parkingInfoManja: string;
  parkingInfoNikah: string;
  footerMessage: string;
}

export interface RSVP {
  id: string;
  fullName: string;
  mobileNumber: string;
  guestCount: number;
  attending: 'Yes' | 'No';
  eventChoice: 'Manja' | 'Nikah' | 'Both';
  personalMessage: string;
  createdAt: string;
}
