"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { getTestimonials } from "@/lib/data";

export function TestimonialSlider() {
  const testimonials = getTestimonials();
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const testimonial = testimonials[currentIndex];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative bg-white rounded-2xl shadow-xl p-8 md:p-12">
        {/* Quote Icon */}
        <div className="absolute -top-4 left-8 w-12 h-12 bg-primary rounded-full flex items-center justify-center">
          <Quote className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <div className="text-center">
          {/* Avatar */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-200 overflow-hidden">
            {testimonial.avatar ? (
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={80}
                height={80}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-2xl font-bold">
                {testimonial.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < testimonial.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }`}
              />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
            "{testimonial.content}"
          </blockquote>

          {/* Author */}
          <div>
            <p className="font-semibold text-gray-900">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.location}</p>
          </div>
        </div>

        {/* Navigation */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors md:hidden"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors md:hidden"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-primary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
