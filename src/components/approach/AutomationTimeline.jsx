import React from 'react';
import { useContent, useLanguage } from '../../context/LanguageContext';
import { ArrowRight, Search, GitFork, Network, CheckCircle2 } from 'lucide-react';

const STEP_ICONS = [Search, GitFork, Network, CheckCircle2];

export default function AutomationTimeline() {
  const { approachSteps } = useContent();
  const { isRTL } = useLanguage();

  return (
    <section
      id="approach"
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      aria-label={isRTL ? "المنهج: منهجية الأتمتة" : "Approach: Automation Methodology"}
    >
      {/* Header */}
      <div className="space-y-3 mb-14">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#15171A] border border-[#24272C]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97]" />
          <span className="font-mono text-[10px] sm:text-xs tracking-wider text-[#8A8F98] uppercase">
            04 / APPROACH
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#E8E6E1] font-normal leading-[1.08] tracking-normal max-w-2xl">
          {isRTL ? "لا أبدأ بالأدوات. أبدأ بالعملية." : "I Don't Start With Tools. I Start With The Process."}
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#8A8F98] max-w-2xl leading-relaxed">
          {isRTL
            ? "قبل إعداد العقد أو كتابة الأكواد، يجب تفكيك العملية اليدوية إلى مسارها الطبيعي: نقاط البداية، وتحويلات البيانات، والقرارات، والنتائج النهائية."
            : "Before configuring nodes or writing scripts, the manual process must be decomposed into its natural flow: triggers, data transformations, decisions, and outcomes."}
        </p>
      </div>

      {/* Visual Chained Workflow Timeline */}
      <div className="relative">
        
        {/* Desktop Chained Pipeline (>= 1024px) */}
        <div className="hidden lg:grid grid-cols-4 gap-4 relative">
          
          {/* Connector Line behind the steps */}
          <div
            className="absolute top-7 start-12 end-12 h-[2px] bg-[#1E2025] z-0"
            aria-hidden="true"
          >
            <div className="h-full bg-gradient-to-r from-[#3DDC97]/60 via-[#5B9DFF]/60 to-[#3DDC97]/60" />
          </div>

          {approachSteps.map((item, idx) => {
            const Icon = STEP_ICONS[idx] || CheckCircle2;
            const isLast = idx === approachSteps.length - 1;

            return (
              <div
                key={item.step}
                className="relative z-10 flex flex-col p-5 rounded-xl bg-[#121417] border border-[#24272C] hover:border-[#363A42] transition-colors"
              >
                {/* Step Node Marker */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#15171A] border border-[#24272C] flex items-center justify-center text-[#3DDC97] shadow-md">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#1A1D21] text-[#8A8F98] border border-[#24272C]">
                    STEP {item.step}
                  </span>
                </div>

                {/* Step Content */}
                <h3 className="font-serif text-lg text-[#E8E6E1] font-normal mb-2">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#8A8F98] leading-relaxed">
                  {item.description}
                </p>

                {/* Sub-label */}
                <div className="mt-4 pt-3 border-t border-[#1E2025] flex items-center justify-between text-[10px] font-mono text-[#5A606A]">
                  <span>PHASE {item.step}</span>
                  {!isLast && <ArrowRight className="w-3 h-3 text-[#3DDC97]" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tablet & Mobile Pipeline (< 1024px) */}
        <div className="lg:hidden flex flex-col space-y-4 relative">
          {/* Vertical Connector spine */}
          <div
            className="absolute top-6 bottom-6 start-6 w-[2px] bg-[#1E2025] z-0"
            aria-hidden="true"
          />

          {approachSteps.map((item, idx) => {
            const Icon = STEP_ICONS[idx] || CheckCircle2;

            return (
              <div
                key={item.step}
                className="relative z-10 flex items-start gap-4 p-4 rounded-xl bg-[#121417] border border-[#24272C] ms-1"
              >
                <div className="w-10 h-10 rounded-lg bg-[#15171A] border border-[#24272C] flex items-center justify-center text-[#3DDC97] shrink-0 shadow-md">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-[#3DDC97] font-semibold">
                      STEP {item.step}
                    </span>
                    <span className="h-2.5 w-[1px] bg-[#24272C]" />
                    <h3 className="font-serif text-base text-[#E8E6E1] font-normal">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-sans text-xs text-[#8A8F98] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
