"use client";

import { 
  Ship, 
  Calendar, 
  Users, 
  DollarSign,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

// Demo data
const stats = [
  { 
    label: "Total Bookings", 
    value: "156", 
    change: "+12%", 
    positive: true,
    icon: Calendar,
    href: "/admin/bookings"
  },
  { 
    label: "Revenue", 
    value: "₹4,25,000", 
    change: "+8%", 
    positive: true,
    icon: DollarSign,
  },
  { 
    label: "Active Yachts", 
    value: "8", 
    change: "2 added",
    positive: true,
    icon: Ship,
    href: "/admin/yachts"
  },
  { 
    label: "Customers", 
    value: "234", 
    change: "+24",
    positive: true,
    icon: Users,
    href: "/admin/customers"
  },
];

const recentBookings = [
  { id: "GYW-2024-0142", yacht: "Sea Princess", customer: "Rahul Mehta", date: "2024-01-15", amount: 28500, status: "confirmed" },
  { id: "GYW-2024-0141", yacht: "Royal Duchess", customer: "Priya Sharma", date: "2024-01-14", amount: 42000, status: "pending" },
  { id: "GYW-2024-0140", yacht: "Party Barge", customer: "Vikram Singh", date: "2024-01-13", amount: 55000, status: "confirmed" },
  { id: "GYW-2024-0139", yacht: "Corporate Cruiser", customer: "TechCorp Inc", date: "2024-01-12", amount: 65000, status: "completed" },
];

const popularYachts = [
  { name: "Sea Princess", bookings: 45, revenue: 1125000 },
  { name: "Party Barge", bookings: 38, revenue: 1710000 },
  { name: "Royal Duchess", bookings: 32, revenue: 1120000 },
  { name: "Sunset Dream", bookings: 28, revenue: 840000 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here's what's happening.</p>
        </div>
        <Link
          href="/admin/bookings/new"
          className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          New Booking
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href || "#"}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                {stat.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Recent Bookings</h2>
              <Link href="/admin/bookings" className="text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
          </div>
          <div className="divide-y">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{booking.yacht}</p>
                    <p className="text-sm text-gray-500">{booking.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(booking.amount)}</p>
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Yachts */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Popular Yachts</h2>
              <Link href="/admin/yachts" className="text-sm text-primary hover:underline">
                Manage
              </Link>
            </div>
          </div>
          <div className="divide-y">
            {popularYachts.map((yacht, index) => (
              <div key={yacht.name} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{yacht.name}</p>
                    <p className="text-sm text-gray-500">{yacht.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(yacht.revenue)}</p>
                    <p className="text-sm text-gray-500">revenue</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/yachts/new"
            className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
          >
            <Ship className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <span className="text-sm font-medium">Add New Yacht</span>
          </Link>
          <Link
            href="/admin/bookings/new"
            className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
          >
            <Calendar className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <span className="text-sm font-medium">Create Booking</span>
          </Link>
          <Link
            href="/admin/coupons/new"
            className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
          >
            <DollarSign className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <span className="text-sm font-medium">Create Coupon</span>
          </Link>
          <Link
            href="/admin/settings"
            className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
          >
            <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <span className="text-sm font-medium">View Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
