import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Layers,
  Zap,
  Target,
  FileText,
  Video,
  Share2,
  MessageSquare,
  BarChart3,
  Calendar,
  Sliders,
  ChevronDown,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { METHODOLOGY_STEPS } from '../data/agencyData';
import { useScrollReveal, useMultiScrollReveal } from '../hooks/useScrollReveal';

interface MarketingProcessPageProps {
  onBackToHome: () => void;
  onOpenConsultation: (servicePreset?: string, forecastSummary?: string) => void;
}

interface ProcessStageFullDetail {
  step: string;
  title: string;
  subtitle: string;
  timeframe: string;
  icon: React.FC<{ className?: string }>;
  philosophy: string;
  bulletPoints: string[];
  operationalScope: {
    title: string;
    description: string;
  }[];
  techStack: string[];
  clientCommitment: string;
  alliverDeliverable: string;
  kpi: string;
  kpiLabel: string;
}

const FULL_PROCESS_STAGES: ProcessStageFullDetail[] = [
  {
    step: '01',
    title: 'Strategy',
    subtitle: 'Brand Alignment & Market Intelligence',
    timeframe: 'Days 1 – 10',
    icon: Target,
    philosophy:
      'We never deploy capital or produce assets blindly. Every winning campaign begins with forensic discovery of your unit economics, brand DNA, and competitive landscape.',
    bulletPoints: [
      'Understand the brand and its objectives.',
      'Identify the target audience.',
      'Research competitors.',
      'Develop content pillars and a posting strategy.',
    ],
    operationalScope: [
      {
        title: 'Brand DNA & Commercial Calibration',
        description:
          'Deep audit of visual guidelines, tone of voice, enterprise margin profile, customer lifetime value (LTV), and 90-day targets.',
      },
      {
        title: 'High-Net-Worth & ICP Audience Profiling',
        description:
          'Segmentation of high-intent buyer personas across GCC and international markets, mapping psychological triggers and lifestyle affinities.',
      },
      {
        title: 'Competitor Reverse-Engineering',
        description:
          'Deconstructing top 5 market competitors to identify message fatigue, ad spend patterns, and creative whitespace opportunities.',
      },
      {
        title: 'Content Pillar & Channel Matrix',
        description:
          'Defining 4-5 core thematic narrative pillars that balance educational authority, product exclusivity, and viral social appeal.',
      },
    ],
    techStack: ['Meta Ad Library', 'Sprout Social', 'Similarweb', 'Notion Strategic Hub'],
    clientCommitment: '60-min discovery session & brand asset access',
    alliverDeliverable: 'Master Growth Architecture, Persona Deck & Pillar Blueprint',
    kpi: '100% Brand Clarity',
    kpiLabel: 'Validated target customer profiles & clear channel roadmap',
  },
  {
    step: '02',
    title: 'Content Planning',
    subtitle: 'Editorial Roadmap & Story Architecture',
    timeframe: 'Days 11 – 20',
    icon: Calendar,
    philosophy:
      'Spontaneous posting rarely builds iconic brands. We architect every reel, carousel, and story in advance so stakeholders have absolute visibility and zero panic.',
    bulletPoints: [
      'Create a content calendar.',
      'Plan reels, posts, stories, and campaigns.',
      'Develop concepts, scripts, and captions.',
    ],
    operationalScope: [
      {
        title: '30-Day Master Editorial Calendar',
        description:
          'Full-month calendar synchronized with product releases, cultural moments, and promotional offers across all active channels.',
      },
      {
        title: 'Retention-First Scriptwriting',
        description:
          'Developing 3-second visual hooks, pacing storyboards, and call-to-actions engineered to maintain high completion rates.',
      },
      {
        title: 'Luxury Micro-Copy & Captions',
        description:
          'Crafting sophisticated editorial captions that balance luxury prestige with conversational, community-driving prompts.',
      },
      {
        title: 'Pre-Production Shot Lists',
        description:
          'Complete scene-by-scene shoot briefs with prop lists, lighting references, and model direction for production day.',
      },
    ],
    techStack: ['Airtable Workspace', 'Figma Wireframing', 'Milanote Boards', 'Google Drive'],
    clientCommitment: 'One-click feedback & approval on monthly calendar',
    alliverDeliverable: 'Approved 30-Day Master Calendar & Ready-to-Shoot Scripts',
    kpi: '30 Days Pre-Approved',
    kpiLabel: 'Elimination of last-minute scrambles and brand inconsistencies',
  },
  {
    step: '03',
    title: 'Content Production',
    subtitle: 'Cinematic Shooting & High-End Post',
    timeframe: 'Days 21 – 30',
    icon: Video,
    philosophy:
      'We fuse high-end fashion editorial aesthetics with mobile-native video pacing. Content must command attention before it can persuade.',
    bulletPoints: [
      'Shoot photos and videos.',
      'Create reels and other visual content.',
      'Edit videos and prepare graphics.',
    ],
    operationalScope: [
      {
        title: 'On-Location & Studio Cinematography',
        description:
          'High-resolution 4K captures with cinema cameras, studio lighting, and directional microphones tailored for high-end digital presence.',
      },
      {
        title: 'Short-Form Reels & Shorts Mastery',
        description:
          'Dynamic vertical video edits utilizing seamless loop cuts, rhythmic sound syncing, and custom typography overlays.',
      },
      {
        title: 'Bespoke Color Correction & Grading',
        description:
          'Custom LUTs applied to match your signature brand hues (warm golds, velvet blacks, deep forest greens) across all footage.',
      },
      {
        title: 'Commercial Sound Design',
        description:
          'Foley audio enhancement, licensed luxury music tracks, and voiceover mastering for maximum emotional resonance.',
      },
    ],
    techStack: ['DaVinci Resolve Studio', 'Sony FX6 / FX3 Cinema', 'Adobe Premiere Pro', 'Frame.io'],
    clientCommitment: 'Physical access for shoot or courier of product samples',
    alliverDeliverable: 'Full 4K Asset Library, Rendered Reels, & High-Res Stills',
    kpi: '90%+ Video Completion',
    kpiLabel: 'Broadcast-tier cinematic quality calibrated for viral algorithms',
  },
  {
    step: '04',
    title: 'Posting & Publishing',
    subtitle: 'Algorithmic Distribution & Governance',
    timeframe: 'Day 30 & Ongoing',
    icon: Share2,
    philosophy:
      'Timing and platform nuance matter as much as creative quality. We execute synchronized drops calibrated to algorithmic peaks.',
    bulletPoints: [
      'Schedule and publish content.',
      'Maintain consistency across platforms.',
      'Ensure content aligns with the brand identity.',
    ],
    operationalScope: [
      {
        title: 'Peak-Activity Distribution',
        description:
          'Scheduling posts at empirically verified hours when your target high-intent audience is actively browsing in their local time zones.',
      },
      {
        title: 'Platform-Native Format Calibration',
        description:
          'Tailoring thumbnails, audio tags, hashtags, and interactive stickers specifically for Instagram, LinkedIn, TikTok, and YouTube.',
      },
      {
        title: 'Semantic Social SEO Optimization',
        description:
          'Tagging video transcripts, alt-text, keyword-rich descriptions, and geo-locations to capture high-intent search traffic.',
      },
      {
        title: 'Pre-Flight Quality Assurance',
        description:
          'Multi-point inspection verifying visual grid harmony, link redirects, tagging accuracy, and aspect ratio fidelity.',
      },
    ],
    techStack: ['Buffer Enterprise', 'Later Pro', 'Meta Business Suite', 'Google Analytics 4'],
    clientCommitment: 'Zero daily effort required from your internal team',
    alliverDeliverable: '100% On-Time Multi-Platform Publishing & Flawless Grid Curation',
    kpi: '100% Cadence Adherence',
    kpiLabel: 'Zero missed dates and maximized algorithmic feed prominence',
  },
  {
    step: '05',
    title: 'Community Engagement',
    subtitle: 'Conversation Cultivation & Inbound Nurture',
    timeframe: 'Daily Execution',
    icon: MessageSquare,
    philosophy:
      'Social media is a two-way dialogue, not a billboard. We foster genuine relationships that convert followers into enterprise champions.',
    bulletPoints: [
      'Respond to comments, DMs, and mentions.',
      'Foster conversations and build brand advocates.',
      'Monitor audience sentiment and real-time trends.',
    ],
    operationalScope: [
      {
        title: 'Rapid Response Protocol',
        description:
          'Engaging with comments and direct messages within minutes during active hours to trigger algorithmic positive-feedback loops.',
      },
      {
        title: 'Outbound Tastemaker Interactions',
        description:
          'Proactively participating on verified accounts, client mentions, and industry discussions to elevate your brand presence.',
      },
      {
        title: 'Interactive Story Cadence',
        description:
          'Publishing daily interactive polls, behind-the-scenes snapshots, and AMA question stickers to maintain high profile engagement.',
      },
      {
        title: 'VIP Lead Handoff & Reputation Defense',
        description:
          'Identifying high-value prospective buyers in DMs and routing them directly to your executive concierge or sales CRM.',
      },
    ],
    techStack: ['Zendesk Social', 'Sprout Social Inbox', 'Meta Inbox', 'Slack Webhooks'],
    clientCommitment: 'Handling warm qualified inquiries passed to your sales desk',
    alliverDeliverable: 'Active Daily Engagement, Sentiment Reports, & Triage Logs',
    kpi: '3.5x Engagement Lift',
    kpiLabel: 'Direct brand advocacy and warm inquiries captured in DMs',
  },
  {
    step: '06',
    title: 'Analytics & Optimization',
    subtitle: 'Iterative Growth & Algorithmic Scale',
    timeframe: 'Weekly & Monthly',
    icon: BarChart3,
    philosophy:
      'We obsess over data, not vanity metrics. Every month, empirical data dictates how we refine our creative angles to compound growth.',
    bulletPoints: [
      'Track reach, engagement, and conversion metrics.',
      'Identify top-performing formats and creative angles.',
      'Refine strategy with actionable monthly insights.',
    ],
    operationalScope: [
      {
        title: 'Full-Funnel Metric Tracking',
        description:
          'Monitoring reach, profile visits, website click-throughs, save-rates, and downstream commercial inquiry conversions.',
      },
      {
        title: 'Creative Fatigue & Winner Analysis',
        description:
          'Diagnosing exactly which visual hooks, topics, and styles delivered the lowest customer acquisition cost (CAC).',
      },
      {
        title: 'Executive Monthly Review',
        description:
          'Delivering transparent, no-fluff executive dashboards with clear explanations of what worked and strategic iterations for next month.',
      },
      {
        title: 'Continuous Strategy Refinement',
        description:
          'Feeding performance data immediately into the next cycle’s Step 02 Content Planning to continually elevate return on investment.',
      },
    ],
    techStack: ['Looker Studio', 'Triple Whale Attribution', 'Supermetrics', 'Northbeam'],
    clientCommitment: '30-minute monthly strategic review meeting',
    alliverDeliverable: 'Executive Dashboard Access, Monthly Retrospective & Next-Sprint Roadmap',
    kpi: '+180% Growth Velocity',
    kpiLabel: 'Compounding organic reach and lower blended customer acquisition cost',
  },
];

