import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CASE_STUDIES } from '../data/agencyData';
import { CaseStudy } from '../types';
import { CaseStudyModal } from './CaseStudyModal';
import { CountDownStat } from './CountDownStat';

interface SelectedWorkSectionProps {
  onConsultationRequest: (reference?: string) => void;
}

interface ProjectDisplay {
  id: string;
  badge: string;
  title: string;
  client: string;
  category: string;
  description: string;
  metrics: { value: string; label: string }[];
  image: string;
  overlayTag: string;
  caseStudyRef: CaseStudy;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  onConsultationRequest,
}) => {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);

  // Curated list of high-impact case studies formatted to exact specifications
  const projects: ProjectDisplay[] = [
    {
      id: 'rouge-eternelle',
      badge: '01 · CASE STUDY',
      title: 'Rouge Éternelle — Global Haute Parfumerie Launch',
      client: 'Rouge Éternelle',
      category: 'Luxury & Fragrance',
      description:
        'A bespoke European perfume house entering the competitive luxury market without discounting. We engineered an evocative sensory campaign with VIP olfactory seeding to GCC tastemakers and precision algorithmic media buying.',
      metrics: [
        { value: '4.9x', label: 'Blended ROAS' },
        { value: '₹28 Cr', label: 'Direct Pipeline' },
        { value: '48hr', label: 'Sellout Velocity' },
      ],
      image: '/assets/images/work_luxury_fragrance_1792864771668.jpg',
      overlayTag: 'PARIS · DUBAI · LONDON',
      caseStudyRef: CASE_STUDIES[0],
    },
    {
      id: 'atelier-valmont',
      badge: '02 · CASE STUDY',
      title: 'Atelier Valmont — Desert Couture Capsule & Runway Scaling',
      client: 'Atelier Valmont',
      category: 'High Fashion',
      description:
        'A contemporary luxury womenswear label was struggling with low international e-commerce conversion despite strong runway acclaim. We transformed their digital storefront into an editorial lookbook experience paired with targeted Meta Performance Max campaigns.',
      metrics: [
        { value: '+320%', label: 'Online Sales' },
        { value: '1.8M', label: 'Verified Reach' },
        { value: '96%', label: 'Brand Recall' },
      ],
      image: '/assets/images/work_couture_fashion_1792864772210.jpg',
      overlayTag: 'COUTURE RUNWAY EDITION',
      caseStudyRef: CASE_STUDIES[1],
    },
    {
      id: 'the-dunes',
      badge: '03 · CASE STUDY',
      title: 'The Dunes Sanctuary — Ultra-Luxury Private Villa Acquisition',
      client: 'The Dunes Desert Reserve',
      category: 'Hospitality',
      description:
        'A secluded private desert retreat needed to bypass third-party OTAs and acquire ultra-high-net-worth guests through direct private bookings. Alliver executed a cinematic architectural video series paired with executive concierge lead funnels.',
      metrics: [
        { value: '₹118 Cr', label: 'Direct Revenue' },
        { value: '92%', label: 'Peak Occupancy' },
        { value: '14 Days', label: 'To Full Season Capacity' },
      ],
      image: '/assets/images/work_hospitality_resort_1792864773212.jpg',
      overlayTag: 'PRIVATE RESERVE VILLAS',
      caseStudyRef: CASE_STUDIES[2],
    },
    {
      id: 'maison-noir',
      badge: '04 · CASE STUDY',
      title: 'Maison Noir & Vine — Private Tasting Club Membership Scaling',
      client: 'Maison Noir Club',
      category: 'Gourmet & Dining',
      description:
        'A private artisanal chocolate and rare vintage tasting club needed to scale qualified memberships with a strict cap of 1,500 patrons. We developed an invite-only digital funnel backed by moody culinary stills and automated bespoke email nurture sequences.',
      metrics: [
        { value: '1,200+', label: 'Tasting Members' },
        { value: '88%', label: 'Member Retention' },
        { value: '3.8x', label: 'LTV Multiplier' },
      ],
      image: '/assets/images/work_gourmet_culinary_1792864773757.jpg',
      overlayTag: 'INVITE-ONLY ALLIANCE',
      caseStudyRef: CASE_STUDIES[3],
    },
  ];

  return (
    <section
      id="work"
      className="py-24 sm:py-32 lg:py-40 bg-[#F5EFE6] text-[#1C1614] border-b border-[#A88752]/30 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header (Minimal, luxury, editorial header with lots of white space) */}
        <div className="max-w-3xl mb-20 lg:mb-28">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#A88752] mb-4">
            <span className="w-8 h-[2px] bg-[#A88752] inline-block" />
            <span>SELECTED WORK &amp; CASE STUDIES</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-normal text-[#1C1614] tracking-tight leading-[1.06] mb-6">
            Proven Commercial Impact for Culturally Ambitious Brands.
          </h2>
          <p className="text-base sm:text-lg text-[#1C1614]/75 font-light leading-relaxed max-w-2xl">
            A curated selection of private client engagements across luxury, fashion, hospitality, and performance commerce. Every project is measured by compounding revenue and cultural authority.
          </p>
        </div>

        {/* Stacked Case Studies with Alternating Layout (40% / 60%) */}
        <div className="space-y-28 sm:space-y-36 lg:space-y-44">
          {projects.map((project, index) => {
            const isImageLeft = index % 2 === 1; // Alternates: 0 (Right), 1 (Left), 2 (Right), 3 (Left)

            return (
              <article
                key={project.id}
                className={`flex flex-col ${
                  isImageLeft ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } items-center gap-10 sm:gap-14 lg:gap-16 group`}
              >
                {/* Text Column (40% on Desktop) */}
                <div className="w-full lg:w-[42%] flex flex-col justify-center order-2 lg:order-none">
                  {/* Category Kicker */}
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A88752] mb-3">
                    {project.category}
                  </div>

                  {/* Large Project Title (2-4 lines) */}
                  <h3 className="font-editorial text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#1C1614] leading-[1.12] tracking-tight mb-5">
                    {project.title}
                  </h3>

                  {/* Short Project Description (2-3 sentences) */}
                  <p className="text-sm sm:text-base text-[#1C1614]/75 font-light leading-relaxed mb-7 max-w-xl">
                    {project.description}
                  </p>

                  {/* Horizontal Divider */}
                  <hr className="border-t border-[#1C1614]/15 mb-7" />

                  {/* Two or Three Large Countdown / Count-Up Statistics */}
                  <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8">
                    {project.metrics.map((metric, mIdx) => (
                      <CountDownStat
                        key={mIdx}
                        value={metric.value}
                        label={metric.label}
                      />
                    ))}
                  </div>

                  {/* CTA at Bottom: "View Project →" (Hover arrow slides right) */}
                  <div>
                    <button
                      onClick={() => setSelectedCaseStudy(project.caseStudyRef)}
                      className="group/cta inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[#1C1614] hover:text-[#173F35] transition-colors py-2"
                    >
                      <span>View Project</span>
                      <span className="text-sm transition-transform duration-300 group-hover/cta:translate-x-2">
                        →
                      </span>
                    </button>
                  </div>
                </div>

                {/* Image Column (60% on Desktop) */}
                <div className="w-full lg:w-[58%] order-1 lg:order-none">
                  <div
                    onClick={() => setSelectedCaseStudy(project.caseStudyRef)}
                    className="relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/10] bg-[#1C1614] shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-[#1C1614]/10"
                  >
                    {/* Large Hero Image with Hover Zoom */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center filter brightness-[0.94] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* Subtle Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent pointer-events-none" />

                    {/* Floating Capsule Badge in Top-Left */}
                    <div className="absolute top-5 left-5 z-10 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-[#1C1614] shadow-md border border-white/60">
                      {project.badge}
                    </div>

                    {/* Subtle Text Overlay in Bottom-Right */}
                    <div className="absolute bottom-5 right-5 z-10 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-semibold uppercase tracking-widest text-[#F8F8F6] border border-white/15">
                      {project.overlayTag}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Interactive Case Study Detail Modal */}
      {selectedCaseStudy && (
        <CaseStudyModal
          caseStudy={selectedCaseStudy}
          onClose={() => setSelectedCaseStudy(null)}
          onConsultationRequest={(client) => {
            setSelectedCaseStudy(null);
            onConsultationRequest(client);
          }}
        />
      )}
    </section>
  );
};
