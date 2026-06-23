"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  return (
    <Link
      href="https://wa.me/918446275985?text=Hi%2C%20I%20want%20to%20inquire%20about%20yacht%20rental%20in%20Goa"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" fill="white" />
    </Link>
  );
}
