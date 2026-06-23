import Link from "next/link";
import { Phone, MessageCircle, Calendar } from "lucide-react";

export function CTABanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Ready to Set Sail?
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
          Book your dream yacht today and create unforgettable memories on the Arabian Sea. 
          Our team is available 24/7 to assist you.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            Book Now
          </Link>
          <a
            href="tel:+918446275985"
            className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Call Us
          </a>
          <a
            href="https://wa.me/918446275985"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-whatsapp px-8 py-4 rounded-lg font-semibold text-lg hover:bg-whatsapp/90 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
