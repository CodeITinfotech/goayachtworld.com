import Link from "next/link";
import Image from "next/image";
import { 
  Anchor, 
  Users, 
  Star, 
  Shield, 
  Clock, 
  MessageCircle,
  Phone,
  ChevronRight,
  PartyPopper,
  Heart,
  Briefcase,
  Sunrise,
  Sparkles,
  Gift
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { YachtCard } from "@/components/yacht-card";
import { TrustBadge } from "@/components/trust-badge";
import { TestimonialSlider } from "@/components/testimonial-slider";
import { FAQSection } from "@/components/faq-section";
import { CTABanner } from "@/components/cta-banner";
import { getFeaturedYachts, getCategories } from "@/lib/data";

export default function HomePage() {
  const featuredYachts = getFeaturedYachts();
  const categories = getCategories();

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 bg-luxury-dark">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60"
            poster="/images/hero-poster.jpg"
          >
            <source src="/videos/hero-yacht.mp4" type="video/mp4" />
            <source src="/videos/hero-yacht.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 video-overlay" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center justify-center px-4">
          <div className="text-center max-w-5xl mx-auto animate-fade-in">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-6">
              Premium Yacht Rentals in Goa
            </span>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Experience Luxury on the
              <span className="block text-transparent bg-clip-text gold-gradient">
                Arabian Sea
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Book premium yachts for parties, celebrations & corporate events. 
              Verified operators, instant confirmation, 24/7 support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/yachts"
                className="btn-luxury inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
              >
                Explore Yachts
                <ChevronRight className="w-5 h-5" />
              </Link>
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all border border-white/30"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/50 flex items-start justify-center p-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <TrustBadge 
              icon={<Shield className="w-8 h-8 text-primary" />}
              title="Verified Operators"
              description="All yachts verified"
            />
            <TrustBadge 
              icon={<Clock className="w-8 h-8 text-primary" />}
              title="24/7 Support"
              description="Always available"
            />
            <TrustBadge 
              icon={<Star className="w-8 h-8 text-primary" />}
              title="4.9 Rating"
              description="500+ reviews"
            />
            <TrustBadge 
              icon={<Users className="w-8 h-8 text-primary" />}
              title="10,000+ Guests"
              description="Served successfully"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Experience
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From romantic sunset cruises to corporate events, we have the perfect yacht for every occasion.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/yachts?category=${category.slug}`}
                className="group bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <span className="text-3xl">{category.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Yachts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Featured Yachts
              </h2>
              <p className="text-gray-600">
                Hand-picked luxury yachts for your perfect experience
              </p>
            </div>
            <Link
              href="/yachts"
              className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
            >
              View All
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredYachts.slice(0, 6).map((yacht) => (
              <YachtCard key={yacht.id} yacht={yacht} />
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              href="/yachts"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold"
            >
              View All Yachts
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 luxury-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Why Choose Goa Yacht World?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              We provide the finest yacht rental experience in Goa with unmatched service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Anchor className="w-10 h-10" />,
                title: "Premium Fleet",
                description: "Curated collection of luxury yachts"
              },
              {
                icon: <Shield className="w-10 h-10" />,
                title: "Safety First",
                description: "Coast Guard certified vessels"
              },
              {
                icon: <Clock className="w-10 h-10" />,
                title: "Flexible Timings",
                description: "Multiple time slots available"
              },
              {
                icon: <MessageCircle className="w-10 h-10" />,
                title: "Instant Support",
                description: "WhatsApp & phone support"
              },
            ].map((item, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center text-luxury-gold">
                  {item.icon}
                </div>
                <h3 className="font-display text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-white/70">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Guests Say
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-gray-600">4.9 out of 5</span>
            </div>
          </div>
          
          <TestimonialSlider />
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Banner */}
      <CTABanner />

      <Footer />
      <WhatsAppFloat />
      
      {/* Mobile Sticky CTA */}
      <div className="sticky-cta p-4 md:hidden">
        <div className="flex gap-3">
          <Link
            href="/yachts"
            className="flex-1 bg-primary text-white text-center py-3 rounded-lg font-semibold"
          >
            Book Now
          </Link>
          <Link
            href="tel:+918446275985"
            className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center"
          >
            <Phone className="w-6 h-6 text-gray-700" />
          </Link>
          <Link
            href="https://wa.me/918446275985"
            className="w-12 h-12 bg-whatsapp rounded-lg flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </Link>
        </div>
      </div>
    </main>
  );
}
