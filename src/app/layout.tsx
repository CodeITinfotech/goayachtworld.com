import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Goa Yacht World | Luxury Yacht Rentals in Goa",
    template: "%s | Goa Yacht World",
  },
  description: "Experience premium luxury yacht rentals in Goa. Book private yachts, party boats, sunset cruises & corporate events. Starting ₹12,000. Verified operators, instant confirmation.",
  keywords: ["yacht rental Goa", "luxury yacht", "party boat", "sunset cruise", "private charter", "corporate yacht", "Goa boat rental"],
  authors: [{ name: "Goa Yacht World" }],
  creator: "Goa Yacht World",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://goayachtworld.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Goa Yacht World",
    title: "Goa Yacht World | Luxury Yacht Rentals in Goa",
    description: "Experience premium luxury yacht rentals in Goa. Book private yachts, party boats, sunset cruises & corporate events.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Goa Yacht World",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Goa Yacht World | Luxury Yacht Rentals",
    description: "Premium yacht rentals in Goa for parties, events & celebrations.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
