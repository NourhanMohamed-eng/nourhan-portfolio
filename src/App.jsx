import React from 'react';
import Navbar from './components/layout/Navbar';
import ExecutionLine from './components/layout/ExecutionLine';
import HeroSection from './components/hero/HeroSection';

import SystemsSection from './components/systems/SystemsSection';

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
        <SystemsSection />
        <div id="contact" className="h-4" />
      </main>
    </div>
  );
}
