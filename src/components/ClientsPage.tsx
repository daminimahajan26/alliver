import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Clock,
  Layers,
  Building2,
  Plane,
  UtensilsCrossed,
  Watch,
  Sparkle,
  Briefcase,
  X,
} from 'lucide-react';
import { ClientInfoModal, ClientCategoryDetail } from './ClientInfoModal';

interface ClientsPageProps {
  onBackToHome: () => void;
  onOpenConsultation: (servicePreset?: string, forecastSummary?: string) => void;
}

const CLIENT_ARCHETYPES: (ClientCategoryDetail & { tags: string[]; iconName: string })[] = [
  {
    number: '01',
    title: 'Haute Horlogerie & High Jewelry',
    categoryName: 'High Horology & Fine Jewelry',
    tagline: 'Preserving heritage, commanding discretion, and elevating mechanical prestige.',
    description:
      'We work with independent master watchmakers, historical Swiss ateliers, and bespoke high-jewelry houses where brand equity is sacred and commercial discounting is strictly forbidden.',
    overview:
      'In fine horology, customer acquisition is an art of high discretion. Our media funnels target verified collectors, private family offices, and luxury connoisseurs through intimate digital showcases, tactile macro video cinematography, and private salon invitations.',
    pillars: [
      {
        title: 'Discreet Private Client Acquisition',
        description: 'Whitelisted digital funnels reaching verified collectors and ultra-high-net-worth patrons.',
      },
      {
        title: 'Tactile Macro Cinematography',
        description: 'Micro-lens 4K captures revealing tourbillon mechanics, hand-chamfered bridges, and gemstone settings.',
      },
      {
        title: 'Private Salon & Concierge Funnels',
        description: 'Frictionless private viewings booked directly into private suites in Geneva, Dubai, and Singapore.',
      },
    ],
    deliverables: [
      'Editorial Brand Film & Macro Details',
      'Whitelisted Collector Paid Media Engine',
      'VIP Salon Lead Qualification Funnel',
      'Archival Digital Flagship Experience',
    ],
    keyMetric: '4.8x',
    keyMetricLabel: 'Average ROAS on Private Collector Allocations',
    typicalTimeline: '3 – 6 Month Strategic Retainer',
    idealFor: 'Independent Swiss Ateliers, Bespoke Jewelers, High-Complication Watchmakers',
    tags: ['Watches & Jewelry', 'Collector Funnels', 'Private Client Concierge'],
    iconName: 'watch',
  },
  {
    number: '02',
    title: 'Private Aviation & Sovereign Yacht Charters',
    categoryName: 'Aviation & Maritime',
    tagline: 'Connecting sovereign fleets to discerning charterers with zero friction.',
    description:
      'From long-range Bombardier Global fleets to 60-meter Mediterranean superyachts, we transform multi-million-dollar charter listings into fully reserved seasons.',
    overview:
      'We craft cinematic experiential content showcasing bespoke onboard culinary services, sovereign itineraries, and private cabin sanctuaries, paired with precision intent-based search and private LinkedIn and Meta funnels.',
    pillars: [
      {
        title: 'Seasonal Charter Booking Engines',
        description: 'High-intent search funnels capturing Mediterranean summer and Caribbean winter charter demand.',
      },
      {
        title: 'Cinematic Lifestyle & Interior Stills',
        description: 'Drone seascape cinematography and golden hour interior photography that capture pure escapism.',
      },
      {
        title: 'HNW Corporate Aviation Inbound',
        description: 'Direct corporate flight department outreach securing annual corporate jet block hours.',
      },
    ],
    deliverables: [
      'Cinematic Fleet Videos & Virtual Walkthroughs',
      'Charter Lead Generation System',
      'Concierge Web App & Instant Inquiry Pipeline',
      'Global HNW Paid Media Optimization',
    ],
    keyMetric: '₹42 Cr+',
    keyMetricLabel: 'Charter Booking Value Secured in 2024–2025',
    typicalTimeline: 'Annual Fleet Partnership',
    idealFor: 'Superyacht Brokers, Private Jet Charter Operators, Fractional Aviation Providers',
    tags: ['Aviation', 'Superyachts', 'HNW Charters'],
    iconName: 'plane',
  },
  {
    number: '03',
    title: 'Michelin & Fine Dining Hospitality',
    categoryName: 'Fine Dining & Culinary',
    tagline: 'Transforming tables into the city’s most coveted cultural reservations.',
    description:
      'We elevate multi-course tasting menus, omakase counters, and sensory culinary destinations from standard dining spots to cultural phenomena with perpetual waitlists.',
    overview:
      'Through sensory culinary video production, chef philosophy documentaries, and dynamic reservation calendar integrations, we ensure your dining room remains filled with high-ticket patrons.',
    pillars: [
      {
        title: 'Sensory Culinary Video Direction',
        description: 'Close-up culinary choreography capturing smoke, steam, flame, and plating artistry.',
      },
      {
        title: 'Reservation Rush Campaigns',
        description: 'Synchronized monthly table release drops that sell out monthly allocations in hours.',
      },
      {
        title: 'Tastemaker Seeding & Press Nights',
        description: 'Private preview dinners with respected culinary critics, sommelier influencers, and culture leaders.',
      },
    ],
    deliverables: [
      'Chef Origin Mini-Documentary',
      'Viral Sensory Reel Production Sprints',
      'SevenRooms / OpenTable Conversion Funnel',
      'VIP Sommelier Seeding Campaigns',
    ],
    keyMetric: '96%',
    keyMetricLabel: 'Average Monthly Table Occupancy Across Partners',
    typicalTimeline: 'Ongoing Monthly Retainer',
    idealFor: 'Michelin-Starred Restaurants, Luxury Hotel Dining, Signature Omakase Concepts',
    tags: ['Fine Dining', 'Sensory Video', 'Waitlist Engines'],
    iconName: 'utensils',
  },
  {
    number: '04',
    title: 'Architectural Penthouses & Prime Real Estate',
    categoryName: 'Prime Real Estate & Architecture',
    tagline: 'Securing nine-figure residential acquisitions before public listing.',
    description:
      'We partner with premier property developers and elite real estate advisors across Dubai, London, and Mumbai to position trophy penthouses and branded private residences.',
    overview:
      'We produce architectural films celebrating spatial proportions, curated art walls, and panoramic skyline vistas, coupled with private targeting of international buyers and capital funds.',
    pillars: [
      {
        title: 'Architectural Heritage Storytelling',
        description: 'Highlighting architectural provenance, imported marble craftsmanship, and skyline panoramas.',
      },
      {
        title: 'International Sovereign Buyer Funnels',
        description: 'Multilingual digital campaigns reaching GCC, European, and Asian high-net-worth investors.',
      },
      {
        title: 'Bespoke Private Viewings Concierge',
        description: 'Pre-qualifying prospective buyers to protect seller privacy and schedule verified VIP walk-throughs.',
      },
    ],
    deliverables: [
      'Master Architectural Film (4K Drone & Interior)',
      'High-Net-Worth Lead Funnel & Private Screening Suite',
      'VIP Hardcover Lookbook & Digital Presentation',
      'Direct Buyer Acquisition Campaign Across Meta & Search',
    ],
    keyMetric: '₹118 Cr+',
    keyMetricLabel: 'Prime Real Estate Deals Closed via Alliver Funnels',
    typicalTimeline: '4 – 8 Month Sprint',
    idealFor: 'Ultra-Luxury Developers, Trophy Penthouse Brokers, Branded Residential Enclaves',
    tags: ['Prime Real Estate', 'Penthouses', 'Sovereign Buyers'],
    iconName: 'building',
  },
  {
    number: '05',
    title: 'Haute Couture & Heritage Fashion',
    categoryName: 'High Fashion & Luxury Apparel',
    tagline: 'Bridging Parisian runway romance with rapid digital e-commerce sell-through.',
    description:
      'We translate runway drama and bespoke tailoring into high-converting digital flagships and viral social moments for independent couturiers and modern luxury ateliers.',
    overview:
      'By combining editorial campaign photography, backstage video shorts, and high-speed Shopify Plus digital flagships, we help fashion houses achieve immediate sell-out on seasonal capsule collections.',
    pillars: [
      {
        title: 'Runway-Grade Social Video',
        description: 'High-energy backstage cuts, fabric movement shorts, and model lookbook edits.',
      },
      {
        title: 'VIP Capsule Pre-Order Architecture',
        description: 'Exclusive password-protected drops generating scarcity and urgent demand.',
      },
      {
        title: 'Performance Fashion Funnel',
        description: 'Multi-tiered retargeting showing lifestyle styling inspiration to high-AOV cart abandoners.',
      },
    ],
    deliverables: [
      'Seasonal Editorial Campaign Shoot',
      'TikTok & Reels Pacing & Content Library',
      'Shopify Plus Flagship CRO Re-architecture',
      'VIP Stylist & Celebrity Gifting Pipeline',
    ],
    keyMetric: '+320%',
    keyMetricLabel: 'Online Capsule Sell-Out Velocity',
    typicalTimeline: 'Ongoing Seasonal Retainer',
    idealFor: 'Couture Designers, Luxury Ready-to-Wear, Artisanal Footwear & Accessories',
    tags: ['Couture Fashion', 'Capsule Drops', 'Lookbook Video'],
    iconName: 'sparkle',
  },
  {
    number: '06',
    title: 'Wealth Management & Multi-Family Offices',
    categoryName: 'Private Wealth & Family Offices',
    tagline: 'Building undisputed institutional authority and generational trust.',
    description:
      'We guide private wealth advisors, hedge funds, and family office syndicates to build digital authority, publish thought-leadership papers, and acquire ultra-high-net-worth relationships.',
    overview:
      'Through executive video interviews, whitepaper distribution architectures, and precision LinkedIn growth campaigns, we turn complex financial wisdom into institutional market confidence.',
    pillars: [
      {
        title: 'Executive Thought-Leadership',
        description: 'Positioning managing partners as the foremost authority in alternative assets and wealth preservation.',
      },
      {
        title: 'Curated Family Office Inbound',
        description: 'Reaching corporate founders, liquidity event recipients, and multi-family office principals.',
      },
      {
        title: 'Institutional Content Publishing',
        description: 'Quarterly macro outlooks and investment briefs delivered through bespoke digital reading experiences.',
      },
    ],
    deliverables: [
      'Executive Leadership Video Series',
      'Quarterly Investment Outlook Distribution Funnel',
      'HNW Inbound Qualification CRM Pipeline',
      'Institutional Brand & Typography Overhaul',
    ],
    keyMetric: '₹340 Cr+',
    keyMetricLabel: 'Inbound AUM Inquiries Routed to Partner Advisors',
    typicalTimeline: '12-Month Advisory Retainer',
    idealFor: 'Multi-Family Offices, Alternative Asset Managers, Boutique Private Banks',
    tags: ['Family Offices', 'Private Wealth', 'Institutional Growth'],
    iconName: 'briefcase',
  },
];

