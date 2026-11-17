import React, { useState, useRef, useEffect } from 'react';
import { Target, ShieldCheck, Zap, ArrowUpRight, ArrowRight } from 'lucide-react';
import { METHODOLOGY_STEPS } from '../data/agencyData';
import { MethodologyModal, MethodologyPhaseDetail } from './MethodologyModal';

interface MethodologySectionProps {
  onSelectPhase?: (phaseTitle: string) => void;
  onViewProcessPage?: () => void;
}

// Rich detailed breakdown for each of the 6 methodology boxes for the modal popup
const METHODOLOGY_DETAILS: Record<string, Omit<MethodologyPhaseDetail, 'step' | 'title' | 'keyAction'>> = {
  '01': {
    subtitle: 'Brand Alignment & Discovery',
    overview: 'Before designing a single asset or running ads, we conduct deep stakeholder alignment and market reconnaissance to build an airtight strategic roadmap.',
    bulletPoints: [
      'Understand the brand and its objectives.',
      'Identify the target audience.',
      'Research competitors.',
      'Develop content pillars and a posting strategy.',
    ],
    tasks: [
      {
        title: 'Brand DNA Calibration',
        description: 'Comprehensive audit of visual guidelines, tone of voice, values, and core commercial benchmarks.',
      },
      {
        title: 'Audience Persona Architecture',
        description: 'Segmenting high-intent customer archetypes, demographics, lifestyle affinity, and purchase motivations.',
      },
      {
        title: 'Competitor Reverse-Engineering',
        description: 'Deconstructing market leaders to pinpoint whitespace opportunities, hook fatigue, and creative gaps.',
      },
      {
        title: 'Content Pillar Matrix',
        description: 'Establishing 4-5 thematic pillars that balance educational authority, product prestige, and entertainment.',
      },
    ],
    kpi: '100% Brand Clarity',
    kpiLabel: 'Approved strategic blueprint & clear audience targeting criteria',
  },
  '02': {
    subtitle: 'Editorial Roadmap & Story Architecture',
    overview: 'Rigorous pre-production planning ensuring every piece of content published serves a measurable business outcome with zero last-minute rush.',
    bulletPoints: [
      'Create a content calendar.',
      'Plan reels, posts, stories, and campaigns.',
      'Develop concepts, scripts, and captions.',
    ],
    tasks: [
      {
        title: '30-Day Master Calendar',
        description: 'Synchronized monthly schedule with exact drop dates, visual formats, and promotional event hooks.',
      },
      {
        title: 'Short-Form Scriptwriting',
        description: 'Hook-first scripting engineered for 3-second retention and high completion algorithms.',
      },
      {
        title: 'Caption & Micro-Copy Craft',
        description: 'Editorial storytelling captions paired with conversion-driven call-to-actions tailored for each platform.',
      },
      {
        title: 'Production Shot Lists',
        description: 'Detailed camera directions, styling references, and talent briefs ready for seamless studio execution.',
      },
    ],
    kpi: '30 Days Planned',
    kpiLabel: 'Zero last-minute stress with full stakeholder approval ahead of time',
  },
  '03': {
    subtitle: 'Cinematic Shooting & High-End Post',
    overview: 'High-aesthetic visual creation combining luxury art direction with mobile-first viral pacing to stop thumbs in busy social feeds.',
    bulletPoints: [
      'Shoot photos and videos.',
      'Create reels and other visual content.',
      'Edit videos and prepare graphics.',
    ],
    tasks: [
      {
        title: 'Editorial Photography',
        description: 'Studio and lifestyle captures shot with medium format cameras for lookbooks and carousels.',
      },
      {
        title: 'Vertical Video Direction',
        description: 'Dynamic 9:16 cinematography with bespoke lighting, tactile macro details, and fluid camera movement.',
      },
      {
        title: 'Color Grading & Motion Graphics',
        description: 'Signature color correction matching your brand palette, dynamic on-screen text, and bespoke titles.',
      },
      {
        title: 'Sound Design & Audio Curation',
        description: 'Trending commercial audio curation and crisp foley audio mixing that elevates emotional resonance.',
      },
    ],
    kpi: '90%+ Video Retention',
    kpiLabel: 'Broadcast-quality aesthetic calibrated for viral algorithmic reach',
  },
  '04': {
    subtitle: 'Platform Deployment & Timing',
    overview: 'Flawless multi-channel distribution ensuring high consistency across platforms and maximizing initial algorithmic velocity.',
    bulletPoints: [
      'Schedule and publish content.',
      'Maintain consistency across platforms.',
      'Ensure content aligns with the brand identity.',
    ],
    tasks: [
      {
        title: 'Peak-Hour Scheduling',
        description: 'Deploying content at empirically verified hours when your specific target audience is most active.',
      },
      {
        title: 'Multi-Channel Native Formatting',
        description: 'Optimizing aspect ratios, cover frames, audio tags, and interactive stickers per platform.',
      },
      {
        title: 'SEO & Hashtag Optimization',
        description: 'Curating targeted search keywords, geo-tags, and semantic tags for long-term algorithmic discoverability.',
      },
      {
        title: 'Brand Governance & Pre-Flight Checks',
        description: 'Strict QA review ensuring typography, color consistency, and pristine audio prior to every publish.',
      },
    ],
    kpi: '100% On-Time Delivery',
    kpiLabel: 'Flawless publishing cadence with zero missed slots across channels',
  },
  '05': {
    subtitle: 'Audience Cultivation & Retention',
    overview: 'Transforming passive viewers into loyal brand advocates through prompt, personalized conversations and active social listening.',
    bulletPoints: [
      'Respond to comments, DMs, and mentions.',
      'Foster conversations and build brand advocates.',
      'Monitor audience sentiment and real-time trends.',
    ],
    tasks: [
      {
        title: 'Rapid Response Protocol',
        description: 'Replying to comments and DMs within active hours to spark high early engagement signals for algorithms.',
      },
      {
        title: 'Proactive Community Outreach',
        description: 'Engaging with aligned creators, luxury tastemakers, and client posts to boost discoverability.',
      },
      {
        title: 'Interactive Story Engagement',
        description: 'Hosting polls, AMA sessions, quizzes, and countdowns that stimulate direct customer input.',
      },
      {
        title: 'Sentiment & Inquiry Triage',
        description: 'Flagging high-value leads and routing customer inquiries directly to your sales or booking team.',
      },
    ],
    kpi: '3.5x Engagement Multiplier',
    kpiLabel: 'Higher comment-to-view ratios and direct customer relationships',
  },
  '06': {
    subtitle: 'Data-Driven Scale & Refinement',
    overview: 'Continuous empirical tracking of engagement, reach, and conversion to perpetually elevate ROI and iterate creative directions.',
    bulletPoints: [
      'Track reach, engagement, and conversion metrics.',
      'Identify top-performing formats and creative angles.',
      'Refine strategy with actionable monthly insights.',
    ],
    tasks: [
      {
        title: 'Full-Funnel Metric Audits',
        description: 'Tracking reach, shares, saves, profile visits, website clicks, and downstream inquiry conversions.',
      },
      {
        title: 'Creative Winner Identification',
        description: 'Diagnosing which hooks, topics, and aesthetics generated the highest ROAS and follower growth.',
      },
      {
        title: 'Executive Monthly Reporting',
        description: 'Clear, transparent monthly presentations detailing quantitative performance and strategic recommendations.',
      },
      {
        title: 'Iterative Sprint Roadmap',
        description: 'Feeding data-driven insights immediately into next month’s content calendar to compound growth.',
      },
    ],
    kpi: '+180% Growth Velocity',
    kpiLabel: 'Compounded reach and lower blended customer acquisition cost',
  },
};

