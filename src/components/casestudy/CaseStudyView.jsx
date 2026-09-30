import React, { useEffect, useState } from 'react';
import { useContent, useLanguage } from '../../context/LanguageContext';
import { WORKFLOW_STRUCTURES } from '../../data/workflows';
import WorkflowCanvas from '../diagram/WorkflowCanvas';
import ScreenshotFrame from '../ui/ScreenshotFrame';
import {
  ArrowLeft,
  ArrowRight,
  Layers,
  Cpu,
  Brain,
  Wrench,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Database,
  Bot,
} from 'lucide-react';

export default function CaseStudyView({ systemId, onNavigate }) {
  const { systems } = useContent();
  const { isRTL } = useLanguage();
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const system = systems.find((s) => s.id === systemId) || systems[0];
  const structure = WORKFLOW_STRUCTURES[system.id];
  const isSystem02 = system.id === 'system-02';
  const accentColor = isSystem02 ? '#A78BFA' : '#3DDC97';

  // Scroll to top upon viewing a case study
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [systemId]);

  // Current system index for Next / Previous navigation
  const currentIndex = systems.findIndex((s) => s.id === system.id);
  const prevSystem = systems[(currentIndex - 1 + systems.length) % systems.length];
  const nextSystem = systems[(currentIndex + 1) % systems.length];

  return (
    <div className="min-h-screen bg-[#0E0F11] text-[#E8E6E1] bg-canvas-dots pb-24 selection:bg-[#3DDC97]/20 selection:text-[#3DDC97]">
      {/* Skip to Content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#3DDC97] focus:text-[#0E0F11] focus:font-mono focus:text-xs focus:font-semibold focus:rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3DDC97]"
      >
        {isRTL ? "الانتقال إلى المحتوى الرئيسي" : "Skip to content"}
      </a>
      
      {/* 0. Top Navigation / Back Anchor */}
      <header className="sticky top-0 z-40 bg-[#0E0F11]/90 backdrop-blur-md border-b border-[#24272C] py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="group inline-flex items-center gap-2 text-xs font-mono text-[#8A8F98] hover:text-[#E8E6E1] transition-colors py-2 px-2.5 -ms-2.5 min-h-[44px] rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3DDC97]"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1" />
            <span>{isRTL ? "العودة إلى جميع الأنظمة" : "Back to All Systems"}</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-[#5A606A]">
            <span>{isRTL ? `نظام ${currentIndex + 1} من 3` : `SYSTEM ${currentIndex + 1} OF 3`}</span>
            <span className="hidden sm:inline">/</span>
            <span className="text-[#3DDC97] hidden sm:inline">VERIFIED N8N</span>
          </div>
        </div>
      </header>

      {/* Main Case Study Container */}
      <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-16">
        
        {/* Header Hero for Case Study */}
        <section className="space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#15171A] border border-[#24272C]">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="font-mono text-[10px] sm:text-xs tracking-wider text-[#8A8F98] uppercase">
              {system.monoTag}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#E8E6E1] font-normal leading-[1.08] tracking-normal">
            {system.title}
          </h1>

          <p className="font-sans text-base sm:text-lg text-[#8A8F98] max-w-3xl leading-relaxed">
            {system.summary}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            {system.tech.map((t) => (
              <span
                key={t}
                className="font-mono text-xs px-2.5 py-1 rounded bg-[#15171A] text-[#8A8F98] border border-[#24272C]"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* 1. Problem Section */}
        <section className="p-6 sm:p-7 rounded-xl bg-[#121417] border border-[#24272C] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8A8F98]">
            <span className="text-[#FF9F43]">01 /</span>
            <span>THE PROBLEM</span>
          </div>
          <h2 className="font-serif text-2xl text-[#E8E6E1] font-normal">
            {isRTL ? "ما المشكلة التي تطلبت حلاً؟" : "What needed to be solved?"}
          </h2>
          <p className="font-sans text-base text-[#8A8F98] leading-relaxed">
            {system.problem}
          </p>
        </section>

        {/* 2. Architecture Section (Interactive SVG Diagram) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8A8F98] mb-1">
                <span className="text-[#3DDC97]">02 /</span>
                <span>SYSTEM ARCHITECTURE</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#E8E6E1] font-normal">
                {isRTL ? "كيف تترابط العقد وتتكامل." : "How the nodes connect."}
              </h2>
            </div>
            <span className="font-mono text-xs text-[#5A606A]">
              {isRTL ? "انقر على أي عقدة للاطلاع على دورها وبياناتها" : "Click any node to inspect purpose"}
            </span>
          </div>

          <WorkflowCanvas
            system={system}
            structure={structure}
            selectedNodeId={selectedNodeId}
            onNodeSelect={setSelectedNodeId}
          />
        </section>

        {/* 3. Automation Logic Section */}
        <section className="p-6 sm:p-7 rounded-xl bg-[#121417] border border-[#24272C] space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8A8F98]">
            <span className="text-[#5B9DFF]">03 /</span>
            <span>AUTOMATION LOGIC</span>
          </div>
          <h2 className="font-serif text-2xl text-[#E8E6E1] font-normal">
            {isRTL ? "مسار التنفيذ وتوجيه البيانات." : "Execution flow and data routing."}
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#8A8F98] leading-relaxed">
            {system.automationLogic}
          </p>

          <div className="pt-3 border-t border-[#1E2025]">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#8A8F98] mb-3">
              WHAT HAPPENS INSIDE (STEP BY STEP)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {system.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[#0E0F11]/50 border border-[#1E2025]"
                >
                  <span
                    className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#15171A] border border-[#24272C] shrink-0"
                    style={{ color: accentColor }}
                  >
                    0{idx + 1}
                  </span>
                  <span className="font-sans text-xs text-[#E8E6E1] leading-relaxed">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Integrations Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8A8F98]">
            <span className="text-[#3DDC97]">04 /</span>
            <span>INTEGRATIONS & CONNECTED TOOLS</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#E8E6E1] font-normal">
            {isRTL ? "الخدمات المرتبطة التي تُشغّل سير العمل." : "Connected services solving the workflow."}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {system.integrations?.map((item) => (
              <div
                key={item.name}
                className="p-3.5 rounded-lg bg-[#15171A] border border-[#24272C] hover:border-[#363A42] transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs font-semibold text-[#E8E6E1]">
                    {item.name}
                  </span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#1E2025] text-[#8A8F98]">
                    {item.category}
                  </span>
                </div>
                <p className="font-sans text-xs text-[#8A8F98] leading-normal">
                  {item.role}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. AI Layer (ONLY FOR SYSTEM 02) */}
        {isSystem02 && system.aiLayer && (
          <section className="p-6 sm:p-7 rounded-xl bg-[#15171A] border border-[#A78BFA]/30 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A78BFA]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>05 / AI LAYER SPECIFICATION</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#E8E6E1] font-normal">
              {isRTL
                ? "وكيل LangChain ونموذج Gemini واستدعاء الأدوات الحية."
                : "LangChain Agent, Gemini, and Dynamic Tool Calling."}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-[#0E0F11] border border-[#24272C]">
                <div className="flex items-center gap-2 font-mono text-xs text-[#A78BFA] mb-2 font-medium">
                  <Bot className="w-4 h-4" />
                  <span>CHAT MODEL</span>
                </div>
                <p className="font-sans text-xs text-[#8A8F98] leading-relaxed">
                  {system.aiLayer.model}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0E0F11] border border-[#24272C]">
                <div className="flex items-center gap-2 font-mono text-xs text-[#A78BFA] mb-2 font-medium">
                  <Brain className="w-4 h-4" />
                  <span>CONVERSATION MEMORY</span>
                </div>
                <p className="font-sans text-xs text-[#8A8F98] leading-relaxed">
                  {system.aiLayer.memory}
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0E0F11] border border-[#24272C]">
                <div className="flex items-center gap-2 font-mono text-xs text-[#A78BFA] mb-2 font-medium">
                  <Database className="w-4 h-4" />
                  <span>DYNAMIC TOOL CALLING</span>
                </div>
                <p className="font-sans text-xs text-[#8A8F98] leading-relaxed">
                  {system.aiLayer.tools}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 6. My Work Section (Truthful and Modest) */}
        <section className="p-6 sm:p-7 rounded-xl bg-[#121417] border border-[#24272C] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8A8F98]">
            <span className="text-[#3DDC97]">
              {isSystem02 ? '06' : '05'} /
            </span>
            <span>MY WORK & CONTRIBUTION</span>
          </div>
          <h2 className="font-serif text-2xl text-[#E8E6E1] font-normal">
            {isRTL
              ? "ما صممته، وبنيته، وضبطته."
              : "What I designed, built, and configured."}
          </h2>
          <p className="font-sans text-base text-[#E8E6E1] leading-relaxed">
            {system.myWork}
          </p>
        </section>

        {/* 7. Result Section (Functional only, zero fake metrics) */}
        <section className="p-6 sm:p-7 rounded-xl bg-[#121417] border border-[#24272C] space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8A8F98]">
            <span className="text-[#3DDC97]">
              {isSystem02 ? '07' : '06'} /
            </span>
            <span>FUNCTIONAL RESULT</span>
          </div>
          <h2 className="font-serif text-2xl text-[#E8E6E1] font-normal">
            {isRTL ? "النتيجة التشغيلية المباشرة." : "The operational outcome."}
          </h2>
          <p className="font-sans text-base text-[#8A8F98] leading-relaxed">
            {system.result}
          </p>
        </section>

        {/* 8. Workflow Screenshot Section */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8A8F98] mb-1">
                <span className="text-[#3DDC97]">
                  {isSystem02 ? '08' : '07'} /
                </span>
                <span>WORKFLOW PROOF</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#E8E6E1] font-normal">
                {isRTL
                  ? "لقطة شاشة حقيقية لمساحة عمل n8n."
                  : "Real n8n Workspace Screenshot."}
              </h2>
            </div>
            <span className="font-mono text-xs text-[#5A606A]">
              {isRTL
                ? "انقر على المعاينة للعرض بدقة كاملة"
                : "Click preview to view in full resolution Lightbox"}
            </span>
          </div>

          <ScreenshotFrame
            src={system.screenshot}
            alt={system.screenshotAlt || `${system.title} n8n execution canvas`}
            title={system.title}
          />
        </section>

        {/* 9. Inter-System Navigation (Bottom Bar) */}
        <nav
          className="pt-12 border-t border-[#24272C] flex flex-col sm:flex-row items-center justify-between gap-4"
          aria-label={isRTL ? "التنقل بين دراسات الحالة" : "Systems Pagination"}
        >
          <button
            type="button"
            onClick={() => onNavigate(`/systems/${prevSystem.id}`)}
            className="w-full sm:w-auto p-4 rounded-lg bg-[#15171A] hover:bg-[#1B1E22] border border-[#24272C] flex items-center gap-3 text-start transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#8A8F98] rtl:rotate-180" />
            <div>
              <span className="font-mono text-[10px] text-[#5A606A] block uppercase">
                PREVIOUS WORKFLOW
              </span>
              <span className="font-serif text-base text-[#E8E6E1]">
                {prevSystem.title}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="font-mono text-xs text-[#8A8F98] hover:text-[#3DDC97] transition-colors py-2 px-3 min-h-[44px] inline-flex items-center justify-center rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3DDC97]"
          >
            <span>{isRTL ? "عرض كل الأنظمة" : "View All Systems"}</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate(`/systems/${nextSystem.id}`)}
            className="w-full sm:w-auto p-4 rounded-lg bg-[#15171A] hover:bg-[#1B1E22] border border-[#24272C] flex items-center justify-between sm:justify-end gap-3 text-end transition-all"
          >
            <div>
              <span className="font-mono text-[10px] text-[#5A606A] block uppercase">
                NEXT WORKFLOW
              </span>
              <span className="font-serif text-base text-[#E8E6E1]">
                {nextSystem.title}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#8A8F98] rtl:rotate-180" />
          </button>
        </nav>

      </main>
    </div>
  );
}
