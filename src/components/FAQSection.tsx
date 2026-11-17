import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQ_ITEMS } from '../data/agencyData';

interface FAQSectionProps {
  onAskQuestion: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onAskQuestion }) => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#F5EFE6] border-b border-[#A88752]/30 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#A88752] mb-3">
            <HelpCircle className="w-4 h-4 text-[#A88752]" />
            <span>Clarity &amp; Governance</span>
            <span aria-hidden="true" className="text-[#A88752]">·</span>
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl text-[#1C1614] tracking-tight leading-tight mb-4">
            Everything You Need To Know Before Partnering With Alliver.
          </h2>
          <p className="text-sm sm:text-base text-[#1C1614]/75 font-normal">
            Transparent communication, contractual clarity, and institutional operating standards.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-xl border border-[#A88752]/35 bg-white/70 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-editorial text-lg sm:text-xl text-[#1C1614] font-medium">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#173F35] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm text-[#1C1614]/80 leading-relaxed font-light border-t border-[#A88752]/15 pt-4 animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions prompt */}
        <div className="mt-12 text-center p-6 rounded-xl bg-white/40 border border-[#A88752]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-sm font-semibold text-[#1C1614] block">
              Have a tailored requirement or enterprise RFP?
            </span>
            <span className="text-xs text-[#1C1614]/70">
              Our managing partners review proposals within 24 hours.
            </span>
          </div>
          <button
            onClick={onAskQuestion}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F5EFE6] bg-[#173F35] hover:bg-[#0F2C25] rounded transition-colors whitespace-nowrap shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Inquiry</span>
          </button>
        </div>
      </div>
    </section>
  );
};
