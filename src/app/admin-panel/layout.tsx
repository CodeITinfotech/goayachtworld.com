"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Ship, 
  List, 
  Image, 
  HelpCircle, 
  FileText, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AdminProvider, useAdmin } from "./context";

const navItems = [
  { href: "/admin-panel/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin-panel/yachts", label: "Yachts", icon: Ship },
  { href: "/admin-panel/categories", label: "Categories", icon: List },
  { href: "/admin-panel/extras", label: "Extras", icon: List },
  { href: "/admin-panel/questions", label: "FAQ Questions", icon: HelpCircle },
  { href: "/admin-panel/gallery", label: "Gallery", icon: Image },
  { href: "/admin-panel/about", label: "About Us", icon: FileText },
  { href: "/admin-panel/policies", label: "Policies", icon: FileText },
  { href: "/admin-panel/contacts", label: "Contacts", icon: MessageSquare },
  { href: "/admin-panel/settings", label: "Settings", icon: Settings },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { admin, logout } = useAdmin();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin-panel/login";

  if (!admin && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link href="/admin-panel/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Ship className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl hidden sm:block">
                Admin <span className="text-blue-600">Panel</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1"
            >
              <Eye className="w-4 h-4" />
              View Site
            </Link>
            <button 
              onClick={logout}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform lg:transform-none pt-[64px] lg:pt-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <main className="flex-1 p-4 lg:p-6 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminProvider>
  );
}
