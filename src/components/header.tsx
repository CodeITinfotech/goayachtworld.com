"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Anchor, ChevronDown, Ship, Users, Star, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

const yachtCategories = [
  { name: "Luxury Yachts", href: "/yachts?category=luxury-yacht" },
  { name: "Party Yachts", href: "/yachts?category=party-yacht" },
  { name: "Sunset Cruises", href: "/yachts?category=sunset-cruise" },
  { name: "Corporate", href: "/yachts?category=corporate" },
  { name: "Romantic", href: "/yachts?category=romantic" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isYachtDropdownOpen, setIsYachtDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-luxury-dark/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Anchor className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-display font-bold text-xl">Goa Yacht</span>
              <span className="text-luxury-gold font-display text-xl">World</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-white/80 hover:text-white transition-colors">
              Home
            </Link>
            
            {/* Yachts Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsYachtDropdownOpen(true)}
                onMouseLeave={() => setIsYachtDropdownOpen(false)}
                className="flex items-center gap-1 text-white/80 hover:text-white transition-colors"
              >
                Yachts
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isYachtDropdownOpen && (
                <div 
                  className="absolute top-full left-0 pt-2"
                  onMouseEnter={() => setIsYachtDropdownOpen(true)}
                  onMouseLeave={() => setIsYachtDropdownOpen(false)}
                >
                  <div className="bg-white rounded-lg shadow-xl py-2 min-w-[200px]">
                    {yachtCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/about" className="text-white/80 hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+918446275985"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">+91 8446275985</span>
            </a>
            <Link
              href="/book"
              className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "lg:hidden bg-luxury-darker border-t border-white/10",
        isMobileMenuOpen ? "block" : "hidden"
      )}>
        <div className="container mx-auto px-4 py-4 space-y-4">
          <Link href="/" className="block text-white/80 hover:text-white py-2">
            Home
          </Link>
          <div className="space-y-2">
            <span className="text-white/60 text-sm">Yachts</span>
            {yachtCategories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="block pl-4 text-white/70 hover:text-white py-1 text-sm"
              >
                {category.name}
              </Link>
            ))}
          </div>
          <Link href="/about" className="block text-white/80 hover:text-white py-2">
            About
          </Link>
          <Link href="/contact" className="block text-white/80 hover:text-white py-2">
            Contact
          </Link>
          <div className="pt-4 border-t border-white/10">
            <a
              href="tel:+918446275985"
              className="flex items-center gap-2 text-white/80 mb-4"
            >
              <Phone className="w-4 h-4" />
              +91 8446275985
            </a>
            <Link
              href="/book"
              className="block w-full bg-primary text-white text-center py-3 rounded-lg font-semibold"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
