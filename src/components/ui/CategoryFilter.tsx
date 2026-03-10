"use client";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelect: (category: string) => void;
}

export function CategoryFilter({ categories, activeCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex w-full overflow-x-auto border-y border-gray-200 bg-white dark:border-gray-800 dark:bg-[#0a0a0a] uppercase tracking-widest text-xs font-bold no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`whitespace-nowrap px-6 py-4 transition-colors hover:text-emerald-600 focus:outline-none dark:hover:text-emerald-400 ${
            activeCategory === cat
              ? "border-b-2 border-emerald-600 text-emerald-700 dark:border-emerald-500 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20"
              : "text-gray-500 border-b-2 border-transparent dark:text-gray-400"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
