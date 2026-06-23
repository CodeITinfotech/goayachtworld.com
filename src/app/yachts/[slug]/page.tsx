"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  Users, 
  Clock, 
  MapPin, 
  Check, 
  X as XIcon,
  Star,
  Calendar,
  MessageCircle,
  Share2,
  Heart,
  ZoomIn,
  ChevronRight
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getYachtBySlug, getCategories } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Yacht, TimeSlot, ExtraHour, YachtAddon } from "@/types";

export default function YachtDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [yacht, setYacht] = useState<Yacht | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [guests, setGuests] = useState(1);
  const [selectedExtraHours, setSelectedExtraHours] = useState<ExtraHour | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getYachtBySlug(slug);
    if (data) {
      setYacht(data);
      if (data.timeSlots && data.timeSlots.length > 0) {
        setSelectedTimeSlot(data.timeSlots[0]);
      }
    }
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!yacht) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Yacht Not Found</h1>
          <p className="text-gray-600 mb-6">The yacht you're looking for doesn't exist.</p>
          <Link href="/yachts" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold">
            Browse Yachts
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const images = yacht.images || [];
  const primaryImage = images.find(img => img.isPrimary) || images[0];

  const calculateTotal = () => {
    let total = selectedTimeSlot?.price || yacht.price;
    
    if (selectedExtraHours) {
      total += selectedExtraHours.price;
    }
    
    selectedAddons.forEach(addonId => {
      const addon = yacht.addons?.find(a => a.id === addonId);
      if (addon) {
        total += addon.price;
      }
    });
    
    return total;
  };

  const handleBookNow = () => {
    const params = new URLSearchParams();
    params.set('yacht', yacht.slug);
    if (selectedDate) params.set('date', selectedDate);
    if (selectedTimeSlot) params.set('slot', selectedTimeSlot.id);
    params.set('guests', guests.toString());
    if (selectedExtraHours) params.set('hours', selectedExtraHours.id);
    selectedAddons.forEach(id => params.append('addons', id));
    
    router.push(`/book?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/yachts" className="text-gray-500 hover:text-primary">Yachts</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium">{yacht.name}</span>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-3 gap-4">
            {/* Main Image */}
            <div className="lg:col-span-2 relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer group" onClick={() => setShowGallery(true)}>
              {primaryImage ? (
                <Image
                  src={primaryImage.url}
                  alt={yacht.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-6xl">🚤</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <ZoomIn className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); }}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Grid */}
            <div className="hidden lg:grid grid-rows-3 gap-4">
              {images.slice(0, 3).map((img, idx) => (
                <div 
                  key={img.id} 
                  className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(idx)}
                >
                  <Image src={img.url} alt={yacht.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-sm text-primary font-medium">Premium Yacht</span>
                    <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mt-1">{yacht.name}</h1>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 border rounded-full flex items-center justify-center hover:bg-gray-50">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>Up to {yacht.capacity} guests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>Min {yacht.minimumBookingHours} hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{yacht.location || "Goa, India"}</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">{yacht.description}</p>
              </div>

              {/* Amenities */}
              {yacht.amenities && yacht.amenities.length > 0 && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="font-display text-xl font-bold mb-6">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {yacht.amenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <span className="text-2xl">{amenity.icon}</span>
                        <span className="text-sm font-medium">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions & Exclusions */}
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-500" />
                      What's Included
                    </h2>
                    <ul className="space-y-3">
                      {yacht.inclusions?.map((item) => (
                        <li key={item.id} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-500 shrink-0" />
                          <span className="text-gray-600">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {yacht.exclusions && yacht.exclusions.length > 0 && (
                    <div>
                      <h2 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                        <XIcon className="w-5 h-5 text-red-500" />
                        Not Included
                      </h2>
                      <ul className="space-y-3">
                        {yacht.exclusions.map((item) => (
                          <li key={item.id} className="flex items-center gap-3">
                            <XIcon className="w-5 h-5 text-red-500 shrink-0" />
                            <span className="text-gray-600">{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Addons */}
              {yacht.addons && yacht.addons.length > 0 && (
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                  <h2 className="font-display text-xl font-bold mb-6">Available Add-ons</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {yacht.addons.map((addon) => (
                      <label 
                        key={addon.id}
                        className={cn(
                          "flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all",
                          selectedAddons.includes(addon.id) 
                            ? "border-primary bg-primary/5" 
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={selectedAddons.includes(addon.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedAddons([...selectedAddons, addon.id]);
                            } else {
                              setSelectedAddons(selectedAddons.filter(id => id !== addon.id));
                            }
                          }}
                          className="mt-1 w-5 h-5 text-primary rounded focus:ring-primary"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{addon.name}</span>
                            <span className="text-primary font-semibold">{formatCurrency(addon.price)}</span>
                          </div>
                          {addon.description && (
                            <p className="text-sm text-gray-500 mt-1">{addon.description}</p>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                <div className="mb-6">
                  <span className="text-sm text-gray-500">Starting from</span>
                  <p className="text-3xl font-bold text-primary">{formatCurrency(yacht.price)}</p>
                  <span className="text-sm text-gray-500">per {yacht.minimumBookingHours} hours</span>
                </div>

                {/* Date Selection */}
                {yacht.enableDateField && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Select Date
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                    />
                  </div>
                )}

                {/* Time Slots */}
                {yacht.enableTimeSlot && yacht.timeSlots && yacht.timeSlots.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
                    <div className="space-y-2">
                      {yacht.timeSlots.map((slot) => (
                        <label
                          key={slot.id}
                          className={cn(
                            "flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all",
                            selectedTimeSlot?.id === slot.id
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="timeSlot"
                              checked={selectedTimeSlot?.id === slot.id}
                              onChange={() => setSelectedTimeSlot(slot)}
                              className="w-4 h-4 text-primary"
                            />
                            <span className="font-medium">{slot.name}</span>
                          </div>
                          <span className="text-primary font-semibold">{formatCurrency(slot.price)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Guest Count */}
                {yacht.enableGuestField && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="w-4 h-4 inline mr-2" />
                      Number of Guests
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                    >
                      {[...Array(Math.min(yacht.capacity, 50))].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Max {yacht.capacity} guests</p>
                  </div>
                )}

                {/* Extra Hours */}
                {yacht.enableExtraHours && yacht.extraHours && yacht.extraHours.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Extra Hours</label>
                    <div className="space-y-2">
                      {yacht.extraHours.map((extra) => (
                        <label
                          key={extra.id}
                          className={cn(
                            "flex items-center justify-between p-3 border-2 rounded-lg cursor-pointer transition-all",
                            selectedExtraHours?.id === extra.id
                              ? "border-primary bg-primary/5"
                              : "border-gray-200 hover:border-gray-300"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="extraHours"
                              checked={selectedExtraHours?.id === extra.id}
                              onChange={() => setSelectedExtraHours(extra)}
                              className="w-4 h-4 text-primary"
                            />
                            <span className="font-medium">{extra.hours} Hour{extra.hours > 1 ? 's' : ''}</span>
                          </div>
                          <span className="text-primary font-semibold">+{formatCurrency(extra.price)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="border-t pt-6 mb-6">
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatCurrency(calculateTotal())}</span>
                  </div>
                  <p className="text-xs text-gray-500 text-right mt-1">Inclusive of all taxes</p>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={handleBookNow}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-semibold text-lg transition-colors"
                  >
                    Book Now
                  </button>
                  <a
                    href={`https://wa.me/918446275985?text=Hi%2C%20I%20want%20to%20inquire%20about%20${encodeURIComponent(yacht.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-whatsapp hover:bg-whatsapp/90 text-white py-4 rounded-xl font-semibold transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                </div>

                {/* Trust */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>4.9 rated by 500+ guests</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
          >
            <XIcon className="w-8 h-8" />
          </button>
          <button
            onClick={() => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={() => setSelectedImage((prev) => (prev + 1) % images.length)}
            className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="relative w-full max-w-5xl aspect-[16/10] mx-4">
            <Image
              src={images[selectedImage]?.url || ''}
              alt={yacht.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-4 flex gap-2">
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setSelectedImage(idx)}
                className={cn(
                  "w-16 h-12 rounded overflow-hidden border-2",
                  idx === selectedImage ? "border-white" : "border-transparent"
                )}
              >
                <Image src={img.url} alt="" width={64} height={48} className="object-cover w-full h-full" />
              </button>
            ))}
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
