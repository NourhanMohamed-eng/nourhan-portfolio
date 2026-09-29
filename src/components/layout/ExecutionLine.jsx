import React, { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: '00 / INIT' },
  { id: 'systems', label: '01 / SYSTEMS' },
  { id: 'explorer', label: '02 / EXPLORER' },
  { id: 'approach', label: '03 / APPROACH' },
  { id: 'stack', label: '04 / STACK' },
  { id: 'about', label: '05 / ABOUT' },
  { id: 'contact', label: '06 / EXECUTE' },
];

export default function ExecutionLine() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
        setScrollProgress(progress);
      }

      // Check current section
      const sectionElements = SECTIONS.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));

      const scrollPos = window.scrollY + 250;
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPos) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      className="hidden xl:flex fixed start-8 top-0 bottom-0 z-30 flex-col items-center pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Top anchor */}
      <div className="pt-28 pb-4 flex flex-col items-center">
        <span className="font-mono text-[9px] uppercase tracking-widest text-[#5A606A] writing-mode-vertical">
          RUN LOG
        </span>
      </div>

      {/* Vertical Spine Line */}
      <div className="relative w-[1px] flex-1 bg-[#1E2025]">
        {/* Animated illuminated progress indicator */}
        <div
          className="absolute top-0 start-0 w-[2px] -ms-[0.5px] bg-gradient-to-b from-[#3DDC97] via-[#5B9DFF] to-[#A78BFA] transition-all duration-150"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Bottom anchor status */}
      <div className="pb-8 pt-4">
        <div className="w-1.5 h-1.5 rounded-full bg-[#3DDC97] animate-ping" />
      </div>
    </aside>
  );
}
