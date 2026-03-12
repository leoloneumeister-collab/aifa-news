"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/ui/Header";
import { NewsFeed } from "@/components/ui/NewsFeed";
import { Zap, Target, Clock, ArrowRight } from "lucide-react";

export default function Home() {
  const [showFeed, setShowFeed] = useState(false);

  if (showFeed) {
    return (
      <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <Header showFeed={showFeed} setShowFeed={setShowFeed} />
        <NewsFeed />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Navigation Menu Bar */}
      <Header showFeed={showFeed} setShowFeed={setShowFeed} />

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-32 text-center animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-gray-900 mb-8 leading-[1.1]">
          Silence the <span className="text-emerald-600">Financial Noise.</span><br/>
          Hear Only What Matters.
        </h1>
        <p className="text-xl sm:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight">
          AIFA NEWS uses advanced AI to summarize global financial news into snackable insights, instantly mapped to your personal holdings.
        </p>
        <button 
          onClick={() => setShowFeed(true)}
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition-all hover:shadow-lg hover:shadow-emerald-600/20 active:scale-95"
        >
          Try out now <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      {/* Comparison Section */}
      <section className="bg-gray-50 py-32 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">From Noise to Signal</h2>
            <p className="text-gray-500 font-medium">Why read 10 articles when you only need the impact?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* The Noise */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gray-200/50 rounded-3xl -rotate-1 skew-y-1"></div>
              <div className="relative bg-white border border-gray-200 p-8 rounded-2xl shadow-sm space-y-6 opacity-70 grayscale">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-red-600 tracking-widest uppercase">The Chaos</span>
                  <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-red-500"></div><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div></div>
                </div>
                {[
                  "BREAKING: Market Crash Imminent?! Experts weigh in on the disaster.",
                  "URGENT: Sell Everything Now. Why crypto is dead (again).",
                  "Fed to hike rates by 100bps? Rumors swirl on Wall Street.",
                  "Tech Stocks Plunge on Fears of AI Bubble Bursting.",
                  "Is this the end? CEO arrested amid massive fraud scandal!"
                ].map((headline, i) => (
                  <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <p className="font-bold text-gray-800 leading-tight">{headline}</p>
                    <p className="text-xs text-gray-400 mt-2">Source {i+1} • 2 min ago</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The Signal */}
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-50 rounded-3xl rotate-1 -skew-y-1"></div>
              <div className="relative bg-white border border-emerald-100 p-8 rounded-2xl shadow-xl shadow-emerald-900/5 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-emerald-600 tracking-widest uppercase flex items-center gap-2">
                    <Zap className="w-4 h-4" /> The AIFA Signal
                  </span>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex gap-4 items-start">
                    <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">Fed holds rates</span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-1.5 rounded">$TLT</span>
                      </div>
                      <p className="text-sm text-gray-600">Federal Reserve maintains current interest rates, signaling a stabilized economic outlook for the quarter.</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex gap-4 items-start">
                    <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">NVIDIA export controls</span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-1.5 rounded">$NVDA</span>
                      </div>
                      <p className="text-sm text-gray-600">New export regulations placed on advanced chips to specific regions; minimal short-term revenue impact expected.</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 flex gap-4 items-start">
                    <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">Apple Services growth</span>
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-1.5 rounded">$AAPL</span>
                      </div>
                      <p className="text-sm text-gray-600">Services sector reports 14% YoY growth, offsetting slight hardware shipment declines globally.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">The Impact Engine</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Hyper-Concise Summaries</h3>
              <p className="text-gray-500 leading-relaxed font-medium">100% under 60 words. Get the core thesis without the fluff, written precisely for speed-reading.</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Personalized Relevance</h3>
              <p className="text-gray-500 leading-relaxed font-medium">Mapped to your specific assets. Stop reading news that doesn't actively impact your portfolio.</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Sub-10s Latency</h3>
              <p className="text-gray-500 leading-relaxed font-medium">From headline publication to AI insight in under 10 seconds. You receive the signal before the market reacts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50 text-center border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
            Ready to upgrade your financial intel?
          </h2>
          <p className="text-lg text-gray-500 font-medium mb-10 leading-relaxed">
            Stop scrolling through the chaos. Let AIFA map the global financial network directly to your portfolio in seconds.
          </p>
          <button 
            onClick={() => setShowFeed(true)}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition-all hover:shadow-lg hover:shadow-emerald-600/20 active:scale-95"
          >
            Try out now <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Logo Bar */}
      <section className="border-t border-gray-100 py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-8">
            Intelligence derived from trusted global feeds
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 items-center grayscale opacity-50 font-bold text-lg text-gray-600 tracking-tight">
            <span>Reuters</span>
            <span>Bloomberg</span>
            <span>FT</span>
            <span>WSJ</span>
            <span>CNBC</span>
            <span>MarketWatch</span>
            <span>Yahoo Finance</span>
            <span>Seeking Alpha</span>
          </div>
        </div>
      </section>
    </main>
  );
}
