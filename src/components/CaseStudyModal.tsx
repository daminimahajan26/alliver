import React from 'react';
import { X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CaseStudy } from '../types';

interface CaseStudyModalProps {
  caseStudy: CaseStudy | null;
  onClose: () => void;
  onConsultationRequest: (clientName: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseStudy,
  onClose,
  onConsultationRequest,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (caseStudy) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#F5EFE6] rounded-2xl border border-[#A88752]/40 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Sticky Header with Close */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#F5EFE6]/95 backdrop-blur-md border-b border-[#A88752]/30">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#173F35]">
            <span>Case Study</span>
            <span aria-hidden="true">·</span>
            <span>{caseStudy.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#1C1614] hover:text-[#173F35] hover:bg-black/5 rounded-full transition-colors"
            aria-label="Close Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Visual */}
          <div className="relative rounded-xl overflow-hidden aspect-video max-h-96 border border-[#A88752]/30 shadow-md">
            <img
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1614]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-end justify-between gap-4 text-white">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#A88752] font-medium">
                  {caseStudy.client}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl text-white">
                  {caseStudy.title}
                </h3>
              </div>
              <div className="bg-[#173F35] text-white px-4 py-2 rounded text-right">
                <div className="text-2xl font-editorial font-bold tabular-nums">
                  {caseStudy.headlineMetric}
                </div>
                <div className="text-[10px] uppercase tracking-wider opacity-90">
                  {caseStudy.headlineMetricLabel}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-white border border-[#A88752]/30">
            <div>
              <span className="text-xs text-[#1C1614]/60 uppercase tracking-wider block mb-1">
                Primary Impact
              </span>
              <span className="font-editorial text-2xl font-bold text-[#173F35] tabular-nums">
                {caseStudy.headlineMetric}
              </span>
              <span className="text-xs text-[#1C1614]/80 block">
                {caseStudy.headlineMetricLabel}
              </span>
            </div>
            <div>
              <span className="text-xs text-[#1C1614]/60 uppercase tracking-wider block mb-1">
                Secondary Output
              </span>
              <span className="font-editorial text-xl font-bold text-[#1C1614] tabular-nums">
                {caseStudy.secondaryMetric}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-xs text-[#1C1614]/60 uppercase tracking-wider block mb-1">
                Engagement Model
              </span>
              <span className="text-sm font-semibold text-[#1C1614]">
                {caseStudy.duration}
              </span>
              <span className="text-xs text-[#1C1614]/60 block">Year {caseStudy.year}</span>
            </div>
          </div>

          {/* Editorial Deep Dive: Challenge & Strategy */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#1C1614] text-[#F5EFE6]">
              <span className="text-xs font-bold uppercase tracking-widest text-[#A88752] mb-2 block">
                The Growth Challenge
              </span>
              <p className="text-sm leading-relaxed text-[#F5EFE6]/85 font-light">
                {caseStudy.challenge}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-[#A88752]/30">
              <span className="text-xs font-bold uppercase tracking-widest text-[#173F35] mb-2 block">
                The Alliver Strategic Playbook
              </span>
              <p className="text-sm leading-relaxed text-[#1C1614]/85 font-light">
                {caseStudy.strategy}
              </p>
            </div>
          </div>

          {/* Deliverables Checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#173F35] mb-3">
              Key Campaign Assets Deployed
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {caseStudy.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-lg bg-white/70 border border-[#A88752]/20 text-xs sm:text-sm text-[#1C1614]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#173F35] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-[#F5EFE6] border-t border-[#A88752]/30">
          <span className="text-xs text-[#1C1614]/70 text-center sm:text-left">
            Ready to achieve comparable growth metrics for your enterprise?
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onConsultationRequest(caseStudy.title);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F5EFE6] bg-[#173F35] hover:bg-[#0F2C25] rounded transition-all whitespace-nowrap shadow-sm"
            >
              <span>Apply For Similar Strategy</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
