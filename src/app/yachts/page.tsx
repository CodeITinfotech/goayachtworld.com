"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  Filter, 
  Grid, 
  List, 
  Search, 
  SlidersHorizontal,
  X
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { YachtCard } from "@/components/yacht-card";
import { getYachts, getCategories } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Yacht, YachtCategory } from "@/types";

function YachtsContent() {
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get("category");
  
  const [yachts, setYachts] = useState<Yacht[]>([]);
  const [categories, setCategories] = useState<YachtCategory[]>([]);
  const [filteredYachts, setFilteredYachts] = useState<Yacht[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categorySlug);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "capacity">("price-low");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [minCapacity, setMinCapacity] = useState(0);

  useEffect(() => {
    const allYachts = getYachts();
    const allCategories = getCategories();
    setYachts(allYachts);
    setCategories(allCategories);
    setFilteredYachts(allYachts);
  }, []);

  useEffect(() => {
    let filtered = [...yachts];

    if (selectedCategory) {
      const category = categories.find(c => c.slug === selectedCategory);
      if (category) {
        filtered = filtered.filter(y => y.categoryId === category.id);
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(y => 
        y.name.toLowerCase().includes(query) ||
        y.description.toLowerCase().includes(query)
      );
    }

    if (minCapacity > 0) {
      filtered = filtered.filter(y => y.capacity >= minCapacity);
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "capacity":
        filtered.sort((a, b) => b.capacity - a.capacity);
        break;
    }

    setFilteredYachts(filtered);
  }, [yachts, categories, selectedCategory, searchQuery, sortBy, minCapacity]);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <section className="pt-20 pb-12 bg-luxury-gradient text-white">
        <div className="container mx-auto px-4 py-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">
            Our Luxury Yacht Fleet
          </h1>
          <p className="text-white/70 text-lg text-center max-w-2xl mx-auto">
            Discover our curated collection of premium yachts for every occasion
          </p>
        </div>
      </section>

      <section className="bg-white border-b sticky top-20 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search yachts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
              />
            </div>

            <div className="hidden lg:flex gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  !selectedCategory ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    selectedCategory === category.slug ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none bg-white"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="capacity">Capacity</option>
            </select>

            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn("p-2 rounded-md transition-colors", viewMode === "grid" ? "bg-white shadow" : "hover:bg-gray-200")}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn("p-2 rounded-md transition-colors", viewMode === "list" ? "bg-white shadow" : "hover:bg-gray-200")}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg"
            >
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={cn("px-3 py-1.5 rounded-full text-sm", selectedCategory === null ? "bg-primary text-white" : "bg-white border")}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.slug)}
                      className={cn("px-3 py-1.5 rounded-full text-sm", selectedCategory === category.slug ? "bg-primary text-white" : "bg-white border")}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Min Capacity: {minCapacity} guests</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={minCapacity}
                  onChange={(e) => setMinCapacity(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {selectedCategory && (
            <div className="mb-6 flex items-center gap-2">
              <span className="text-sm text-gray-600">Filtering by:</span>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {categories.find(c => c.slug === selectedCategory)?.name}
              </span>
              <button onClick={() => setSelectedCategory(null)} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <p className="text-gray-600 mb-8">Showing {filteredYachts.length} yacht{filteredYachts.length !== 1 ? "s" : ""}</p>

          {filteredYachts.length > 0 ? (
            <div className={cn(viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6")}>
              {filteredYachts.map((yacht) => (
                <YachtCard key={yacht.id} yacht={yacht} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">No yachts found matching your criteria</p>
              <button
                onClick={() => { setSelectedCategory(null); setSearchQuery(""); setMinCapacity(0); }}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-white/80 mb-6">Contact us and we'll help you find the perfect yacht</p>
          <a href="https://wa.me/918446275985?text=Hi%2C%20I'm%20looking%20for%20a%20yacht" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100">
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

export default function YachtsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
      <YachtsContent />
    </Suspense>
  );
}
