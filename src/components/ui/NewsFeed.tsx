"use client";

import { useEffect, useState } from "react";
import { Loader2, ArrowUpRight } from "lucide-react";

interface Article {
  id: string;
  title: string;
  summary: string;
  source?: string;
  link?: string;
  publishDate?: string;
  tickers?: string[];
}

export function NewsFeed() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('/api/news', { method: 'POST' });
        if (!response.ok) {
          throw new Error('Failed to fetch news stream');
        }
        const data = await response.json();
        // The structure depends on the API res. Adjusting to handle generic arrays or nested 'data' fields.
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
        <span className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse mr-2"></span>
          LIVE
        </span>
      </div>

      <div className="space-y-6">
        {articles.length > 0 ? articles.map((article, i) => (
          <div key={article.id || i} className="group p-6 bg-white hover:bg-gray-50 transition-colors border-l-2 border-transparent hover:border-emerald-500">
            <div className="flex justify-between items-start mb-2">
              {article.link ? (
                <a href={article.link} target="_blank" rel="noreferrer" className="flex-1 group/link">
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-snug group-hover/link:text-emerald-600 transition-colors">
                    {article.title}
                  </h3>
                </a>
              ) : (
                <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-snug group-hover:text-emerald-700 transition-colors flex-1">
                  {article.title}
                </h3>
              )}
              {article.link && (
                <a href={article.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-emerald-600 transition-colors ml-4 flex-shrink-0 mt-1">
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              )}
            </div>
            {article.tickers && article.tickers.length > 0 && (
              <div className="flex gap-2 mb-3">
                {article.tickers.map((ticker) => (
                  <span key={ticker} className="text-xs font-bold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded-sm">
                    ${ticker}
                  </span>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-600 leading-relaxed">
              {article.summary}
            </p>
            <div className="mt-4 flex items-center text-xs text-gray-400 font-medium">
              <span>{article.source || "FINLIGHT ENGINE"}</span>
              <span className="mx-2">•</span>
              <span>
                {article.publishDate 
                  ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(article.publishDate))
                  : "JUST NOW"}
              </span>
            </div>
          </div>
        )) : (
           <p className="text-center text-gray-500 py-10">No signals matching your portfolio detected at this time.</p>
        )}
      </div>
    </div>
  );
}
