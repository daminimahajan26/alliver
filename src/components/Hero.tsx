import React from 'react';

interface HeroProps {
  onOpenConsultation: (servicePreset?: string) => void;
  onExploreApproach?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onExploreApproach }) => {
  return (
    <>
      {/* Full-Screen Cinematic Hero Section in Rich Forest Green (#173F35) */}
      <section className="relative min-h-[92vh] w-full flex flex-col justify-center overflow-hidden bg-[#173F35] text-[#F5EFE6] pt-32 pb-20 px-6 sm:px-12 lg:px-20">
        {/* Main Content Hero Block */}
        <div className="relative z-10 max-w-4xl my-auto">
          {/* Subtitle kicker with Antique Gold line */}
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#A88752] mb-5">
            <span className="w-8 h-[2px] bg-[#A88752] inline-block" />
            <span>ALLIVER · CREATIVE DIGITAL MARKETING AGENCY</span>
          </div>

          {/* Core Brand Headline in Ivory #F5EFE6 */}
          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#F5EFE6] font-normal leading-[1.04] tracking-tight mb-6 text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)]">
            Creative Digital Marketing Agency For Ambitious Business
          </h1>

          {/* Brand Positioning & Core Disciplines */}
          <p className="text-base sm:text-xl text-[#F5EFE6]/90 leading-relaxed font-light max-w-3xl mb-10">
            Driving measurable growth for ambitious businesses through unified Branding, cinematic Video Production, and Public Relations (PR) powered by Performance Marketing, SEO and AI Search, Social Media Marketing, and Influencer Marketing.
          </p>

          {/* Dual Action Pill Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onOpenConsultation()}
              className="flex items-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#173F35] bg-[#F5EFE6] hover:bg-white active:scale-[0.98] rounded-full transition-all shadow-2xl group font-semibold"
            >
              <span>BOOK A STRATEGY CALL</span>
              <span className="text-sm font-semibold group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button
              onClick={() => {
                if (onExploreApproach) {
                  onExploreApproach();
                } else {
                  const el = document.getElementById('about-alliver');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="flex items-center gap-2 px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] border border-white/35 hover:border-[#A88752] hover:bg-white/10 active:scale-[0.98] rounded-full transition-all"
            >
              <span>EXPLORE OUR APPROACH</span>
              <span className="text-sm font-semibold">↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* Marquee Ticker in Deep Forest Green transitioning into Ivory */}
      <div className="bg-[#0F2C25] text-[#F5EFE6] border-b border-[#173F35] py-5 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 sm:gap-16">
          {[
            'Performance Marketing',
            'SEO & AI Search',
            'Social Media Marketing',
            'Video Production',
            'Public Relations (PR)',
            'Influencer Marketing',
            'Branding & Identity',
            'Performance Marketing',
            'SEO & AI Search',
            'Social Media Marketing',
            'Video Production',
            'Public Relations (PR)',
            'Influencer Marketing',
            'Branding & Identity',
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-8 text-xl sm:text-2xl font-editorial text-[#F5EFE6] hover:text-[#A88752] transition-colors cursor-default"
            >
              <span>{item}</span>
              <span className="text-xs text-[#A88752]">✦</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
