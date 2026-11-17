import React from 'react';
import { ArrowRight, CheckCircle2, HeartHandshake, Eye, ShieldCheck } from 'lucide-react';
import { PageRoute } from './Navbar';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface BrandManifestoSectionProps {
  onNavigate: (route: PageRoute) => void;
  onOpenConsultation: () => void;
}

export const BrandManifestoSection: React.FC<BrandManifestoSectionProps> = ({
  onNavigate,
  onOpenConsultation,
}) => {
  const [credoRef, isCredoVisible] = useScrollReveal<HTMLDivElement>();
  const [pillarsRef, arePillarsVisible] = useScrollReveal<HTMLDivElement>();
  const [ctaRef, isCtaVisible] = useScrollReveal<HTMLDivElement>();
  const pillars = [
    {
      title: 'Recognise',
      tagline: 'Distinctive Visual & Search Presence',
      description:
        'Cutting through the noise with unmistakable aesthetics, memorable identity design, and Generative Engine / SEO dominance so your market instantly identifies your authority.',
      icon: Eye,
      accent: '#A88752',
    },
    {
      title: 'Trust',
      tagline: 'Credibility, PR & Real Proof',
      description:
        'Building enduring conviction through high-prestige PR features, authentic creator partnerships, and transparent results that turn skeptic prospects into brand advocates.',
      icon: ShieldCheck,
      accent: '#F5EFE6',
    },
    {
      title: 'Choose',
      tagline: 'Conversion & Commercial Growth',
      description:
        'Closing the loop from visibility to commercial outcomes with full-funnel CRO, performance marketing, and compelling offers that make choosing your firm the only rational decision.',
      icon: HeartHandshake,
      accent: '#A88752',
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#F5EFE6] text-[#1C1614] border-b border-[#A88752]/20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A88752]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#173F35]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Kicker */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A88752] mb-3">
            <span>Section 04</span>
            <span aria-hidden="true">·</span>
            <span>What We Believe</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1C1614] tracking-tight leading-[1.08] mb-6">
            What We Believe
          </h2>

          <div
            ref={credoRef}
            className={`p-8 sm:p-10 rounded-3xl bg-[#173F35] border border-[#A88752]/40 shadow-2xl relative overflow-hidden mb-10 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isCredoVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-10 scale-95'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-widest text-[#A88752] mb-3">
              The Alliver Credo
            </div>
            <p className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#F5EFE6] leading-snug font-normal">
              “Marketing is not just about followers, impressions, or likes. It is about building brands that people recognise, trust, and choose.”
            </p>
          </div>
        </div>

        {/* The Three Pillars: Recognise, Trust, Choose (with Scroll-Triggered Popping Up Animation) */}
        <div
          ref={pillarsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`p-8 rounded-3xl bg-[#173F35] text-[#F5EFE6] border border-[#A88752]/40 hover:border-[#A88752] hover:bg-[#12332B] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between group shadow-xl select-none ${
                  arePillarsVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-90'
                }`}
                style={{
                  transitionDelay: arePillarsVisible ? `${idx * 120}ms` : '0ms',
                }}
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-6">
                    <span className="font-editorial text-4xl text-[#A88752] font-normal tabular-nums">
                      0{idx + 1}
                    </span>
                    <div className="p-3 rounded-full bg-white/10 text-[#A88752] border border-[#A88752]/40 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-editorial text-3xl sm:text-4xl text-[#F5EFE6] mb-2 font-normal">
                    {item.title}
                  </h3>

                  <div className="text-xs font-semibold uppercase tracking-wider text-[#A88752] mb-4">
                    {item.tagline}
                  </div>

                  <p className="text-xs sm:text-sm text-[#F5EFE6]/80 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-8 border-t border-white/15 flex items-center gap-2 text-xs text-[#F5EFE6]/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#A88752]" />
                  <span>Essential to Commercial Growth</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Conversion Call to Action Banner (with Scroll-Triggered Popping Up Animation) */}
        <div
          ref={ctaRef}
          className={`p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#173F35] via-[#173F35] to-[#0F2C25] border border-[#A88752]/50 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isCtaVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-10 scale-95'
          }`}
        >
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#A88752] block mb-2">
              Ready to Turn Marketing Into Revenue?
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#F5EFE6] mb-3">
              Book Your Strategic Discovery Call
            </h3>
            <p className="text-sm text-[#F5EFE6]/80 font-light leading-relaxed">
              Meet directly with our senior partners to audit your brand positioning, uncover untapped revenue opportunities, and engineer a roadmap that performs.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={onOpenConsultation}
              className="px-8 py-4 rounded-full bg-[#F5EFE6] text-[#173F35] text-xs font-bold uppercase tracking-wider hover:bg-white active:scale-[0.98] transition-all shadow-xl font-semibold text-center"
            >
              BOOK STRATEGY CALL →
            </button>
            <button
              onClick={() => onNavigate('process')}
              className="px-8 py-4 rounded-full border border-white/30 text-[#F5EFE6] text-xs font-bold uppercase tracking-wider hover:border-[#A88752] hover:bg-white/10 active:scale-[0.98] transition-all text-center"
            >
              VIEW PROCESS PAGE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
