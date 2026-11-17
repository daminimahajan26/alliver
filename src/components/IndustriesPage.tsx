import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  UtensilsCrossed,
  Dumbbell,
  Sparkle,
  Briefcase,
  ChevronRight,
  ShieldCheck,
  Target,
  Check,
  Layers,
  Search,
} from 'lucide-react';
import { ClientInfoModal, ClientCategoryDetail } from './ClientInfoModal';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface IndustriesPageProps {
  onBackToHome: () => void;
  onOpenConsultation: (servicePreset?: string, forecastSummary?: string) => void;
}

interface TargetCategoryDetail extends ClientCategoryDetail {
  letter: 'A' | 'B' | 'C' | 'D';
  items: string[];
  tags: string[];
  budgetApproach: string;
}

const CATEGORY_ICONS = {
  A: UtensilsCrossed,
  B: Dumbbell,
  C: Sparkle,
  D: Briefcase,
};

export const IndustriesPage: React.FC<IndustriesPageProps> = ({
  onBackToHome,
  onOpenConsultation,
}) => {
  const [selectedLetter, setSelectedLetter] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [modalCategory, setModalCategory] = useState<ClientCategoryDetail | null>(null);
  const [gridRef, isGridVisible] = useScrollReveal<HTMLDivElement>();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  const categories: TargetCategoryDetail[] = [
    {
      letter: 'A',
      number: 'A',
      title: 'A. FOOD AND HOSPITALITY',
      categoryName: 'Food & Hospitality',
      tagline: 'Cafes, restaurants, bakeries, and culinary destinations seeking consistent footfall and direct bookings.',
      description: '• Cafes and coffee businesses\n• Restaurants and food outlets\n• Bakeries and speciality food brands',
      items: [
        'Cafes and coffee businesses',
        'Restaurants and food outlets',
        'Bakeries and speciality food brands',
      ],
      tags: ['Cafes & Coffee', 'Restaurants & Outlets', 'Bakeries', 'Speciality Food'],
      budgetApproach: 'Calibrated for local store footfall, weekend reservations, catering orders, and private event buyouts.',
      overview:
        'ALLIVER works with food and hospitality brands to turn culinary passion into consistent commercial footfall and online orders. We engineer high-retention food cinematography, local Google & Meta geo-targeted search funnels, and tastemaker influencer activations without relying on margin-eroding discount aggregators.',
      pillars: [
        {
          title: 'Cinematic Culinary Cinema & Ambience Reels',
          description:
            'Runway-grade 4K macro food cinematography, barista coffee craft shorts, and behind-the-scenes kitchen craftsmanship engineered for viral social reach.',
        },
        {
          title: 'Direct Reservation & Footfall Funnels',
          description:
            'Targeted local Meta and Google Ads campaigns driving weekend dinner reservations, corporate event buyouts, and off-peak dining traffic.',
        },
        {
          title: 'VIP Food Critic & Creator Tasting Sessions',
          description:
            'Curated tasting sessions and strategic influencer partnerships with trusted metropolitan foodies and critics.',
        },
      ],
      deliverables: [
        'Monthly On-Site 4K Food & Ambience Shoots',
        'Direct Table Reservation Ad Funnels',
        'Influencer Tasting Event Direction',
        'Google My Business & Local Map Pack Dominance',
      ],
      keyMetric: '+185%',
      keyMetricLabel: 'Average Table Reservation Lift in 60 Days',
      typicalTimeline: 'Deployment within 10 days of media shoot',
      idealFor: 'Independent cafes, chef-driven bistros, artisan bakeries, and gourmet restaurant groups.',
    },
    {
      letter: 'B',
      number: 'B',
      title: 'B. FITNESS, SPORTS AND WELLNESS',
      categoryName: 'Fitness, Sports & Wellness',
      tagline: 'Gyms, studios, and wellness brands building active communities and high-retention memberships.',
      description: '• Gyms and fitness studios\n• Sports and wellness businesses\n• Health and wellness brands',
      items: [
        'Gyms and fitness studios',
        'Sports and wellness businesses',
        'Health and wellness brands',
      ],
      tags: ['Gyms & Studios', 'Sports Facilities', 'Health Brands', 'Wellness Centers'],
      budgetApproach: 'Optimized for cost-per-trial booking, member lifetime value (LTV), and churn reduction.',
      overview:
        'ALLIVER helps fitness, sports, and wellness enterprises construct automated member acquisition engines. We combine dynamic athletic video production with low-friction trial pass landing funnels and automated member nurture workflows that fill classes and slash churn.',
      pillars: [
        {
          title: 'High-Energy Athletic Cinematography',
          description:
            'Dynamic training videos, coach authority spotlights, and inspiring transformation documentaries that build authentic brand prestige.',
        },
        {
          title: 'First-Class Trial Booking Acquisition',
          description:
            'High-converting lead generation funnels on Instagram and Google driving studio visits, trial classes, and annual memberships.',
        },
        {
          title: 'Community Retention & Referral Architecture',
          description:
            'Automated WhatsApp and email workflows that encourage consistent attendance, challenge sign-ups, and member referrals.',
        },
      ],
      deliverables: [
        'Studio Promo & Trainer Spotlight Films',
        'Trial Class Lead Funnel & CRM Lead Routing',
        'Local SEO & Google Search Capture',
        'Member Referral & Retention Campaigns',
      ],
      keyMetric: '3.4x',
      keyMetricLabel: 'Trial Booking Velocity',
      typicalTimeline: 'Initial launch in 14 business days',
      idealFor: 'Boutique fitness studios, CrossFit boxes, yoga centers, sports academies, and wellness brands.',
    },
    {
      letter: 'C',
      number: 'C',
      title: 'C. BEAUTY, FASHION AND LIFESTYLE',
      categoryName: 'Beauty, Fashion & Lifestyle',
      tagline: 'Salons, clinics, apparel, jewellery, accessories, and home decor brands scaling customer acquisition.',
      description:
        '• Hair salons\n• Nail art studios\n• Makeup artists\n• Skin clinics and beauty parlours\n• Clothing and streetwear brands\n• Jewellery brands\n• Watches and handbags brands\n• Footwear brands\n• Thrift stores\n• Eyewear brands\n• Home decor businesses',
      items: [
        'Hair salons',
        'Nail art studios',
        'Makeup artists',
        'Skin clinics and beauty parlours',
        'Clothing and streetwear brands',
        'Jewellery brands',
        'Watches and handbags brands',
        'Footwear brands',
        'Thrift stores',
        'Eyewear brands',
        'Home decor businesses',
      ],
      tags: [
        'Salons & Clinics',
        'Clothing & Streetwear',
        'Jewellery & Watches',
        'Footwear & Eyewear',
        'Thrift & Vintage',
        'Home Decor',
      ],
      budgetApproach: 'Engineered for high average order values (AOV), consultation bookings, and collection drop velocity.',
      overview:
        'Aesthetic excellence is paramount across beauty, fashion, and lifestyle. ALLIVER pairs high-fashion editorial production with precision digital advertising. Whether driving clinic consultations, salon chairs, or D2C collection sell-throughs, we position your brand as the definitive leader.',
      pillars: [
        {
          title: 'Editorial Visuals & Lookbook Direction',
          description:
            'Runway-standard lookbooks, macro product photography, and aesthetic salon/studio tour films that command premium pricing.',
        },
        {
          title: 'High-Converting Appointment & E-Comm Ads',
          description:
            'Precision targeting on Instagram and TikTok delivering booked treatments, salon appointments, and profitable product sell-through.',
        },
        {
          title: 'Tastemaker Seeding & Creator Collaborations',
          description:
            'Strategic styling and gifting partnerships with fashion bloggers, beauty authorities, and interior design creators.',
        },
      ],
      deliverables: [
        'Full Brand Visual Identity & Lookbooks',
        'Meta & Google Ad Scaling Engine',
        'Automated Booking & Checkout Funnels',
        'Influencer Seeding & PR Coordination',
      ],
      keyMetric: '+320%',
      keyMetricLabel: 'Online & In-Studio Booking Velocity',
      typicalTimeline: 'Continuous 14-day creative sprint cadence',
      idealFor: 'Premium salons, aesthetic clinics, fashion labels, jewellery ateliers, and home design studios.',
    },
    {
      letter: 'D',
      number: 'D',
      title: 'D. OTHER INDUSTRIES',
      categoryName: 'Other Industries',
      tagline: 'Startups, local businesses, service providers, professionals, and corporate enterprises.',
      description:
        '• Startups\n• Local businesses\n• Service providers\n• Professionals\n• E-commerce businesses\n• Established companies\n• Clubs\n• Real estate businesses',
      items: [
        'Startups',
        'Local businesses',
        'Service providers',
        'Professionals',
        'E-commerce businesses',
        'Established companies',
        'Clubs',
        'Real estate businesses',
      ],
      tags: [
        'Tech Startups',
        'Local Businesses',
        'Service Providers',
        'Professionals',
        'E-Commerce',
        'Corporate',
        'Clubs',
        'Real Estate',
      ],
      budgetApproach: 'Tailored to B2B sales cycles, high-ticket deal sizes, and measurable commercial pipeline growth.',
      overview:
        'ALLIVER provides strategic marketing for innovative startups, professional practices, service providers, private clubs, and real estate developers. We eliminate generic corporate marketing and engineer conversion-focused positioning that generates qualified sales leads and elevates market authority.',
      pillars: [
        {
          title: 'Category Positioning & Authority Architecture',
          description:
            'Crafting unmistakable market positioning and executive thought leadership that differentiates you from conventional competitors.',
        },
        {
          title: 'High-Intent Search & Conversion Engines',
          description:
            'Capturing ready-to-buy clients searching on Google and AI search engines (ChatGPT, Gemini) with optimized landing pages.',
        },
        {
          title: 'Scalable Inbound Lead Qualification',
          description:
            'Automated CRM inquiry filtering and follow-up workflows ensuring your team only speaks with qualified prospects.',
        },
      ],
      deliverables: [
        'Full Commercial Growth Architecture',
        'Google & AI Search (SEO) Optimisation',
        'Lead Capture Portals & CRM Integration',
        'High-Impact Presentation & Brand Collateral',
      ],
      keyMetric: '+240%',
      keyMetricLabel: 'Qualified Inbound Pipeline Growth',
      typicalTimeline: 'Audit & launch within 14 business days',
      idealFor: 'Founders, managing partners, service entrepreneurs, e-commerce scale-ups, and developers.',
    },
  ];

  const activeCategory =
    categories.find((c) => c.letter === selectedLetter) || categories[0];

  const ActiveIcon = CATEGORY_ICONS[activeCategory.letter] || Briefcase;

  return (
    <div className="pt-24 pb-20 bg-[#F5EFE6] text-[#1C1614] min-h-screen">
      {/* 1. Breadcrumb Top Navigation */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-8">
        <div className="flex items-center justify-between gap-3 border-b border-[#A88752]/20 pb-4">
          <button
            onClick={onBackToHome}
            className="group inline-flex items-center gap-1.5 sm:gap-2 text-xs font-semibold uppercase tracking-wider sm:tracking-widest text-[#173F35] hover:text-[#0F2C25] transition-colors shrink-0 whitespace-nowrap active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
            <span>Return to Home</span>
          </button>
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs uppercase tracking-wider sm:tracking-widest text-[#A88752] font-semibold text-right truncate">
            <span className="w-2 h-2 rounded-full bg-[#173F35] animate-pulse shrink-0" />
            <span className="truncate">Target Audience</span>
            <span className="hidden sm:inline">Architecture</span>
          </div>
        </div>
      </div>

      {/* 2. Editorial Hero Section: Exactly matching user prompt */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-12">
        <div className="max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#173F35]/10 border border-[#173F35]/25 text-xs font-bold uppercase tracking-widest text-[#173F35]">
            <Sparkles className="w-3.5 h-3.5 text-[#A88752]" />
            <span>Sector Specialization &amp; Audience Strategy</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl text-[#1C1614] tracking-tight leading-[1.08]">
            TARGET AUDIENCE — <span className="italic font-normal">WHO WE WORK WITH</span>
          </h1>

          <p className="font-editorial text-xl sm:text-2xl text-[#173F35] leading-relaxed font-normal">
            ALLIVER works with businesses across different industries, tailoring marketing strategies to their individual goals, audiences, and budgets.
          </p>

          <p className="text-xs sm:text-sm text-[#1C1614]/75 font-light max-w-3xl leading-relaxed">
            Whether scaling footfall for artisan cafes, accelerating membership growth for athletic studios, crafting runway visuals for beauty &amp; fashion brands, or generating high-intent deal flow for enterprise services — we build marketing systems tailored to your unit economics.
          </p>
        </div>
      </section>

      {/* 3. The 4 Core Category Boxes with Popping Up Animation as we scroll */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-16">
        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
            isGridVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-8 scale-[0.97]'
          }`}
        >
          {categories.map((cat, idx) => {
            const isSelected = selectedLetter === cat.letter;
            const Icon = CATEGORY_ICONS[cat.letter] || Briefcase;

            return (
              <div
                key={cat.letter}
                onClick={() => setSelectedLetter(cat.letter)}
                style={{
                  transitionDelay: isGridVisible ? `${idx * 80}ms` : '0ms',
                }}
                className={`p-7 rounded-2xl flex flex-col justify-between group cursor-pointer select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] relative ${
                  isGridVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-6 scale-[0.95]'
                } ${
                  isSelected
                    ? 'bg-[#1C1614] text-[#F5EFE6] border-2 border-[#A88752] shadow-2xl md:scale-[1.02] ring-2 ring-[#A88752]/40'
                    : 'bg-[#F5EFE6] text-[#1C1614] border-2 border-[#A88752]/35 shadow-md hover:border-[#A88752] hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Top Bar: Letter & Selected Indicator */}
                  <div
                    className={`flex items-center justify-between pb-4 mb-5 border-b ${
                      isSelected ? 'border-white/15' : 'border-[#A88752]/25'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-editorial text-3xl text-[#A88752] font-bold">
                        {cat.letter}
                      </span>
                      <Icon className="w-4 h-4 text-[#A88752]" />
                    </div>

                    <div className="flex items-center gap-2">
                      {isSelected ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A88752] bg-white/10 px-2.5 py-1 rounded-full border border-[#A88752]/40 flex items-center gap-1.5 shadow-xs">
                          <Check className="w-3 h-3 text-[#A88752]" />
                          <span>SELECTED</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1C1614]/75 bg-[#1C1614]/5 px-2.5 py-1 rounded-full border border-[#1C1614]/15 group-hover:bg-[#1C1614] group-hover:text-[#F5EFE6] transition-colors">
                          SELECT
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Category Title */}
                  <h3
                    className={`font-editorial text-xl sm:text-2xl mb-4 transition-colors leading-tight ${
                      isSelected
                        ? 'text-[#F5EFE6] font-bold'
                        : 'text-[#1C1614] font-bold group-hover:text-[#A88752]'
                    }`}
                  >
                    {cat.title}
                  </h3>

                  {/* Bulleted Answers: BOLD when selected per user requirement */}
                  <ul className="space-y-2 mb-6">
                    {cat.items.map((item, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2 leading-snug transition-all ${
                          isSelected
                            ? 'font-bold text-[#F5EFE6] text-sm'
                            : 'font-normal text-[#1C1614]/85 text-xs sm:text-sm'
                        }`}
                      >
                        <span
                          className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                            isSelected ? 'bg-[#A88752]' : 'bg-[#A88752]'
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Row: Tags & Briefing trigger */}
                <div
                  className={`pt-4 space-y-3 border-t ${
                    isSelected ? 'border-white/10' : 'border-[#A88752]/25'
                  }`}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {cat.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 text-[10px] rounded-full border ${
                          isSelected
                            ? 'bg-white/10 text-[#A88752] border-[#A88752]/30 font-medium'
                            : 'bg-white text-[#1C1614]/80 border-[#A88752]/30 font-normal'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLetter(cat.letter);
                      setModalCategory(cat);
                    }}
                    className={`w-full py-2 px-3 rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                      isSelected
                        ? 'bg-[#173F35] text-[#F5EFE6] hover:bg-[#0F2C25] border border-[#A88752]/40'
                        : 'bg-white text-[#1C1614] hover:bg-[#1C1614] hover:text-[#F5EFE6] border border-[#A88752]/40'
                    }`}
                  >
                    <span>View Sector Briefing →</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Deep-Dive Sector Spotlight for Selected Category (Deep Green #173F35 with Gold Accents) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
        <div className="bg-[#173F35] text-[#F5EFE6] rounded-3xl p-8 sm:p-12 border border-[#A88752]/40 shadow-2xl space-y-10">
          {/* Top Header of Spotlight */}
          <div className="pb-8 border-b border-white/10">
            <div className="space-y-3 max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#A88752] uppercase tracking-wider border border-[#A88752]/30">
                <ActiveIcon className="w-3.5 h-3.5 text-[#A88752]" />
                <span>Sector Focus • Category {activeCategory.letter}</span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5EFE6]">
                {activeCategory.title}
              </h2>
              <p className="text-sm sm:text-base text-[#F5EFE6]/85 font-light leading-relaxed">
                {activeCategory.overview}
              </p>
            </div>
          </div>

          {/* Budget & Goal Tailoring Banner */}
          <div className="p-5 rounded-2xl bg-black/25 border border-[#A88752]/35 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A88752] block mb-1">
                Tailored Strategy, Audience &amp; Budget Framework:
              </span>
              <p className="text-xs sm:text-sm text-[#F5EFE6]/90 font-light">
                {activeCategory.budgetApproach}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-[#A88752] border border-[#A88752]/30 shrink-0">
              Custom Calibration
            </span>
          </div>

          {/* 3 Pillars & Deliverables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            {/* Left 7 Cols: Strategic Pillars */}
            <div className="lg:col-span-7 space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#A88752] flex items-center gap-2">
                <Target className="w-4 h-4 text-[#A88752]" />
                <span>Strategic Execution Pillars for {activeCategory.categoryName}</span>
              </h4>

              <div className="space-y-3.5">
                {activeCategory.pillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-[#A88752]">
                      <span className="w-5 h-5 rounded-full bg-black/30 border border-[#A88752]/40 flex items-center justify-center text-[10px] text-[#A88752]">
                        {idx + 1}
                      </span>
                      <span>{pillar.title}</span>
                    </div>
                    <p className="text-xs text-[#F5EFE6]/80 font-light leading-relaxed pl-7">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 5 Cols: Deliverables & Proposal Request */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-black/20 border border-[#A88752]/30 rounded-2xl p-6 sm:p-8">
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#A88752] flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-[#A88752]" />
                  <span>Deliverables &amp; Assets Included</span>
                </h4>

                <div className="space-y-2.5">
                  {activeCategory.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-[#F5EFE6]/90"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#A88752] shrink-0 mt-0.5" />
                      <span className="font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <button
                  onClick={() =>
                    onOpenConsultation(
                      activeCategory.title,
                      `Sector: ${activeCategory.title}. Target Objective: Replicate ${activeCategory.keyMetric} ${activeCategory.keyMetricLabel}.`
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F5EFE6] bg-[#1C1614] hover:bg-black transition-all shadow-lg border border-[#A88752]/40"
                >
                  <span>Request Proposal for {activeCategory.categoryName}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[10px] text-center text-[#F5EFE6]/50">
                  Includes sector diagnostic audit, competitor teardown &amp; revenue forecast.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. How ALLIVER Works Across Different Industries */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#A88752]/30 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A88752] font-semibold block">
              The ALLIVER Philosophy
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1C1614] font-bold tracking-tight">
              Tailoring Strategies to Individual Goals, Audiences, and Budgets
            </h2>
            <p className="text-sm sm:text-base text-[#1C1614]/75 font-light leading-relaxed">
              We reject cookie-cutter marketing packages. A boutique cafe needs hyper-local weekend footfall; a luxury skincare clinic needs high-trust surgical consultation bookings; a B2B SaaS startup needs qualified enterprise pipeline. Every campaign is engineered from first principles around your business model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#A88752]/20 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#173F35] text-[#A88752] flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#1C1614]">
                Individual Business Goals
              </h3>
              <p className="text-xs text-[#1C1614]/75 font-light leading-relaxed">
                Whether you want to fill seats this Friday, launch a nationwide streetwear collection drop, or source institutional clients, our roadmap starts from your balance sheet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#A88752]/20 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#173F35] text-[#A88752] flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#1C1614]">
                Audience Profiling &amp; Psychology
              </h3>
              <p className="text-xs text-[#1C1614]/75 font-light leading-relaxed">
                We study where your ideal patrons spend attention—from Gen Z TikTok aesthetic feeds to high-net-worth property seekers—crafting native creative that resonates.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5EFE6] border border-[#A88752]/20 space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#173F35] text-[#A88752] flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-editorial text-xl font-bold text-[#1C1614]">
                Disciplined Budget Allocation
              </h3>
              <p className="text-xs text-[#1C1614]/75 font-light leading-relaxed">
                Zero budget waste. We deploy capital where unit economics are proven, scaling ad spend and production assets with full server-side attribution and accountability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom Conversion Banner */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="bg-[#1C1614] text-[#F5EFE6] rounded-3xl p-10 sm:p-14 border border-[#A88752]/40 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A88752] font-semibold block">
              Confidential Discovery Briefing
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F5EFE6]">
              Ready to Command Your Sector?
            </h3>
            <p className="text-xs sm:text-sm text-[#F5EFE6]/80 font-light leading-relaxed">
              Book a 30-minute strategic consultation with our sector practice leads. We will review your current positioning, benchmark you against direct competitors, and deliver a high-velocity growth roadmap.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onOpenConsultation('Comprehensive Sector Strategy')}
              className="px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F5EFE6] bg-[#173F35] hover:bg-[#0F2C25] rounded-full transition-all shadow-xl border border-[#A88752]/40"
            >
              Book Discovery Briefing →
            </button>
            <button
              onClick={onBackToHome}
              className="px-8 py-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F5EFE6] bg-white/10 hover:bg-white/15 rounded-full transition-colors border border-white/20 text-center"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>

      {/* Client Detail Modal */}
      <ClientInfoModal
        category={modalCategory}
        onClose={() => setModalCategory(null)}
        onBookCall={(catTitle) => onOpenConsultation(catTitle)}
      />
    </div>
  );
};
