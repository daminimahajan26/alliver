import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';

import { PageRoute } from './Navbar';
import { isValidEmail } from '../utils/appLogic';
import { subscribeNewsletter } from '../services/api';

interface FooterProps {
  onOpenConsultation: () => void;
  onNavigate?: (page: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenConsultation, onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubscribing) return;

    if (!isValidEmail(newsletterEmail)) {
      setNewsletterError('Please enter a valid business email address.');
      return;
    }

    setNewsletterError('');
    setIsSubscribing(true);
    try {
      await subscribeNewsletter(newsletterEmail);
      setSubscribed(true);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unable to complete your subscription right now. Please try again.';
      setNewsletterError(message);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleNavClick = (e: React.MouseEvent, page: PageRoute) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
    }
  };

  return (
    <footer className="bg-[#1C1614] text-[#F5EFE6] pt-16 pb-12 border-t border-[#A88752]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top Big Call-To-Action Banner */}
        <div className="pb-16 border-b border-white/10 flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A88752] font-semibold mb-3 block">
              Begin The Transformation
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F5EFE6] tracking-tight leading-tight">
              Ready To Command Culture &amp; Drive Measured Growth?
            </h2>
          </div>
          <div className="shrink-0">
            <button
              onClick={onOpenConsultation}
              className="flex items-center gap-2.5 px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F5EFE6] bg-[#173F35] hover:bg-[#0F2C25] rounded transition-all shadow-lg group"
            >
              <span>Schedule Discovery Briefing</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 4-Column Footer Navigation & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Col 1: Wordmark & Narrative */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-3xl font-bold tracking-tight text-[#F5EFE6]">
              <span className="font-editorial uppercase tracking-widest">ALLIVER</span>
              <svg className="w-5 h-5 text-[#A88752]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </div>
            <div className="text-xs uppercase tracking-widest text-[#A88752] font-medium">
              CREATIVE • MARKETING • GROWTH
            </div>
            <p className="text-xs sm:text-sm text-[#F5EFE6]/80 leading-relaxed font-light max-w-sm">
              A creative digital marketing agency for ambitious businesses that want to build a strong brand, attract the right audience, and turn marketing into measurable business growth. Strategy that leads to real growth.
            </p>
          </div>

          {/* Col 2: Services */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A88752] mb-4">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-[#F5EFE6]/80 font-light">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Social Media Management
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Digital Marketing
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Performance Marketing
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Branding &amp; Brand Identity
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Content Creation &amp; Graphic Designing
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  SEO &amp; Google Ranking
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Business Promotion
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleNavClick(e, 'services')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Other Services
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Industries */}
          <div className="lg:col-span-2 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A88752] mb-4">
              Industries
            </h4>
            <ul className="space-y-2 text-xs text-[#F5EFE6]/80 font-light">
              <li>
                <a
                  href="#industries"
                  onClick={(e) => handleNavClick(e, 'industries')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Food &amp; Hospitality
                </a>
              </li>
              <li>
                <a
                  href="#industries"
                  onClick={(e) => handleNavClick(e, 'industries')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Fitness &amp; Wellness
                </a>
              </li>
              <li>
                <a
                  href="#industries"
                  onClick={(e) => handleNavClick(e, 'industries')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Beauty &amp; Fashion
                </a>
              </li>
              <li>
                <a
                  href="#industries"
                  onClick={(e) => handleNavClick(e, 'industries')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Lifestyle &amp; Decor
                </a>
              </li>
              <li>
                <a
                  href="#industries"
                  onClick={(e) => handleNavClick(e, 'industries')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Startups &amp; E-Commerce
                </a>
              </li>
              <li>
                <a
                  href="#industries"
                  onClick={(e) => handleNavClick(e, 'industries')}
                  className="hover:text-white transition-colors block py-0.5"
                >
                  Real Estate &amp; Corporate
                </a>
              </li>
              <li className="pt-1">
                <a
                  href="#industries"
                  onClick={(e) => handleNavClick(e, 'industries')}
                  className="text-[#A88752] hover:text-[#d3ab6b] font-medium transition-colors block py-0.5"
                >
                  All Industries →
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter & Inquiries */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A88752] mb-4">
              Strategic Growth Dispatch
            </h4>
            <p className="text-xs text-[#F5EFE6]/70 font-light leading-relaxed">
              Curated monthly case studies on luxury marketing, creative video teardowns, and global performance trends.
            </p>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} noValidate className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterError) setNewsletterError('');
                    }}
                    placeholder="executive@company.com"
                    aria-label="Executive newsletter email"
                    className="w-full px-3 py-2 bg-white/10 rounded border border-white/20 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#A88752]"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="px-3 py-2 text-xs font-semibold uppercase tracking-wider bg-[#173F35] hover:bg-[#0F2C25] rounded transition-colors whitespace-nowrap text-[#F5EFE6] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubscribing ? 'Joining...' : 'Join'}
                  </button>
                </div>
                {newsletterError && (
                  <p className="text-[11px] text-[#C69A9D]">{newsletterError}</p>
                )}
              </form>
            ) : (
              <div className="flex items-center gap-2 p-2.5 rounded bg-white/10 border border-[#A88752]/40 text-xs text-[#A88752]">
                <Check className="w-4 h-4" />
                <span>Subscription Confirmed. Welcome.</span>
              </div>
            )}
            <div className="pt-2 text-xs text-[#F5EFE6]/60 space-y-1">
              <div>Inquiries: <a href="mailto:alliver.marketing@gmail.com" className="text-white font-mono hover:text-[#A88752] transition-colors"><span className="text-white font-mono">alliver.marketing@gmail.com</span></a></div>
              <div>Telephone: <a href="tel:+918855831596" className="text-white font-mono hover:text-[#A88752] transition-colors"><span className="text-white font-mono">+91 88558 31596</span></a></div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Quiet Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5EFE6]/50 font-light">
          <div>
            © {new Date().getFullYear()} ALLIVER Creative &amp; Performance Marketing LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Global Operations</span>
            <span aria-hidden="true">·</span>
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Engagement</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
