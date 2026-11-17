import React, { useState, useEffect, useRef } from 'react';
import { AGENCY_SERVICES } from '../data/agencyData';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

interface ServiceCardItemProps {
  service: typeof AGENCY_SERVICES[0];
  index: number;
  imgSrc: string;
  onSelectService: (serviceName: string) => void;
}

const ServiceCardItem: React.FC<ServiceCardItemProps> = ({
  service,
  index,
  imgSrc,
  onSelectService,
}) => {
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        transitionDelay: `${(index % 2) * 140}ms`,
      }}
      className={`group rounded-3xl bg-[#173F35] text-[#F5EFE6] border border-[#173F35] overflow-hidden flex flex-col sm:flex-row justify-between transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 shadow-lg hover:-translate-y-3 hover:shadow-2xl hover:border-[#A88752]/60'
          : 'opacity-0 translate-y-20 scale-[0.95] shadow-none pointer-events-none'
      }`}
    >
      {/* Left Side: Content & Tags */}
      <div className="p-7 sm:p-8 flex flex-col justify-between flex-1">
        <div>
          {/* Circle Number Badge in Antique Gold / Ivory */}
          <div className="w-9 h-9 rounded-full border border-white/40 bg-white/10 flex items-center justify-center text-xs font-semibold text-[#F5EFE6] mb-5 group-hover:bg-[#A88752] group-hover:text-[#1C1614] group-hover:border-[#A88752] transition-colors">
            {service.number}
          </div>

          <h3 className="font-editorial text-2xl sm:text-3xl text-[#F5EFE6] group-hover:text-white transition-colors leading-tight mb-3">
            {service.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#F5EFE6]/85 leading-relaxed font-light mb-6">
            {service.description}
          </p>
        </div>

        <div>
          {/* Channel / Skill Tags */}
          <div className="flex flex-wrap gap-1.5">
            {service.channels.map((chan, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#F5EFE6]/90 bg-black/25 border border-white/20 rounded-full backdrop-blur-xs"
              >
                {chan}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Split Image Card */}
      <div className="sm:w-5/12 relative min-h-[220px] sm:min-h-full overflow-hidden bg-[#173F35]">
        <img
          src={imgSrc}
          alt={service.title}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60" />
      </div>
    </div>
  );
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const serviceImages: Record<string, string> = {
    'performance-marketing': '/assets/images/hero_alliver_studio_1792864770946.jpg',
    'brand-identity': '/assets/images/work_luxury_fragrance_1792864771668.jpg',
    'video-production': '/assets/images/work_couture_fashion_1792864772210.jpg',
    'social-expansion': '/assets/images/work_hospitality_resort_1792864773212.jpg',
    'web-flagships': '/assets/images/work_gourmet_culinary_1792864773757.jpg',
    'influencer-pr': '/assets/images/work_luxury_fragrance_1792864771668.jpg',
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F5EFE6] border-b border-[#A88752]/30 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header with Scroll Jump-Up Reveal */}
        <div
          ref={headerRef}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-[#A88752]/20 transform transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            headerVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-16 scale-[0.97]'
          }`}
        >
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#A88752] mb-3">
              <span className="w-8 h-[2px] bg-[#A88752] inline-block" />
              <span>WHAT WE DO</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-6xl lg:text-7xl text-[#1C1614] tracking-tight leading-[1.08]">
              Four services. One accountable studio.
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#A88752] mb-3">
              <span>About Alliver</span>
            </div>
            <p className="font-editorial text-lg sm:text-xl lg:text-[22px] text-[#1C1614] leading-[1.38] font-normal">
              Alliver is built for businesses that are serious about growth, communicate clearly, show up consistently and grow with purpose. A seamless combination of strategy, creativity, digital innovation, and performance execution engineered to reach the right audience.
            </p>
          </div>
        </div>

        {/* 2-Column Split Service Cards with Scroll Jump-Up Stagger */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {AGENCY_SERVICES.map((service, index) => {
            const imgSrc = serviceImages[service.id] || serviceImages['performance-marketing'];

            return (
              <ServiceCardItem
                key={service.id}
                service={service}
                index={index}
                imgSrc={imgSrc}
                onSelectService={onSelectService}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
