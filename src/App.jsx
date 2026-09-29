import React from 'react';
import Navbar from './components/layout/Navbar';
import ExecutionLine from './components/layout/ExecutionLine';
import HeroSection from './components/hero/HeroSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0E0F11] text-[#E8E6E1] bg-canvas-dots relative selection:bg-[#3DDC97]/20 selection:text-[#3DDC97]">
      {/* Dynamic execution line along the margin */}
      <ExecutionLine />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10">
        <HeroSection />

        {/* Phase 1 placeholder target for smooth navigation */}
        <section id="systems" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          <div className="border-t border-[#1E2025] pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono text-xs text-[#5A606A]">
            <span className="truncate">SYSTEMS SECTION — READY FOR PHASE 2</span>
            <span className="shrink-0">01 / SYSTEMS</span>
          </div>
        </section>

        <div id="contact" className="h-4" />
      </main>
    </div>
  );
}
