import { Header } from "@/components/ui/Header";
import { PortfolioManager } from "@/components/portfolio/PortfolioManager";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Header />
      
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <PortfolioManager />
      </div>
    </main>
  );
}
