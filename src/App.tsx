/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, PageRoute } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutAlliverSection } from './components/AboutAlliverSection';
import { WhyAlliverSection } from './components/WhyAlliverSection';
import { CorePrinciplesSection } from './components/CorePrinciplesSection';
import { BrandManifestoSection } from './components/BrandManifestoSection';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';

// Dedicated standalone pages for every section
import { ServicesPage } from './components/ServicesPage';
import { MarketingProcessPage } from './components/MarketingProcessPage';
import { IndustriesPage } from './components/IndustriesPage';
import { CalculatorPage } from './components/CalculatorPage';
import { getInitialRouteOnLoad, parseHashRoute } from './utils/appLogic';

export default function App() {
  // Always land on the home page on initial load or browser reload
  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialRouteOnLoad);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedServicePreset, setSelectedServicePreset] = useState<string | undefined>();
  const [selectedForecastSummary, setSelectedForecastSummary] = useState<string | undefined>();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    setCurrentPage(getInitialRouteOnLoad());
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const syncRouteFromLocation = () => {
      const nextRoute = parseHashRoute(window.location.hash);
      setCurrentPage(nextRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', syncRouteFromLocation);
    window.addEventListener('popstate', syncRouteFromLocation);
    return () => {
      window.removeEventListener('hashchange', syncRouteFromLocation);
      window.removeEventListener('popstate', syncRouteFromLocation);
    };
  }, []);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    if (page === 'home') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenConsultation = useCallback((serviceName?: string, forecastSummary?: string) => {
    setSelectedServicePreset(serviceName);
    setSelectedForecastSummary(forecastSummary);
    setIsConsultationOpen(true);
  }, []);

  const handleCloseConsultation = useCallback(() => {
    setIsConsultationOpen(false);
    setSelectedServicePreset(undefined);
    setSelectedForecastSummary(undefined);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5EFE6] text-[#1C1614] flex flex-col font-sans selection:bg-[#173F35] selection:text-[#F5EFE6]">
      {/* Top Navigation Bar with active page highlights */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenConsultation={() => handleOpenConsultation()}
      />

      {/* Main Page Content Flow: Conditional Page Rendering */}
      <main className="flex-grow">
        {currentPage === 'services' && (
          <ServicesPage
            onBackToHome={() => handleNavigate('home')}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentPage === 'process' && (
          <MarketingProcessPage
            onBackToHome={() => handleNavigate('home')}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentPage === 'industries' && (
          <IndustriesPage
            onBackToHome={() => handleNavigate('home')}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentPage === 'calculator' && (
          <CalculatorPage
            onBackToHome={() => handleNavigate('home')}
            onOpenConsultation={handleOpenConsultation}
          />
        )}

        {currentPage === 'home' && (
          <>
            {/* 1. Hero: Core Brand Message, Brand Positioning & Main Objective */}
            <Hero
              onOpenConsultation={() => handleOpenConsultation()}
              onExploreApproach={() => {
                const el = document.getElementById('about-alliver');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. ABOUT ALLIVER: Target Audience, 4-Part Approach, Our Goal & Our Vision */}
            <AboutAlliverSection
              onOpenConsultation={() => handleOpenConsultation()}
              onExploreProcess={() => handleNavigate('process')}
            />

            {/* 3. WHY ALLIVER WAS STARTED: Bridging Creativity & Commercial Outcomes, Our Philosophy */}
            <WhyAlliverSection
              onOpenConsultation={() => handleOpenConsultation()}
            />

            {/* 4. OUR CORE PRINCIPLES: 7 Performance Marketing Disciplines */}
            <CorePrinciplesSection
              onOpenConsultation={(preset) => handleOpenConsultation(preset)}
              onExploreServices={() => handleNavigate('services')}
            />

            {/* 5. WHAT WE BELIEVE: The Credo (Recognise, Trust, Choose) & Deep-Dive Portals */}
            <BrandManifestoSection
              onNavigate={handleNavigate}
              onOpenConsultation={() => handleOpenConsultation()}
            />
          </>
        )}
      </main>

      {/* Agency Footer with direct links to all dedicated pages */}
      <Footer
        onOpenConsultation={() => handleOpenConsultation()}
        onNavigate={handleNavigate}
      />

      {/* Interactive Discovery & Proposal Briefing Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={handleCloseConsultation}
        presetService={selectedServicePreset}
        presetSummary={selectedForecastSummary}
      />
    </div>
  );
}
