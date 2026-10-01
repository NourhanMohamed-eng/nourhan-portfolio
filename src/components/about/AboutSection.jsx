import React from 'react';
import { useContent, useLanguage } from '../../context/LanguageContext';
import { GraduationCap, Award, ShieldCheck, Cog } from 'lucide-react';

const FACT_ICONS = [GraduationCap, Award, ShieldCheck, Cog];

export default function AboutSection() {
  const { aboutMe } = useContent();
  const { isRTL } = useLanguage();

  return (
    <section
      id="about"
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      aria-label={isRTL ? "نبذة عن نورهان محمد" : "About Nourhan Mohamed"}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Title & Bio */}
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#15171A] border border-[#24272C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97]" />
            <span className="font-mono text-[10px] sm:text-xs tracking-wider text-[#8A8F98] uppercase">
              {aboutMe.label}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#E8E6E1] font-normal leading-[1.08] tracking-normal">
            {aboutMe.title}.
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#8A8F98] leading-relaxed pt-2">
            {aboutMe.bio}
          </p>

          <div className="pt-2">
            <span className="font-mono text-xs text-[#5A606A]">
              PRACTICAL AUTOMATION • WORKFLOW DESIGN
            </span>
          </div>
        </div>

        {/* Right Column: Grounded Academic & Practical Facts */}
        <div className="lg:col-span-6 space-y-3">
          <div className="p-1 rounded-xl bg-[#121417] border border-[#24272C] space-y-2">
            {aboutMe.facts.map((fact, idx) => {
              const Icon = FACT_ICONS[idx] || Award;

              return (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 p-3.5 rounded-lg bg-[#15171A] border border-[#1E2025] hover:border-[#363A42] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#121417] border border-[#24272C] flex items-center justify-center text-[#3DDC97] shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`${isRTL ? 'font-sans' : 'font-mono'} text-xs sm:text-sm text-[#E8E6E1] leading-relaxed`}>
                    {fact}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
