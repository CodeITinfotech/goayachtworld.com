"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Ship, Calendar, Users, MessageSquare, TrendingUp, Clock } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

interface Stats {
  yachts: number;
  categories: number;
  bookings: number;
  contacts: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ yachts: 0, categories: 0, bookings: 0, contacts: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("adminToken");
        const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

        const [yachtsRes, categoriesRes, contactsRes] = await Promise.all([
          fetch(`${API_URL}/admin/yachts`, { headers }),
          fetch(`${API_URL}/admin/categories`, { headers }),
          fetch(`${API_URL}/admin/contacts`, { headers }),
        ]);

        setStats({
          yachts: yachtsRes.ok ? (await yachtsRes.json()).length : 0,
          categories: categoriesRes.ok ? (await categoriesRes.json()).length : 0,
          bookings: 0, // Will be implemented with bookings API
          contacts: contactsRes.ok ? (await contactsRes.json()).length : 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const statCards = [
    { label: "Yachts", value: stats.yachts, icon: Ship, color: "bg-blue-500", href: "/admin-panel/yachts" },
    { label: "Categories", value: stats.categories, icon: Calendar, color: "bg-green-500", href: "/admin-panel/categories" },
    { label: "Bookings", value: stats.bookings, icon: Users, color: "bg-purple-500", href: "/admin-panel/bookings" },
    { label: "Contacts", value: stats.contacts, icon: MessageSquare, color: "bg-orange-500", href: "/admin-panel/contacts" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome to Goa Yacht World Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {loading ? "-" : stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href="/admin-panel/yachts"
            className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Ship className="w-8 h-8 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Manage Yachts</span>
          </Link>
          <Link
            href="/admin-panel/categories"
            className="flex flex-col items-center gap-2 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Calendar className="w-8 h-8 text-green-600" />
            <span className="text-sm font-medium text-green-900">Categories</span>
          </Link>
          <Link
            href="/admin-panel/extras"
            className="flex flex-col items-center gap-2 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <TrendingUp className="w-8 h-8 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">Extras</span>
          </Link>
          <Link
            href="/admin-panel/settings"
            className="flex flex-col items-center gap-2 p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <Clock className="w-8 h-8 text-orange-600" />
            <span className="text-sm font-medium text-orange-900">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
