"use client";

import { useEffect, useState } from "react";
import { Loader2, Briefcase, X } from "lucide-react";
import { NewsFeedItem } from "./NewsFeedItem";

interface Article {
  id: string;
  title: string;
  summary: string;
  source?: string;
  link?: string;
  publishDate?: string;
  tickers?: string[];
}

interface RankedInfo {
  relevanceScore: number;
  impactExplanation: string;
}

export function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Portfolio filter state
  const [portfolioFilterActive, setPortfolioFilterActive] = useState(false);
  const [rankingLoading, setRankingLoading] = useState(false);
  const [rankedMap, setRankedMap] = useState<Map<number, RankedInfo>>(new Map());
  const [rankingProgress, setRankingProgress] = useState(0);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/api/news', { method: 'POST' });
        if (!response.ok) {
          throw new Error('Failed to fetch news stream');
        }
        const data = await response.json();
        const items = Array.isArray(data) ? data : (data.articles || data.data || []);
        setArticles(items);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNews();
  }, []);

  // Simulate progress bar for ranking
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (rankingLoading) {
      setRankingProgress(0);
      interval = setInterval(() => {
        setRankingProgress(p => {
          if (p >= 90) return p + 0.3;
          if (p >= 70) return p + 1;
          return p + 3;
        });
      }, 150);
    } else {
      setRankingProgress(0);
    }
    return () => clearInterval(interval);
  }, [rankingLoading]);

  const handlePortfolioFilter = async () => {
    if (portfolioFilterActive) {
      // Turn off filter
      setPortfolioFilterActive(false);
      setRankedMap(new Map());
      return;
    }

    // Read portfolio from localStorage
    let holdings = [];
    try {
      const saved = localStorage.getItem('aifa_portfolio');
      if (saved) holdings = JSON.parse(saved);
    } catch {}

    if (!holdings || holdings.length === 0) {
      alert("Please add assets to your portfolio first! Go to the Portfolio page to get started.");
      return;
    }

    setRankingLoading(true);
    try {
      const res = await fetch('/api/news/portfolio-rank', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articles, holdings }),
      });

      if (!res.ok) throw new Error('Failed to rank articles');

      const data = await res.json();
      const map = new Map<number, RankedInfo>();
      for (const item of data.rankedArticles) {
        map.set(item.articleIndex, {
          relevanceScore: item.relevanceScore,
          impactExplanation: item.impactExplanation,
        });
      }
      setRankingProgress(100);
      setRankedMap(map);

      setTimeout(() => setPortfolioFilterActive(true), 300);
    } catch (err: any) {
      console.error(err);
      alert("Could not rank articles right now. Please try again.");
    } finally {
      setTimeout(() => setRankingLoading(false), 400);
    }
  };

  // Build display articles — sorted by relevance if filter active
  const displayArticles = portfolioFilterActive
    ? articles
        .map((article, i) => ({ article, index: i, rank: rankedMap.get(i) }))
        .filter(item => item.rank && item.rank.relevanceScore >= 25)
        .sort((a, b) => (b.rank?.relevanceScore || 0) - (a.rank?.relevanceScore || 0))
    : articles.map((article, i) => ({ article, index: i, rank: undefined }));

  if (loading) {
    return (
      <div className="flex flex-col h-96 items-center justify-center text-emerald-600">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p className="text-sm font-medium tracking-tight text-gray-500">Decrypting global data streams...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded text-sm">
        <p className="font-bold">Error retrieving intel</p>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Your Personal Alpha Stream</h2>
        <div className="flex items-center gap-3">
          {/* Portfolio Filter Button */}
          <button
            onClick={handlePortfolioFilter}
            disabled={rankingLoading}
            className={`relative overflow-hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              portfolioFilterActive
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                : rankingLoading
                ? "bg-indigo-50 text-indigo-700 border border-indigo-200 cursor-wait"
                : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            {rankingLoading ? (
              <>
                <div
                  className="absolute inset-y-0 left-0 bg-indigo-100/60 transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(rankingProgress, 100)}%` }}
                />
                <span className="relative z-10 flex items-center gap-1.5">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Analyzing... {Math.floor(rankingProgress)}%
                </span>
              </>
            ) : portfolioFilterActive ? (
              <>
                <X className="w-3 h-3" />
                Clear Filter
              </>
            ) : (
              <>
                <Briefcase className="w-3 h-3" />
                My Portfolio
              </>
            )}
          </button>

          <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-2"></span>
            LIVE
          </span>
        </div>
      </div>

      {/* Portfolio filter active banner */}
      {portfolioFilterActive && (
        <div className="flex items-center gap-2 p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <Briefcase className="w-4 h-4 text-indigo-600 shrink-0" />
          <p className="text-indigo-800 font-medium">
            Showing <strong>{displayArticles.length}</strong> articles ranked by impact on your portfolio.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {displayArticles.length > 0 ? displayArticles.map((item) => (
          <NewsFeedItem
            key={item.article.id || item.index}
            article={item.article}
            relevanceScore={item.rank?.relevanceScore}
            impactReason={item.rank?.impactExplanation}
          />
        )) : (
           <p className="text-center text-gray-500 py-10">
             {portfolioFilterActive
               ? "No articles with significant impact on your portfolio detected right now."
               : "No signals matching your portfolio detected at this time."}
           </p>
        )}
      </div>
    </div>
  );
}
