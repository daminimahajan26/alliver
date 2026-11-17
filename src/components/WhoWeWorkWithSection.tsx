import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { ClientInfoModal, ClientCategoryDetail } from './ClientInfoModal';

interface WhoWeWorkWithSectionProps {
  onOpenConsultation?: (preset?: string) => void;
  onSelectArchetype?: (archetypeTitle: string) => void;
}

interface TargetAudienceCategory extends ClientCategoryDetail {
  letter: 'A' | 'B' | 'C' | 'D';
  items: string[];
  tags: string[];
}

export const WhoWeWorkWithSection: React.FC<WhoWeWorkWithSectionProps> = ({
  onOpenConsultation,
  onSelectArchetype,
}) => {
  // Box selected state: defaults to 'A', clicking any box selects it (turning it Espresso with bold answers)
  const [selectedLetter, setSelectedLetter] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [modalCategory, setModalCategory] = useState<ClientCategoryDetail | null>(null);

  const categories: TargetAudienceCategory[] = [
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
      tags: ['Cafes & Coffee', 'Restaurants', 'Bakeries', 'Speciality Food'],
      overview:
        'We engineer full-funnel digital growth for food and hospitality brands, transforming casual diners into loyal patrons. From cinematic culinary reels to direct booking funnels and VIP influencer tasting activations, we drive footfall, table reservations, and catering revenue without relying on steep discount platforms.',
      pillars: [
        {
          title: 'Cinematic Culinary Content & Ambience Reels',
          description:
            'Runway-grade 4K food cinematography, barista craft shorts, and behind-the-scenes chef storytelling engineered for viral social reach.',
        },
        {
          title: 'Direct Reservation & Footfall Funnels',
          description:
            'Targeted local Meta and Google Ads campaigns driving weekend reservations, corporate event buyouts, and private dining bookings.',
        },
        {
          title: 'VIP Foodie & Tastemaker Seeding',
          description:
            'Curated tasting sessions and partnerships with trusted culinary influencers across your primary metropolitan markets.',
        },
      ],
      deliverables: [
        'Monthly Food Cinematography & Reels',
        'Direct Booking Ad Funnels',
        'Influencer Tasting Activations',
        'Google My Business & Local SEO Optimization',
      ],
      keyMetric: '+185%',
      keyMetricLabel: 'Average Table Booking Lift in 60 Days',
      typicalTimeline: 'Launch within 10 days of food shoot',
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
      tags: ['Gyms & Studios', 'Sports Businesses', 'Health Brands', 'Wellness Hubs'],
      overview:
        'Fitness and wellness enterprises require high-energy storytelling combined with low-friction membership acquisition funnels. We create high-converting trial booking pipelines, coach authority videos, and retention-focused member nurture workflows that fill classes and slash membership churn.',
      pillars: [
        {
          title: 'High-Energy Athletic Cinematography',
          description:
            'Dynamic training videos, coach spotlights, and member transformation documentaries that build inspiring brand authority.',
        },
        {
          title: 'First-Class Trial Booking Acquisition',
          description:
            'High-converting lead generation funnels on Instagram and Google driving trial sessions, studio tours, and direct sign-ups.',
        },
        {
          title: 'Member Retention & Community Loyalty',
          description:
            'Automated WhatsApp and email workflows that encourage consistent attendance, challenge sign-ups, and referral growth.',
        },
      ],
      deliverables: [
        'Studio Promo & Coach Spotlight Videos',
        'Trial Class Lead Funnel & CRM Routing',
        'Google Local Search Dominance',
        'Member Referral & Retention Campaigns',
      ],
      keyMetric: '3.4x',
      keyMetricLabel: 'Trial Booking Velocity',
      typicalTimeline: 'Initial launch in 14 days',
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
        'Hair & Nail Salons',
        'Skin Clinics',
        'Streetwear & Fashion',
        'Jewellery & Watches',
        'Home Decor',
      ],
      overview:
        'Aesthetic appeal is non-negotiable in fashion, beauty, and lifestyle. We combine editorial visual production with high-return digital advertising. Whether driving high-ticket clinic consultations, salon appointments, or D2C product sales drops, we position your brand as the premier choice in your niche.',
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
        'Meta & TikTok Ad Scaling Engine',
        'Automated Booking & Checkout Funnels',
        'Influencer Seeding Coordination',
      ],
      keyMetric: '+320%',
      keyMetricLabel: 'Online & In-Studio Booking Velocity',
      typicalTimeline: 'Continuous 14-day creative sprints',
      idealFor: 'Premium salons, aesthetic clinics, fashion labels, jewellery ateliers, and design studios.',
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
      tags: ['Startups', 'Local Businesses', 'Professionals', 'E-Commerce', 'Real Estate', 'Clubs'],
      overview:
        'Every ambitious enterprise deserves marketing that converts. From early-stage venture startups needing rapid customer validation to established professional practices, real estate brokers, and private clubs, we build custom growth roadmaps aligned to your specific commercial objectives.',
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
            'Automated CRM inquiry filtering and follow-up workflows ensuring your sales team only speaks with qualified prospects.',
        },
      ],
      deliverables: [
        'Full Commercial Growth Architecture',
        'Google & AI Search (GEO) Optimisation',
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

  return (
    <section
      id="target-audience"
      className="py-20 lg:py-28 bg-[#F5EFE6] border-t border-b border-[#A88752]/30 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header: 6. TARGET AUDIENCE — WHO WE WORK WITH */}
        <div className="max-w-4xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A88752] mb-3">
            <span>Target Audience Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Client Categories A – D</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#1C1614] tracking-tight leading-[1.1] mb-6">
            6. TARGET AUDIENCE — WHO WE WORK WITH
          </h2>

          <p className="font-editorial text-xl sm:text-2xl text-[#173F35] leading-relaxed font-normal mb-4">
            ALLIVER works with businesses across different industries, tailoring marketing strategies to their individual goals, audiences, and budgets.
          </p>

          <p className="text-xs sm:text-sm text-[#1C1614]/70 font-light flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#173F35]" />
            <span>Click any box below to select and view the focused industry playbook.</span>
          </p>
        </div>

        {/* 4 Interactive Category Boxes (Forest Green by default, Espresso when selected with bold answers) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((cat) => {
            const isSelected = selectedLetter === cat.letter;

            return (
              <div
                key={cat.letter}
                onClick={() => setSelectedLetter(cat.letter)}
                className={`p-7 rounded-2xl flex flex-col justify-between group cursor-pointer select-none transition-all duration-300 relative ${
                  isSelected
                    ? 'bg-[#1C1614] text-[#F5EFE6] border-2 border-[#A88752] shadow-2xl scale-[1.02] ring-2 ring-[#A88752]/40'
                    : 'bg-[#173F35] text-[#F5EFE6] border border-[#173F35] shadow-lg hover:border-[#A88752]/60 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div>
                  {/* Top Bar: Letter & Selection Badge */}
                  <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-5">
                    <span className="font-editorial text-3xl text-[#A88752] font-bold">
                      {cat.letter}
                    </span>

                    <div className="flex items-center gap-2">
                      {isSelected ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#A88752] bg-white/10 px-2.5 py-1 rounded-full border border-[#A88752]/40 flex items-center gap-1.5 shadow-xs">
                          <Check className="w-3 h-3 text-[#A88752]" />
                          <span>SELECTED</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5EFE6]/75 bg-black/25 px-2.5 py-1 rounded-full group-hover:bg-[#A88752] group-hover:text-[#173F35] transition-colors">
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
                        : 'text-[#F5EFE6] group-hover:text-white'
                    }`}
                  >
                    {cat.title}
                  </h3>

                  {/* Bulleted Answers: BOLD when selected per user requirement! */}
                  <ul className="space-y-2 mb-6">
                    {cat.items.map((item, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start gap-2 leading-snug transition-all ${
                          isSelected
                            ? 'font-bold text-[#F5EFE6] text-sm'
                            : 'font-normal text-[#F5EFE6]/85 text-xs sm:text-sm'
                        }`}
                      >
                        <span
                          className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${
                            isSelected ? 'bg-[#A88752]' : 'bg-[#F5EFE6]/60'
                          }`}
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Row: Tags & More Info trigger */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {cat.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 text-[10px] rounded-full border ${
                          isSelected
                            ? 'bg-white/10 text-[#A88752] border-[#A88752]/30 font-medium'
                            : 'bg-black/20 text-[#F5EFE6]/80 border-white/10 font-normal'
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
                        : 'bg-white/10 text-[#F5EFE6] hover:bg-white/20'
                    }`}
                  >
                    <Info className="w-3.5 h-3.5 text-[#A88752]" />
                    <span>View Full Sector Briefing</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Sector Active Detail Spotlight (Renders in Espresso #1C1614 with Gold Accents) */}
        <div className="bg-[#1C1614] text-[#F5EFE6] rounded-3xl p-8 sm:p-12 border border-[#A88752]/40 shadow-2xl space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#A88752] uppercase tracking-wider border border-[#A88752]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#A88752]" />
                <span>Sector Focus: {activeCategory.categoryName} ({activeCategory.letter})</span>
              </div>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#F5EFE6]">
                {activeCategory.title}
              </h3>
              <p className="text-sm sm:text-base text-[#F5EFE6]/85 font-light leading-relaxed">
                {activeCategory.overview}
              </p>
            </div>

            <div className="shrink-0 bg-white/5 border border-[#A88752]/40 rounded-2xl p-6 text-center sm:text-left min-w-[220px]">
              <span className="text-[10px] uppercase tracking-widest text-[#A88752] font-semibold block mb-1">
                Demonstrated Impact
              </span>
              <div className="font-editorial text-4xl sm:text-5xl font-bold text-[#F5EFE6]">
                {activeCategory.keyMetric}
              </div>
              <p className="text-xs text-[#F5EFE6]/75 mt-1 font-light">
                {activeCategory.keyMetricLabel}
              </p>
            </div>
          </div>

          {/* 3 Pillars for the Active Category */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A88752] mb-4">
              Strategic Execution Pillars for {activeCategory.categoryName}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeCategory.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2"
                >
                  <div className="w-7 h-7 rounded-full bg-[#173F35] text-[#A88752] flex items-center justify-center font-bold text-xs border border-[#A88752]/30">
                    {idx + 1}
                  </div>
                  <h5 className="font-semibold text-sm text-[#F5EFE6]">
                    {pillar.title}
                  </h5>
                  <p className="text-xs text-[#F5EFE6]/75 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#F5EFE6]/70 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#A88752]" />
              <span>Tailoring strategies to individual business goals, audiences, and budgets.</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setModalCategory(activeCategory)}
                className="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#F5EFE6] bg-white/10 hover:bg-white/15 transition-colors border border-white/20"
              >
                More Information
              </button>
              <button
                onClick={() => {
                  if (onOpenConsultation) {
                    onOpenConsultation(activeCategory.title);
                  } else if (onSelectArchetype) {
                    onSelectArchetype(activeCategory.title);
                  }
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#F5EFE6] bg-[#173F35] hover:bg-[#0F2C25] transition-all shadow-lg border border-[#A88752]/40 flex items-center justify-center gap-2"
              >
                <span>Partner With ALLIVER</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A88752]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deep-Dive Sector Modal */}
      <ClientInfoModal
        category={modalCategory}
        onClose={() => setModalCategory(null)}
        onBookCall={(catTitle) => {
          if (onOpenConsultation) onOpenConsultation(catTitle);
          if (onSelectArchetype) onSelectArchetype(catTitle);
        }}
      />
    </section>
  );
};