const PROCESS_FAQS = [
  {
    q: 'How fast can our brand launch once we begin Step 01 Strategy?',
    a: 'Typically, the initial diagnostic and editorial planning (Steps 01 & 02) are completed within 14–20 business days. Once the initial asset library is shot and graded in Step 03, live publishing commences immediately on Day 30, followed by perpetual daily execution and weekly optimization.',
  },
  {
    q: 'Does our enterprise retain 100% intellectual property of all photos and videos?',
    a: 'Absolutely. All high-resolution video master files, color-graded stills, scripts, and custom audience datasets remain the perpetual, unencumbered property of your business. We never hold creative assets hostage.',
  },
  {
    q: 'Can Alliver collaborate with our existing in-house team?',
    a: 'Yes. We frequently partner with in-house founders, CMOs, or creative directors. We can function as your complete end-to-end social department or plug in as a specialized strategic and production powerhouse.',
  },
  {
    q: 'How are revisions handled on the monthly content calendar and video assets?',
    a: 'Our collaborative Notion and Frame.io workspaces allow your team to leave frame-accurate comments with a single click. Every client receives two structured revision rounds prior to scheduled go-live dates.',
  },
  {
    q: 'Which platforms are included under Posting & Publishing?',
    a: 'We natively support Instagram, LinkedIn, TikTok, YouTube Shorts, and Facebook. Each asset is reformatted, re-scripted, and tailored for each platform’s specific algorithm and audience expectations.',
  },
];

