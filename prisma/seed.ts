// Seed script for Prisma database with SQLite
// Run with: npx tsx prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with SQLite...");

  // Create admin password setting
  await prisma.adminSetting.upsert({
    where: { key: "password" },
    update: {},
    create: {
      key: "password",
      value: "admin123",
    },
  });
  console.log("Created admin password setting");

  // Create admin email setting
  await prisma.adminSetting.upsert({
    where: { key: "adminEmail" },
    update: {},
    create: {
      key: "adminEmail",
      value: "goayachtworld@gmail.com",
    },
  });
  console.log("Created admin email setting");

  // Create default extras
  const defaultExtras = [
    { name: "Welcome Drink", price: 0 },
    { name: "Water Bottle", price: 0 },
    { name: "Ice", price: 0 },
    { name: "Music System", price: 0 },
    { name: "Sun Deck", price: 0 },
    { name: "BBQ Setup", price: 5000 },
    { name: "Catering Service", price: 10000 },
    { name: "Professional Photographer", price: 8000 },
    { name: "Decoration", price: 5000 },
    { name: "Extra Staff", price: 3000 },
  ];

  for (let i = 0; i < defaultExtras.length; i++) {
    const extra = defaultExtras[i];
    await prisma.extraService.upsert({
      where: { id: `extra-${i + 1}` },
      update: {},
      create: {
        id: `extra-${i + 1}`,
        name: extra.name,
        price: extra.price,
        sortOrder: i,
      },
    });
  }
  console.log("Created default extras");

  // Create default FAQ questions
  const defaultQuestions = [
    {
      question: "What is included in the yacht rental?",
      answer: "Our yacht rentals include the yacht, captain, crew, fuel, safety equipment, and basic amenities like water and ice. Additional services like catering, decoration, and photography can be added for an extra fee."
    },
    {
      question: "Can we bring our own food and drinks?",
      answer: "Yes, you are welcome to bring your own food and drinks. However, we also offer catering services that can be arranged in advance for a more hassle-free experience."
    },
    {
      question: "What happens in case of bad weather?",
      answer: "Your safety is our priority. In case of inclement weather, we will reschedule your booking to a convenient date or provide a full refund if rescheduling is not possible."
    },
    {
      question: "Is there a minimum booking duration?",
      answer: "Yes, the minimum booking duration is 2 hours. Most of our packages start from 2 hours and can be extended as needed."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, bank transfers, and UPI payments. A 50% advance is required to confirm your booking."
    },
  ];

  for (let i = 0; i < defaultQuestions.length; i++) {
    const q = defaultQuestions[i];
    await prisma.fAQQuestion.upsert({
      where: { id: `faq-${i + 1}` },
      update: {},
      create: {
        id: `faq-${i + 1}`,
        question: q.question,
        answer: q.answer,
        sortOrder: i,
      },
    });
  }
  console.log("Created default FAQ questions");

  // Create default policies
  await prisma.policy.upsert({
    where: { type: "privacy" },
    update: {},
    create: {
      type: "privacy",
      content: `<h2>Privacy Policy</h2>
<p>At Goa Yacht World, we respect your privacy and are committed to protecting your personal data.</p>
<h3>Information We Collect</h3>
<ul>
<li>Name and contact information</li>
<li>Booking details</li>
<li>Payment information</li>
<li>Communication preferences</li>
</ul>
<h3>How We Use Your Information</h3>
<p>We use your information to process bookings, communicate with you, and improve our services.</p>`,
    },
  });

  await prisma.policy.upsert({
    where: { type: "cancellation" },
    update: {},
    create: {
      type: "cancellation",
      content: `<h2>Cancellation Policy</h2>
<ul>
<li>Free cancellation up to 7 days before the booking date</li>
<li>50% refund for cancellations 3-7 days before</li>
<li>No refund for cancellations within 48 hours</li>
<li>Weather-related cancellations receive a full refund or free rescheduling</li>
</ul>`,
    },
  });

  await prisma.policy.upsert({
    where: { type: "refund" },
    update: {},
    create: {
      type: "refund",
      content: `<h2>Refund Policy</h2>
<p>Refunds are processed within 5-7 business days after approval.</p>
<ul>
<li>Full refunds for weather-related cancellations</li>
<li>Partial refunds based on our cancellation policy</li>
<li>No refunds for no-shows or late arrivals</li>
</ul>`,
    },
  });
  console.log("Created default policies");

  // Create about us content
  const aboutContent = {
    aboutTitle: "Welcome to Goa Yacht World",
    aboutIntro: "Experience the epitome of luxury on the Arabian Sea with Goa Yacht World. We offer premium yacht rentals for parties, celebrations, corporate events, and romantic cruises.",
    missionText: "Our mission is to provide unforgettable maritime experiences while ensuring the highest standards of safety, service, and luxury.",
    features: `Quality|Premium yachts maintained to the highest standards
Safety|Your safety is our top priority with certified crew
Expertise|Years of experience in luxury yacht services
Support|24/7 customer support available
Value|Best value for your investment`,
  };

  for (const [key, value] of Object.entries(aboutContent)) {
    await prisma.aboutUs.upsert({
      where: { key },
      update: {},
      create: { key, value },
    });
  }
  console.log("Created about us content");

  // Create yacht categories
  const categories = [
    { name: "Luxury Yacht", slug: "luxury-yacht", icon: "🚤", description: "Premium luxury yachts for special occasions", sortOrder: 1 },
    { name: "Party Yacht", slug: "party-yacht", icon: "🎉", description: "Perfect for parties and celebrations", sortOrder: 2 },
    { name: "Sunset Cruise", slug: "sunset-cruise", icon: "🌅", description: "Romantic sunset experiences", sortOrder: 3 },
    { name: "Corporate", slug: "corporate", icon: "💼", description: "Professional corporate events", sortOrder: 4 },
    { name: "Romantic", slug: "romantic", icon: "💕", description: "Intimate experiences for couples", sortOrder: 5 },
    { name: "Family", slug: "family", icon: "👨‍👩‍👧‍👦", description: "Perfect for family outings and adventures", sortOrder: 6 },
  ];

  for (const cat of categories) {
    await prisma.yachtCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("Created yacht categories");

  // Get luxury category and create sample yachts
  const luxuryCategory = await prisma.yachtCategory.findUnique({ where: { slug: "luxury-yacht" } });
  const partyCategory = await prisma.yachtCategory.findUnique({ where: { slug: "party-yacht" } });
  const sunsetCategory = await prisma.yachtCategory.findUnique({ where: { slug: "sunset-cruise" } });
  
  if (luxuryCategory) {
    await prisma.yacht.upsert({
      where: { slug: "sea-princess" },
      update: {},
      create: {
        name: "Sea Princess",
        slug: "sea-princess",
        description: "Experience the ultimate luxury on the Sea Princess, a 50ft motor yacht perfect for parties up to 25 guests. Features include air-conditioned cabins, sun deck, and premium sound system.",
        shortDescription: "50ft luxury motor yacht for parties up to 25 guests",
        capacity: 25,
        price: 25000,
        categoryId: luxuryCategory.id,
        location: "Vasco da Gama, Goa",
        featured: true,
        isActive: true,
        enableDateField: true,
        enableGuestField: true,
        enableTimeSlot: true,
        enableExtraHours: true,
        enableAddons: true,
        minimumBookingHours: 2,
        pricePerHour: 15000,
      },
    });
  }

  if (partyCategory) {
    await prisma.yacht.upsert({
      where: { slug: "party-queen" },
      update: {},
      create: {
        name: "Party Queen",
        slug: "party-queen",
        description: "The ultimate party yacht! Features a large deck, DJ setup, dance floor, and premium sound system. Perfect for birthday parties, bachelorette parties, and celebrations.",
        shortDescription: "Ultimate party yacht with DJ setup and dance floor",
        capacity: 40,
        price: 35000,
        categoryId: partyCategory.id,
        location: "Miramar, Goa",
        featured: true,
        isActive: true,
        enableDateField: true,
        enableGuestField: true,
        enableTimeSlot: true,
        enableExtraHours: true,
        enableAddons: true,
        minimumBookingHours: 3,
        pricePerHour: 20000,
      },
    });
  }

  if (sunsetCategory) {
    await prisma.yacht.upsert({
      where: { slug: "romantic-sunset" },
      update: {},
      create: {
        name: "Romantic Sunset",
        slug: "romantic-sunset",
        description: "Perfect for couples seeking a romantic experience. Watch the beautiful Goan sunset from the deck while enjoying champagne and a gourmet dinner prepared by our private chef.",
        shortDescription: "Romantic sunset cruise for couples with private chef",
        capacity: 8,
        price: 45000,
        categoryId: sunsetCategory.id,
        location: "Candolim, Goa",
        featured: true,
        isActive: true,
        enableDateField: true,
        enableGuestField: true,
        enableTimeSlot: true,
        enableExtraHours: false,
        enableAddons: true,
        minimumBookingHours: 2,
        pricePerHour: 25000,
      },
    });
  }
  console.log("Created sample yachts");

  // Create website settings
  await prisma.websiteSetting.upsert({
    where: { key: "company_name" },
    update: {},
    create: {
      key: "company_name",
      value: "Goa Yacht World",
      category: "general",
    },
  });

  await prisma.websiteSetting.upsert({
    where: { key: "whatsapp_number" },
    update: {},
    create: {
      key: "whatsapp_number",
      value: "918446275985",
      category: "contact",
    },
  });

  await prisma.websiteSetting.upsert({
    where: { key: "heroAutoScroll" },
    update: {},
    create: {
      key: "heroAutoScroll",
      value: "true",
      category: "homepage",
    },
  });

  console.log("Created website settings");

  // Create homepage settings
  await prisma.homepageSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      heroHeading: "Experience Luxury on the Arabian Sea",
      heroSubheading: "Premium yacht rentals in Goa for parties, celebrations & corporate events",
      heroCtaText: "Book Now",
      heroCtaLink: "/yachts",
    },
  });
  console.log("Created homepage settings");

  // Create testimonials
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      content: "Absolutely amazing experience! The yacht was beautiful and the crew was very professional. Perfect for my birthday celebration!",
      rating: 5,
    },
    {
      name: "Rahul Mehta",
      location: "Bangalore",
      content: "We hosted our corporate event on the yacht and it was a huge success. The facilities were top-notch.",
      rating: 5,
    },
    {
      name: "Anita Desai",
      location: "Pune",
      content: "The sunset cruise was romantic and perfect for our anniversary. Highly recommend!",
      rating: 5,
    },
  ];

  for (let i = 0; i < testimonials.length; i++) {
    await prisma.testimonial.upsert({
      where: { id: `testimonial-${i + 1}` },
      update: {},
      create: {
        id: `testimonial-${i + 1}`,
        ...testimonials[i],
        sortOrder: i,
      },
    });
  }
  console.log("Created testimonials");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
