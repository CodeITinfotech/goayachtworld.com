"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  MoreHorizontal,
  Star,
  Users,
  DollarSign,
  ToggleLeft,
  ToggleRight,
  Ship
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { getYachts } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function YachtsAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showStatus, setShowStatus] = useState<"all" | "active" | "inactive">("all");

  const yachts = getYachts();

  const filteredYachts = yachts.filter((yacht) => {
    const matchesSearch = yacht.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      yacht.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (showStatus === "active") return matchesSearch && yacht.isActive;
    if (showStatus === "inactive") return matchesSearch && !yacht.isActive;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Yachts</h1>
          <p className="text-gray-500">Manage your yacht fleet</p>
        </div>
        <Link
          href="/admin/yachts/new"
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Yacht
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search yachts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "active", "inactive"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setShowStatus(status)}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium capitalize transition-colors",
                  showStatus === status
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Yachts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredYachts.map((yacht) => (
          <div key={yacht.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Image */}
            <div className="relative aspect-[16/10]">
              {yacht.images?.[0] ? (
                <Image
                  src={yacht.images[0].url}
                  alt={yacht.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-4xl">🚤</span>
                </div>
              )}
              
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => {}}
                  className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
                >
                  {yacht.isActive ? (
                    <ToggleRight className="w-6 h-6 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
              </div>
              
              {/* Featured Badge - 5 Stars */}
              {yacht.featured && (
                <div className="absolute top-3 left-3 flex gap-0.5">
                  <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                  <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                  <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                  <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                  <Star className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900">{yacht.name}</h3>
                  <p className="text-sm text-gray-500">{yacht.location || "Goa, India"}</p>
                </div>
                <p className="text-lg font-bold text-primary">
                  {formatCurrency(yacht.price)}
                </p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{yacht.capacity}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>{yacht.pricePerHour}/hr</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/yachts/${yacht.id}`}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Link>
                <Link
                  href={`/yachts/${yacht.slug}`}
                  target="_blank"
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => {}}
                  className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredYachts.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <Ship className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No yachts found</h3>
          <p className="text-gray-500 mb-6">
            {searchQuery
              ? "Try adjusting your search"
              : "Get started by adding your first yacht"}
          </p>
          <Link
            href="/admin/yachts/new"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Yacht
          </Link>
        </div>
      )}
    </div>
  );
}
