import React, { lazy, Suspense } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import ExecutionLine from './components/layout/ExecutionLine';
import HeroSection from './components/hero/HeroSection';
import SystemsSection from './components/systems/SystemsSection';

import AutomationTimeline from './components/approach/AutomationTimeline';
import StackSection from './components/stack/StackSection';
import AboutSection from './components/about/AboutSection';
import ContactSection from './components/contact/ContactSection';
import Footer from './components/layout/Footer';

const CaseStudyView = lazy(() => import('./components/casestudy/CaseStudyView'));
const WorkflowExplorer = lazy(() => import('./components/explorer/WorkflowExplorer'));

function CaseStudySkeleton() {
  return (
    <div className="min-h-screen bg-[#0E0F11] text-[#E8E6E1] p-8 max-w-5xl mx-auto space-y-8 animate-pulse">
      <div className="h-6 w-32 bg-[#1E2025] rounded" />
      <div className="h-12 w-2/3 bg-[#15171A] rounded" />
      <div className="h-64 bg-[#121417] rounded-xl border border-[#24272C]" />
    </div>
  );
}

function ExplorerSkeleton() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-6 animate-pulse">
      <div className="h-6 w-40 bg-[#1E2025] rounded" />
      <div className="h-10 w-72 bg-[#15171A] rounded" />
      <div className="h-80 bg-[#121417] rounded-xl border border-[#24272C]" />
    </div>
  );
}

function MainPortfolio() {
  const { lang, isCaseStudy, activeSystemId, navigate } = useLanguage();

  if (isCaseStudy && activeSystemId) {
    return (
      <Suspense fallback={<CaseStudySkeleton />}>
        <CaseStudyView systemId={activeSystemId} onNavigate={navigate} />
      </Suspense>
    );
  }

  // Route: / or /ar (Main Home Page)
  return (
    <div className="min-h-screen bg-[#0E0F11] text-[#E8E6E1] bg-canvas-dots relative selection:bg-[#3DDC97]/20 selection:text-[#3DDC97]">
      {/* Skip to Content Link for Keyboard Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#3DDC97] focus:text-[#0E0F11] focus:font-mono focus:text-xs focus:font-semibold focus:rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3DDC97]"
      >
        {lang === 'ar' ? 'الانتقال إلى المحتوى الرئيسي' : 'Skip to content'}
      </a>

      {/* Dynamic execution line along the margin */}
      <ExecutionLine />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="relative z-10">
        <HeroSection />
        <SystemsSection onExplore={(id) => navigate(`/systems/${id}`)} />
        <Suspense fallback={<ExplorerSkeleton />}>
          <WorkflowExplorer onExploreCaseStudy={(id) => navigate(`/systems/${id}`)} />
        </Suspense>
        <AutomationTimeline />
        <StackSection />
        <AboutSection />
        <ContactSection />
      </main>

      {/* Site Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainPortfolio />
    </LanguageProvider>
  );
}
