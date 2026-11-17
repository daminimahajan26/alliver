import React from 'react';
import { Target, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface AboutAlliverSectionProps {
  onOpenConsultation: (servicePreset?: string) => void;
  onExploreProcess?: () => void;
}

interface PillarDetail {
  label: string;
  stepNum: string;
  tagline: string;
  description: string;
  deliverables: string[];
  operationalScope: string[];
  kpi: string;
  kpiLabel: string;
}

export const AboutAlliverSection: React.FC<AboutAlliverSectionProps> = ({
  onOpenConsultation,
}) => {
  const [gridRef, isVisible] = useScrollReveal<HTMLDivElement>();
  const [dualCardsRef, areDualCardsVisible] = useScrollReveal<HTMLDivElement>();

  const approachSteps: PillarDetail[] = [
    {
      label: 'Strategy',
      stepNum: '01',
      tagline: 'Brand Alignment, Market Intelligence & Commercial Architecture',
      description: 'Understanding brand objectives, audience profiling, competitive analysis, and commercial roadmaps.',
      deliverables: [
        'Comprehensive Market & Competitor Audit',
        'Target ICP & Audience Persona Profiling',
        'Unit Economics & ROAS Target Modeling',
        '30-Day Master Editorial Strategy & Campaign Blueprint',
      ],
      operationalScope: [
        'Forensic discovery of customer acquisition costs and funnel drop-offs.',
        'Category positioning to elevate your brand above price-competition wars.',
        'Cross-channel media allocation blueprint (Paid, Organic, Creator & PR).',
      ],
      kpi: '100% Roadmap Clarity',
      kpiLabel: 'Elimination of wasted ad spend prior to creative production',
    },
    {
      label: 'Creativity',
      stepNum: '02',
      tagline: 'Runway-Grade Art Direction & Cinematic Brand Narrative',
      description: 'Runway-grade art direction, distinctive visual identities, and compelling brand storytelling.',
      deliverables: [
        'Visual Identity System & Brand Style Guide',
        'Editorial Moodboards & Shot Reference Guides',
        'Persuasive Scriptwriting & Conversational Ad Copy',
        'High-Conversion Creative Storyboards & Pre-Vis',
      ],
      operationalScope: [
        'Crafting high-status editorial visuals that command instant attention in feeds.',
        'Hook-driven narrative frameworks tailored for short-form video algorithms.',
        'Prestige aesthetic standards paired with direct-response psychological triggers.',
      ],
      kpi: '3.8x Hook Retention',
      kpiLabel: 'Average increase in 3-second hold rate across video campaigns',
    },
    {
      label: 'Digital Execution',
      stepNum: '03',
      tagline: 'Omni-Channel Content Production & Relentless Distribution',
      description: 'High-retention video production, multi-channel publishing, search optimisation, and active community engagement.',
      deliverables: [
        'Studio & On-Location 4K Video Production',
        'Multi-Format Short-Form Reels, Shorts & TikToks',
        'Algorithmic Scheduling & Cross-Platform Publishing',
        'Search Optimisation (Google SEO & Generative AI Search)',
      ],
      operationalScope: [
        'Frame-accurate color grading and mobile-native video pacing.',
        'Active daily community engagement and high-intent inquiry filtering.',
        'Generative Engine Optimisation (GEO) indexing for ChatGPT, Gemini & Perplexity.',
      ],
      kpi: '30-Day Content Buffer',
      kpiLabel: 'Consistent daily digital presence without founder operational overhead',
    },
    {
      label: 'Performance',
      stepNum: '04',
      tagline: 'Algorithmic Media Optimization & Commercial Scale',
      description: 'Algorithmic media optimization, attribution tracking, conversion tuning, and relentless commercial scaling.',
      deliverables: [
        'Server-Side Tracking (CAPI & Enhanced Conversions)',
        'Meta & Google Ads Campaign Management',
        'Conversion Rate Optimization (CRO) & Landing Pages',
        'Real-Time Live Financial Dashboard & Attribution',
      ],
      operationalScope: [
        'Continuous creative iteration and algorithmic budget scaling.',
        'First-party data collection bypassing iOS 14+ tracking signal loss.',
        'Relentless focus on qualified inquiries, direct bookings, and bottom-line revenue.',
      ],
      kpi: '4.8x Blended ROAS',
      kpiLabel: 'Measured across active high-growth enterprise partnerships',
    },
  ];

  return (
    <section id="about-alliver" className="py-24 lg:py-32 bg-[#F5EFE6] border-b border-[#A88752]/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A88752] mb-3">
            <span>Section 01</span>
            <span aria-hidden="true">·</span>
            <span>About Alliver</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1C1614] tracking-tight leading-[1.1] mb-6">
            Built for businesses that are serious about growth.
          </h2>

          <p className="font-editorial text-xl sm:text-2xl text-[#173F35] leading-relaxed font-normal mb-4">
            Alliver is built for businesses that are serious about growth, value clear communication, want consistent marketing and aim to grow with purpose.
          </p>
        </div>

        {/* Our Approach: Strategy + Creativity + Digital Execution + Performance */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-6 border-b border-[#A88752]/30 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#A88752] block">
                The Alliver Formula
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#1C1614]">
                Our Approach: Strategy + Creativity + Digital Execution + Performance
              </h3>
            </div>
          </div>

          {/* Connected 4-Pillar Equation Grid with Scroll-Triggered Popping Up Animation */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {approachSteps.map((step, idx) => (
              <div
                key={step.label}
                className={`relative p-7 rounded-2xl bg-[#173F35] text-[#F5EFE6] border-2 border-[#A88752]/40 shadow-xl flex flex-col justify-between group select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 hover:scale-[1.03] hover:shadow-[0_20px_45px_rgba(23,63,53,0.45)] hover:border-[#A88752] ${
                  isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-10 scale-90'
                }`}
                style={{
                  transitionDelay: isVisible ? `${idx * 120}ms` : '0ms',
                }}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-4">
                    <span className="font-editorial text-3xl text-[#A88752] font-normal tabular-nums group-hover:scale-110 transition-transform duration-200">
                      {step.stepNum}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-[#F5EFE6]/90 group-hover:bg-[#A88752] group-hover:text-[#173F35] transition-colors">
                      Pillar {idx + 1}
                    </span>
                  </div>

                  <h4 className="font-editorial text-2xl text-[#F5EFE6] group-hover:text-[#A88752] transition-colors mb-2 font-normal">
                    {step.label}
                  </h4>

                  <p className="text-xs text-[#F5EFE6]/85 font-light leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider text-[#A88752] font-semibold flex items-center gap-1">
                    <span>Strategic Pillar</span>
                  </span>
                  {idx < 3 ? (
                    <span className="text-xs font-bold text-[#A88752] font-mono">+</span>
                  ) : (
                    <span className="text-xs font-bold text-[#A88752] font-mono">= Results</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dual Cards: Our Goal & Our Vision (with Scroll-Triggered Popping Up Animation) */}
        <div
          ref={dualCardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {/* Card 1: Our Goal */}
          <div
            className={`p-8 sm:p-10 rounded-3xl bg-white border border-[#A88752]/35 shadow-xl flex flex-col justify-between relative overflow-hidden group select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-[0_20px_45px_rgba(23,63,53,0.15)] hover:border-[#A88752] ${
              areDualCardsVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-90'
            }`}
            style={{
              transitionDelay: areDualCardsVisible ? '0ms' : '0ms',
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#A88752]/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110 duration-300" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173F35]/10 text-[#173F35] text-xs font-bold uppercase tracking-wider mb-5">
                <Target className="w-3.5 h-3.5 text-[#173F35]" />
                <span>Our Strategic Objective</span>
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl text-[#173F35] tracking-tight mb-4">
                Our Goal
              </h3>

              <p className="text-base sm:text-lg text-[#1C1614]/85 leading-relaxed font-light">
                To reach the right audience, build brand trust, and help businesses convert their marketing efforts into meaningful commercial outcomes.
              </p>
            </div>

            <div className="pt-6 mt-8 border-t border-[#1C1614]/10 flex items-center gap-2 text-xs font-semibold text-[#173F35]">
              <CheckCircle2 className="w-4 h-4 text-[#A88752]" />
              <span>Right Audience · Brand Trust · Commercial Outcomes</span>
            </div>
          </div>

          {/* Card 2: Our Vision */}
          <div
            className={`p-8 sm:p-10 rounded-3xl bg-[#173F35] text-[#F5EFE6] border border-[#A88752]/40 shadow-xl flex flex-col justify-between relative overflow-hidden group select-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-[0_20px_45px_rgba(23,63,53,0.45)] hover:border-[#A88752] ${
              areDualCardsVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-12 scale-90'
            }`}
            style={{
              transitionDelay: areDualCardsVisible ? '160ms' : '0ms',
            }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110 duration-300" />

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/25 text-[#A88752] border border-white/10 text-xs font-bold uppercase tracking-wider mb-5">
                <Sparkles className="w-3.5 h-3.5 text-[#A88752]" />
                <span>Guiding North Star</span>
              </div>

              <h3 className="font-editorial text-3xl sm:text-4xl text-[#F5EFE6] tracking-tight mb-4">
                Our Vision
              </h3>

              <p className="text-base sm:text-lg text-[#F5EFE6]/90 leading-relaxed font-light">
                To connect creativity with business growth through strategic, consistent, and performance-driven marketing.
              </p>
            </div>

            <div className="pt-6 mt-8 border-t border-white/15 flex items-center gap-2 text-xs font-semibold text-[#F5EFE6]">
              <CheckCircle2 className="w-4 h-4 text-[#A88752]" />
              <span>Creativity Connected to Measurable Commercial Scale</span>
            </div>
          </div>
        </div>

        {/* Quick CTA strip */}
        <div className="p-6 rounded-2xl bg-[#173F35]/5 border border-[#173F35]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#1C1614]/80 font-light text-center sm:text-left">
            Ready to experience an agency that measures performance instead of vanity impressions?
          </p>
          <button
            onClick={() => onOpenConsultation()}
            className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F5EFE6] bg-[#173F35] hover:bg-[#0F2C25] transition-all shrink-0 shadow-md flex items-center gap-2"
          >
            <span>Book a Strategy Call</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#A88752]" />
          </button>
        </div>
      </div>
    </section>
  );
};
