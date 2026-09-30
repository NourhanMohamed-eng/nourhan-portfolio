import React, { useState, useEffect } from 'react';
import { siteMeta, navItems } from '../../data/content.en';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 start-0 end-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0E0F11]/90 backdrop-blur-md border-b border-[#24272C] py-3.5 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand & Subtitle */}
          <a
            href="#"
            className="group flex flex-col sm:flex-row sm:items-baseline justify-center min-h-[44px] gap-0.5 sm:gap-2.5 focus-visible:outline-none"
            aria-label="Nourhan Mohamed Home"
          >
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#E8E6E1] group-hover:text-[#3DDC97] transition-colors">
              {siteMeta.brand}
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#8A8F98] uppercase">
              / {siteMeta.subBrand}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-7" aria-label="Primary Navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="font-mono text-xs uppercase tracking-wider text-[#8A8F98] hover:text-[#E8E6E1] transition-colors py-2 px-1 min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3DDC97]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Availability Status Badge & Primary CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <div
              className="hidden lg:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#15171A] border border-[#24272C] text-[11px] font-mono text-[#8A8F98]"
              title="Current availability status"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3DDC97] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3DDC97]"></span>
              </span>
              <span className="text-[#E8E6E1]">{siteMeta.status}</span>
            </div>

            <a
              href="#contact"
              className="group inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-[44px] rounded bg-[#1F2329] hover:bg-[#3DDC97] text-[#E8E6E1] hover:text-[#0E0F11] border border-[#24272C] hover:border-[#3DDC97] text-xs font-mono transition-all duration-200"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 inline-flex items-center justify-center text-[#8A8F98] hover:text-[#E8E6E1] rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3DDC97]"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0E0F11] border-b border-[#24272C] px-6 py-6 space-y-4">
          <div className="flex items-center gap-2 pb-4 mb-2 border-b border-[#24272C]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3DDC97] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3DDC97]"></span>
            </span>
            <span className="text-xs font-mono text-[#8A8F98]">{siteMeta.status}</span>
          </div>

          <div className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm uppercase tracking-wider text-[#8A8F98] hover:text-[#3DDC97] min-h-[44px] flex items-center transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[#24272C]">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full min-h-[44px] py-3 rounded bg-[#3DDC97] text-[#0E0F11] text-xs font-mono font-medium"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
