"use client";

import { ShieldCheck, Sparkles, Loader2, TrendingUp, AlertCircle, Building2 } from "lucide-react";
import { useState } from "react";
interface NewsCardProps {
  article: {
    title: string;
    excerpt: string;
    category: string;
    trustScore: number;
    timestamp: string;
  };
}

export function NewsCard({ article }: NewsCardProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    category: string;
    stockName: string | null;
    tickerName: string | null;
    summary: string;
    portfolioImpact: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card's potential wrapper click event
    if (analysisResult || isAnalyzing) return;
    
    setIsAnalyzing(true);
    setError(null);

    try {
      const res = await fetch('/api/news/analyze-single', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: article.title,
          excerpt: article.excerpt
        })
      });

      if (!res.ok) {
        throw new Error('Failed to analyze news');
      }

      const data = await res.json();
      setAnalysisResult(data.analysis);
    } catch (err: any) {
      console.error(err);
      setError('Could not analyze this article right now.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="group flex flex-col justify-between border border-gray-200 bg-white p-5 transition-all hover:border-emerald-600 hover:shadow-sm dark:border-gray-800 dark:bg-[#0a0a0a]">
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">
            {article.category}
          </span>
          <div className="flex items-center rounded-sm border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-400">
            <ShieldCheck className="mr-1 h-3 w-3" />
            {article.trustScore}% Trust
          </div>
        </div>
        <h3 className="mb-2 text-xl font-bold leading-tight group-hover:text-emerald-700 dark:text-gray-100 dark:group-hover:text-emerald-400 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 dark:text-gray-400">
          {article.excerpt}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
        <div className="text-xs font-medium text-gray-400 uppercase tracking-widest">
          {article.timestamp}
        </div>
        
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing || !!analysisResult}
          className="group/btn relative inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-700 transition-all hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-indigo-950/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Analyzing...
            </>
          ) : analysisResult ? (
            <>
              <Sparkles className="h-3.5 w-3.5" />
              Analyzed
            </>
          ) : (
            <>
              <Sparkles className="h-3.5 w-3.5 text-indigo-500 group-hover/btn:text-indigo-600 dark:text-indigo-400" />
              AI Extract
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {analysisResult && (
        <div className="mt-4 animate-in slide-in-from-top-2 fade-in duration-300 rounded-xl border border-indigo-100 bg-indigo-50/50 p-4 dark:border-indigo-900/30 dark:bg-indigo-950/10">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-sm font-bold text-indigo-900 dark:text-indigo-300">AI Analysis</h4>
          </div>
          
          <div className="space-y-3">
            {analysisResult.stockName && analysisResult.tickerName && (
              <div className="flex items-start gap-2">
                <Building2 className="mt-0.5 h-3.5 w-3.5 text-indigo-500 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">Target Asset</span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-200">
                    {analysisResult.stockName} <span className="ml-1 rounded bg-indigo-100 px-1.5 py-0.5 text-xs text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">${analysisResult.tickerName}</span>
                  </p>
                </div>
              </div>
            )}
            
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">Core Summary</span>
              <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {analysisResult.summary}
              </p>
            </div>

            <div className="rounded-lg bg-white p-3 shadow-sm border border-indigo-100 dark:bg-[#0a0a0a] dark:border-indigo-900/30">
              <div className="flex items-center gap-1.5 mb-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider dark:text-emerald-400">Portfolio Impact</span>
              </div>
              <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                {analysisResult.portfolioImpact}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
