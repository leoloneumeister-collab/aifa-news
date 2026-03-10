import { ArrowUpRight } from "lucide-react";

interface HeroProps {
  article: {
    title: string;
    content: string;
    category: string;
    imageUrl?: string;
  };
}

export function Hero({ article }: HeroProps) {
  return (
    <div className="group relative overflow-hidden border border-gray-200 bg-white p-6 transition-all hover:border-emerald-600 hover:shadow-lg dark:bg-black dark:border-gray-800 dark:hover:border-emerald-600">
      {article.imageUrl && (
        <div className="mb-6 h-64 w-full overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img src={article.imageUrl} alt={article.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
      )}
      <div className="mb-4 inline-flex items-center border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 tracking-widest uppercase dark:bg-emerald-950/30 dark:border-emerald-800/50 dark:text-emerald-400">
        {article.category}
      </div>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl group-hover:text-emerald-700 transition-colors dark:text-white dark:group-hover:text-emerald-400">
        {article.title}
      </h1>
      <p className="mb-6 max-w-3xl text-lg text-gray-600 line-clamp-3 dark:text-gray-400">
        {article.content}
      </p>
      <div className="flex items-center text-sm font-bold text-emerald-600 dark:text-emerald-400 cursor-pointer hover:underline">
        READ STORY <ArrowUpRight className="ml-1 h-4 w-4" />
      </div>
    </div>
  );
}
