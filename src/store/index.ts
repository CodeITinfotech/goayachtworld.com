import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Yacht, BookingFormData, WebsiteSettings } from "@/types";

interface BookingState {
  currentYacht: Yacht | null;
  bookingData: Partial<BookingFormData>;
  setCurrentYacht: (yacht: Yacht | null) => void;
  updateBookingData: (data: Partial<BookingFormData>) => void;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      currentYacht: null,
      bookingData: {},
      setCurrentYacht: (yacht) => set({ currentYacht: yacht }),
      updateBookingData: (data) =>
        set((state) => ({
          bookingData: { ...state.bookingData, ...data },
        })),
      clearBooking: () =>
        set({ currentYacht: null, bookingData: {} }),
    }),
    {
      name: "yacht-booking",
    }
  )
);

interface SettingsState {
  settings: WebsiteSettings | null;
  whatsappNumber: string;
  setSettings: (settings: WebsiteSettings) => void;
  setWhatsappNumber: (number: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: null,
      whatsappNumber: "918446275985",
      setSettings: (settings) => set({ settings }),
      setWhatsappNumber: (number) => set({ whatsappNumber: number }),
    }),
    {
      name: "yacht-settings",
    }
  )
);

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; email: string; name?: string; role: string } | null;
  token: string | null;
  login: (user: AuthState["user"], token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      login: (user, token) =>
        set({ isAuthenticated: true, user, token }),
      logout: () =>
        set({ isAuthenticated: false, user: null, token: null }),
    }),
    {
      name: "yacht-auth",
    }
  )
);
