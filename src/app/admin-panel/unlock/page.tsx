"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Mail, CheckCircle } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export default function UnlockPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [unlockToken, setUnlockToken] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/admin/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "requestUnlock", email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
        // In production, don't show the token
        setUnlockToken(data.unlockToken || "");
      } else {
        setError(data.error || "Failed to send unlock link");
      }
    } catch {
      setError("Network error. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Account Locked</h1>
          <p className="text-gray-500 mt-2">
            Too many failed login attempts. Your account has been temporarily locked.
          </p>
        </div>

        {submitted ? (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
              <p className="text-green-700 font-medium">Unlock link sent!</p>
              <p className="text-green-600 text-sm mt-1">
                Check your email for the unlock link.
              </p>
            </div>
            
            {unlockToken && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-700 text-sm mb-2">
                  <strong>Development Mode:</strong> Your unlock token:
                </p>
                <code className="block bg-white p-2 rounded text-xs break-all">
                  {unlockToken}
                </code>
                <a
                  href={`/api/"unlock?token=${unlockToken}`}
                  className="block mt-2 text-center text-blue-600 hover:underline text-sm"
                >
                  Click here to unlock
                </a>
              </div>
            )}

            <Link
              href="/admin-panel/login"
              className="block w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all text-center"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Enter your email address and we'll send you an unlock link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="goayachtworld@gmail.com"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send Unlock Link"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              Remember your password?{" "}
              <Link href="/admin-panel/login" className="text-blue-600 hover:underline">
                Try logging in again
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
