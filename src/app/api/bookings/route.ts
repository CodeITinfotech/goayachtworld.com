import { NextRequest, NextResponse } from "next/server";
import { generateBookingId } from "@/lib/utils";

// Demo bookings storage (in production, use database)
const bookings: any[] = [];

export async function GET() {
  return NextResponse.json(bookings);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      yachtId,
      yachtSlug,
      bookingDate,
      timeSlotId,
      guests,
      extraHourId,
      addonIds,
      customerName,
      customerEmail,
      customerPhone,
      specialRequests,
      couponCode,
      totalAmount,
    } = body;

    // Validate required fields
    if (!yachtId || !bookingDate || !customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate booking ID
    const bookingId = generateBookingId();

    // Create booking (demo - in production, save to database)
    const newBooking = {
      id: bookingId,
      bookingId,
      yachtId,
      yachtSlug,
      bookingDate,
      timeSlotId,
      guests,
      extraHourId,
      addonIds,
      customer: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
      },
      specialRequests,
      couponCode,
      totalAmount,
      status: "PENDING",
      paymentStatus: "PENDING",
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);

    return NextResponse.json({
      success: true,
      booking: newBooking,
      message: "Booking created successfully",
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
