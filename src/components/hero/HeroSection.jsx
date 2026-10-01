import React from 'react';
import { useContent, useLanguage } from '../../context/LanguageContext';
import HeroWorkflow from './HeroWorkflow';
import { ArrowDown, Play, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const { siteMeta } = useContent();
  const { isRTL } = useLanguage();

  return (
    <section
      id="hero"
      className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden"
      aria-label={isRTL ? "مقدمة" : "Introduction"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Asymmetric Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-12">
          
          <div className="max-w-3xl">
            {/* Top Mono Label */}
            <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 mb-4 px-2.5 py-1 rounded bg-[#15171A] border border-[#24272C] max-w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97] shrink-0" />
              <span className="font-mono text-[8px] sm:text-xs tracking-normal sm:tracking-wider text-[#8A8F98] uppercase">
                {siteMeta.headlineMono}
              </span>
            </div>

            {/* Editorial Serif Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#E8E6E1] tracking-normal leading-[1.08] font-normal mb-5 sm:mb-6">
              {siteMeta.headlineDisplay}
            </h1>

            {/* Supporting Copy */}
            <p className="font-sans text-sm sm:text-lg text-[#8A8F98] leading-relaxed max-w-2xl">
              {siteMeta.headlineSubtitle}
            </p>
          </div>

          {/* Side Meta Card (Editorial offset) */}
          <div className="w-full sm:w-72 p-4 rounded-lg bg-[#121417] border border-[#24272C] self-start lg:self-end">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#5A606A] mb-2">
              DISPATCH SUMMARY
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-[#8A8F98]">
                <span>ORCHESTRATION:</span>
                <span className="text-[#E8E6E1]">n8n / APIs</span>
              </div>
              <div className="flex justify-between text-[#8A8F98]">
                <span>AI MODELS:</span>
                <span className="text-[#A78BFA]">LLMs / Gemini</span>
              </div>
              <div className="flex justify-between text-[#8A8F98]">
                <span>CASE STUDIES:</span>
                <span className="text-[#3DDC97]">03 SYSTEMS</span>
              </div>
            </div>
          </div>

        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-12 sm:mb-16 max-w-md sm:max-w-none">
          <a
            href="#systems"
            className={`group inline-flex items-center justify-center gap-2.5 px-5 py-3.5 min-h-[44px] rounded bg-[#3DDC97] text-[#0E0F11] ${
              isRTL ? 'font-sans font-semibold text-sm' : 'font-mono text-xs uppercase tracking-wider font-semibold'
            } hover:bg-[#34c788] transition-all shadow-lg shadow-[#3DDC97]/15`}
          >
            <Play className="w-3.5 h-3.5 fill-current transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            <span>{siteMeta.heroCtaPrimary || "Explore the Systems"}</span>
            <ArrowDown className="w-3.5 h-3.5 ms-1" />
          </a>

          <a
            href="#contact"
            className={`inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[44px] rounded bg-[#15171A] hover:bg-[#1B1E22] text-[#E8E6E1] border border-[#24272C] hover:border-[#363A42] ${
              isRTL ? 'font-sans font-medium text-sm' : 'font-mono text-xs uppercase tracking-wider'
            } transition-all`}
          >
            <span>{siteMeta.heroCtaSecondary || "Let's Build One"}</span>
          </a>
        </div>

        {/* Miniature Live Workflow Component */}
        <div className="relative">
          <HeroWorkflow />
        </div>

      </div>
    </section>
  );
}
