import React from 'react';
import {
  TrendingUp,
  Search,
  Share2,
  Video,
  Award,
  Users,
  Compass,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { useMultiScrollReveal } from '../hooks/useScrollReveal';

interface CorePrinciplesSectionProps {
  onOpenConsultation: (servicePreset?: string) => void;
  onExploreServices?: () => void;
}

export const CorePrinciplesSection: React.FC<CorePrinciplesSectionProps> = ({
  onOpenConsultation,
  onExploreServices,
}) => {
  const [principlesRef, visibleCards] = useMultiScrollReveal<HTMLDivElement>('data-card-index');

  const principles = [
    {
      num: '01',
      title: 'Performance Marketing',
      headline: 'Focus on measurable results and business objectives.',
      description:
        'We engineer full-funnel paid media campaigns across Meta Ads, Google Ads, and emerging channels with disciplined cost-per-acquisition targets and verified return on ad spend.',
      icon: TrendingUp,
      deliverables: ['Meta & Google Ads Engine', 'Full-Funnel CRO', 'Server-Side Attribution (CAPI)'],
    },
    {
      num: '02',
      title: 'SEO and AI Search',
      headline: 'Improve online discoverability through search optimisation.',
      description:
        'Ensuring your brand ranks at the absolute forefront of modern search—from traditional Google Search Engine Optimisation to Generative AI engines like ChatGPT, Gemini, and Perplexity.',
      icon: Search,
      deliverables: ['Generative Engine Optimization (GEO)', 'Technical SEO Architecture', 'High-Intent Search Funnels'],
    },
    {
      num: '03',
      title: 'Social Media Marketing',
      headline: 'Build a consistent and engaging digital presence.',
      description:
        'We manage your complete social ecosystem with editorial consistency, strategic posting cadences, and active community dialogue that nurtures followers into enterprise champions.',
      icon: Share2,
      deliverables: ['30-Day Master Content Calendars', 'Omnichannel Cadence', 'Active Community Engagement'],
    },
    {
      num: '04',
      title: 'Video Production',
      headline: 'Create engaging visual content that communicates the brand’s message.',
      description:
        'Runway-grade cinematography, high-retention vertical video shorts, and documentary brand films that communicate your core message with emotional resonance and viral pacing.',
      icon: Video,
      deliverables: ['Cinematic 4K Photoshoots & Shoots', 'Viral Reels & Shorts Pacing', 'Master Sound & Color Grading'],
    },
    {
      num: '05',
      title: 'Public Relations (PR)',
      headline: 'Build credibility and strengthen brand reputation.',
      description:
        'Securing high-impact features, interviews, and reviews across authoritative publications to elevate prestige and build institutional credibility with high-value audiences.',
      icon: Award,
      deliverables: ['Editorial Feature Placements', 'Founder Thought Leadership', 'Brand Reputation Management'],
    },
    {
      num: '06',
      title: 'Influencer Marketing',
      headline: 'Connect brands with relevant creators and audiences.',
      description:
        'Curating authentic partnerships and VIP gifting seeding with verified tastemakers, industry authorities, and aligned creators that command genuine trust.',
      icon: Users,
      deliverables: ['VIP Creator Seeding', 'Contract & Rights Negotiation', 'Performance-Backed Collaborations'],
    },
    {
      num: '07',
      title: 'Branding',
      headline: 'Develop a distinctive and consistent brand identity.',
      description:
        'From primary visual systems, typography guidelines, and color theory to strategic positioning statements that ensure your brand is instantly recognized and revered.',
      icon: Compass,
      deliverables: ['Visual Identity Guidelines', 'Brand Positioning Architecture', 'Verbal Tone of Voice Systems'],
    },
  ];

  return (
    <section id="principles" className="py-24 lg:py-32 bg-[#F5EFE6] border-b border-[#A88752]/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A88752] mb-3">
            <span>Section 03</span>
            <span aria-hidden="true">·</span>
            <span>What We Master</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1C1614] tracking-tight leading-[1.1] mb-6">
            Our Core Principles
          </h2>

          <p className="text-base sm:text-lg text-[#1C1614]/80 leading-relaxed font-normal">
            Seven unified disciplines working in synchronization to turn brand visibility into commercial growth.
          </p>
        </div>

        {/* 7 Principles Cards Grid (with Scroll-Triggered Popping Up Animation) */}
        <div
          ref={principlesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {principles.map((p, idx) => {
            const Icon = p.icon;
            const isFullWidthOnLarge = idx === 6; // 7th item can gracefully span 3 columns on large screens!
            const isCardVisible = visibleCards.has(idx);
            const colDelay = (idx % 3) * 90;

            return (
              <div
                key={p.num}
                data-card-index={idx}
                className={`p-7 sm:p-8 rounded-3xl bg-[#173F35] text-[#F5EFE6] border border-[#A88752]/30 shadow-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.015] hover:border-[#A88752] flex flex-col justify-between group select-none ${
                  isFullWidthOnLarge ? 'md:col-span-2 lg:col-span-3 lg:flex-row lg:items-center lg:gap-12' : ''
                } ${
                  isCardVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-8 scale-[0.97]'
                }`}
                style={{
                  transitionDelay: isCardVisible ? `${colDelay}ms` : '0ms',
                }}
              >
                <div className={isFullWidthOnLarge ? 'lg:max-w-2xl' : ''}>
                  <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-5">
                    <span className="font-editorial text-4xl text-[#A88752] font-normal tabular-nums">
                      {p.num}
                    </span>
                    <div className="p-2.5 rounded-full bg-black/25 text-[#A88752] border border-white/10 group-hover:bg-[#A88752] group-hover:text-[#173F35] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#F5EFE6] group-hover:text-white transition-colors mb-2 font-normal">
                    {p.title}
                  </h3>

                  <div className="text-xs font-semibold text-[#A88752] uppercase tracking-wider mb-3">
                    {p.headline}
                  </div>

                  <p className="text-xs sm:text-sm text-[#F5EFE6]/85 font-light leading-relaxed mb-6">
                    {p.description}
                  </p>
                </div>

                <div className={isFullWidthOnLarge ? 'lg:min-w-[320px]' : ''}>
                  <div className="pt-4 border-t border-white/15">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#A88752] block mb-2">
                      Key Deliverables
                    </span>
                    <div className="space-y-1.5">
                      {p.deliverables.map((deliv, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-xs text-[#F5EFE6]/90 font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#A88752] shrink-0" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to Full Services Dedicated Page */}
        {onExploreServices && (
          <div className="text-center">
            <button
              onClick={onExploreServices}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#173F35] hover:text-[#F5EFE6] bg-transparent hover:bg-[#173F35] border border-[#173F35] transition-all shadow-sm"
            >
              <span>Explore The Comprehensive Services Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
