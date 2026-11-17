import React from 'react';
import { CLIENT_TESTIMONIALS } from '../data/agencyData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F5EFE6] border-b border-[#A88752]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A88752] mb-3">
            <span>Voices of Partnership</span>
            <span aria-hidden="true" className="text-[#A88752]">·</span>
            <span>Client Proof</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#1C1614] tracking-tight leading-tight mb-4">
            Trusted By Visionary Founders, Creative Directors &amp; CMOs.
          </h2>
          <p className="text-base sm:text-lg text-[#1C1614]/80 leading-relaxed font-normal">
            Real brands. Verified commercial scale. Here is what happens when runway aesthetics align with surgical performance marketing.
          </p>
        </div>

        {/* 3-Column Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CLIENT_TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-7 sm:p-8 rounded-2xl bg-white/70 border border-[#A88752]/35 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* Metric Header */}
                <div className="flex items-center justify-between border-b border-[#A88752]/20 pb-4 mb-6">
                  <span className="font-editorial text-2xl font-semibold text-[#173F35] tabular-nums">
                    {testimonial.metric}
                  </span>
                  <div className="flex text-[#A88752] gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-3 h-3 text-[#A88752]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
                      </svg>
                    ))}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#1C1614]/90 font-light leading-relaxed mb-6 italic font-editorial">
                  "{testimonial.quote}"
                </p>
              </div>

              {/* Author attribution */}
              <div className="pt-4 border-t border-[#A88752]/15">
                <h4 className="text-sm font-semibold text-[#1C1614]">
                  {testimonial.author}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-[#1C1614]/70 mt-0.5">
                  <span>{testimonial.role}</span>
                  <span aria-hidden="true">·</span>
                  <span>{testimonial.brand}</span>
                </div>
                <div className="text-[11px] text-[#A88752] mt-0.5 font-medium">
                  {testimonial.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