interface MethodologyCardItemProps {
  item: (typeof METHODOLOGY_STEPS)[0];
  index: number;
  onOpenModal: (phase: MethodologyPhaseDetail) => void;
}

const MethodologyCardItem: React.FC<MethodologyCardItemProps> = ({ item, index, onOpenModal }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const detail = METHODOLOGY_DETAILS[item.step];
  const fullPhaseDetail: MethodologyPhaseDetail = {
    step: item.step,
    title: item.title,
    keyAction: item.keyAction,
    subtitle: detail?.subtitle || 'Strategic Phase',
    overview: detail?.overview || item.description,
    bulletPoints: item.description.split('\n').filter((l) => l.trim().length > 0),
    tasks: detail?.tasks || [],
    kpi: detail?.kpi || 'Verified Impact',
    kpiLabel: detail?.kpiLabel || 'Key operational deliverable met',
  };

  return (
    <div
      ref={cardRef}
      onClick={() => onOpenModal(fullPhaseDetail)}
      style={{
        transitionDelay: `${index * 90}ms`,
      }}
      className={`relative p-6 sm:p-7 rounded-2xl bg-[#173F35] text-[#F5EFE6] border border-[#A88752]/25 cursor-pointer flex flex-col justify-between group transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 shadow-xl hover:shadow-2xl hover:shadow-[#173F35]/40 hover:-translate-y-3 hover:scale-[1.025] hover:border-[#A88752] active:scale-[0.99]'
          : 'opacity-0 translate-y-16 scale-[0.92] shadow-none pointer-events-none'
      }`}
    >
      {/* Top Header: Step Numeral + Interactive Pop Badge */}
      <div>
        <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-5">
          <span className="font-editorial text-4xl font-normal text-[#A88752] tabular-nums">
            {item.step}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#A88752] bg-black/25 px-2.5 py-1 rounded-full border border-white/10 group-hover:bg-[#A88752] group-hover:text-[#173F35] transition-all flex items-center gap-1 shadow-sm">
            <span>MORE INFO</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>

        <h3 className="font-editorial text-xl sm:text-2xl text-[#F5EFE6] mb-3 group-hover:text-white transition-colors">
          {item.title}
        </h3>

        <p className="text-xs sm:text-sm text-[#F5EFE6]/85 leading-relaxed font-light mb-6 whitespace-pre-line">
          {item.description}
        </p>
      </div>

      {/* Key Output Footer */}
      <div className="pt-4 border-t border-white/15 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#A88752] block mb-0.5">
            Milestone Deliverable
          </span>
          <span className="text-xs text-[#F5EFE6]/90 leading-snug block">
            {item.keyAction}
          </span>
        </div>
      </div>
    </div>
  );
};

