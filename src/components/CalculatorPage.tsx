import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Calculator,
  ShieldCheck,
  TrendingUp,
  Percent,
  CheckCircle2,
} from 'lucide-react';
import { GrowthCalculator } from './GrowthCalculator';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface CalculatorPageProps {
  onBackToHome: () => void;
  onOpenConsultation: (servicePreset?: string, forecastSummary?: string) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({
  onBackToHome,
  onOpenConsultation,
}) => {
  const [methodologyRef, isMethodologyVisible] = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="pt-24 pb-20 bg-[#F5EFE6] text-[#1C1614] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between gap-3 mb-8 pt-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-semibold uppercase tracking-wider text-[#173F35] hover:text-[#A88752] transition-colors py-1.5 px-3 sm:px-3.5 rounded-full bg-white/90 hover:bg-white border border-[#A88752]/30 shadow-sm shrink-0 whitespace-nowrap active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span>Return to Home</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#A88752] text-right truncate">
            <span className="truncate">Financial Modeling</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Dedicated Growth Estimator</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#173F35] text-[#F5EFE6] text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#A88752]" />
            <span>Empirical Financial Modeling</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl text-[#1C1614] tracking-tight leading-[1.08] mb-6">
            Predictive ROI &amp; Revenue Simulator
          </h1>

          <p className="text-lg sm:text-xl text-[#1C1614]/80 leading-relaxed font-normal max-w-3xl">
            Model your blended Customer Acquisition Cost (CAC), Return on Ad Spend (ROAS), and estimated net revenue uplift based on real historical benchmarks across our portfolio.
          </p>
        </div>

        {/* Growth Calculator Section */}
        <div className="mb-16">
          <GrowthCalculator
            onApplyPlan={(planSummary) =>
              onOpenConsultation(undefined, `Calculated Growth Plan: ${planSummary}`)
            }
          />
        </div>

        {/* Methodology Behind The Numbers with Popping Up Animation as we scroll */}
        <div
          ref={methodologyRef}
          className={`p-8 sm:p-12 rounded-3xl bg-white border border-[#A88752]/30 shadow-xl mb-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
            isMethodologyVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.98]'
          }`}
        >
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A88752] block mb-2">
              Attribution Integrity
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1C1614] tracking-tight mb-3">
              How Our Projections Are Calibrated
            </h2>
            <p className="text-sm text-[#1C1614]/75 font-light leading-relaxed">
              We never present vanity clicks or theoretical multipliers. All calculations are anchored in trailing 24-month empirical performance data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#173F35]/5 border border-[#173F35]/15">
              <TrendingUp className="w-5 h-5 text-[#173F35] mb-3" />
              <h3 className="text-sm font-semibold text-[#173F35] mb-2">
                Server-Side First-Party Tracking
              </h3>
              <p className="text-xs text-[#1C1614]/75 leading-relaxed font-light">
                Bypassing iOS privacy signal loss via server-side Google Tag Manager and Conversions API (CAPI) for 99.4% attribution match rates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#173F35]/5 border border-[#173F35]/15">
              <Percent className="w-5 h-5 text-[#173F35] mb-3" />
              <h3 className="text-sm font-semibold text-[#173F35] mb-2">
                Blended LTV &amp; Payback Horizon
              </h3>
              <p className="text-xs text-[#1C1614]/75 leading-relaxed font-light">
                Accounting for second-order customer lifetime value (LTV), referral velocity, and repeat purchase frequency within 90 days.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#173F35]/5 border border-[#173F35]/15">
              <ShieldCheck className="w-5 h-5 text-[#173F35] mb-3" />
              <h3 className="text-sm font-semibold text-[#173F35] mb-2">
                Guaranteed Margin Protection
              </h3>
              <p className="text-xs text-[#1C1614]/75 leading-relaxed font-light">
                Every budget recommendation is stress-tested against your gross profit margins to ensure scaling remains strictly net profitable.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#173F35] text-[#F5EFE6] border border-[#A88752]/40 text-center shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A88752] font-semibold mb-3 block">
              Validation Briefing
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#F5EFE6] tracking-tight leading-tight mb-4">
              Turn Your Forecast Into An Executable Roadmap
            </h2>
            <p className="text-sm sm:text-base text-[#F5EFE6]/75 font-light leading-relaxed mb-8">
              Send your projected numbers directly to our media directors. We’ll audit your channel mix and confirm if your targets are attainable in a 30-minute private call.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() =>
                  onOpenConsultation(
                    undefined,
                    'Requested Validation Briefing for Projected Financial Forecast'
                  )
                }
                className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#1C1614] bg-[#A88752] hover:bg-[#c29e64] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Schedule Forecast Validation Briefing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F5EFE6]/80 hover:text-white border border-white/20 hover:border-white/40 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