export const ClientsPage: React.FC<ClientsPageProps> = ({
  onBackToHome,
  onOpenConsultation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ClientCategoryDetail | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="pt-24 pb-20 bg-[#F5EFE6] text-[#1C1614] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between gap-4 mb-8 pt-4">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#173F35] hover:text-[#A88752] transition-colors py-1.5 px-3.5 rounded-full bg-white/70 hover:bg-white border border-[#A88752]/30 shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A88752]">
            <span>Portfolio</span>
            <span aria-hidden="true">·</span>
            <span>Client Archetypes</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#173F35] text-[#F5EFE6] text-xs font-semibold uppercase tracking-wider mb-5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#A88752]" />
            <span>Select Enterprise Archetypes</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-7xl text-[#1C1614] tracking-tight leading-[1.08] mb-6">
            Who We Partner With: Curated Industry Sectors
          </h1>

          <p className="text-lg sm:text-xl text-[#1C1614]/80 leading-relaxed font-normal max-w-3xl">
            We partner exclusively with luxury, aspirational, and high-margin enterprises where brand reputation is an existential priority and customer relationships are generational.
          </p>
        </div>

        {/* 6 Archetype Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {CLIENT_ARCHETYPES.map((cat) => (
            <div
              key={cat.number}
              onClick={() => setSelectedCategory(cat)}
              className="p-7 rounded-2xl bg-[#173F35] text-[#F5EFE6] border border-[#A88752]/25 hover:border-[#A88752] shadow-xl hover:shadow-2xl hover:shadow-[#173F35]/40 hover:-translate-y-2.5 hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-5">
                  <span className="font-editorial text-4xl text-[#A88752] font-normal tabular-nums">
                    {cat.number}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A88752] bg-black/25 px-2.5 py-1 rounded-full border border-white/10 group-hover:bg-[#A88752] group-hover:text-[#173F35] transition-colors flex items-center gap-1 shadow-sm">
                    <span>EXPLORE ARCHETYPE</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

                <h3 className="font-editorial text-2xl text-[#F5EFE6] group-hover:text-white transition-colors mb-3">
                  {cat.title}
                </h3>

                <p className="text-xs text-[#F5EFE6]/80 leading-relaxed font-light mb-6">
                  {cat.description}
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-white/15 flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold text-[#A88752]">
                    {cat.keyMetric}
                  </span>
                  <span className="text-[10px] text-[#F5EFE6]/70">
                    {cat.typicalTimeline}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {cat.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-[11px] font-medium text-[#F5EFE6]/85 bg-black/25 border border-white/15 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Qualification Standards: Who We Are For vs Not For */}
        <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#A88752]/30 shadow-xl mb-20">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#A88752] block mb-2">
              Partnership Criteria
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#1C1614] tracking-tight mb-3">
              Who Alliver Is Built For
            </h2>
            <p className="text-xs sm:text-sm text-[#1C1614]/75 font-light leading-relaxed">
              We maintain strict exclusivity caps across competitive categories in each market territory to prevent commercial conflict of interest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl bg-[#173F35]/5 border border-[#173F35]/15 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#173F35] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#173F35]" />
                <span>You are an ideal partner if:</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#1C1614]/85 font-light">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#173F35] shrink-0 mt-2" />
                  <span>You have an established brand with proven product/market fit and healthy gross margins (&gt;60%).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#173F35] shrink-0 mt-2" />
                  <span>You value creative craftsmanship and refusal to rely on cheap discounts or clickbait marketing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#173F35] shrink-0 mt-2" />
                  <span>You seek an integrated growth department rather than transactional freelance order-takers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#173F35] shrink-0 mt-2" />
                  <span>You are willing to allocate sufficient media budget and empower creative experimentation.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#540D14]/5 border border-[#540D14]/15 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#540D14] flex items-center gap-2">
                <X className="w-4 h-4 text-[#540D14]" />
                <span>We are NOT the right fit if:</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#1C1614]/85 font-light">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#540D14] shrink-0 mt-2" />
                  <span>You are a brand new dropshipping or commodity brand with unproven supply chains.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#540D14] shrink-0 mt-2" />
                  <span>You require 20 layers of internal corporate committee approvals before a single social post can go live.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#540D14] shrink-0 mt-2" />
                  <span>You view marketing as a short-term gamble rather than a compounding enterprise asset.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#540D14] shrink-0 mt-2" />
                  <span>You are unwilling to invest in professional cinema cameras, master audio, and true studio production.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#173F35] text-[#F5EFE6] border border-[#A88752]/40 text-center shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A88752] font-semibold mb-3 block">
              Inquire For Category Exclusivity
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl text-[#F5EFE6] tracking-tight leading-tight mb-4">
              Determine If Your Enterprise Qualifies
            </h2>
            <p className="text-sm sm:text-base text-[#F5EFE6]/75 font-light leading-relaxed mb-8">
              We accept only 2 new client partnerships per quarter. Connect with our directors to discuss category availability and growth projections.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() =>
                  onOpenConsultation(
                    undefined,
                    'Inquiring for Category Exclusivity & Archetype Alignment'
                  )
                }
                className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#1C1614] bg-[#A88752] hover:bg-[#c29e64] transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Schedule Confidential Briefing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onBackToHome}
                className="w-full sm:w-auto px-6 py-4 rounded-full text-xs font-semibold uppercase tracking-wider text-[#F5EFE6]/80 hover:text-white border border-white/20 hover:border-white/40 transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal Pop-Up */}
      <ClientInfoModal
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
        onBookCall={(title) => {
          setSelectedCategory(null);
          onOpenConsultation(undefined, `Inquiring as Archetype: ${title}`);
        }}
      />
    </div>
  );
};
