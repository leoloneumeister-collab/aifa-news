"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Header } from "@/components/ui/Header";
import { User, Mail, Calendar, Clock, LogOut, Shield } from "lucide-react";

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  if (!loading && !user) {
    router.push("/login");
    return null;
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center pt-24">
          <div className="animate-pulse text-gray-400 font-medium">Loading your account...</div>
        </main>
      </>
    );
  }

  const creationDate = user?.metadata?.creationTime
    ? new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(user.metadata.creationTime))
    : "Unknown";

  const lastSignIn = user?.metadata?.lastSignInTime
    ? new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(user.metadata.lastSignInTime))
    : "Unknown";

  const accountAge = user?.metadata?.creationTime 
    ? Math.floor((Date.now() - new Date(user.metadata.creationTime).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <>
      <Header />
      <main className="min-h-screen px-6 pt-28 pb-16 bg-gray-50/50">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 text-3xl font-black mb-4 shadow-lg shadow-emerald-500/10">
              {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">
              {user?.displayName || "User"}
            </h1>
            <p className="text-gray-500 mt-1 font-medium">{user?.email}</p>
          </div>

          {/* Account Details Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                Account Details
              </h2>
            </div>

            <div className="divide-y divide-gray-50">
              <div className="flex items-center gap-4 p-5 hover:bg-gray-50/50 transition-colors">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Display Name</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{user?.displayName || "Not set"}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 hover:bg-gray-50/50 transition-colors">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Email Address</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 hover:bg-gray-50/50 transition-colors">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Member Since</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{creationDate}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{accountAge} day{accountAge !== 1 ? "s" : ""} ago</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 hover:bg-gray-50/50 transition-colors">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Last Sign In</p>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">{lastSignIn}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-red-200 text-red-600 rounded-xl font-bold text-sm hover:bg-red-50 hover:border-red-300 transition-all shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
