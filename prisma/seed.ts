// Seed script for Prisma database
// Run with: npx tsx prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@goayachtworld.com" },
    update: {},
    create: {
      email: "admin@goayachtworld.com",
      password: "$2a$10$XQxBtMLxKwK8Q3V5p5k5/.rQ5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z", // "admin123" - change in production
      name: "Admin User",
      role: "ADMIN",
    },
  });
  console.log("Created admin user:", admin.email);

  // Create yacht categories
  const categories = [
    { name: "Luxury Yacht", slug: "luxury-yacht", icon: "🚤", description: "Premium luxury yachts for special occasions", sortOrder: 1 },
    { name: "Party Yacht", slug: "party-yacht", icon: "🎉", description: "Perfect for parties and celebrations", sortOrder: 2 },
    { name: "Sunset Cruise", slug: "sunset-cruise", icon: "🌅", description: "Romantic sunset experiences", sortOrder: 3 },
    { name: "Corporate", slug: "corporate", icon: "💼", description: "Professional corporate events", sortOrder: 4 },
    { name: "Romantic", slug: "romantic", icon: "💕", description: "Intimate experiences for couples", sortOrder: 5 },
  ];

  for (const cat of categories) {
    await prisma.yachtCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("Created yacht categories");

  // Get category IDs
  const luxuryCategory = await prisma.yachtCategory.findUnique({ where: { slug: "luxury-yacht" } });
  
  if (luxuryCategory) {
    // Create sample yacht
    const yacht = await prisma.yacht.upsert({
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
    console.log("Created yacht:", yacht.name);
  }

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