export const MethodologySection: React.FC<MethodologySectionProps> = ({
  onSelectPhase,
  onViewProcessPage,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<MethodologyPhaseDetail | null>(null);

  return (
    <section id="methodology" className="py-20 lg:py-28 bg-[#F5EFE6] border-b border-[#A88752]/30 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A88752] mb-3">
            <span>Our Proven Architecture</span>
            <span aria-hidden="true" className="text-[#A88752]">·</span>
            <span>How We Work</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#1C1614] tracking-tight leading-tight mb-4">
            Launch Sprint &amp; Algorithmic Scale Framework
          </h2>
          <p className="text-base sm:text-lg text-[#1C1614]/80 leading-relaxed font-normal">
            Our social media management process covers the entire content lifecycle from strategic ideation, creative production, and scheduled publishing to active community engagement and real-time performance analytics.
          </p>
        </div>

        {/* 6-Step Grid with connected editorial flow in Rich Forest Green */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {METHODOLOGY_STEPS.map((item, idx) => (
            <MethodologyCardItem
              key={item.step}
              item={item}
              index={idx}
              onOpenModal={(phase) => setSelectedPhase(phase)}
            />
          ))}
        </div>

        {/* Accountability & Operating Principles in Forest Green #173F35 */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#173F35] text-[#F5EFE6] border border-[#173F35] shadow-md hover:shadow-2xl hover:border-[#A88752]/50 hover:-translate-y-1 transition-all flex items-start gap-4">
            <Target className="w-5 h-5 text-[#A88752] shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-[#F5EFE6] mb-1">
                We focus on
              </h4>
              <p className="text-xs text-[#F5EFE6]/85 leading-relaxed font-light">
                Strategies, creativity, and performance marketers who care about one thing: results that actually move your business.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#173F35] text-[#F5EFE6] border border-[#173F35] shadow-md hover:shadow-2xl hover:border-[#A88752]/50 hover:-translate-y-1 transition-all flex items-start gap-4">
            <Zap className="w-5 h-5 text-[#A88752] shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-[#F5EFE6] mb-1">
                Success
              </h4>
              <p className="text-xs text-[#F5EFE6]/85 leading-relaxed font-light">
                Stronger brand consistency, improved quality, and an active digital presence—yielding better-qualified enquiries and clear visibility into campaign performance.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#173F35] text-[#F5EFE6] border border-[#173F35] shadow-md hover:shadow-2xl hover:border-[#A88752]/50 hover:-translate-y-1 transition-all flex items-start gap-4">
            <ShieldCheck className="w-5 h-5 text-[#A88752] shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-semibold text-[#F5EFE6] mb-1">
                Absolute Data Ownership
              </h4>
              <p className="text-xs text-[#F5EFE6]/85 leading-relaxed font-light">
                All tracking pipelines, pixel data, custom audiences, and high-res video assets remain the perpetual property of your enterprise.
              </p>
            </div>
          </div>
        </div>

        {/* Banner linking to full Marketing Process Page */}
        {onViewProcessPage && (
          <div className="mt-12 p-6 sm:p-7 rounded-2xl bg-[#173F35] text-[#F5EFE6] border border-[#A88752]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A88752] block">
                Dedicated Architecture Page
              </span>
              <h4 className="font-editorial text-xl sm:text-2xl text-[#F5EFE6]">
                Explore The Deep-Dive Marketing Process &amp; Tech Stack
              </h4>
              <p className="text-xs text-[#F5EFE6]/80 font-light max-w-xl">
                Inspect complete operational scope, toolings, SLA milestones, and client responsibilities across each stage.
              </p>
            </div>
            <button
              onClick={onViewProcessPage}
              className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#1C1614] bg-[#A88752] hover:bg-[#c29e64] transition-all flex items-center gap-2 shrink-0 shadow-md group"
            >
              <span>View Marketing Process Page</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* Interactive Detail Modal Pop-Up */}
      <MethodologyModal
        phase={selectedPhase}
        onClose={() => setSelectedPhase(null)}
        onSelectPhase={(title) => {
          setSelectedPhase(null);
          if (onSelectPhase) {
            onSelectPhase(title);
          }
        }}
      />
    </section>
  );
};
