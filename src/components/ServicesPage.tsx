import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Layers,
  Zap,
  BarChart2,
  Film,
  Compass,
  Globe2,
  ShieldCheck,
  ChevronRight,
  Share2,
  Search,
  Megaphone,
} from 'lucide-react';
import { AGENCY_SERVICES } from '../data/agencyData';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ServicesPageProps {
  onBackToHome: () => void;
  onOpenConsultation: (servicePreset?: string, forecastSummary?: string) => void;
}

const SERVICE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  '01': Share2,
  '02': Globe2,
  '03': BarChart2,
  '04': Compass,
  '05': Film,
  '06': Search,
  '07': Megaphone,
  '08': Layers,
};

const SERVICE_EXTENDED_DETAILS: Record<
  string,
  {
    heroTagline: string;
    overview: string;
    executionPoints: { title: string; desc: string }[];
    caseHighlight: { brand: string; metric: string; context: string };
    tooling: string[];
    timeline: string;
  }
> = {
  '01': {
    heroTagline: 'Omnichannel content scheduling, daily engagement, and organic community growth.',
    overview:
      'We manage your complete social media presence with strategic posting cadences, proactive conversation management, and brand advocacy that transforms casual scrollers into loyal customers.',
    executionPoints: [
      {
        title: 'Omnichannel Publishing Matrix',
        desc: 'Custom content formatting, scheduling, and distribution tailored for Instagram, LinkedIn, TikTok, and YouTube.',
      },
      {
        title: 'Daily Community & DM Triage',
        desc: 'Active response to comments, direct message inquiries, and mentions within 60 minutes during business hours.',
      },
      {
        title: 'Viral Audio & Trend Calibration',
        desc: 'Weekly monitoring of breakout audio hooks and native formats to maximize algorithmic feed reach.',
      },
      {
        title: 'Audience Sentiment & Growth Audits',
        desc: 'Monthly performance breakdowns reporting profile visits, follower velocity, and conversion attribution.',
      },
    ],
    caseHighlight: {
      brand: 'Maison Éclat',
      metric: '+340% Engagement',
      context: 'Expanded active community from 12K to 85K engaged followers in 5 months.',
    },
    tooling: ['Sprout Social', 'Meta Business Suite', 'Notion Editorial Desk', 'Later'],
    timeline: 'Perpetual daily management with 30-day forward content calendars.',
  },
  '02': {
    heroTagline: 'Full-funnel digital strategy, omni-channel campaigns, and algorithmic client acquisition.',
    overview:
      'We architect full-funnel digital growth engines combining targeted paid acquisition, high-converting landing pages, automated email workflows, and multi-touchpoint attribution.',
    executionPoints: [
      {
        title: 'Digital Growth Architecture',
        desc: 'Auditing your customer acquisition costs, lifetime value, and designing high-velocity conversion funnels.',
      },
      {
        title: 'Multi-Touchpoint Attribution',
        desc: 'Deploying server-side tracking and analytics to accurately map every touchpoint across the buyer journey.',
      },
      {
        title: 'High-Converting Landing Pages',
        desc: 'Designing responsive, fast-loading destination pages optimized for high conversion rates and zero bounce.',
      },
      {
        title: 'Automated CRM & Retention Sequences',
        desc: 'Lead nurture sequences, email automation, and automated sales desk routing.',
      },
    ],
    caseHighlight: {
      brand: 'Vanguard Realty Partners',
      metric: '3.8x Pipeline Velocity',
      context: 'Generated ₹34 Cr in qualified commercial buyer pipeline in 90 days.',
    },
    tooling: ['HubSpot Enterprise', 'GA4 Server-Side', 'Triple Whale', 'Figma'],
    timeline: 'Initial funnel build in 14 days, iterative optimization weekly.',
  },
  '03': {
    heroTagline: 'Data-driven paid media, disciplined cost-per-acquisition, and verified ROAS.',
    overview:
      'We engineer full-funnel paid media campaigns across Meta Ads, Google Ads, and emerging channels with disciplined cost-per-acquisition targets and verified return on ad spend.',
    executionPoints: [
      {
        title: 'Meta & Google Ads Engine',
        desc: 'Precision audience retargeting, whitelisted creator ads, Advantage+ shopping campaigns, and intent-based Google search funnels.',
      },
      {
        title: 'Conversion Rate Optimization (CRO)',
        desc: 'Continuous multivariate testing on ad hooks, landing page headlines, and checkout flows.',
      },
      {
        title: 'Server-Side Attribution (CAPI)',
        desc: 'First-party data infrastructure preventing signal loss from browser cookie restrictions and iOS privacy updates.',
      },
      {
        title: 'Creative Hook & Angle Testing',
        desc: 'Weekly batch testing of top-of-funnel hooks to discover winning creative angles and lower CAC.',
      },
    ],
    caseHighlight: {
      brand: 'Rouge Éternelle Parfums',
      metric: '4.9x Blended ROAS',
      context: 'Generated ₹28 Cr in qualified direct customer inquiries in first 6 months.',
    },
    tooling: ['Meta Ads Manager', 'Google Search Console', 'Triple Whale', 'GA4 Server-Side GTM'],
    timeline: 'Live campaigns in 14 days, iterative daily optimization.',
  },
  '04': {
    heroTagline: 'Unforgettable visual identities, market positioning, and enduring brand prestige.',
    overview:
      'We sculpt brands that command immediate respect. From typography selection and color theory to positioning statements and comprehensive brand identity architecture.',
    executionPoints: [
      {
        title: 'Complete Visual Identity Systems',
        desc: 'Comprehensive brand books including typography hierarchies, primary/accent palettes, and iconography guidelines.',
      },
      {
        title: 'Strategic Market Positioning',
        desc: 'Pinpointing your distinct competitive whitespace to justify premium pricing and attract tier-one clientele.',
      },
      {
        title: 'Brand Voice & Verbal Guidelines',
        desc: 'Establishing authoritative, evocative copywriting tone-of-voice rules for PR, websites, and sales collateral.',
      },
      {
        title: 'Packaging & Collateral Architecture',
        desc: 'Luxury unboxing design, VIP seeding box packaging, and print finishes (foil stamping, embossed textures).',
      },
    ],
    caseHighlight: {
      brand: 'The Dunes Desert Reserve',
      metric: '₹118 Cr Bookings',
      context: 'Repositioned private reserve to bypass OTAs and secure 92% direct luxury bookings.',
    },
    tooling: ['Figma Enterprise', 'Adobe Illustrator', 'Type Foundry Licenses', 'Pantone Matching'],
    timeline: '4 to 6-week end-to-end brand transformation sprint.',
  },
  '05': {
    heroTagline: 'Runway-grade graphic design, visual assets, viral Reels, and luxury art direction.',
    overview:
      'Visual content crafted to captivate and convert. We produce bespoke graphic designs, carousel suites, editorial motion graphics, and high-retention video assets.',
    executionPoints: [
      {
        title: 'Editorial Graphic Design',
        desc: 'Striking social graphics, luxury carousels, slide decks, and visual collateral engineered to halt doom-scrolling.',
      },
      {
        title: 'High-Retention Reels & Video Direction',
        desc: 'Pattern interrupts, micro-hooks, and sound design tailored for 90%+ completion rates on algorithmic feeds.',
      },
      {
        title: 'Motion Graphics & Typography',
        desc: 'Dynamic typographic animation, kinetic title sequences, and bespoke visual identifiers.',
      },
      {
        title: 'Studio & Lifestyle Photography',
        desc: 'Commercial stills for digital flagships, lookbooks, press collateral, and high-converting carousel ads.',
      },
    ],
    caseHighlight: {
      brand: 'Atelier Valmont Paris',
      metric: '+320% Sell-Out Speed',
      context: 'Runway collection sold out in 48 hours following viral visual design & Reel series.',
    },
    tooling: ['DaVinci Resolve Studio', 'Adobe Creative Cloud', 'Figma', 'Frame.io'],
    timeline: 'Bi-weekly creative sprints and monthly shoot production.',
  },
  '06': {
    heroTagline: 'Search engine domination, Generative AI Search (GEO), and top-tier organic discovery.',
    overview:
      'Ensuring your brand ranks at the absolute forefront of modern search—from traditional Google Search Engine Optimisation to Generative AI engines like ChatGPT, Gemini, and Perplexity.',
    executionPoints: [
      {
        title: 'Generative Engine Optimization (GEO)',
        desc: 'Optimizing digital footprint and authority citations so AI models recommend your business first.',
      },
      {
        title: 'High-Intent Commercial Keyword Ranking',
        desc: 'Dominating top positions for high-intent search queries that drive qualified, ready-to-buy prospects.',
      },
      {
        title: 'Technical Architecture & Core Web Vitals',
        desc: 'Clean semantic HTML, schema structured data, lightning-fast TTFB, and mobile-first index readiness.',
      },
      {
        title: 'Authoritative Digital PR Backlinks',
        desc: 'Securing top-tier editorial citations and mentions on industry publications to compound domain authority.',
      },
    ],
    caseHighlight: {
      brand: 'Apex Capital Advisors',
      metric: '#1 Rank For Target Keywords',
      context: 'Captured top 3 positions for 45 commercial keywords, driving +410% organic pipeline.',
    },
    tooling: ['Ahrefs', 'Google Search Console', 'Semrush', 'Screaming Frog'],
    timeline: 'Immediate technical fix in 10 days, compounding rank growth in 90 days.',
  },
  '07': {
    heroTagline: 'High-impact launch campaigns, VIP creator partnerships, and media outreach.',
    overview:
      'Curating authentic partnerships, VIP gifting seeding, and editorial public relations that build institutional credibility and drive surge traffic to your business.',
    executionPoints: [
      {
        title: 'Product Launch & Market Entry',
        desc: 'Multi-week orchestrated rollout campaigns that create artificial scarcity and massive anticipation.',
      },
      {
        title: 'VIP Creator & Tastemaker Seeding',
        desc: 'Strategic seeding to verified founders, celebrities, and industry tastemakers without cheesy sponsored tags.',
      },
      {
        title: 'Press Release & Editorial Media',
        desc: 'Securing coverage across authoritative business, luxury, and industry publications.',
      },
      {
        title: 'Local & Event Activations',
        desc: 'Promoting grand openings, VIP exhibitions, and digital webinars to pack rooms and streams.',
      },
    ],
    caseHighlight: {
      brand: 'Aurelia Sovereign Yachts',
      metric: '₹42 Cr Charters',
      context: 'Curated tastemaker seeding and launch campaign generated 24 chartered weeks.',
    },
    tooling: ['Cision PR Newswire', 'Klaviyo VIP', 'AspireIQ', 'Bespoke Press Desk'],
    timeline: '3 to 6-week launch sprints synchronized with key business milestones.',
  },
  '08': {
    heroTagline: 'Bespoke web development, executive consulting, and custom enterprise marketing solutions.',
    overview:
      'Custom services tailored to your specific commercial requirements, from ultra-fast headless websites to bespoke growth consulting and marketing automations.',
    executionPoints: [
      {
        title: 'High-Performance Web Development',
        desc: 'Custom, blazing-fast web applications built on React, Tailwind CSS, and headless commerce architectures.',
      },
      {
        title: 'Bespoke Strategic Growth Consulting',
        desc: 'Direct advisory sprints with senior partners to audit marketing spend and eliminate enterprise waste.',
      },
      {
        title: 'CRM & Marketing Automation',
        desc: 'Integrating Zapier, Make, and enterprise CRMs to turn inbound inquiries into booked calendar appointments.',
      },
      {
        title: 'Workshops & Team Upskilling',
        desc: 'Hands-on intensive training for in-house marketing departments on modern performance media.',
      },
    ],
    caseHighlight: {
      brand: 'Solstice Private Equity',
      metric: '100% Tailored Execution',
      context: 'Built proprietary investor portal and automated inquiry scoring pipeline.',
    },
    tooling: ['React', 'Tailwind CSS', 'Vite / Next.js', 'Zapier Enterprise'],
    timeline: 'Custom scope & sprint timeline agreed during discovery call.',
  },
};

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onBackToHome,
  onOpenConsultation,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState(AGENCY_SERVICES[0].id);
  const [gridRef, isGridVisible] = useScrollReveal<HTMLDivElement>();
  const [showcaseRef, isShowcaseVisible] = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const activeService =
    AGENCY_SERVICES.find((s) => s.id === selectedServiceId) || AGENCY_SERVICES[0];
  const activeDetail = SERVICE_EXTENDED_DETAILS[activeService.number] || SERVICE_EXTENDED_DETAILS['01'];
  const IconComponent = SERVICE_ICONS[activeService.number] || BarChart2;

  return (
    <div className="pt-24 pb-20 bg-[#F5EFE6] text-[#1C1614] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between gap-3 mb-8 pt-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs font-semibold uppercase tracking-wider text-[#1C1614] hover:text-[#A88752] transition-colors py-1.5 px-3 sm:px-3.5 rounded-full bg-white hover:bg-stone-50 border border-[#A88752]/30 shadow-sm shrink-0 whitespace-nowrap active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span>Return to Home</span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#A88752] text-right truncate">
            <span className="truncate">Capabilities</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Dedicated Services Page</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#173F35] text-[#F5EFE6] text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#A88752]" />
            <span>Integrated Growth &amp; Creative Agency</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl text-[#1C1614] tracking-tight leading-[1.08] mb-6">
            Comprehensive Growth &amp; Creative Capabilities
          </h1>

          <p className="text-lg sm:text-xl text-[#1C1614]/80 leading-relaxed font-normal max-w-3xl">
            We provide end-to-end digital marketing, video production, brand strategy, and omnichannel scale engineered for enterprises that refuse to compete on price alone.
          </p>
        </div>

        {/* Service Selector Tabs with Popping Up Animation as we scroll */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
            isGridVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.97]'
          }`}
        >
          {AGENCY_SERVICES.map((service, idx) => {
            const isSelected = service.id === selectedServiceId;
            const TabIcon = SERVICE_ICONS[service.number] || BarChart2;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                style={{
                  transitionDelay: isGridVisible ? `${idx * 60}ms` : '0ms',
                }}
                className={`p-6 rounded-2xl text-left border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] flex flex-col justify-between group ${
                  isGridVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-6 scale-[0.95]'
                } ${
                  isSelected
                    ? 'bg-[#1C1614] text-[#F5EFE6] border-[#A88752] shadow-2xl scale-[1.02] ring-2 ring-[#A88752]/30'
                    : 'bg-white hover:bg-[#FAF6F0] text-[#1C1614] border-[#A88752]/25 hover:border-[#A88752] shadow-sm hover:shadow-md hover:-translate-y-1'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-editorial text-3xl font-normal text-[#A88752] tabular-nums">
                      {service.number}
                    </span>
                    <TabIcon
                      className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                        isSelected ? 'text-[#A88752]' : 'text-[#173F35]'
                      }`}
                    />
                  </div>
                  <h3 className={`font-editorial text-2xl mb-2 ${isSelected ? 'text-[#F5EFE6]' : 'text-[#1C1614]'}`}>
                    {service.title}
                  </h3>
                  <p className={`text-xs leading-relaxed font-light ${isSelected ? 'text-[#F5EFE6]/80' : 'text-[#1C1614]/70'}`}>
                    {service.tagline}
                  </p>
                </div>

                <div className={`pt-4 mt-6 border-t flex items-center justify-between text-xs font-semibold ${isSelected ? 'border-white/15' : 'border-[#1C1614]/10'}`}>
                  <span className={isSelected ? 'text-[#A88752]' : 'text-[#173F35]'}>
                    {service.metrics}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                      isSelected ? 'text-[#A88752]' : 'text-[#1C1614]/50'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Service Deep-Dive Showcase with Popping Up Animation as we scroll */}
        <div
          ref={showcaseRef}
          className={`p-8 sm:p-12 rounded-3xl bg-[#173F35] text-[#F5EFE6] border border-[#A88752]/40 shadow-2xl mb-16 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
            isShowcaseVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-10 scale-[0.98]'
          }`}
        >
          <div className="pb-8 border-b border-white/15">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="font-editorial text-5xl text-[#A88752] font-normal tabular-nums">
                  {activeService.number}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#A88752] bg-black/25 px-3 py-1 rounded-full border border-white/10">
                  {activeService.title}
                </span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-[#F5EFE6] tracking-tight mb-3">
                {activeDetail.heroTagline}
              </h2>
              <p className="text-sm sm:text-base text-[#F5EFE6]/85 max-w-3xl font-light leading-relaxed">
                {activeDetail.overview}
              </p>
            </div>
          </div>

          {/* Operational Execution Grid */}
          <div className="pt-8">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#A88752] mb-6 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#A88752]" />
              <span>Full Operational Execution Scope</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {activeDetail.executionPoints.map((point, pIdx) => (
                <div
                  key={pIdx}
                  style={{
                    transitionDelay: isShowcaseVisible ? `${pIdx * 80 + 120}ms` : '0ms',
                  }}
                  className={`p-5 rounded-2xl bg-white/10 border border-white/15 hover:border-[#A88752]/50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] flex flex-col justify-between ${
                    isShowcaseVisible
                      ? 'opacity-100 translate-y-0 scale-100'
                      : 'opacity-0 translate-y-4 scale-[0.97]'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-semibold text-[#F5EFE6] mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#A88752]" />
                      <span>{point.title}</span>
                    </h4>
                    <p className="text-xs text-[#F5EFE6]/80 leading-relaxed font-light">
                      {point.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Deliverables List & Tooling Chips */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-white/15">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold uppercase tracking-widest text-[#A88752] block mb-3">
                  Included Milestone Deliverables
                </span>
                <div className="space-y-2">
                  {activeService.deliverables.map((item, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center gap-2.5 text-xs sm:text-sm text-[#F5EFE6]/90 font-light"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#A88752] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#A88752] block mb-3">
                    Tech Stack &amp; Tooling
                  </span>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {activeDetail.tooling.map((tool, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 text-[11px] font-mono rounded bg-white/10 border border-white/15 text-[#F5EFE6]/85"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-[#F5EFE6]/75 block">
                    <strong className="text-white">Deployment Timeline:</strong> {activeDetail.timeline}
                  </span>
                </div>

                <div className="mt-6 pt-4 border-t border-white/15">
                  <button
                    onClick={() =>
                      onOpenConsultation(activeService.title, `Inquiring for: ${activeService.title}`)
                    }
                    className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#1C1614] bg-[#A88752] hover:bg-[#c29e64] transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Request Proposal for {activeService.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Collaboration & Retainer Models */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A88752] block mb-2">
              Partnership Architecture
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1C1614] tracking-tight mb-3">
              Flexible Engagement Frameworks
            </h2>
            <p className="text-sm text-[#1C1614]/75 font-light">
              Structured to match your immediate commercial horizon and scale with your enterprise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-2xl bg-white text-[#1C1614] border border-[#A88752]/25 hover:border-[#A88752] shadow-md flex flex-col justify-between transition-all">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#173F35] bg-[#173F35]/10 border border-[#173F35]/20 px-2.5 py-1 rounded-full mb-3 inline-block">
                  Sprint Model
                </span>
                <h3 className="font-editorial text-2xl text-[#1C1614] mb-2 font-normal">
                  30-Day Growth Sprint
                </h3>
                <p className="text-xs text-[#1C1614]/75 leading-relaxed font-light mb-6">
                  Intensive creative and audience testing sprint designed to unearth your most profitable creative angles and benchmark unit economics.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-[#1C1614]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#173F35]" />
                    <span>Complete brand audit &amp; competitor teardown</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#1C1614]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#173F35]" />
                    <span>1 Dedicated shoot day (15 finished assets)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#1C1614]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#173F35]" />
                    <span>Full-funnel Meta &amp; Google ad deployment</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onOpenConsultation('30-Day Growth Sprint')}
                className="w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#173F35] bg-[#173F35]/10 hover:bg-[#173F35] hover:text-[#F5EFE6] border border-[#173F35]/20 transition-colors text-center"
              >
                Inquire for 30-Day Sprint
              </button>
            </div>

            <div className="p-7 rounded-2xl bg-[#173F35] text-[#F5EFE6] border border-[#A88752] shadow-2xl flex flex-col justify-between relative md:scale-[1.03]">
              <div className="absolute -top-3 right-6 px-3 py-1 bg-[#A88752] text-[#1C1614] text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md">
                Most Selected
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A88752] bg-black/25 px-2.5 py-1 rounded-full mb-3 inline-block">
                  Annual Partnership
                </span>
                <h3 className="font-editorial text-2xl text-[#F5EFE6] mb-2 font-normal">
                  Flagship Growth Retainer
                </h3>
                <p className="text-xs text-[#F5EFE6]/80 leading-relaxed font-light mb-6">
                  Acting as your fully dedicated growth marketing and creative production department. Relentless monthly video production, daily community management, and scaling.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-[#F5EFE6]/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A88752]" />
                    <span>Monthly recurring studio shoots &amp; video edits</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#F5EFE6]/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A88752]" />
                    <span>Full omni-channel media buying &amp; optimization</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#F5EFE6]/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A88752]" />
                    <span>Daily community DM management &amp; lead triage</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#F5EFE6]/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#A88752]" />
                    <span>Bi-weekly executive board review &amp; live dashboards</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onOpenConsultation('Flagship Growth Retainer')}
                className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#1C1614] bg-[#A88752] hover:bg-[#c29e64] transition-all text-center shadow-lg"
              >
                Inquire for Flagship Retainer
              </button>
            </div>

            <div className="p-7 rounded-2xl bg-white text-[#1C1614] border border-[#A88752]/25 hover:border-[#A88752] shadow-md flex flex-col justify-between transition-all">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#173F35] bg-[#173F35]/10 border border-[#173F35]/20 px-2.5 py-1 rounded-full mb-3 inline-block">
                  Custom Architecture
                </span>
                <h3 className="font-editorial text-2xl text-[#1C1614] mb-2 font-normal">
                  Bespoke Transformation
                </h3>
                <p className="text-xs text-[#1C1614]/75 leading-relaxed font-light mb-6">
                  For enterprise brands undergoing major market launches, capital raises, or international rollouts requiring bespoke creative direction and PR.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-[#1C1614]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#173F35]" />
                    <span>Multi-territory international media planning</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#1C1614]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#173F35]" />
                    <span>Editorial PR placements in Vogue, GQ, Forbes</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#1C1614]/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#173F35]" />
                    <span>Headless web platform &amp; custom booking tech</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => onOpenConsultation('Bespoke Enterprise Transformation')}
                className="w-full py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#173F35] bg-[#173F35]/10 hover:bg-[#173F35] hover:text-[#F5EFE6] border border-[#173F35]/20 transition-colors text-center"
              >
                Inquire for Bespoke Scope
              </button>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#173F35] text-[#F5EFE6] border border-[#A88752]/40 text-center shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A88752] font-semibold mb-3 block">
              Direct Partnership
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#F5EFE6] tracking-tight leading-tight mb-4">
              Ready to Accelerate Your Enterprise Growth?
            </h2>
            <p className="text-sm sm:text-base text-[#F5EFE6]/80 font-light leading-relaxed mb-8">
              Book a 30-minute private consultation with our directors. We’ll analyze your category unit economics and present an actionable execution blueprint.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenConsultation()}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#173F35] bg-[#F5EFE6] hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Schedule Consultation Briefing</span>
                <ArrowRight className="w-4 h-4 text-[#173F35]" />
              </button>
              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F5EFE6]/90 hover:text-white border border-white/30 hover:border-white/60 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
