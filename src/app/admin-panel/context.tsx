"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface AdminUser {
  email: string;
  token: string;
}

interface AdminContextType {
  admin: AdminUser | null;
  login: (password: string) => Promise<{ success: boolean; error?: string; locked?: boolean }>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export function AdminProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const email = localStorage.getItem("adminEmail");
    if (token && email) {
      setAdmin({ token, email });
    }
  }, []);

  const login = async (password: string) => {
    try {
      const res = await fetch(`${API_URL}/admin/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminEmail", data.email);
        setAdmin({ token: data.token, email: data.email });
        return { success: true };
      }
      
      return { 
        success: false, 
        error: data.error || "Login failed",
        locked: data.locked 
      };
    } catch (error) {
      return { success: false, error: "Network error" };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    setAdmin(null);
    router.push("/admin-panel/login");
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}
