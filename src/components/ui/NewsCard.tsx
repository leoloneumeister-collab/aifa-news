import { ShieldCheck } from "lucide-react";

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
      <div className="mt-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
        {article.timestamp}
      </div>
    </div>
  );
}
