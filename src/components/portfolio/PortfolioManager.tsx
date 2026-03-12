"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Plus, Edit2, Trash2, X, Check, MessageCircle, LogIn, Percent, DollarSign } from "lucide-react";
import Link from "next/link";

export type Holding = {
  id: string;
  symbol: string;
  mode: "detailed" | "percentage";
  shares: number | string;
  price: number | string;
  percentage: number | string;
};

const COLORS = ['#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#047857', '#064e3b', '#065f46'];

const DEFAULT_HOLDINGS: Holding[] = [
  { id: "1", symbol: "AAPL", mode: "percentage", shares: 0, price: 0, percentage: 100 },
];

function loadHoldings(): Holding[] {
  if (typeof window === 'undefined') return DEFAULT_HOLDINGS;
  try {
    const saved = localStorage.getItem('aifa_portfolio');
    if (saved) return JSON.parse(saved);
  } catch {}
  return DEFAULT_HOLDINGS;
}

export function PortfolioManager() {
  // Load from localStorage or default to Apple at 100%
  const [holdings, setHoldings] = useState<Holding[]>(DEFAULT_HOLDINGS);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setHoldings(loadHoldings());
    setMounted(true);
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('aifa_portfolio', JSON.stringify(holdings));
    }
  }, [holdings, mounted]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Onboarding state
  const [showWelcomeBubble, setShowWelcomeBubble] = useState(true);
  const [showLoginBubble, setShowLoginBubble] = useState(false);
  const hasAddedFirst = useRef(false);

  // Form states
  const [formSymbol, setFormSymbol] = useState("");
  const [formMode, setFormMode] = useState<"detailed" | "percentage">("percentage");
  const [formShares, setFormShares] = useState<number | string>("");
  const [formPrice, setFormPrice] = useState<number | string>("");
  const [formPercentage, setFormPercentage] = useState<number | string>("");

  const chartData = useMemo(() => {
    return holdings.map(h => {
      if (h.mode === "percentage") {
        const pct = typeof h.percentage === 'string' ? parseFloat(h.percentage) || 0 : h.percentage;
        return { name: h.symbol, value: pct };
      } else {
        const shares = typeof h.shares === 'string' ? parseFloat(h.shares) || 0 : h.shares;
        const price = typeof h.price === 'string' ? parseFloat(h.price) || 0 : h.price;
        return { name: h.symbol, value: shares * price };
      }
    }).filter(d => d.value > 0);
  }, [holdings]);

  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  // Check if all holdings are percentage-based
  const allPercentage = holdings.every(h => h.mode === "percentage");

  const startAdd = () => {
    setFormSymbol("");
    setFormMode("percentage");
    setFormShares("");
    setFormPrice("");
    setFormPercentage("");
    setIsAdding(true);
    setEditingId(null);
  };

  const startEdit = (holding: Holding) => {
    setFormSymbol(holding.symbol);
    setFormMode(holding.mode);
    setFormShares(holding.shares);
    setFormPrice(holding.price);
    setFormPercentage(holding.percentage);
    setEditingId(holding.id);
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  const saveHolding = () => {
    if (!formSymbol) return;
    if (formMode === "detailed" && (!formShares || !formPrice)) return;
    if (formMode === "percentage" && !formPercentage) return;

    const newHolding: Holding = {
      id: isAdding ? Date.now().toString() : editingId!,
      symbol: formSymbol.toUpperCase(),
      mode: formMode,
      shares: formMode === "detailed" ? formShares : 0,
      price: formMode === "detailed" ? formPrice : 0,
      percentage: formMode === "percentage" ? formPercentage : 0,
    };

    if (isAdding) {
      setHoldings([...holdings, newHolding]);

      // Show login bubble the first time user adds a stock
      if (!hasAddedFirst.current) {
        hasAddedFirst.current = true;
        setShowWelcomeBubble(false);
        setTimeout(() => setShowLoginBubble(true), 600);
      }
    } else if (editingId) {
      setHoldings(holdings.map(h => h.id === editingId ? newHolding : h));
    }
    cancelEdit();
  };

  const deleteHolding = (id: string) => {
    setHoldings(holdings.filter(h => h.id !== id));
  };

  // Render the add/edit form
  const renderForm = (isEdit: boolean) => (
    <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100 shadow-inner space-y-4">
      {/* Mode Toggle */}
      <div className="flex items-center gap-2 pb-3 border-b border-emerald-200/50">
        <span className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-500">Input Mode:</span>
        <div className="flex bg-white rounded-lg border border-gray-200 overflow-hidden">
          <button
            type="button"
            onClick={() => setFormMode("percentage")}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold transition-all ${formMode === "percentage" ? "bg-emerald-600 text-white" : "text-gray-500 hover:text-gray-700"}`}
          >
            <Percent className="w-3 h-3" /> Percentage
          </button>
          <button
            type="button"
            onClick={() => setFormMode("detailed")}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-bold transition-all ${formMode === "detailed" ? "bg-emerald-600 text-white" : "text-gray-500 hover:text-gray-700"}`}
          >
            <DollarSign className="w-3 h-3" /> Shares & Price
          </button>
        </div>
      </div>

      <div className={`grid gap-3 ${formMode === "percentage" ? "grid-cols-2" : "grid-cols-3"}`}>
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Symbol</label>
          <input 
            type="text" 
            placeholder="e.g. AAPL" 
            value={formSymbol} 
            onChange={(e) => setFormSymbol(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {formMode === "percentage" ? (
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Allocation (%)</label>
            <input 
              type="number" 
              placeholder="e.g. 25" 
              min="0" 
              max="100"
              value={formPercentage} 
              onChange={(e) => setFormPercentage(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        ) : (
          <>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Shares</label>
              <input 
                type="number" 
                placeholder="0" 
                value={formShares} 
                onChange={(e) => setFormShares(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Price ($)</label>
              <input 
                type="number" 
                placeholder="0.00" 
                value={formPrice} 
                onChange={(e) => setFormPrice(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </>
        )}
      </div>
      <div className="flex justify-end gap-2 pt-2 border-t border-emerald-200/50">
        <button onClick={cancelEdit} className="px-3 py-1.5 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-200/50 rounded-md transition-colors">Cancel</button>
        <button onClick={saveHolding} className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-bold bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors">
          <Check className="w-4 h-4"/> {isEdit ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Your <span className="text-emerald-600">Portfolio</span>
        </h1>
        <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
          Manage your assets to get personalized financial news and insights mapped directly to your holdings.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Side: Holdings List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Current Assets</h2>
            {!isAdding && !editingId && (
              <button 
                onClick={startAdd}
                className="inline-flex items-center gap-1.5 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Asset
              </button>
            )}
          </div>

          <div className="p-6 flex-grow space-y-4 max-h-[500px] overflow-y-auto">
            {isAdding && renderForm(false)}

            {holdings.length === 0 && !isAdding ? (
              <div className="text-center py-12 text-gray-400 font-medium">
                No assets in your portfolio yet.<br/> Add some to see your distribution!
              </div>
            ) : (
              <div className="space-y-3">
                {holdings.map((holding) => (
                  <div key={holding.id}>
                    {editingId === holding.id ? (
                      renderForm(true)
                    ) : (
                      <div className="group flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all bg-white shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                            {holding.symbol.substring(0, 1)}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">{holding.symbol}</h3>
                            {holding.mode === "percentage" ? (
                              <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
                                <Percent className="w-3 h-3" /> {holding.percentage}% allocation
                              </p>
                            ) : (
                              <p className="text-xs font-medium text-gray-500">
                                {holding.shares} Shares @ ${holding.price}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 border-l border-gray-100 pl-4">
                          <div className="text-right">
                            {holding.mode === "percentage" ? (
                              <p className="font-bold text-emerald-600">{holding.percentage}%</p>
                            ) : (
                              <p className="font-bold text-gray-900">${((Number(holding.shares) || 0) * (Number(holding.price) || 0)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => startEdit(holding)} className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors" title="Edit">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => deleteHolding(holding.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Pie Chart + Speech Bubbles */}
        <div className="space-y-6">
          {/* Welcome Speech Bubble */}
          {showWelcomeBubble && (
            <div className="relative animate-in slide-in-from-top-4 fade-in duration-500 bg-white rounded-2xl border-2 border-emerald-200 p-5 shadow-lg shadow-emerald-500/5">
              <button 
                onClick={() => setShowWelcomeBubble(false)} 
                className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5 p-2 bg-emerald-100 rounded-full text-emerald-600">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">Welcome to Your Portfolio! 👋</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    You can <strong>edit and add your own portfolio values</strong> using the panel on the left. 
                    You have <strong>two options</strong>:
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-0.5 text-emerald-700 font-bold text-xs bg-emerald-50 px-1.5 py-0.5 rounded">
                        <Percent className="w-3 h-3" /> %
                      </span>
                      Just enter your allocation percentage — no need to share exact amounts!
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-0.5 text-emerald-700 font-bold text-xs bg-emerald-50 px-1.5 py-0.5 rounded">
                        <DollarSign className="w-3 h-3" /> $
                      </span>
                      Or enter exact shares &amp; price for detailed tracking.
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 leading-relaxed mt-2">
                    Based on your holdings, we&apos;ll recommend <strong>personalized news and insights</strong> tailored to you!
                  </p>
                </div>
              </div>
              {/* Speech bubble tail */}
              <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-b-2 border-r-2 border-emerald-200 rotate-45 transform"></div>
            </div>
          )}

          {/* Login Prompt Speech Bubble */}
          {showLoginBubble && (
            <div className="relative animate-in slide-in-from-top-4 fade-in duration-500 bg-white rounded-2xl border-2 border-indigo-200 p-5 shadow-lg shadow-indigo-500/5">
              <button 
                onClick={() => setShowLoginBubble(false)} 
                className="absolute top-3 right-3 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5 p-2 bg-indigo-100 rounded-full text-indigo-600">
                  <LogIn className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">Save Your Portfolio! 🔐</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">
                    Great start! <strong>Register or log in</strong> so your portfolio data is saved securely and you won&apos;t have to input it again next time.
                  </p>
                  <Link 
                    href="/register"
                    className="inline-flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    <LogIn className="w-3.5 h-3.5" /> Create Account
                  </Link>
                </div>
              </div>
              {/* Speech bubble tail */}
              <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-b-2 border-r-2 border-indigo-200 rotate-45 transform"></div>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">Allocation Overview</h2>
              {allPercentage ? (
                <p className="text-sm font-medium text-gray-500 mt-1">Showing percentage allocation</p>
              ) : (
                <p className="text-sm font-medium text-gray-500 mt-1">Total Value: <span className="text-emerald-600 font-bold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
              )}
            </div>
            
            <div className="p-6 flex-grow flex items-center justify-center">
              {chartData.length > 0 ? (
                <div className="w-full h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: any) => {
                          if (allPercentage) return [`${Number(value).toFixed(1)}%`, 'Allocation'];
                          return [`$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Value'];
                        }}
                        contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ fontWeight: 'bold' }}
                      />
                      <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        iconType="circle"
                        formatter={(value, entry: any) => <span className="font-bold text-gray-700 ml-1">{value} ({((entry.payload.value / totalValue) * 100).toFixed(1)}%)</span>}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="text-center text-gray-400 font-medium">
                  Add assets to visualize your portfolio allocation.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
