import type { Yacht, YachtCategory, Testimonial } from "@/types";

// Demo categories
export const getCategories = (): YachtCategory[] => [
  { id: "1", name: "Luxury Yacht", slug: "luxury-yacht", icon: "🚤", sortOrder: 1, isActive: true },
  { id: "2", name: "Party Yacht", slug: "party-yacht", icon: "🎉", sortOrder: 2, isActive: true },
  { id: "3", name: "Sunset Cruise", slug: "sunset-cruise", icon: "🌅", sortOrder: 3, isActive: true },
  { id: "4", name: "Corporate", slug: "corporate", icon: "💼", sortOrder: 4, isActive: true },
  { id: "5", name: "Romantic", slug: "romantic", icon: "💕", sortOrder: 5, isActive: true },
];

// Demo yachts
export const getYachts = (): Yacht[] => [
  {
    id: "1",
    name: "Sea Princess",
    slug: "sea-princess",
    description: "Experience the ultimate luxury on the Sea Princess, a 50ft motor yacht perfect for parties up to 25 guests. Features include air-conditioned cabins, sun deck, and premium sound system.",
    shortDescription: "50ft luxury motor yacht for parties up to 25 guests",
    capacity: 25,
    price: 25000,
    categoryId: "1",
    featured: true,
    isActive: true,
    enableDateField: true,
    enableGuestField: true,
    enableTimeSlot: true,
    enableExtraHours: true,
    enableAddons: true,
    minimumBookingHours: 2,
    location: "Vasco da Gama, Goa",
    pricePerHour: 15000,
    images: [
      { id: "1", yachtId: "1", url: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800", isPrimary: true, sortOrder: 0 },
      { id: "2", yachtId: "1", url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800", isPrimary: false, sortOrder: 1 },
    ],
    amenities: [
      { id: "1", yachtId: "1", icon: "❄️", name: "Air Conditioning" },
      { id: "2", yachtId: "1", icon: "🔊", name: "Sound System" },
      { id: "3", yachtId: "1", icon: "☀️", name: "Sun Deck" },
      { id: "4", yachtId: "1", icon: "🏊", name: "Swimming Platform" },
    ],
    inclusions: [
      { id: "1", yachtId: "1", text: "Captain & Crew" },
      { id: "2", yachtId: "1", text: "Fuel charges" },
      { id: "3", yachtId: "1", text: "Life jackets" },
    ],
    exclusions: [
      { id: "1", yachtId: "1", text: "Food & Beverages" },
      { id: "2", yachtId: "1", text: "Decoration" },
    ],
    timeSlots: [
      { id: "1", yachtId: "1", name: "Morning (8AM - 12PM)", startTime: "08:00", endTime: "12:00", price: 25000, isActive: true, sortOrder: 1 },
      { id: "2", yachtId: "1", name: "Afternoon (12PM - 4PM)", startTime: "12:00", endTime: "16:00", price: 25000, isActive: true, sortOrder: 2 },
      { id: "3", yachtId: "1", name: "Sunset (4PM - 8PM)", startTime: "16:00", endTime: "20:00", price: 30000, isActive: true, sortOrder: 3 },
    ],
    extraHours: [
      { id: "1", yachtId: "1", hours: 1, price: 15000, isActive: true },
      { id: "2", yachtId: "1", hours: 2, price: 25000, isActive: true },
    ],
    addons: [
      { id: "1", yachtId: "1", name: "Balloon Decoration", description: "Beautiful balloon arrangement", price: 5000, isActive: true },
      { id: "2", yachtId: "1", name: "Birthday Cake", description: "Customized 2kg cake", price: 3500, isActive: true },
      { id: "3", yachtId: "1", name: "DJ Service", description: "Professional DJ with equipment", price: 15000, isActive: true },
      { id: "4", yachtId: "1", name: "Photographer", description: "2 hours photo & video coverage", price: 12000, isActive: true },
    ],
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Royal Duchess",
    slug: "royal-duchess",
    description: "A magnificent 60ft sailing yacht offering an elegant experience. Perfect for intimate celebrations and romantic cruises with stunning views of Goa's coastline.",
    shortDescription: "60ft sailing yacht for intimate celebrations",
    capacity: 15,
    price: 35000,
    categoryId: "5",
    featured: true,
    isActive: true,
    enableDateField: true,
    enableGuestField: true,
    enableTimeSlot: true,
    enableExtraHours: true,
    enableAddons: true,
    minimumBookingHours: 3,
    location: "Vasco da Gama, Goa",
    pricePerHour: 12000,
    images: [
      { id: "3", yachtId: "2", url: "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800", isPrimary: true, sortOrder: 0 },
      { id: "4", yachtId: "2", url: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800", isPrimary: false, sortOrder: 1 },
    ],
    amenities: [
      { id: "5", yachtId: "2", icon: "❄️", name: "Air Conditioning" },
      { id: "6", yachtId: "2", icon: "🍽️", name: "Dining Area" },
    ],
    inclusions: [
      { id: "3", yachtId: "2", text: "Captain & Crew" },
      { id: "4", yachtId: "2", text: "Fuel charges" },
    ],
    exclusions: [],
    timeSlots: [
      { id: "4", yachtId: "2", name: "Sunset Cruise (4PM - 7PM)", startTime: "16:00", endTime: "19:00", price: 35000, isActive: true, sortOrder: 1 },
      { id: "5", yachtId: "2", name: "Evening (5PM - 9PM)", startTime: "17:00", endTime: "21:00", price: 40000, isActive: true, sortOrder: 2 },
    ],
    extraHours: [
      { id: "3", yachtId: "2", hours: 1, price: 12000, isActive: true },
    ],
    addons: [
      { id: "5", yachtId: "2", name: "Champagne Service", description: "Premium champagne with setup", price: 8000, isActive: true },
      { id: "6", yachtId: "2", name: "Flower Decoration", description: "Romantic rose petals & flowers", price: 6000, isActive: true },
    ],
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Party Barge",
    slug: "party-barge",
    description: "The ultimate party vessel! Spacious deck, club-level sound system, and light show. Capacity for 50+ guests - perfect for bachelor/bachelorette parties and large celebrations.",
    shortDescription: "Ultimate party yacht for 50+ guests",
    capacity: 50,
    price: 45000,
    categoryId: "2",
    featured: true,
    isActive: true,
    enableDateField: true,
    enableGuestField: true,
    enableTimeSlot: true,
    enableExtraHours: true,
    enableAddons: true,
    minimumBookingHours: 4,
    location: "Vasco da Gama, Goa",
    pricePerHour: 12000,
    images: [
      { id: "5", yachtId: "3", url: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800", isPrimary: true, sortOrder: 0 },
    ],
    amenities: [
      { id: "7", yachtId: "3", icon: "🔊", name: "Club Sound System" },
      { id: "8", yachtId: "3", icon: "💡", name: "Light Show" },
      { id: "9", yachtId: "3", icon: "🍾", name: "Bar Counter" },
    ],
    inclusions: [
      { id: "5", yachtId: "3", text: "Captain & Crew" },
      { id: "6", yachtId: "3", text: "Fuel charges" },
      { id: "7", yachtId: "3", text: "Basic decor" },
    ],
    exclusions: [],
    timeSlots: [
      { id: "6", yachtId: "3", name: "Full Day (8AM - 8PM)", startTime: "08:00", endTime: "20:00", price: 80000, isActive: true, sortOrder: 1 },
      { id: "7", yachtId: "3", name: "Night Party (8PM - 1AM)", startTime: "20:00", endTime: "01:00", price: 60000, isActive: true, sortOrder: 2 },
    ],
    extraHours: [
      { id: "4", yachtId: "3", hours: 1, price: 10000, isActive: true },
    ],
    addons: [
      { id: "7", yachtId: "3", name: "DJ Service", description: "Professional DJ", price: 20000, isActive: true },
      { id: "8", yachtId: "3", name: "Catering", description: "Buffet for 50 guests", price: 25000, isActive: true },
    ],
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Corporate Cruiser",
    slug: "corporate-cruiser",
    description: "Professional yacht for corporate events, team outings, and business meetings. Equipped with conference facilities, WiFi, and presentation equipment.",
    shortDescription: "Professional yacht for corporate events",
    capacity: 30,
    price: 50000,
    categoryId: "4",
    featured: true,
    isActive: true,
    enableDateField: true,
    enableGuestField: true,
    enableTimeSlot: true,
    enableExtraHours: false,
    enableAddons: true,
    minimumBookingHours: 4,
    location: "Vasco da Gama, Goa",
    images: [
      { id: "6", yachtId: "4", url: "https://images.unsplash.com/photo-1565976469785-0538f6f0e379?w=800", isPrimary: true, sortOrder: 0 },
    ],
    amenities: [
      { id: "10", yachtId: "4", icon: "📶", name: "WiFi" },
      { id: "11", yachtId: "4", icon: "📺", name: "Projector" },
      { id: "12", yachtId: "4", icon: "🍽️", name: "Catering Space" },
    ],
    inclusions: [
      { id: "8", yachtId: "4", text: "Captain & Crew" },
      { id: "9", yachtId: "4", text: "Fuel charges" },
      { id: "10", yachtId: "4", text: "Basic setup" },
    ],
    exclusions: [],
    timeSlots: [
      { id: "8", yachtId: "4", name: "Business Day (9AM - 5PM)", startTime: "09:00", endTime: "17:00", price: 50000, isActive: true, sortOrder: 1 },
    ],
    addons: [
      { id: "9", yachtId: "4", name: "Catering", description: "Full day catering", price: 15000, isActive: true },
      { id: "10", yachtId: "4", name: "Event Coordinator", description: "Professional event manager", price: 10000, isActive: true },
    ],
    reviews: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getFeaturedYachts = () => {
  return getYachts().filter((yacht) => yacht.featured);
};

export const getYachtBySlug = (slug: string) => {
  return getYachts().find((yacht) => yacht.slug === slug);
};

export const getYachtsByCategory = (categorySlug: string) => {
  const category = getCategories().find((c) => c.slug === categorySlug);
  if (!category) return [];
  return getYachts().filter((yacht) => yacht.categoryId === category.id && yacht.isActive);
};

// Demo testimonials
export const getTestimonials = (): Testimonial[] => [
  {
    id: "1",
    name: "Priya Sharma",
    location: "Mumbai",
    content: "Amazing experience! We celebrated our anniversary on the Royal Duchess and it was absolutely magical. The crew was professional and the sunset views were breathtaking.",
    rating: 5,
    isActive: true,
    sortOrder: 1,
  },
  {
    id: "2",
    name: "Rahul Mehta",
    location: "Bangalore",
    content: "Booked the Party Barge for my brother's bachelor party. 50 of us had an unforgettable time! The sound system was incredible and everyone is still talking about it.",
    rating: 5,
    isActive: true,
    sortOrder: 2,
  },
  {
    id: "3",
    name: "Anita Desai",
    location: "Pune",
    content: "Corporate event on the Corporate Cruiser was a huge success. Professional setup, great service. Our team loved it! Will definitely book again.",
    rating: 5,
    isActive: true,
    sortOrder: 3,
  },
  {
    id: "4",
    name: "Vikram Singh",
    location: "Delhi",
    content: "Family birthday celebration on Sea Princess was perfect! Kids loved the experience, adults enjoyed the party. Thank you Goa Yacht World!",
    rating: 5,
    isActive: true,
    sortOrder: 4,
  },
];

// FAQ data
export const getFAQs = () => [
  {
    question: "What is included in the yacht rental price?",
    answer: "Our yacht rental prices include the yacht, captain & crew, fuel charges, and basic safety equipment (life jackets). Food, beverages, decorations, and additional services are available as add-ons.",
  },
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 3-5 days in advance for standard dates. For weekends, holidays, and special occasions, we suggest booking 2-3 weeks ahead to ensure availability.",
  },
  {
    question: "Is there a security deposit?",
    answer: "Yes, we require a refundable security deposit of ₹5,000-₹10,000 depending on the yacht. The deposit is returned after the trip if no damage occurs.",
  },
  {
    question: "What happens if it rains?",
    answer: "We have a flexible policy for weather conditions. If it's raining heavily, we can reschedule your booking to another date at no extra cost. Light rain usually doesn't affect the trip.",
  },
  {
    question: "Can I bring my own food and drinks?",
    answer: "Yes, you're welcome to bring your own food and beverages. We also offer catering services and can arrange for supplies to be loaded on the yacht.",
  },
  {
    question: "Are the yachts safe?",
    answer: "Absolutely! All our yachts are Coast Guard certified and regularly maintained. They come equipped with life jackets, first aid kits, fire extinguishers, and communication devices.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Cancellations made 7+ days before the booking get a full refund. 3-7 days before: 50% refund. Less than 3 days: no refund. Weather-related cancellations get full refund or free rescheduling.",
  },
];
