import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import type { PageRoute } from '../utils/appLogic';
export type { PageRoute } from '../utils/appLogic';

interface NavbarProps {
  currentPage?: PageRoute;
  onNavigate?: (page: PageRoute) => void;
  onOpenConsultation: (servicePreset?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage = 'home',
  onNavigate,
  onOpenConsultation,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const navLinks: { label: string; page: PageRoute; href: string }[] = [
    { label: 'HOME', page: 'home', href: '#' },
    { label: 'SERVICES', page: 'services', href: '#services' },
    { label: 'INDUSTRIES', page: 'industries', href: '#industries' },
    { label: 'PROCESS', page: 'process', href: '#process' },
    { label: 'CALCULATOR', page: 'calculator', href: '#calculator' },
  ];

  const handleLinkClick = (e: React.MouseEvent, page: PageRoute) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 px-4 sm:px-6 transition-all duration-300">
      <div
        className={`max-w-6xl mx-auto rounded-full px-6 sm:px-8 py-3.5 flex items-center justify-between gap-6 transition-all duration-300 border ${
          scrolled
            ? 'bg-[#F5EFE6]/95 backdrop-blur-md border-[#A88752]/40 text-[#1C1614] shadow-lg'
            : 'bg-[#16403E]/85 backdrop-blur-md border-[#286A68]/50 text-[#F5EFE6] shadow-2xl'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate('home');
              setMobileMenuOpen(false);
            }
          }}
          aria-label="ALLIVER Marketing Studio Home"
          className="relative block h-10 sm:h-12 w-[103px] sm:w-[124px] overflow-hidden shrink-0"
        >
          <img
            src="/assets/aistudio/WhatsApp_Image_2026-11-13_at_2.12.55_PM-removebg-preview_5b9b03bc.png"
            alt="ALLIVER Marketing Studio"
            className={`absolute max-w-none w-[154.32%] h-auto -left-[29.01%] -top-[130.95%] select-none pointer-events-none ${
              scrolled
                ? '[filter:brightness(0)_saturate(100%)_invert(18%)_sepia(70%)_saturate(400%)_hue-rotate(115deg)_brightness(86%)_contrast(90%)]'
                : ''
            }`}
          />
        </a>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs font-semibold tracking-wider">
          {navLinks.map((link) => {
            const isActive = link.page === currentPage;

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.page)}
                className={`transition-colors whitespace-nowrap relative py-1 ${
                  isActive
                    ? scrolled
                      ? 'text-[#173F35] font-bold'
                      : 'text-[#F5EFE6] font-bold'
                    : scrolled
                    ? 'text-[#1C1614]/75 hover:text-[#173F35]'
                    : 'text-[#F5EFE6]/75 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${
                      scrolled ? 'bg-[#173F35]' : 'bg-[#A88752]'
                    }`}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right CTA Button (Pill button with arrow) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => onOpenConsultation()}
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all whitespace-nowrap shadow-md active:scale-[0.98] ${
              scrolled
                ? 'text-[#F5EFE6] bg-[#173F35] hover:bg-[#0F2C25]'
                : 'text-[#286A68] bg-[#F5EFE6] hover:bg-white shadow-xl'
            }`}
          >
            <span>BOOK A STRATEGY CALL</span>
            <span className="text-sm leading-none">→</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className={`sm:hidden px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full active:scale-95 transition-transform ${
              scrolled ? 'text-[#F5EFE6] bg-[#173F35]' : 'text-[#173F35] bg-[#F5EFE6]'
            }`}
          >
            Call →
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-1.5 rounded-full transition-colors ${
              scrolled ? 'text-[#1C1614]' : 'text-[#F5EFE6]'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden max-w-6xl mx-auto mt-2 bg-[#F5EFE6] border border-[#A88752]/40 rounded-2xl p-6 space-y-4 shadow-2xl animate-in fade-in duration-200">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.page)}
                className={`text-xs font-bold uppercase tracking-widest transition-colors py-2 border-b border-[#A88752]/15 flex items-center justify-between ${
                  link.page === currentPage
                    ? 'text-[#173F35] font-black'
                    : 'text-[#1C1614] hover:text-[#173F35]'
                }`}
              >
                <span>{link.label}</span>
                {link.page === currentPage && (
                  <span className="text-[10px] bg-[#173F35] text-white px-2 py-0.5 rounded-full">
                    ACTIVE
                  </span>
                )}
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#F5EFE6] bg-[#173F35] hover:bg-[#0F2C25] rounded-full transition-colors shadow-md"
          >
            <span>BOOK A STRATEGY CALL →</span>
          </button>
        </div>
      )}
    </header>
  );
};
