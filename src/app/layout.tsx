import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "AIFA NEWS | Financial Dashboard",
  description: "Silence the Financial Noise. Hear Only What Matters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased flex flex-col min-h-screen bg-white text-gray-900`}
      >
        <div className="flex-grow">{children}</div>
        <footer className="border-t border-gray-100 py-12 px-6 mt-16 text-xs text-gray-500 bg-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4 max-w-md">
              <p className="font-bold text-gray-900 tracking-tight">AIFA NEWS: AI Financial Advisor</p>
              <p className="text-gray-600">Mapping finance news to your personal portfolio.</p>
              <p className="text-gray-600">Supported by CODE University of Applied Science</p>
            </div>
            
            <div className="space-y-4 text-left md:text-right max-w-lg">
              <div className="flex gap-4 md:justify-end font-medium">
                <Link href="/terms" className="text-gray-600 hover:text-emerald-700 transition-colors">Terms of Service</Link>
                <Link href="/privacy" className="text-gray-600 hover:text-emerald-700 transition-colors">Privacy Policy</Link>
                <Link href="/imprint" className="text-gray-600 hover:text-emerald-700 transition-colors">Imprint</Link>
              </div>
              <div className="space-y-1 text-gray-500">
                <p>Student Council CODE UG | District Court: Charlottenburg (Berlin) HRB 270764 B</p>
                <p>EUID: DEF1103R.HRB270764B | Donaustr. 44, 12043 Berlin, Germany.</p>
                <p className="pt-2">© {new Date().getFullYear()} Student Council CODE UG. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
