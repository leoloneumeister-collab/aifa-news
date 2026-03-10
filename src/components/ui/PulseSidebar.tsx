import { TrendingUp, TrendingDown } from "lucide-react";

const mockStocks = [
  { symbol: "NVDA", price: "875.28", change: "+2.4%", up: true },
  { symbol: "MSFT", price: "402.56", change: "+1.2%", up: true },
  { symbol: "GOOGL", price: "148.97", change: "-0.5%", up: false },
  { symbol: "META", price: "485.58", change: "+3.1%", up: true },
  { symbol: "TSLA", price: "175.22", change: "-1.8%", up: false },
  { symbol: "AMZN", price: "178.15", change: "+0.8%", up: true },
  { symbol: "AAPL", price: "172.62", change: "-0.4%", up: false },
  { symbol: "AMD", price: "180.49", change: "+4.2%", up: true },
];

export function PulseSidebar() {
  return (
    <div className="flex h-[500px] w-full flex-col overflow-hidden border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-black/50">
      <div className="border-b border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-black z-10 w-full relative">
        <h3 className="flex items-center text-xs font-bold tracking-widest text-emerald-700 uppercase dark:text-emerald-500">
          <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
          Market Pulse
        </h3>
      </div>
      <div className="relative flex-1 overflow-hidden" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)' }}>
        <div className="absolute inset-x-0 w-full animate-[ticker_20s_linear_infinite] hover:[animation-play-state:paused] flex flex-col gap-3 px-4 py-2">
          {/* Double the list for seamless looping */}
          {[...mockStocks, ...mockStocks].map((stock, i) => (
            <div key={i} className="flex items-center justify-between rounded-md border border-gray-100 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-[#0a0a0a]">
              <span className="font-mono text-sm font-bold">{stock.symbol}</span>
              <div className="flex flex-col items-end">
                <span className="font-mono text-sm">{stock.price}</span>
                <span className={`flex items-center text-xs font-medium ${stock.up ? "text-emerald-600" : "text-red-500"}`}>
                  {stock.up ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                  {stock.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
