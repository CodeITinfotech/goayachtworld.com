# 🚤 Goa Yacht World - Premium Platform

A complete Next.js 14 platform for luxury yacht rentals in Goa, India.

## Features

- **Premium UI/UX** - Luxury design inspired by Yacht Club India
- **Dynamic Yacht Management** - Admin panel to manage all yachts
- **Booking Engine** - Complete booking flow with addons, time slots, extras
- **Razorpay Integration** - Payment gateway ready
- **Mobile Responsive** - Works on all devices
- **SEO Optimized** - Schema markup, meta tags, sitemap

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Payments**: Razorpay (integration ready)
- **Storage**: AWS S3 (integration ready)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database URL and secrets

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database
npm run db:seed

# Start development server
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
goayachtworld-platform/
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── admin/        # Admin panel pages
│   │   ├── api/          # API routes
│   │   ├── book/         # Booking flow
│   │   └── yachts/       # Public yacht pages
│   ├── components/       # React components
│   ├── lib/             # Utilities & data
│   ├── store/           # Zustand stores
│   └── types/           # TypeScript types
├── public/              # Static files
└── package.json
```

## Admin Panel

Access at `/admin/dashboard`:
- Dashboard with stats
- Yacht management (CRUD)
- Booking management
- Customer management
- Coupon management
- Review management
- Settings (website config, homepage CMS)

## Environment Variables

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
RAZORPAY_KEY_ID="rzp_..."
RAZORPAY_KEY_SECRET="..."
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_BUCKET_NAME="..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```bash
docker build -t goayachtworld .
docker run -p 3000:3000 --env-file .env goayachtworld
```

## Database Schema

### Core Tables
- **User** - Admin & customer accounts
- **Yacht** - Yacht details & booking config
- **YachtCategory** - Categories (Luxury, Party, etc.)
- **YachtImage** - Yacht photos
- **TimeSlot** - Available time slots per yacht
- **ExtraHour** - Extra hour pricing
- **YachtAddon** - Add-on services (DJ, Cake, etc.)
- **Booking** - All bookings
- **Coupon** - Discount codes
- **Review** - Customer reviews
- **WebsiteSetting** - CMS settings
- **HomepageSetting** - Homepage content
- **CMSPage** - Static pages

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/yachts | List all yachts |
| GET | /api/yachts?slug=xxx | Get yacht by slug |
| GET | /api/yachts?category=xxx | Filter by category |
| POST | /api/bookings | Create booking |
| GET | /api/bookings | List bookings (admin) |
| PUT | /api/bookings/[id] | Update booking |
| POST | /api/upload | Upload image |
| POST | /api/auth/login | Admin login |

## Customization

### Colors (tailwind.config.ts)
```ts
colors: {
  primary: { /* Blues */ },
  luxury: {
    gold: '#D4AF37',
    dark: '#1a1a2e',
    // ...
  },
}
```

### Fonts
- Display: Playfair Display (headings)
- Body: Inter (content)

## License

© 2024 Goa Yacht World. All rights reserved.
