"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Star, Clock, MessageCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Yacht } from "@/types";

interface YachtCardProps {
  yacht: Yacht;
}

export function YachtCard({ yacht }: YachtCardProps) {
  const primaryImage = yacht.images?.find((img) => img.isPrimary) || yacht.images?.[0];
  
  return (
    <div className="yacht-card group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={yacht.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-4xl">🚤</span>
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Featured Badge - 5 Stars */}
        {yacht.featured && (
          <div className="absolute top-4 left-4 flex gap-0.5">
            <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
            <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
            <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
            <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
            <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <a
            href={`https://wa.me/918446275985?text=Hi%2C%20I%20want%20to%20inquire%20about%20${encodeURIComponent(yacht.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-whatsapp rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            onClick={(e) => e.stopPropagation()}
          >
            <MessageCircle className="w-5 h-5 text-white" fill="white" />
          </a>
        </div>
        
        {/* Price Badge */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
          <span className="text-xs text-gray-500">Starting from</span>
          <p className="text-lg font-bold text-primary">
            {formatCurrency(yacht.price)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {yacht.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {yacht.shortDescription || yacht.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{yacht.capacity} Guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{yacht.minimumBookingHours}+ Hours</span>
          </div>
        </div>

        {/* Amenities Preview */}
        {yacht.amenities && yacht.amenities.length > 0 && (
          <div className="flex gap-2 mb-4">
            {yacht.amenities.slice(0, 4).map((amenity, index) => (
              <span
                key={index}
                className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm"
                title={amenity.name}
              >
                {amenity.icon || "✓"}
              </span>
            ))}
            {yacht.amenities.length > 4 && (
              <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-500">
                +{yacht.amenities.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            href={`/yachts/${yacht.slug}`}
            className="flex-1 bg-primary hover:bg-primary/90 text-white text-center py-3 rounded-lg font-semibold transition-colors"
          >
            View Details
          </Link>
          <Link
            href={`/book?yacht=${yacht.slug}`}
            className="flex-1 bg-luxury-gold hover:bg-luxury-gold/90 text-black text-center py-3 rounded-lg font-semibold transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
