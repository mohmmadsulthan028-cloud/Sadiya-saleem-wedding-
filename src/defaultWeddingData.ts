import { WeddingData } from './types.ts';

export const defaultWeddingData: WeddingData = {
  groomName: 'ABDUL SALEEM',
  brideName: 'SADIYA',
  brideFather: 'MOHAMMAD SUBHAN',
  invitationFrom: 'MOHAMMAD SUBHAN & FAMILY',
  tagline: 'Two Hearts, One Beautiful Beginning',
  islamicGreetingEnglish: 'Bismillahir Rahmanir Raheem',
  islamicGreetingArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  welcomeSubtitle: 'With the Blessings of Allah',
  welcomeMessage:
    'Alhamdulillah!\n\nWith the infinite blessings of Almighty Allah, and with immense happiness and gratitude, we cordially invite you to join us in celebrating the wedding of our beloved family member.\n\nYour gracious presence, love, and heartfelt duas will make this beautiful occasion even more memorable.\n\nWe warmly welcome you and your family to share our happiness.',
  countdownDate: '2027-01-04T00:00:00+05:30',
  countdownLabel: 'Date-only countdown (Nikah time to be announced)',
  events: [
    {
      id: 'manja',
      title: 'MANJA CEREMONY',
      date: 'SUNDAY, 3 JANUARY 2027',
      time: 'TO BE ANNOUNCED',
      venue: 'G SUBHAN PALACE (OUR RESIDENCE)',
      address:
        'Beside HP Petrol Pump, Opposite Aditya Hospital, Hyderabad Road, Pregnapur, Gajwel, Siddipet District, Telangana – 502278.',
      dressCode: 'Traditional & Festive Attire.',
      description:
        'Join us for a beautiful celebration filled with happiness, warmth, family moments, and blessings as we prepare for the wedding.',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=G+Subhan+Palace+Beside+HP+Petrol+Pump+Opposite+Aditya+Hospital+Hyderabad+Road+Pregnapur+Gajwel+Siddipet+District+Telangana+502278',
      accentColor: '#F6E05E',
    },
    {
      id: 'nikah',
      title: 'WEDDING / NIKAH CEREMONY',
      date: 'MONDAY, 4 JANUARY 2027',
      time: 'TO BE ANNOUNCED',
      venue: 'TYR GARDEN',
      address:
        'Beside Balaji Electronics, Gajwel – Pragnapur Road, Gajwel, Siddipet District, Telangana – 502278.',
      dressCode: 'Elegant Traditional & Royal Attire.',
      description:
        'With the blessings of Almighty Allah, we invite you to join us in celebrating the beautiful Nikah of Abdul Saleem and Sadiya.\n\nYour presence and duas will make this occasion truly special.',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=TYR+Garden+Beside+Balaji+Electronics+Gajwel+Pragnapur+Road+Gajwel+Siddipet+District+Telangana+502278',
      accentColor: '#708238',
    },
  ],
  galleryImages: [
    {
      id: 'gal-1',
      title: 'Royal Invitation',
      category: 'Stationery & Calligraphy',
      imageUrl: '/src/assets/images/gallery_invitation_1794136140241.jpg',
      alt: 'Luxury ivory and gold royal wedding invitation card',
    },
    {
      id: 'gal-2',
      title: 'Mughal Architecture',
      category: 'Islamic Architectural Heritage',
      imageUrl: '/src/assets/images/gallery_mughal_arch_1794136141132.jpg',
      alt: 'Breathtaking ivory marble Mughal arch with gold inlay',
    },
    {
      id: 'gal-3',
      title: 'Jasmine & Garden Roses',
      category: 'Wedding Florals',
      imageUrl: '/src/assets/images/gallery_wedding_florals_1794136141791.jpg',
      alt: 'Romantic white garden roses and jasmine florals',
    },
    {
      id: 'gal-4',
      title: 'Crescent Moon & Lanterns',
      category: 'Islamic Aesthetics',
      imageUrl: '/src/assets/images/gallery_crescent_lanterns_1794136141547.jpg',
      alt: 'Artistic golden crescent moon and glowing filigree lanterns',
    },
    {
      id: 'gal-5',
      title: 'Nikah Stage Decor',
      category: 'Royal Stage Ambiance',
      imageUrl: '/src/assets/images/gallery_nikah_stage_1794136142530.jpg',
      alt: 'Opulent ivory and floral Nikah celebration stage',
    },
    {
      id: 'gal-6',
      title: 'Sacred Blessings',
      category: 'Duas & Traditions',
      imageUrl: '/src/assets/images/gallery_islamic_aesthetic_1794136144626.jpg',
      alt: 'Sacred Islamic wedding aesthetic with pearls and roses',
    },
  ],
  audioUrl:
    '/assets/aistudio/Shukran_Allah_Full_Video_-_Kurbaan_Kareena_Kapoor_Saif_Ali_Khan_Sonu_Nigam_Shrey_84decd3a.mp3',
  songTitle: 'Shukran Allah ❤️',
  hashtag: '#AbdulSaleemWedsSadiya',
  whatsappMessage:
    'Assalamu Alaikum!\n\nWith the blessings of Almighty Allah, MOHAMMAD SUBHAN & FAMILY warmly invite you to celebrate the wedding of ABDUL SALEEM and SADIYA.\n\nMANJA CEREMONY:\n3 JANUARY 2027\nG SUBHAN PALACE (OUR RESIDENCE)\n\nWEDDING / NIKAH:\n4 JANUARY 2027\nTYR GARDEN\n\nYour presence and duas would mean a lot to our family.\n\nWe look forward to celebrating with you.\n\nMay Allah bless this beautiful union with endless happiness, love, peace, and barakah.\n\n#AbdulSaleemWedsSadiya',
  parkingInfoManja:
    'Dedicated vehicle parking space is arranged near G Subhan Palace residence beside HP Petrol Pump.',
  parkingInfoNikah:
    'Spacious on-premise parking available at TYR Garden for four-wheelers and two-wheelers.',
  footerMessage:
    'May Allah bless this beautiful union with endless happiness, peace, love, and barakah.',
};
