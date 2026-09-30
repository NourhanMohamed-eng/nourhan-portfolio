import React from 'react';
import { ArrowUp } from 'lucide-react';
import { siteMeta, navItems } from '../../data/content.en';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#24272C] bg-[#0E0F11] py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Editorial Line */}
        <div className="space-y-1 text-center md:text-start">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97]" />
            <span className="font-semibold text-[#E8E6E1] tracking-wider uppercase">
              NOURHAN MOHAMED
            </span>
          </div>
          <p className="text-[#8A8F98]">
            {siteMeta.footerTagline}
          </p>
        </div>

        {/* Anchor Links */}
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-5 text-[#8A8F98]">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="hover:text-[#E8E6E1] transition-colors py-2.5 px-1 min-h-[44px] inline-flex items-center"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Back to Top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 text-[#5A606A] hover:text-[#E8E6E1] transition-colors py-2.5 px-3 min-h-[44px] rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3DDC97]"
          aria-label="Back to top of page"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}
