"use client";

import { useState, useEffect } from "react";
import { ArrowUpRight, Sparkles, AlertCircle, Building2, TrendingUp, ChevronDown, ChevronUp, Briefcase } from "lucide-react";

interface Article {
  id: string;
  title: string;
  summary: string;
  source?: string;
  link?: string;
  publishDate?: string;
  tickers?: string[];
}

interface NewsFeedItemProps {
  article: Article;
  relevanceScore?: number;
  impactReason?: string;
}

function getRelevanceColor(score: number) {
  if (score >= 70) return { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500' };
  if (score >= 40) return { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500' };
  return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600', dot: 'bg-gray-400' };
}

export function NewsFeedItem({ article, relevanceScore, impactReason }: NewsFeedItemProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<{
    category: string;
    stockName: string | null;
    tickerName: string | null;
    summary: string;
    portfolioImpact: string;
  } | null>(null);

  // Simulate a loading progress bar
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnalyzing) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress(p => {
          // Slow down progress as it gets closer to 90%
          if (p >= 90) return p + 0.5;
          if (p >= 70) return p + 2;
          return p + 5;
        });
      }, 150);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleExtract = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (analysisResult || isAnalyzing) return;
    
    setIsAnalyzing(true);
    setError(null);
    setIsVisualizing(false);

    try {
      const res = await fetch('/api/news/analyze-single', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: article.title,
          excerpt: article.summary
        })
      });

      if (!res.ok) {
        throw new Error('Failed to analyze news');
      }

      const data = await res.json();
      setAnalysisResult(data.analysis);
      setProgress(100);
      // Auto-visualize after a tiny delay for smoothness
      setTimeout(() => setIsVisualizing(true), 300);
    } catch (err: any) {
      console.error(err);
      setError('Could not extract data right now.');
    } finally {
      setTimeout(() => setIsAnalyzing(false), 400); // Give the bar time to hit 100%
    }
  };

  const relevanceColors = relevanceScore !== undefined ? getRelevanceColor(relevanceScore) : null;

  return (
    <div className={`group p-6 bg-white hover:bg-gray-50 transition-colors rounded-lg shadow-sm border flex flex-col md:flex-row gap-6 ${relevanceColors ? `border-l-4 ${relevanceColors.border}` : 'border border-gray-100 border-l-2 border-l-transparent hover:border-l-emerald-500'}`}>
      
      {/* Left side: Article Content */}
      <div className="flex-1 space-y-3">
        {/* Relevance Badge */}
        {relevanceScore !== undefined && relevanceColors && (
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${relevanceColors.bg} ${relevanceColors.border} border animate-in fade-in zoom-in duration-300`}>
            <span className={`w-2 h-2 rounded-full ${relevanceColors.dot}`}></span>
            <span className={`text-xs font-black ${relevanceColors.text}`}>{relevanceScore}% relevant</span>
            <Briefcase className={`w-3 h-3 ${relevanceColors.text}`} />
          </div>
        )}

        <div className="flex justify-between items-start">
          {article.link ? (
            <a href={article.link} target="_blank" rel="noreferrer" className="flex-1 group/link pr-4">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-snug group-hover/link:text-emerald-600 transition-colors">
                {article.title}
              </h3>
            </a>
          ) : (
            <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-snug group-hover:text-emerald-700 transition-colors flex-1 pr-4">
              {article.title}
            </h3>
          )}
          {article.link && (
            <a href={article.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-emerald-600 transition-colors flex-shrink-0 mt-1">
              <ArrowUpRight className="h-5 w-5" />
            </a>
          )}
        </div>
        
        {( (article.tickers && article.tickers.length > 0) || analysisResult ) && (
          <div className="flex gap-2 flex-wrap items-center">
            {article.tickers?.map((ticker) => (
              <span key={ticker} className="text-xs font-bold text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded-sm">
                ${ticker}
              </span>
            ))}
            {analysisResult?.tickerName && !article.tickers?.includes(analysisResult.tickerName) && (
              <span className="text-xs font-black text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded-sm flex items-center gap-1 animate-in zoom-in duration-300">
                <Sparkles className="w-2.5 h-2.5" />
                ${analysisResult.tickerName}
              </span>
            )}
            {analysisResult?.category && (
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 animate-in fade-in duration-500">
                {analysisResult.category}
              </span>
            )}
          </div>
        )}
        
        <p className="text-sm text-gray-600 leading-relaxed">
          {article.summary}
        </p>

        <div className="flex items-center text-xs text-gray-400 font-medium pt-2">
          <span>{article.source || "FINLIGHT ENGINE"}</span>
          <span className="mx-2">•</span>
          <span>
            {article.publishDate 
              ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(article.publishDate))
              : "JUST NOW"}
          </span>
        </div>

        {/* Portfolio Impact Reason */}
        {impactReason && (
          <div className="flex items-start gap-2 p-3 bg-indigo-50/50 border border-indigo-100 rounded-lg animate-in fade-in duration-500">
            <Briefcase className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-indigo-900 leading-relaxed">
              {impactReason}
            </p>
          </div>
        )}

        {/* AI Results Dropdown */}
        {analysisResult && isVisualizing && (
          <div className="mt-6 animate-in slide-in-from-top-4 fade-in duration-500 rounded-2xl border-2 border-indigo-100 bg-white p-6 shadow-xl shadow-indigo-500/5 transition-all">
            <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="rounded-full bg-indigo-600 p-1.5 text-white shadow-lg shadow-indigo-600/20">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h4 className="text-base font-black tracking-tight text-gray-900">AI Deep Analysis</h4>
              </div>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-indigo-600 border border-indigo-100/50">{analysisResult.category}</span>
            </div>
            
            <div className="space-y-6">
            {(analysisResult.stockName || analysisResult.tickerName) && (
                <div className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                  <div className="mt-0.5 rounded-lg bg-white p-2 text-indigo-600 shadow-sm border border-gray-100">
                    <Building2 className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Primary Analysis Coverage</span>
                    <div className="mt-1 flex items-center gap-2 flex-wrap">
                      {analysisResult.stockName && (
                        <p className="text-base font-bold text-gray-900">
                          {analysisResult.stockName}
                        </p>
                      )}
                      {analysisResult.tickerName && (
                        <span className="rounded-md bg-indigo-600 px-2 py-0.5 text-xs font-black text-white shadow-sm">${analysisResult.tickerName}</span>
                      )}
                    </div>
                    {(!analysisResult.stockName || !analysisResult.tickerName) && (
                      <p className="text-[10px] text-gray-400 mt-1 italic">Partial company identification</p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="px-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Core Intelligence Sum</span>
                <p className="mt-2 text-[15px] font-medium leading-relaxed text-black">
                  {analysisResult.summary}
                </p>
              </div>

              <div className="group/impact relative rounded-2xl border border-emerald-100 bg-emerald-50/30 p-5 transition-colors hover:bg-emerald-50/50">
                <div className="mb-3 flex items-center gap-2">
                  <div className="rounded-full bg-emerald-100 p-1 text-emerald-600">
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700">Portfolio Alpha Impact</span>
                </div>
                <p className="text-[15px] font-bold leading-relaxed text-emerald-950">
                  {analysisResult.portfolioImpact}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Right side: Action Buttons */}
      <div className="md:w-48 flex flex-col gap-3 justify-center md:border-l md:border-gray-100 md:pl-6 shrink-0">
        
        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-1 p-2 bg-red-50 text-red-600 text-xs rounded border border-red-100">
            <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
            <p className="leading-tight">{error}</p>
          </div>
        )}

        {/* Extract Button / Loading Bar */}
        {!analysisResult && (
          <button
            onClick={handleExtract}
            disabled={isAnalyzing}
            className={`relative w-full overflow-hidden flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold text-sm transition-all focus:outline-none ${isAnalyzing ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 cursor-wait' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-indigo-600/20 active:scale-95'}`}
          >
            {isAnalyzing ? (
              <>
                <div 
                  className="absolute inset-y-0 left-0 bg-indigo-100/50 transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
                <span className="relative z-10 font-bold whitespace-nowrap">Extracting... {Math.floor(progress)}%</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span className="whitespace-nowrap">Extract Data</span>
              </>
            )}
          </button>
        )}

        {/* Visualize Button (Only visible after extraction) */}
        {analysisResult && (
          <button
            onClick={() => setIsVisualizing(!isVisualizing)}
            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold text-sm transition-all shadow-sm active:scale-95 focus:outline-none ${isVisualizing ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20'}`}
          >
            {isVisualizing ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span className="whitespace-nowrap">Hide Data</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span className="whitespace-nowrap">Visualize Data</span>
              </>
            )}
          </button>
        )}

      </div>
    </div>
  );
}
