"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/ui/Header";
import { TrendingUp, PiggyBank, Clock, ArrowRight, ChevronRight, X, Calculator, Shield, Zap, Target } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { id: 1, title: "Why Invest" },
  { id: 2, title: "Try Simulator" },
  { id: 3, title: "Start Small" },
  { id: 4, title: "ETFs vs Stocks" },
  { id: 5, title: "Think Long Term" },
  { id: 6, title: "How We Make Money" },
];

function ProgressStepper({ currentStep, onStepClick }: { currentStep: number; onStepClick: (step: number) => void }) {
  return (
    <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 py-3">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between overflow-x-auto pb-2 scrollbar-hide">
          {STEPS.map((step, index) => (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                currentStep === step.id
                  ? "bg-emerald-600 text-white shadow-md"
                  : currentStep > step.id
                  ? "bg-emerald-100 text-emerald-700"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                currentStep === step.id
                  ? "bg-white text-emerald-600"
                  : currentStep > step.id
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-200"
              }`}>
                {currentStep > step.id ? "✓" : step.id}
              </span>
              <span className="hidden sm:inline">{step.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function WhyInvestingMatters() {
  return (
    <section id="why-invest" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-2 block">Getting Started</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Investing Matters</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Understanding why your money should work for you is the first step to building wealth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Inflation */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Money Loses Value Over Time</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Thanks to inflation, $10,000 today might only be worth $8,000 in 10 years. Prices go up, but money left sitting still doesn't.
            </p>
          </div>

          {/* Card 2: Passive Income */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <PiggyBank className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Investing Creates Passive Income</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your money grows while you sleep. No extra work required—just let your investments do the heavy lifting.
            </p>
          </div>

          {/* Card 3: Growth */}
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Your Money Can Grow With You</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Compound growth means your money makes more money. Start early, and time becomes your greatest ally.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InvestmentSimulator() {
  const [initialAmount, setInitialAmount] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(20);
  const [growthRate, setGrowthRate] = useState(7);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayYears, setDisplayYears] = useState(20);

  const growthRates = [
    { value: 5, label: "Conservative (5%)" },
    { value: 7, label: "Moderate (7%)" },
    { value: 10, label: "Aggressive (10%)" },
  ];

  const calculateGrowth = (yearsToCalculate: number) => {
    const data = [];
    let total = initialAmount;
    const monthlyRate = growthRate / 100 / 12;

    for (let year = 0; year <= yearsToCalculate; year++) {
      data.push({
        year,
        value: Math.round(total),
        contributions: initialAmount + monthlyContribution * 12 * year,
      });
      
      if (year < yearsToCalculate) {
        // Compound for one year
        for (let month = 0; month < 12; month++) {
          total = total * (1 + monthlyRate) + monthlyContribution;
        }
      }
    }
    return data;
  };

  const chartData = calculateGrowth(displayYears);

  useEffect(() => {
    if (isPlaying && displayYears < years) {
      const timer = setTimeout(() => {
        setDisplayYears((prev) => Math.min(prev + 1, years));
      }, 100);
      return () => clearTimeout(timer);
    } else if (displayYears >= years) {
      setIsPlaying(false);
    }
  }, [isPlaying, displayYears, years]);

  const handlePlay = () => {
    setDisplayYears(0);
    setIsPlaying(true);
  };

  const finalValue = chartData[chartData.length - 1]?.value || 0;
  const totalContributed = initialAmount + monthlyContribution * 12 * years;
  const totalGrowth = finalValue - totalContributed;

  return (
    <section id="simulator" className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-2 block">Interactive Demo</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Try Our Simulator</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            See how your money could grow over time. No real money involved—just experimenting!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
          {/* Controls */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Initial Investment</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Monthly Contribution</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Time Horizon: {years} years</label>
              <input
                type="range"
                min="1"
                max="30"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Growth Rate</label>
              <div className="flex gap-2">
                {growthRates.map((rate) => (
                  <button
                    key={rate.value}
                    onClick={() => setGrowthRate(rate.value)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      growthRate === rate.value
                        ? "bg-emerald-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {rate.label.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "Value"]}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Play Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={handlePlay}
              disabled={isPlaying}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Calculator className="w-5 h-5" />
              {isPlaying ? "Simulating..." : "Watch It Grow"}
            </button>
          </div>

          {/* Results */}
          <div className="grid md:grid-cols-3 gap-4 p-4 bg-emerald-50 rounded-xl">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Total Contributed</p>
              <p className="text-xl font-bold text-gray-900">${totalContributed.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Investment Growth</p>
              <p className="text-xl font-bold text-emerald-600">+${totalGrowth.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Final Value</p>
              <p className="text-xl font-bold text-gray-900">${finalValue.toLocaleString()}</p>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            *This is a simplified simulation for educational purposes only. Actual returns will vary. Past performance doesn't guarantee future results.
          </p>
        </div>
      </div>
    </section>
  );
}

function StartSmallCard() {
  return (
    <section id="start-small" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Start Small</h3>
              <p className="text-gray-500 leading-relaxed">
                You don't need a fortune to start investing. Many platforms let you start with just $5 or $10. The key is to start—and keep going.
              </p>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Only invest money you can afford to lose. Investing involves risk, and you should never invest money you need for bills or emergencies.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Start with whatever you can—even $25/month adds up over time</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ETFvsStockCard() {
  const [activeTab, setActiveTab] = useState<"etf" | "stock">("etf");

  return (
    <section id="etf-vs-stocks" className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-2 block">Understanding Options</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ETFs vs. Single Stocks</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Learn the difference between these two popular investment types.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("etf")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "etf"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-300"
            }`}
          >
            ETFs (Exchange-Traded Funds)
          </button>
          <button
            onClick={() => setActiveTab("stock")}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === "stock"
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-300"
            }`}
          >
            Single Stocks
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8"
          >
            {activeTab === "etf" ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">ETFs: diversification made easy</h3>
                </div>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  An ETF (Exchange-Traded Fund) is like a basket that holds hundreds of different stocks. When you buy one ETF, you instantly own tiny pieces of many companies.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-emerald-50 p-4 rounded-xl">
                    <h4 className="font-bold text-emerald-800 mb-2">✓ Benefits</h4>
                    <ul className="text-sm text-emerald-700 space-y-1">
                      <li>• Instant diversification</li>
                      <li>• Lower risk than single stocks</li>
                      <li>• Professional management</li>
                      <li>• Generally 7% average return historically</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-gray-700 mb-2">The Rule of 72</h4>
                    <p className="text-sm text-gray-600">
                      At 7% annual growth, your money doubles in about 10 years (72 ÷ 7 = 10). This is the power of compound growth!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Single Stocks: higher risk, higher reward</h3>
                </div>
                <p className="text-gray-500 mb-6 leading-relaxed">
                  When you buy a single stock, you're betting on one company. If the company does well, you can make more money. If it doesn't, you can lose more.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <h4 className="font-bold text-purple-800 mb-2">⚡ Higher Potential</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Bigger gains if company grows fast</li>
                      <li>• You choose exactly what to own</li>
                      <li>• Dividends can provide income</li>
                      <li>• More control over your money</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-xl">
                    <h4 className="font-bold text-red-800 mb-2">⚠️ Higher Risk</h4>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• If company fails, you lose money</li>
                      <li>• No diversification</li>
                      <li>• More research needed</li>
                      <li>• Volatile price swings</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Comparison Table */}
        <div className="mt-8 overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-4 font-bold text-gray-900">Factor</th>
                <th className="text-center p-4 font-bold text-gray-900">ETFs</th>
                <th className="text-center p-4 font-bold text-gray-900">Single Stocks</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-100">
                <td className="p-4 text-gray-600">Risk Level</td>
                <td className="p-4 text-center text-emerald-600 font-medium">Lower</td>
                <td className="p-4 text-center text-red-600 font-medium">Higher</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="p-4 text-gray-600">Research Needed</td>
                <td className="p-4 text-center text-gray-600">Less</td>
                <td className="p-4 text-center text-gray-600">More</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="p-4 text-gray-600">Potential Returns</td>
                <td className="p-4 text-center text-gray-600">Moderate (7-10%)</td>
                <td className="p-4 text-center text-gray-600">Can be much higher</td>
              </tr>
              <tr className="border-t border-gray-100">
                <td className="p-4 text-gray-600">Best For</td>
                <td className="p-4 text-center text-gray-600">Beginners</td>
                <td className="p-4 text-center text-gray-600">Experienced investors</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function LongTermCard() {
  return (
    <section id="long-term" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-2xl shadow-lg p-6 md:p-12 text-white">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Think Long Term</h2>
            <p className="text-emerald-100 text-lg max-w-xl mx-auto">
              The best investors aren't trying to get rich quick. They're patient and let time work its magic.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold mb-1">10 years</p>
              <p className="text-emerald-100 text-sm">Your money roughly doubles at 7%</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold mb-1">20 years</p>
              <p className="text-emerald-100 text-sm">$200/month becomes ~$100k</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4 text-center">
              <p className="text-3xl font-bold mb-1">30 years</p>
              <p className="text-emerald-100 text-sm">$200/month becomes ~$250k</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-emerald-100 text-sm">
              <strong>The secret?</strong> Don't touch it. Let your investments grow tax-deferred, and you'll thank yourself later.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function TransparencySection() {
  return (
    <section id="transparency" className="py-20 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-2 block">How We Make Money</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            We believe in being upfront about how AIFA makes money—so you know exactly what you're getting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Free Tier */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <span className="text-emerald-600 font-bold text-xl">Free</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Basic Features</h3>
            </div>
            <p className="text-gray-500 mb-6">
              Everything you need to get started with intelligent investing.
            </p>
            <ul className="space-y-3">
              {[
                "AI-powered news summaries",
                "Basic portfolio tracking",
                "Market news feed",
                "Limited stock analysis",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Premium Tier */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 md:p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">Pro</span>
              </div>
              <h3 className="text-xl font-bold">Premium Features</h3>
            </div>
            <p className="text-gray-300 mb-6">
              For investors who want deeper insights and advanced tools.
            </p>
            <ul className="space-y-3">
              {[
                "Advanced AI analysis & insights",
                "Unlimited portfolio tracking",
                "Real-time alerts",
                "Priority support",
                "Custom watchlists",
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-300">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/30 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="w-full mt-6 py-3 bg-emerald-500 hover:bg-emerald-400 rounded-xl font-bold transition-all">
              Upgrade to Pro
            </button>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h4 className="font-bold text-gray-900 mb-2">Our Promise</h4>
          <p className="text-gray-500 text-sm leading-relaxed">
            AIFA helps investors at all levels. Whether you're just starting or you're an experienced trader, we provide the tools and insights you need to make smarter decisions. We never sell your data, and we always put your interests first.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function LearnPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (step: number) => {
    const sectionIds = [
      "why-invest",
      "simulator",
      "start-small",
      "etf-vs-stocks",
      "long-term",
      "transparency",
    ];
    const element = document.getElementById(sectionIds[step - 1]);
    if (element) {
      const offset = 140;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setCurrentStep(step);
  };

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      <ProgressStepper currentStep={currentStep} onStepClick={scrollToSection} />

      {/* Section 1: Why Investing Matters */}
      <WhyInvestingMatters />

      {/* Section 2: Investment Simulator */}
      <InvestmentSimulator />

      {/* Section 3: Start Small */}
      <StartSmallCard />

      {/* Section 4: ETFs vs Stocks */}
      <ETFvsStockCard />

      {/* Section 5: Long Term */}
      <LongTermCard />

      {/* Section 6: Transparency */}
      <TransparencySection />

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-500 mb-8">
            Now that you understand the basics, it's time to put your knowledge into practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all"
            >
              Go to Portfolio <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-700 transition-all"
          >
            <ChevronRight className="w-6 h-6 rotate-[-90deg]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            © 2024 AIFA NEWS. This is for educational purposes only and does not constitute financial advice.
          </p>
        </div>
      </footer>
    </main>
  );
}