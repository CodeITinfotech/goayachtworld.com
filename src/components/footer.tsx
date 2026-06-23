import Link from "next/link";
import { Anchor, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-luxury-darker text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Anchor className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-xl">Goa Yacht</span>
                <span className="font-display text-luxury-gold text-xl">World</span>
              </div>
            </Link>
            <p className="text-white/60 mb-6">
              Premium yacht rentals in Goa for parties, celebrations, and corporate events. 
              Experience luxury on the Arabian Sea.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/yachts" className="text-white/60 hover:text-white transition-colors">
                  All Yachts
                </Link>
              </li>
              <li>
                <Link href="/yachts?category=luxury-yacht" className="text-white/60 hover:text-white transition-colors">
                  Luxury Yachts
                </Link>
              </li>
              <li>
                <Link href="/yachts?category=party-yacht" className="text-white/60 hover:text-white transition-colors">
                  Party Yachts
                </Link>
              </li>
              <li>
                <Link href="/yachts?category=sunset-cruise" className="text-white/60 hover:text-white transition-colors">
                  Sunset Cruises
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/60 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/60 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Yacht Types */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Yacht Types</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/yachts?category=party-yacht" className="text-white/60 hover:text-white transition-colors">
                  Birthday Party Yachts
                </Link>
              </li>
              <li>
                <Link href="/yachts?category=romantic" className="text-white/60 hover:text-white transition-colors">
                  Romantic Cruises
                </Link>
              </li>
              <li>
                <Link href="/yachts?category=corporate" className="text-white/60 hover:text-white transition-colors">
                  Corporate Events
                </Link>
              </li>
              <li>
                <Link href="/yachts?category=luxury-yacht" className="text-white/60 hover:text-white transition-colors">
                  Family Trips
                </Link>
              </li>
              <li>
                <Link href="/yachts?category=sunset-cruise" className="text-white/60 hover:text-white transition-colors">
                  Sunset Cruises
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
                <span className="text-white/60">
                  Vasco da Gama, Goa 403802, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-luxury-gold shrink-0" />
                <a href="tel:+918446275985" className="text-white/60 hover:text-white transition-colors">
                  +91 8446275985
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-luxury-gold shrink-0" />
                <a href="mailto:info@goayachtworld.com" className="text-white/60 hover:text-white transition-colors">
                  info@goayachtworld.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Goa Yacht World. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-white/40 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/40 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cancellation" className="text-white/40 hover:text-white transition-colors">
                Cancellation Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
