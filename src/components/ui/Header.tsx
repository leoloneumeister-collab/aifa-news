"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { User } from "lucide-react";

export function Header({ 
  showFeed, 
  setShowFeed 
}: { 
  showFeed?: boolean; 
  setShowFeed?: (show: boolean) => void;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isPortfolio = pathname === "/portfolio";
  const isAccount = pathname === "/account";
  const isLogin = pathname === "/login";
  const isRegister = pathname === "/register";

  const { user, loading } = useAuth();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center px-6 py-4">
      <Link href="/">
        <span className="text-lg font-black tracking-tighter cursor-pointer" onClick={() => setShowFeed?.(false)}>
          AIFA<span className="text-emerald-600">NEWS</span>
        </span>
      </Link>
      <div className="flex items-center gap-6">
        <Link 
          href="/"
          onClick={(e) => {
            if (isHome && setShowFeed) {
              e.preventDefault();
              setShowFeed(false);
            }
          }}
          className={`text-sm font-bold tracking-tight transition-colors ${
            isHome && !showFeed ? "text-emerald-600" : "text-gray-500 hover:text-emerald-500"
          }`}
        >
          Home
        </Link>
        <Link 
          href="/portfolio"
          className={`text-sm font-bold tracking-tight transition-colors ${
            isPortfolio ? "text-emerald-600" : "text-gray-500 hover:text-emerald-500"
          }`}
        >
          Portfolio
        </Link>

        {/* Live News button */}
        <button 
          onClick={() => {
            if (isHome && setShowFeed) {
              setShowFeed(true);
            } else {
              window.location.href = '/?feed=true';
            }
          }}
          className={`text-sm font-bold tracking-tight transition-colors flex items-center gap-1 ${
            isHome && showFeed ? "text-emerald-600" : "text-gray-500 hover:text-emerald-500"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${
            isHome && showFeed ? "bg-emerald-500 animate-pulse" : "bg-gray-300"
          }`}></span> Live News
        </button>

        {/* Auth: Login or Account */}
        {!loading && (
          user ? (
            <Link
              href="/account"
              className={`flex items-center gap-1.5 text-sm font-bold tracking-tight transition-colors ${
                isAccount ? "text-emerald-600" : "text-gray-500 hover:text-emerald-500"
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-[10px] font-black">
                {user.displayName?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase() || "U"}
              </div>
              Account
            </Link>
          ) : (
            <Link
              href="/login"
              className={`flex items-center gap-1.5 text-sm font-bold tracking-tight transition-colors ${
                isLogin || isRegister ? "text-emerald-600" : "text-gray-500 hover:text-emerald-500"
              }`}
            >
              <User className="w-4 h-4" />
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
