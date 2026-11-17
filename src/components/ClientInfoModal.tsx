import React, { useEffect } from 'react';
import { X, CheckCircle2, TrendingUp, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export interface ClientCategoryDetail {
  number: string;
  title: string;
  categoryName: string;
  tagline: string;
  description: string;
  overview: string;
  pillars: {
    title: string;
    description: string;
  }[];
  deliverables: string[];
  keyMetric: string;
  keyMetricLabel: string;
  typicalTimeline: string;
  idealFor: string;
}

interface ClientInfoModalProps {
  category: ClientCategoryDetail | null;
  onClose: () => void;
  onBookCall?: (categoryTitle: string) => void;
}

export const ClientInfoModal: React.FC<ClientInfoModalProps> = ({
  category,
  onClose,
  onBookCall,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (category) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [category, onClose]);

  if (!category) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <div 
        className="relative w-full max-w-3xl bg-[#F5EFE6] text-[#1C1614] rounded-3xl border border-[#A88752]/40 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-4 bg-[#F5EFE6]/95 backdrop-blur-md border-b border-[#A88752]/30">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
            <span className="text-[#A88752] font-mono">{category.number}</span>
            <span aria-hidden="true" className="text-[#A88752]">·</span>
            <span>MORE INFORMATION</span>
            <span aria-hidden="true" className="text-[#A88752]">·</span>
            <span className="text-[#1C1614]/70">{category.categoryName}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#1C1614] hover:text-[#173F35] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            aria-label="Close Information Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-9 space-y-8">
          {/* Title & Tagline Banner */}
          <div className="rounded-2xl bg-[#1C1614] text-[#F5EFE6] p-7 sm:p-8 border border-[#A88752]/40 shadow-xl">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#A88752] block mb-2">
              SECTOR DEEP DIVE · {category.number}
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F5EFE6] mb-3 leading-tight font-bold">
              {category.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#F5EFE6]/85 font-light leading-relaxed mb-4">
              {category.tagline}
            </p>
            {category.description && (
              <div className="pt-4 border-t border-white/15">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A88752] block mb-2">
                  Target Businesses &amp; Formats:
                </span>
                <p className="text-xs sm:text-sm text-[#F5EFE6] font-bold whitespace-pre-line leading-relaxed">
                  {category.description}
                </p>
              </div>
            )}
          </div>

          {/* Detailed Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#A88752] mb-3">
              Strategic Approach
            </h3>
            <p className="text-sm sm:text-base text-[#1C1614]/85 leading-relaxed font-light">
              {category.overview}
            </p>
          </div>

          {/* Strategic Execution Pillars */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#A88752] mb-4">
              How We Deliver Impact
            </h3>
            <div className="grid grid-cols-1 gap-3.5">
              {category.pillars.map((pillar, i) => (
                <div
                  key={i}
                  className="p-4 sm:p-5 rounded-xl bg-white border border-[#A88752]/30 flex items-start gap-4 shadow-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-[#173F35] text-[#F5EFE6] flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1C1614] mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#1C1614]/75 font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics & Operational Specifications Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#1C1614] text-[#F5EFE6] border border-[#A88752]/30 shadow-md">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A88752] block font-semibold mb-1">
                Demonstrated Impact
              </span>
              <span className="font-editorial text-2xl font-bold text-[#F5EFE6] tabular-nums">
                {category.keyMetric}
              </span>
              <span className="text-[11px] text-[#F5EFE6]/70 block mt-0.5">
                {category.keyMetricLabel}
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A88752] block font-semibold mb-1">
                Typical Rhythm
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#F5EFE6] font-medium mt-1">
                <Clock className="w-4 h-4 text-[#A88752]" />
                <span>{category.typicalTimeline}</span>
              </div>
              <span className="text-[11px] text-[#F5EFE6]/70 block mt-0.5">
                Rapid onboarding &amp; sprint cycles
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#A88752] block font-semibold mb-1">
                Engagement Model
              </span>
              <div className="flex items-center gap-1.5 text-xs text-[#F5EFE6] font-medium mt-1">
                <ShieldCheck className="w-4 h-4 text-[#A88752]" />
                <span>Full Accountability</span>
              </div>
              <span className="text-[11px] text-[#F5EFE6]/70 block mt-0.5">
                100% asset &amp; data ownership
              </span>
            </div>
          </div>

          {/* Core Deliverables Chips */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#A88752] mb-3">
              Included Deliverables &amp; Assets
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.deliverables.map((item, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-xs font-medium text-[#1C1614] bg-white border border-[#A88752]/30 rounded-full"
                >
                  ✓ {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 sm:px-8 py-4 bg-white border-t border-[#A88752]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1C1614]/80 hover:text-[#1C1614] transition-colors cursor-pointer"
          >
            Close Information
          </button>

          {onBookCall && (
            <button
              onClick={() => {
                onClose();
                onBookCall(category.title);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#173F35] text-[#F5EFE6] hover:bg-[#0F2C25] rounded-full transition-all shadow-md cursor-pointer"
            >
              <span>Schedule Strategy Call For {category.categoryName}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
