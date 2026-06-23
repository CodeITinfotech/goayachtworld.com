"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  ChevronLeft,
  Calendar,
  Users,
  Clock,
  Plus,
  Minus,
  Check,
  CreditCard,
  MessageCircle,
  Shield,
  Star
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getYachtBySlug } from "@/lib/data";
import { formatCurrency, generateBookingId } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import type { Yacht, TimeSlot, ExtraHour, YachtAddon } from "@/types";

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const yachtSlug = searchParams.get("yacht");
  const preselectedDate = searchParams.get("date") || "";
  const preselectedSlot = searchParams.get("slot") || "";
  const preselectedGuests = parseInt(searchParams.get("guests") || "1");
  const preselectedHours = searchParams.get("hours") || "";
  const preselectedAddons = searchParams.get("addons")?.split(",") || [];
  
  const [step, setStep] = useState(1);
  const [yacht, setYacht] = useState<Yacht | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Form Data
  const [selectedDate, setSelectedDate] = useState(preselectedDate);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [guests, setGuests] = useState(preselectedGuests);
  const [selectedExtraHours, setSelectedExtraHours] = useState<ExtraHour | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(preselectedAddons);
  
  // Customer Info
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  
  // Coupon
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0);
  
  // Payment
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (yachtSlug) {
      const data = getYachtBySlug(yachtSlug);
      if (data) {
        setYacht(data);
        // Set default time slot
        if (preselectedSlot && data.timeSlots) {
          const slot = data.timeSlots.find(s => s.id === preselectedSlot);
          if (slot) setSelectedTimeSlot(slot);
        } else if (data.timeSlots && data.timeSlots.length > 0) {
          setSelectedTimeSlot(data.timeSlots[0]);
        }
        // Set extra hours if preselected
        if (preselectedHours && data.extraHours) {
          const hours = data.extraHours.find(h => h.id === preselectedHours);
          if (hours) setSelectedExtraHours(hours);
        }
      }
    }
    setLoading(false);
  }, [yachtSlug, preselectedSlot, preselectedHours]);

  const calculateSubtotal = () => {
    if (!yacht) return 0;
    let subtotal = selectedTimeSlot?.price || yacht.price;
    if (selectedExtraHours) subtotal += selectedExtraHours.price;
    selectedAddons.forEach(addonId => {
      const addon = yacht.addons?.find(a => a.id === addonId);
      if (addon) subtotal += addon.price;
    });
    return subtotal;
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // 18% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() - couponDiscount;
  };

  const handleApplyCoupon = () => {
    // Demo coupon logic
    if (couponCode.toUpperCase() === "FIRST10") {
      setCouponDiscount(calculateSubtotal() * 0.1);
      toast({ title: "Coupon applied!", description: "10% discount applied" });
    } else if (couponCode.toUpperCase() === "YACHT500") {
      setCouponDiscount(500);
      toast({ title: "Coupon applied!", description: "₹500 discount applied" });
    } else {
      toast({ title: "Invalid coupon", description: "Please enter a valid coupon code", variant: "destructive" });
    }
  };

  const handleSubmitBooking = async () => {
    if (!yacht) return;
    
    if (!selectedDate || !customerName || !customerEmail || !customerPhone) {
      toast({ title: "Missing information", description: "Please fill all required fields", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const bookingId = generateBookingId();
    
    toast({ title: "Booking Successful!", description: `Your booking ID is ${bookingId}` });
    
    // Redirect to confirmation
    router.push(`/booking/${bookingId}?yacht=${yacht.slug}&amount=${calculateTotal()}`);
    setIsProcessing(false);
  };

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
          <h1 className="text-3xl font-bold mb-4">No Yacht Selected</h1>
          <p className="text-gray-600 mb-6">Please select a yacht to book.</p>
          <Link href="/yachts" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold">
            Browse Yachts
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm",
                  step >= s ? "bg-primary text-white" : "bg-gray-200 text-gray-500"
                )}>
                  {step > s ? <Check className="w-4 h-4" /> : s}
                </div>
                {s < 3 && (
                  <div className={cn("w-16 h-0.5 mx-2", step > s ? "bg-primary" : "bg-gray-200")} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 mt-2 text-sm">
            <span className={step >= 1 ? "text-primary font-medium" : "text-gray-500"}>Details</span>
            <span className={step >= 2 ? "text-primary font-medium" : "text-gray-500"}>Your Info</span>
            <span className={step >= 3 ? "text-primary font-medium" : "text-gray-500"}>Payment</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Booking Details */}
            {step === 1 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="font-display text-2xl font-bold mb-6">Booking Details</h2>
                
                {/* Date */}
                {yacht.enableDateField && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Select Date *
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                      required
                    />
                  </div>
                )}

                {/* Time Slot */}
                {yacht.enableTimeSlot && yacht.timeSlots && yacht.timeSlots.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Select Time Slot
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {yacht.timeSlots.map((slot) => (
                        <label
                          key={slot.id}
                          className={cn(
                            "flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all",
                            selectedTimeSlot?.id === slot.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
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

                {/* Guests */}
                {yacht.enableGuestField && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="w-4 h-4 inline mr-2" />
                      Number of Guests
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-12 h-12 border rounded-lg flex items-center justify-center hover:bg-gray-50"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="text-2xl font-semibold w-16 text-center">{guests}</span>
                      <button
                        onClick={() => setGuests(Math.min(yacht.capacity, guests + 1))}
                        className="w-12 h-12 border rounded-lg flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                      <span className="text-gray-500">Max {yacht.capacity} guests</span>
                    </div>
                  </div>
                )}

                {/* Extra Hours */}
                {yacht.enableExtraHours && yacht.extraHours && yacht.extraHours.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Extra Hours (Optional)</label>
                    <div className="grid grid-cols-2 gap-3">
                      {yacht.extraHours.map((extra) => (
                        <label
                          key={extra.id}
                          className={cn(
                            "flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all",
                            selectedExtraHours?.id === extra.id ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
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

                {/* Addons */}
                {yacht.enableAddons && yacht.addons && yacht.addons.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-4">Add-ons (Optional)</label>
                    <div className="space-y-3">
                      {yacht.addons.map((addon) => (
                        <label
                          key={addon.id}
                          className={cn(
                            "flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all",
                            selectedAddons.includes(addon.id) ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"
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
                            className="w-5 h-5 text-primary rounded focus:ring-primary"
                          />
                          <div className="flex-1">
                            <span className="font-medium">{addon.name}</span>
                            {addon.description && <p className="text-sm text-gray-500">{addon.description}</p>}
                          </div>
                          <span className="text-primary font-semibold">{formatCurrency(addon.price)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-semibold text-lg transition-colors"
                >
                  Continue to Your Info
                </button>
              </div>
            )}

            {/* Step 2: Customer Info */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="font-display text-2xl font-bold mb-6">Your Information</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
                        placeholder="+91 9876543210"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests (Optional)</label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows={4}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none resize-none"
                      placeholder="Any special requests or requirements..."
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-4 border rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-semibold text-lg transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="font-display text-2xl font-bold mb-6">Payment Method</h2>
                
                <div className="space-y-4 mb-8">
                  <label className="flex items-center gap-4 p-4 border-2 border-primary bg-primary/5 rounded-xl cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-primary" />
                    <CreditCard className="w-6 h-6" />
                    <div>
                      <span className="font-semibold">Pay with Cash/Transfer</span>
                      <p className="text-sm text-gray-500">Pay directly to our bank account or UPI</p>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-gray-300">
                    <input type="radio" name="payment" className="w-5 h-5 text-primary" />
                    <MessageCircle className="w-6 h-6 text-whatsapp" />
                    <div>
                      <span className="font-semibold">Pay via WhatsApp</span>
                      <p className="text-sm text-gray-500">We'll send you payment link on WhatsApp</p>
                    </div>
                  </label>
                </div>

                {/* Coupon */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Have a coupon?</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none uppercase"
                      placeholder="Enter coupon code"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-4 border rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmitBooking}
                    disabled={isProcessing}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Confirm Booking - {formatCurrency(calculateTotal())}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h3 className="font-display text-lg font-bold mb-4">Booking Summary</h3>
              
              {/* Yacht Info */}
              <div className="flex gap-4 mb-6 pb-6 border-b">
                {yacht.images?.[0] && (
                  <div className="w-20 h-20 relative rounded-lg overflow-hidden shrink-0">
                    <Image src={yacht.images[0].url} alt={yacht.name} fill className="object-cover" />
                  </div>
                )}
                <div>
                  <h4 className="font-semibold">{yacht.name}</h4>
                  <p className="text-sm text-gray-500">{yacht.location || "Goa, India"}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                {selectedDate && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium">{new Date(selectedDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                  </div>
                )}
                {selectedTimeSlot && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Time</span>
                    <span className="font-medium">{selectedTimeSlot.name}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Guests</span>
                  <span className="font-medium">{guests}</span>
                </div>
                {selectedExtraHours && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Extra Hours</span>
                    <span className="font-medium">+{selectedExtraHours.hours}h</span>
                  </div>
                )}
              </div>

              {/* Addons */}
              {selectedAddons.length > 0 && (
                <div className="mb-6 pb-6 border-b">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Add-ons</h4>
                  {selectedAddons.map(addonId => {
                    const addon = yacht.addons?.find(a => a.id === addonId);
                    return addon ? (
                      <div key={addonId} className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">{addon.name}</span>
                        <span className="font-medium">{formatCurrency(addon.price)}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              )}

              {/* Pricing */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{formatCurrency(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">GST (18%)</span>
                  <span>{formatCurrency(calculateTax())}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{formatCurrency(couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(calculateTotal())}</span>
                </div>
              </div>

              {/* Trust */}
              <div className="space-y-3 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Secure booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>4.9 rated by 500+ guests</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div></div>}>
      <BookingContent />
    </Suspense>
  );
}