export const MarketingProcessPage: React.FC<MarketingProcessPageProps> = ({
  onBackToHome,
  onOpenConsultation,
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [workflowMode, setWorkflowMode] = useState<'perpetual' | 'sprint'>('perpetual');

  const [tabsRef, isTabsVisible] = useScrollReveal<HTMLDivElement>();
  const [spotlightRef, isSpotlightVisible] = useScrollReveal<HTMLDivElement>();
  const [matrixGridRef, visibleMatrixCards] = useMultiScrollReveal<HTMLDivElement>('data-matrix-index');
  const [engagementRef, isEngagementVisible] = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const activeStage = FULL_PROCESS_STAGES[activeStageIndex];

  return (
    <div className="pt-24 pb-20 bg-[#F5EFE6] text-[#1C1614] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Breadcrumb & Return to Home Button */}
        <div className="flex items-center justify-between gap-3 mb-8 pt-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-semibold uppercase tracking-wider text-[#173F35] hover:text-[#A88752] transition-colors py-1.5 px-3 sm:px-3.5 rounded-full bg-white/90 hover:bg-white border border-[#A88752]/30 shadow-sm shrink-0 whitespace-nowrap active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span>Return to Home</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#A88752] text-right truncate">
            <span className="truncate">Methodology</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Complete Architecture</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#173F35] text-[#F5EFE6] text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#A88752]" />
            <span>End-to-End Content Lifecycle</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl text-[#1C1614] tracking-tight leading-[1.08] mb-6">
            The Complete Marketing &amp; Social Media Process
          </h1>

          <p className="text-lg sm:text-xl text-[#1C1614]/80 leading-relaxed font-normal max-w-3xl mb-8">
            Our social media management process covers the entire content lifecycle from strategic ideation, creative production, and scheduled publishing to active community engagement and real-time performance analytics.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#173F35] text-[#F5EFE6] border border-[#173F35] shadow-lg">
            <div className="p-2 border-r border-white/10 last:border-r-0">
              <span className="font-editorial text-3xl sm:text-4xl text-[#A88752] block font-normal">
                6
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#F5EFE6]/75 font-semibold">
                Integrated Stages
              </span>
            </div>
            <div className="p-2 sm:border-r border-white/10">
              <span className="font-editorial text-3xl sm:text-4xl text-[#A88752] block font-normal">
                100%
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#F5EFE6]/75 font-semibold">
                IP Data Ownership
              </span>
            </div>
            <div className="p-2 border-r border-white/10 last:border-r-0">
              <span className="font-editorial text-3xl sm:text-4xl text-[#A88752] block font-normal">
                4.9x
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#F5EFE6]/75 font-semibold">
                Avg Portfolio ROAS
              </span>
            </div>
            <div className="p-2">
              <span className="font-editorial text-3xl sm:text-4xl text-[#A88752] block font-normal">
                Zero
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#F5EFE6]/75 font-semibold">
                Creative Fatigue
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Stage Navigator Tabs */}
        <div
          ref={tabsRef}
          className={`mb-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
            isTabsVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.98]'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#173F35]">
              Select A Lifecycle Stage To Explore
            </span>
            <span className="text-xs text-[#1C1614]/60 font-medium hidden sm:inline">
              Click any stage for full operational scope
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {FULL_PROCESS_STAGES.map((stage, idx) => {
              const isActive = activeStageIndex === idx;
              const IconComp = stage.icon;
              return (
                <button
                  key={stage.step}
                  onClick={() => setActiveStageIndex(idx)}
                  style={{
                    transitionDelay: isTabsVisible ? `${idx * 60}ms` : '0ms',
                  }}
                  className={`p-4 rounded-xl text-left border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between group ${
                    isTabsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  } ${
                    isActive
                      ? 'bg-[#1C1614] text-[#F5EFE6] border-[#A88752] shadow-xl scale-[1.02]'
                      : 'bg-white/70 text-[#1C1614] border-[#A88752]/20 hover:border-[#A88752]/60 hover:bg-white shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span
                      className={`font-editorial text-2xl font-normal tabular-nums ${
                        isActive ? 'text-[#A88752]' : 'text-[#A88752]'
                      }`}
                    >
                      {stage.step}
                    </span>
                    <IconComp
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? 'text-[#A88752]' : 'text-[#173F35]/60'
                      }`}
                    />
                  </div>
                  <div>
                    <div
                      className={`text-xs font-bold uppercase tracking-wide leading-snug ${
                        isActive ? 'text-[#F5EFE6]' : 'text-[#1C1614]'
                      }`}
                    >
                      {stage.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Deep-Dive Spotlight Card */}
        <div
          ref={spotlightRef}
          className={`scroll-mt-28 p-8 sm:p-12 rounded-3xl bg-[#1C1614] text-[#F5EFE6] border border-[#A88752]/40 shadow-2xl mb-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
            isSpotlightVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.98]'
          }`}
        >
          <div className="pb-8 border-b border-white/15">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="font-editorial text-5xl text-[#A88752] font-normal tabular-nums">
                  {activeStage.step}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#A88752] bg-black/25 px-3 py-1 rounded-full border border-white/10">
                  {activeStage.subtitle}
                </span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl text-[#F5EFE6] tracking-tight mb-3">
                {activeStage.title}
              </h2>

              <p className="text-sm sm:text-base text-[#F5EFE6]/85 max-w-2xl font-light leading-relaxed">
                {activeStage.philosophy}
              </p>
            </div>
          </div>

          {/* 2-Column: Core Objectives (User Bullets) + Operational Scope */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
            {/* Left: Core Objectives */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#A88752] mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#A88752]" />
                  <span>Core Phase Objectives</span>
                </h3>
                <div className="space-y-2.5">
                  {activeStage.bulletPoints.map((bullet, bIdx) => (
                    <div
                      key={bIdx}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A88752] shrink-0 mt-2" />
                      <span className="text-xs sm:text-sm text-[#F5EFE6]/90 font-light leading-relaxed">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Responsibilities split */}
              <div className="p-4 rounded-xl bg-black/25 border border-white/10 space-y-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A88752] block mb-1">
                    What We Need From You
                  </span>
                  <p className="text-xs text-[#F5EFE6]/85 font-light">
                    {activeStage.clientCommitment}
                  </p>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A88752] block mb-1">
                    What We Hand Over
                  </span>
                  <p className="text-xs text-[#F5EFE6]/85 font-light">
                    {activeStage.alliverDeliverable}
                  </p>
                </div>
              </div>

              {/* Tech Stack Chips */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5EFE6]/60 block mb-2">
                  Proprietary Tech &amp; Tooling
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeStage.techStack.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 text-[11px] font-mono rounded bg-white/10 border border-white/15 text-[#F5EFE6]/80"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Detailed Operational Tasks */}
            <div className="lg:col-span-7">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#A88752] mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#A88752]" />
                <span>Operational Execution Breakdown</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeStage.operationalScope.map((scope, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-5 rounded-2xl bg-white/10 border border-white/15 hover:border-[#A88752]/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#A88752] mb-2">
                        {scope.title}
                      </div>
                      <p className="text-xs text-[#F5EFE6]/80 leading-relaxed font-light">
                        {scope.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stage Navigation & CTA Controls */}
              <div className="mt-8 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    disabled={activeStageIndex === 0}
                    onClick={() => setActiveStageIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-[#F5EFE6] bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    &larr; Previous Stage
                  </button>
                  <button
                    disabled={activeStageIndex === FULL_PROCESS_STAGES.length - 1}
                    onClick={() =>
                      setActiveStageIndex((prev) =>
                        Math.min(FULL_PROCESS_STAGES.length - 1, prev + 1)
                      )
                    }
                    className="px-4 py-2 rounded-full text-xs font-semibold text-[#F5EFE6] bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Next Stage &rarr;
                  </button>
                </div>

                <button
                  onClick={() =>
                    onOpenConsultation(
                      undefined,
                      `Inquiring specifically about: Phase ${activeStage.step} - ${activeStage.title}`
                    )
                  }
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#1C1614] bg-[#A88752] hover:bg-[#c29e64] transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Book Phase Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All 6 Stages Complete Matrix View */}
        <div className="mb-20">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A88752] block mb-2">
              Full Spectrum Comparison
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1C1614] tracking-tight">
              All 6 Process Stages at a Glance
            </h2>
          </div>

          <div
            ref={matrixGridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {FULL_PROCESS_STAGES.map((stage, idx) => {
              const isCardVisible = visibleMatrixCards.has(idx);
              const colDelay = (idx % 3) * 90;

              return (
                <div
                  key={stage.step}
                  data-matrix-index={idx}
                  style={{
                    transitionDelay: isCardVisible ? `${colDelay}ms` : '0ms',
                  }}
                  className={`p-6 rounded-2xl bg-white border border-[#A88752]/25 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] flex flex-col justify-between ${
                    isCardVisible
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-8 scale-[0.97]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-[#1C1614]/10 pb-3 mb-4">
                      <span className="font-editorial text-3xl text-[#A88752] font-normal tabular-nums">
                        {stage.step}
                      </span>
                    </div>

                    <h3 className="font-editorial text-2xl text-[#173F35] mb-2 font-normal">
                      {stage.title}
                    </h3>

                    <p className="text-xs text-[#1C1614]/75 leading-relaxed font-light mb-5">
                      {stage.subtitle}
                    </p>

                    <div className="space-y-2 mb-6">
                      {stage.bulletPoints.map((pt, pIdx) => (
                        <div
                          key={pIdx}
                          className="text-xs text-[#1C1614]/85 flex items-start gap-2 font-light"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#173F35] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#1C1614]/10 flex items-center justify-end">
                    <button
                      onClick={() => {
                        setActiveStageIndex(idx);
                        spotlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }}
                      className="text-xs font-semibold text-[#173F35] hover:text-[#A88752] transition-colors flex items-center gap-1"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Engagement Models: Perpetual Scale vs 14-Day Sprint */}
        <div
          ref={engagementRef}
          className={`p-8 sm:p-10 rounded-3xl bg-[#173F35] text-[#F5EFE6] border border-[#173F35] shadow-xl mb-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
            isEngagementVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.98]'
          }`}
        >
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A88752] block mb-2">
              Flexible Deployment
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F5EFE6] tracking-tight mb-3">
              Two Ways to Engage Our Marketing Engine
            </h2>
            <p className="text-sm text-[#F5EFE6]/80 font-light leading-relaxed">
              Whether you require a rapid proof-of-concept sprint or an ongoing flagship retainer, our 6-stage lifecycle adapts to your enterprise cadence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Model 1: Perpetual Flagship Retainer */}
            <div
              style={{ transitionDelay: isEngagementVisible ? '120ms' : '0ms' }}
              className={`p-6 sm:p-7 rounded-2xl bg-black/25 border border-white/15 flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
                isEngagementVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
            >
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-[#A88752] text-[#1C1614] text-[11px] font-bold uppercase tracking-wider mb-4">
                  Flagship Growth Retainer
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#F5EFE6] mb-3">
                  Perpetual 6-Stage Flywheel
                </h3>
                <p className="text-xs sm:text-sm text-[#F5EFE6]/85 font-light leading-relaxed mb-6">
                  Complete ownership of all 6 stages running every 30 days. Continuous monthly studio shooting, dedicated community managers, custom Looker dashboards, and bi-weekly strategic scale sessions.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-[#F5EFE6]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#A88752]" />
                    <span>Monthly 4K studio &amp; on-location video shoots</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#F5EFE6]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#A88752]" />
                    <span>Daily multi-channel publishing &amp; DM management</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#F5EFE6]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#A88752]" />
                    <span>Real-time Looker attribution and monthly board review</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  onOpenConsultation(
                    'Growth Flagship Retainer',
                    'Inquiring for Perpetual Flagship Retainer (Full 6-Stage Process)'
                  )
                }
                className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#1C1614] bg-[#A88752] hover:bg-[#c29e64] transition-all text-center shadow-md"
              >
                Inquire For Flagship Retainer
              </button>
            </div>

            {/* Model 2: 14-Day Rapid Launch Sprint */}
            <div
              style={{ transitionDelay: isEngagementVisible ? '240ms' : '0ms' }}
              className={`p-6 sm:p-7 rounded-2xl bg-black/25 border border-white/15 flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
                isEngagementVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
            >
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-white/20 text-[#F5EFE6] text-[11px] font-bold uppercase tracking-wider mb-4">
                  Focused 14-Day Sprint
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#F5EFE6] mb-3">
                  Foundational Diagnostic &amp; Asset Sprint
                </h3>
                <p className="text-xs sm:text-sm text-[#F5EFE6]/85 font-light leading-relaxed mb-6">
                  Ideal for emerging brands needing rapid brand calibration, a 30-day pre-built content vault, and initial algorithmic audience setup before committing to ongoing perpetual management.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-[#F5EFE6]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#A88752]" />
                    <span>Comprehensive brand strategy &amp; competitor teardown</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#F5EFE6]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#A88752]" />
                    <span>1 intense shoot day yielding 15 edited vertical assets</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#F5EFE6]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#A88752]" />
                    <span>Complete 30-day calendar handed over ready to deploy</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() =>
                  onOpenConsultation(
                    'Rapid Launch Sprint',
                    'Inquiring for 14-Day Diagnostic & Asset Sprint'
                  )
                }
                className="w-full py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F5EFE6] bg-white/15 hover:bg-white/25 border border-white/20 transition-all text-center shadow-md"
              >
                Inquire For 14-Day Sprint
              </button>
            </div>
          </div>
        </div>

        {/* Process FAQs Section */}
        <div className="mb-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A88752] block mb-2">
              Common Questions
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1C1614] tracking-tight">
              Marketing Process FAQ
            </h2>
          </div>

          <div className="space-y-3">
            {PROCESS_FAQS.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-2xl border border-[#A88752]/30 bg-white/80 overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#173F35] hover:text-[#A88752] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#A88752] transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#1C1614] leading-relaxed font-bold border-t border-[#A88752]/15">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Bottom Conversion Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1C1614] text-[#F5EFE6] border border-[#A88752]/40 text-center shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A88752] font-semibold mb-3 block">
              Start The Collaboration
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#F5EFE6] tracking-tight leading-tight mb-4">
              Put Our 6-Stage Marketing Engine To Work For Your Brand
            </h2>
            <p className="text-sm sm:text-base text-[#F5EFE6]/75 font-light leading-relaxed mb-8">
              Schedule a confidential 30-minute discovery briefing. We’ll analyze your existing customer acquisition cost and map a tailored 90-day process roadmap.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() =>
                  onOpenConsultation(
                    undefined,
                    'Requested Process Walkthrough & Marketing Architecture Briefing'
                  )
                }
                className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F5EFE6] bg-[#173F35] hover:bg-[#1f5044] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Schedule Process Walkthrough</span>
                <ArrowRight className="w-4 h-4 text-[#A88752]" />
              </button>

              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F5EFE6]/80 hover:text-white border border-white/20 hover:border-white/40 transition-colors"
              >
                Return To Home Page
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
