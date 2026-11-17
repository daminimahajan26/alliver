import React, { useEffect } from 'react';
import { X, CheckCircle2, TrendingUp, Sparkles, ShieldCheck, ArrowRight, Layers } from 'lucide-react';

export interface MethodologyPhaseDetail {
  step: string;
  title: string;
  subtitle: string;
  overview: string;
  bulletPoints: string[];
  tasks: {
    title: string;
    description: string;
  }[];
  keyAction: string;
  kpi: string;
  kpiLabel: string;
}

interface MethodologyModalProps {
  phase: MethodologyPhaseDetail | null;
  onClose: () => void;
  onSelectPhase?: (phaseTitle: string) => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({
  phase,
  onClose,
  onSelectPhase,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (phase) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [phase, onClose]);

  if (!phase) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-[#F5EFE6] text-[#1C1614] rounded-3xl border border-[#A88752]/40 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 sm:px-8 py-4 bg-[#F5EFE6]/95 backdrop-blur-md border-b border-[#A88752]/30">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#173F35]">
            <span className="text-[#A88752] font-mono font-bold">PHASE {phase.step}</span>
            <span aria-hidden="true" className="text-[#A88752]">·</span>
            <span>PROCESS ARCHITECTURE</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full text-[#1C1614]/60 hover:text-[#1C1614] hover:bg-[#173F35]/10 transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-7">
          {/* Title & Tagline */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173F35] text-[#F5EFE6] text-[11px] font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3 h-3 text-[#A88752]" />
              <span>{phase.subtitle}</span>
            </div>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#1C1614] tracking-tight mb-3">
              {phase.title}
            </h3>
            <p className="text-sm sm:text-base text-[#1C1614]/80 leading-relaxed font-normal">
              {phase.overview}
            </p>
          </div>

          {/* Core Objectives / Bullet Points */}
          <div className="p-5 rounded-2xl bg-[#173F35] text-[#F5EFE6] border border-[#173F35]">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A88752] mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#A88752]" />
              <span>Core Phase Objectives</span>
            </h4>
            <div className="space-y-2">
              {phase.bulletPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm text-[#F5EFE6]/90 font-light">
                  <CheckCircle2 className="w-4 h-4 text-[#A88752] shrink-0 mt-0.5" />
                  <span>{point.replace(/^•\s*/, '')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Pillars & Execution Scope */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#173F35] mb-3">
              Operational Execution &amp; Scope
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {phase.tasks.map((task, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/70 border border-[#A88752]/20 hover:border-[#A88752]/50 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A88752]" />
                    <h5 className="text-xs font-semibold text-[#173F35] uppercase tracking-wide">
                      {task.title}
                    </h5>
                  </div>
                  <p className="text-xs text-[#1C1614]/75 leading-relaxed font-light">
                    {task.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Metric & Milestone Deliverable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#A88752]/25">
            <div className="p-4 rounded-xl bg-[#173F35]/5 border border-[#173F35]/15">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#173F35] mb-1">
                <TrendingUp className="w-4 h-4 text-[#A88752]" />
                <span>Primary Performance Target</span>
              </div>
              <div className="font-editorial text-2xl text-[#173F35] font-normal mb-0.5">
                {phase.kpi}
              </div>
              <p className="text-[11px] text-[#1C1614]/70 leading-snug">
                {phase.kpiLabel}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#173F35]/5 border border-[#173F35]/15">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#173F35] mb-1">
                <ShieldCheck className="w-4 h-4 text-[#A88752]" />
                <span>Milestone Deliverable</span>
              </div>
              <p className="text-xs text-[#1C1614]/85 leading-snug mt-1 font-medium">
                {phase.keyAction}
              </p>
            </div>
          </div>
        </div>

        {/* Sticky Footer CTA */}
        <div className="sticky bottom-0 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 px-6 sm:px-8 py-4 bg-[#F5EFE6] border-t border-[#A88752]/30">
          <div className="text-xs text-[#1C1614]/70">
            Phase {phase.step}: <span className="font-semibold text-[#173F35]">{phase.title}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-full text-xs font-semibold text-[#1C1614]/80 hover:text-[#1C1614] border border-[#1C1614]/20 hover:border-[#1C1614]/40 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                if (onSelectPhase) {
                  onSelectPhase(phase.title);
                }
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-full text-xs font-semibold text-[#F5EFE6] bg-[#173F35] hover:bg-[#1f5044] transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <span>Schedule Strategy Call</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#A88752]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
