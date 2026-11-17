import React from 'react';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface WhyAlliverSectionProps {
  onOpenConsultation: () => void;
}

export const WhyAlliverSection: React.FC<WhyAlliverSectionProps> = ({ onOpenConsultation }) => {
  const [bannerRef, isBannerVisible] = useScrollReveal<HTMLDivElement>();
  const [compareRef, isCompareVisible] = useScrollReveal<HTMLDivElement>();

  return (
    <section id="why-alliver" className="py-24 lg:py-32 bg-[#F5EFE6] text-[#1C1614] border-b border-[#A88752]/30 relative overflow-hidden">
      {/* Subtle radial ambient glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#A88752]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-[#173F35]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Kicker */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A88752] mb-3">
            <span>Section 02</span>
            <span aria-hidden="true">·</span>
            <span>The Genesis &amp; Purpose</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1C1614] tracking-tight leading-[1.1] mb-6">
            Why Alliver Was Started?
          </h2>

          <p className="font-editorial text-xl sm:text-2xl text-[#A88752] leading-relaxed font-normal mb-6">
            Many businesses invest in marketing that looks good but fails to deliver meaningful results.
          </p>

          <p className="text-base sm:text-lg text-[#1C1614]/80 leading-relaxed font-light">
            ALLIVER was created to bridge the gap between creative marketing and commercial outcomes. We believe that having an online presence is not enough. Businesses need a strategy that turns visibility into enquiries, customers, and revenue.
          </p>
        </div>

        {/* Philosophy Highlight Banner */}
        <div
          ref={bannerRef}
          className={`p-8 sm:p-12 rounded-3xl bg-[#173F35] border border-[#A88752]/50 shadow-2xl mb-16 relative overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isBannerVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-10 scale-95'
          }`}
        >
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A88752] block mb-2">
              Our Core Philosophy
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F5EFE6] tracking-tight leading-tight mb-4">
              "Strategy that leads to real growth."
            </h3>
            <p className="text-sm sm:text-base text-[#F5EFE6]/85 font-light leading-relaxed">
              We reject cosmetic marketing that terminates in aesthetic praise without moving the balance sheet. Every concept we design, every video we film, and every search campaign we optimize is calibrated to produce inquiries, revenue, and brand equity.
            </p>
          </div>
        </div>

        {/* The Fundamental Difference: Traditional Agencies vs The ALLIVER Model */}
        <div
          ref={compareRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {/* Card 1: What Fails */}
          <div
            className={`p-8 rounded-3xl bg-white border border-red-500/20 shadow-md flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.01] hover:border-red-500/35 hover:shadow-xl ${
              isCompareVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-10 scale-95'
            }`}
            style={{ transitionDelay: isCompareVisible ? '0ms' : '0ms' }}
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-semibold uppercase tracking-wider mb-5">
                <XCircle className="w-3.5 h-3.5 text-red-500" />
                <span>The Industry Problem</span>
              </div>

              <h4 className="font-editorial text-2xl sm:text-3xl text-[#1C1614] mb-4">
                Looks Good, Delivers Nothing
              </h4>

              <p className="text-xs sm:text-sm text-[#1C1614]/75 leading-relaxed font-light mb-6">
                Most agencies focus strictly on vanity metrics—likes, generic comments, and stock-template graphics that produce applause but zero paying clients.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-[#1C1614]/80 font-light">
                  <span className="text-red-500 mt-0.5 font-bold">✕</span>
                  <span>Superficial vanity impressions without commercial qualification</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#1C1614]/80 font-light">
                  <span className="text-red-500 mt-0.5 font-bold">✕</span>
                  <span>Aesthetics disconnected from sales cycles and customer objections</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#1C1614]/80 font-light">
                  <span className="text-red-500 mt-0.5 font-bold">✕</span>
                  <span>Unaccountable marketing budgets with no visible attribution</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-[#1C1614]/10 text-xs text-[#1C1614]/50">
              The status quo that wastes enterprise capital.
            </div>
          </div>

          {/* Card 2: The ALLIVER Bridge */}
          <div
            className={`p-8 rounded-3xl bg-[#173F35] text-[#F5EFE6] border border-[#A88752] shadow-2xl flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl ${
              isCompareVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-10 scale-95'
            }`}
            style={{ transitionDelay: isCompareVisible ? '140ms' : '0ms' }}
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#A88752]/20 border border-[#A88752]/40 text-[#A88752] text-xs font-semibold uppercase tracking-wider mb-5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#A88752]" />
                <span>The ALLIVER Standard</span>
              </div>

              <h4 className="font-editorial text-2xl sm:text-3xl text-[#F5EFE6] mb-4">
                Bridging Creative Marketing &amp; Commercial Outcomes
              </h4>

              <p className="text-xs sm:text-sm text-[#F5EFE6]/85 leading-relaxed font-light mb-6">
                We combine cinematic luxury production with rigorous performance media so your brand stands out, attracts high-value patrons, and generates measurable pipeline.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-[#F5EFE6]/90 font-light">
                  <CheckCircle2 className="w-4 h-4 text-[#A88752] shrink-0 mt-0.5" />
                  <span>Strategic positioning targeting high-intent decision makers</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#F5EFE6]/90 font-light">
                  <CheckCircle2 className="w-4 h-4 text-[#A88752] shrink-0 mt-0.5" />
                  <span>Content engineered to convert casual visibility into qualified enquiries</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#F5EFE6]/90 font-light">
                  <CheckCircle2 className="w-4 h-4 text-[#A88752] shrink-0 mt-0.5" />
                  <span>Server-side attribution and transparent commercial accountability</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-white/15 flex items-center justify-between">
              <span className="text-xs text-[#A88752] font-semibold">
                Strategy that leads to real growth.
              </span>
              <button
                onClick={onOpenConsultation}
                className="text-xs font-semibold text-[#F5EFE6] hover:text-[#A88752] transition-colors flex items-center gap-1"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
