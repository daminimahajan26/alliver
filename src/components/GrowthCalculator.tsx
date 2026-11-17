import React, { useState } from 'react';
import { Calculator, ArrowUpRight, TrendingUp } from 'lucide-react';

interface GrowthCalculatorProps {
  onApplyPlan: (planSummary: string) => void;
}

export const GrowthCalculator: React.FC<GrowthCalculatorProps> = ({ onApplyPlan }) => {
  const [industry, setIndustry] = useState<string>('Luxury Fashion & Apparel');
  const [adSpend, setAdSpend] = useState<number>(2000000);
  const [objective, setObjective] = useState<string>('Direct-to-Consumer ROAS Scale');

  const industries = [
    { name: 'Luxury Fashion & Apparel', roasMultiplier: 4.4, leadType: 'Purchases' },
    { name: 'Haute Parfumerie & Cosmetics', roasMultiplier: 4.8, leadType: 'Orders' },
    { name: 'Hospitality & Private Villas', roasMultiplier: 5.6, leadType: 'VIP Bookings' },
    { name: 'Gourmet F&B & Private Clubs', roasMultiplier: 4.1, leadType: 'Reservations' },
    { name: 'High-Ticket B2B & Real Estate', roasMultiplier: 6.2, leadType: 'Qualified Inquiries' },
  ];

  const objectives = [
    'Direct-to-Consumer ROAS Scale',
    'Brand Authority & Market Entry',
    'High-Net-Worth Lead Funnel',
    'Omni-Channel Rebrand & Viral Growth',
  ];

  const currentInd = industries.find((i) => i.name === industry) || industries[0];
  const targetROAS = currentInd.roasMultiplier;
  const estimatedRevenue = Math.round(adSpend * targetROAS);
  const estimatedReach = Math.round(adSpend * 0.65);
  const estimatedConversions = Math.round((estimatedRevenue / (industry.includes('Hospitality') ? 95000 : industry.includes('B2B') ? 220000 : 18000)));

  const handleBookWithCalculation = () => {
    const summary = `${industry} | Ad Spend: ₹${adSpend.toLocaleString('en-IN')}/mo | Objective: ${objective} | Target ROAS: ${targetROAS}x (Est. ₹${estimatedRevenue.toLocaleString('en-IN')})`;
    onApplyPlan(summary);
  };

  return (
    <section id="calculator" className="py-20 lg:py-28 bg-[#F5EFE6] border-b border-[#A88752]/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A88752] mb-3">
            <Calculator className="w-4 h-4" />
            <span>Forecast Engine</span>
            <span aria-hidden="true" className="text-[#A88752]">·</span>
            <span>Growth Modeling</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#1C1614] tracking-tight leading-tight mb-4">
            Model Your Growth Velocity &amp; Projected Performance.
          </h2>
          <p className="text-base sm:text-lg text-[#1C1614]/80 leading-relaxed font-normal">
            Calibrate your sector, monthly ad spend, and strategic priority to simulate your estimated return on ad spend and campaign trajectory with Alliver.
          </p>
        </div>

        {/* Dual Grid: Controls + Interactive Projection Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Panel */}
          <div className="lg:col-span-7 bg-white/70 p-5 sm:p-8 rounded-2xl border border-[#A88752]/35 shadow-sm space-y-7">
            {/* 1. Industry Selector */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#173F35] mb-3 block">
                01. Select Your Enterprise Sector
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {industries.map((ind) => (
                  <button
                    key={ind.name}
                    onClick={() => setIndustry(ind.name)}
                    className={`px-3.5 py-2.5 text-xs font-medium text-left rounded-lg transition-all border ${
                      industry === ind.name
                        ? 'bg-[#1C1614] text-[#F5EFE6] border-[#1C1614] shadow-sm'
                        : 'bg-white text-[#1C1614] border-[#A88752]/30 hover:border-[#173F35]'
                    }`}
                  >
                    {ind.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Monthly Ad Spend Slider */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#173F35]">
                  02. Target Monthly Ad Capital
                </label>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#1C1614] tabular-nums">
                    ₹{adSpend.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs font-normal text-[#1C1614]/60 uppercase tracking-wider">
                    INR / mo
                  </span>
                </div>
              </div>
              <input
                type="range"
                min={200000}
                max={10000000}
                step={200000}
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full h-2.5 bg-[#A88752]/30 rounded-lg appearance-none cursor-pointer accent-[#173F35] touch-none"
              />
              <div className="flex justify-between text-[11px] text-[#1C1614]/70 mt-2 font-mono">
                <span className="text-left">
                  <span className="sm:hidden">₹2L</span>
                  <span className="hidden sm:inline">₹2,00,000</span>
                </span>
                <span className="text-center">
                  <span className="sm:hidden">₹25L</span>
                  <span className="hidden sm:inline">₹25,00,000</span>
                </span>
                <span className="text-center">
                  <span className="sm:hidden">₹50L</span>
                  <span className="hidden sm:inline">₹50,00,000</span>
                </span>
                <span className="text-right">
                  <span className="sm:hidden">₹1Cr+</span>
                  <span className="hidden sm:inline">₹1,00,00,000+</span>
                </span>
              </div>
            </div>

            {/* 3. Growth Objective */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#173F35] mb-3 block">
                03. Primary Strategic Mandate
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {objectives.map((obj) => (
                  <button
                    key={obj}
                    onClick={() => setObjective(obj)}
                    className={`px-3.5 py-2.5 text-xs font-medium text-left rounded-lg transition-all border ${
                      objective === obj
                        ? 'bg-[#173F35] text-[#F5EFE6] border-[#173F35] shadow-sm'
                        : 'bg-white text-[#1C1614] border-[#A88752]/30 hover:border-[#173F35]'
                    }`}
                  >
                    {obj}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Output Summary */}
          <div className="lg:col-span-5 bg-[#1C1614] text-[#F5EFE6] p-7 sm:p-9 rounded-2xl border border-[#A88752]/30 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <span className="text-xs uppercase tracking-widest text-[#A88752] font-semibold">
                  Forecasted Outcomes
                </span>
                <span className="text-[11px] font-mono text-[#F5EFE6]/60">
                  90-Day Projection
                </span>
              </div>

              {/* Major Revenue KPI */}
              <div className="mb-6">
                <span className="text-xs uppercase tracking-wider text-[#F5EFE6]/70 block mb-1">
                  Estimated Attributed Revenue
                </span>
                <div className="font-editorial text-4xl sm:text-5xl font-bold text-[#F5EFE6] tabular-nums tracking-tight">
                  ₹{estimatedRevenue.toLocaleString('en-IN')}
                  <span className="text-lg font-normal text-[#A88752] ml-2">INR</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-[#286A68]">
                  <TrendingUp className="w-3.5 h-3.5 text-[#A88752]" />
                  <span className="text-[#F5EFE6]/90">Targeted {targetROAS}x Blended Return on Ad Spend</span>
                </div>
              </div>

              {/* Secondary Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 mb-8">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#F5EFE6]/60 block mb-1">
                    Audience Impressions
                  </span>
                  <span className="font-editorial text-2xl font-semibold text-[#F5EFE6] tabular-nums">
                    {(estimatedReach / 1000).toFixed(0)}k+
                  </span>
                  <span className="text-[10px] text-[#F5EFE6]/60 block">High-affinity reach</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#F5EFE6]/60 block mb-1">
                    Projected Volume
                  </span>
                  <span className="font-editorial text-2xl font-semibold text-[#F5EFE6] tabular-nums">
                    {estimatedConversions.toLocaleString()}+
                  </span>
                  <span className="text-[10px] text-[#F5EFE6]/60 block">{currentInd.leadType}</span>
                </div>
              </div>

              {/* Strategic Architecture Note */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 text-xs text-[#F5EFE6]/80 leading-relaxed font-light mb-6">
                <span className="text-[#A88752] font-semibold block mb-1">
                  Recommended Architecture:
                </span>
                Full-funnel deployment spanning Meta Lookalike seeding, TikTok spark ads, and Google Performance Max with weekly creative refreshes.
              </div>
            </div>

            <button
              onClick={handleBookWithCalculation}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F5EFE6] bg-[#173F35] hover:bg-[#0F2C25] rounded transition-all shadow-md group"
            >
              <span>Lock In This Forecast &amp; Request Brief</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
