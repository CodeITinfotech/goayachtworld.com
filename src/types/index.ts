export interface Yacht {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  capacity: number;
  price: number;
  categoryId: string;
  category?: YachtCategory;
  location?: string;
  featured: boolean;
  isActive: boolean;
  
  // Booking Config
  enableDateField: boolean;
  enableGuestField: boolean;
  enableTimeSlot: boolean;
  enableExtraHours: boolean;
  enableAddons: boolean;
  
  // Pricing
  pricePerHour?: number;
  minimumBookingHours: number;
  
  // Relations
  images: YachtImage[];
  videos?: YachtVideo[];
  timeSlots?: TimeSlot[];
  extraHours?: ExtraHour[];
  addons?: YachtAddon[];
  inclusions?: YachtInclusion[];
  exclusions?: YachtExclusion[];
  amenities?: YachtAmenity[];
  reviews?: Review[];
  
  createdAt: string;
  updatedAt: string;
}

export interface YachtCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  sortOrder: number;
  isActive: boolean;
}

export interface YachtImage {
  id: string;
  yachtId: string;
  url: string;
  alt?: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface YachtVideo {
  id: string;
  yachtId: string;
  url: string;
  thumbnail?: string;
  title?: string;
  isActive: boolean;
}

export interface TimeSlot {
  id: string;
  yachtId: string;
  name: string;
  startTime: string;
  endTime: string;
  price: number;
  isActive: boolean;
  sortOrder: number;
}

export interface ExtraHour {
  id: string;
  yachtId: string;
  hours: number;
  price: number;
  isActive: boolean;
}

export interface YachtAddon {
  id: string;
  yachtId: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  isActive: boolean;
}

export interface YachtInclusion {
  id: string;
  yachtId: string;
  text: string;
}

export interface YachtExclusion {
  id: string;
  yachtId: string;
  text: string;
}

export interface YachtAmenity {
  id: string;
  yachtId: string;
  icon?: string;
  name: string;
}

export interface Review {
  id: string;
  userId?: string;
  yachtId: string;
  rating: number;
  title?: string;
  content?: string;
  customerName?: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  bookingId: string;
  userId?: string;
  yachtId: string;
  yacht?: Yacht;
  bookingDate: string;
  timeSlotId?: string;
  guests: number;
  
  basePrice: number;
  extraHours: number;
  addonsTotal: number;
  discount: number;
  taxAmount: number;
  totalAmount: number;
  
  status: BookingStatus;
  
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  
  couponId?: string;
  paymentId?: string;
  paymentStatus: PaymentStatus;
  
  specialRequests?: string;
  adminNotes?: string;
  
  items: BookingItem[];
  
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus = "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "REFUNDED" | "FAILED";

export interface BookingItem {
  id: string;
  bookingId: string;
  addonId?: string;
  addonName?: string;
  addonPrice?: number;
  quantity: number;
}

export interface Coupon {
  id: string;
  code: string;
  type: "PERCENTAGE" | "FIXED";
  value: number;
  minAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  startsAt: string;
  expiresAt: string;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location?: string;
  avatar?: string;
  content: string;
  rating: number;
  isActive: boolean;
  sortOrder: number;
}

export interface WebsiteSettings {
  companyName: string;
  logo: string;
  favicon: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface HomepageSettings {
  heroVideo?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroCtaText?: string;
  heroCtaLink?: string;
  featuredYachtIds: string[];
}

export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN";
}

export interface BookingFormData {
  yachtId: string;
  bookingDate: string;
  timeSlotId?: string;
  guests: number;
  extraHours: number;
  addonIds: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  specialRequests?: string;
  couponCode?: string;
}
