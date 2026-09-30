import React, { useState } from 'react';
import { useContent, useLanguage } from '../../context/LanguageContext';
import { WORKFLOW_STRUCTURES } from '../../data/workflows';
import ExplorerCanvas from './ExplorerCanvas';
import NodeInspectorPanel from './NodeInspectorPanel';
import { ExternalLink, Layers, Terminal, Sparkles } from 'lucide-react';

export default function WorkflowExplorer({ onExploreCaseStudy }) {
  const { systems } = useContent();
  const { isRTL } = useLanguage();
  const [activeSystemId, setActiveSystemId] = useState('system-01');
  const [selectedNode, setSelectedNode] = useState(null);

  const activeSystem = systems.find((s) => s.id === activeSystemId) || systems[0];
  const activeStructure = WORKFLOW_STRUCTURES[activeSystem.id];
  const isSystem02 = activeSystem.id === 'system-02';
  const accentColor = isSystem02 ? '#A78BFA' : '#3DDC97';

  const handleTabChange = (systemId) => {
    setActiveSystemId(systemId);
    setSelectedNode(null); // Clear selected node on workflow switch
  };

  return (
    <section
      id="explorer"
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      aria-label={isRTL ? "معاينة سير العمل: عاين الأتمتة عمليًا" : "Workflow Explorer: See The Automation"}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#15171A] border border-[#24272C]">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="font-mono text-[10px] sm:text-xs tracking-wider text-[#8A8F98] uppercase">
              03 / SEE THE AUTOMATION
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#E8E6E1] font-normal leading-[1.08] tracking-normal">
            {isRTL ? "عاين الأتمتة عمليًا." : "See The Automation."}
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#8A8F98] max-w-2xl leading-relaxed">
            {isRTL
              ? "استكشف العقد الفردية وهيكل البيانات ومنطق التوجيه عبر الأنظمة الثلاثة. مرّر المؤشر فوق أي عقدة لتتبّع المسارات، وانقر لعرض مواصفاتها."
              : "Inspect individual nodes, payload schemas, and routing logic across the three systems. Hover over any node to trace connected edges; click to view its schema contract."}
          </p>
        </div>

        {/* Action Link to Full Case Study */}
        {onExploreCaseStudy && (
          <button
            type="button"
            onClick={() => onExploreCaseStudy(activeSystem.id)}
            className="self-start md:self-end inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-lg bg-[#15171A] hover:bg-[#1B1E22] border border-[#24272C] hover:border-[#3DDC97]/40 text-xs font-mono text-[#E8E6E1] transition-all group"
          >
            <span>{isRTL ? "دراسة الحالة الكاملة" : "Full Case Study"}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#3DDC97] group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* 1. Workflow Switcher Tabs */}
      <div
        role="tablist"
        aria-label={isRTL ? "اختيار سير العمل للمعاينة" : "Select workflow to inspect"}
        className="flex items-center gap-2 p-1.5 rounded-xl bg-[#121417] border border-[#24272C] mb-6 overflow-x-auto scrollbar-none max-w-full"
      >
        {systems.map((sys, idx) => {
          const isActive = sys.id === activeSystemId;
          const isSys02 = sys.id === 'system-02';
          const tabAccent = isSys02 ? '#A78BFA' : '#3DDC97';

          return (
            <button
              key={sys.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${sys.id}`}
              id={`tab-${sys.id}`}
              onClick={() => handleTabChange(sys.id)}
              className={`flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 min-h-[44px] rounded-lg text-xs font-mono transition-all duration-200 shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3DDC97] ${
                isActive
                  ? 'bg-[#1A1D21] text-[#E8E6E1] border border-[#2E333B] shadow-md'
                  : 'text-[#8A8F98] hover:text-[#E8E6E1] hover:bg-[#15171A] border border-transparent'
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full transition-transform"
                style={{
                  backgroundColor: isActive ? tabAccent : '#363A42',
                  transform: isActive ? 'scale(1.25)' : 'scale(1)',
                }}
              />
              <span className="text-[#5A606A] hidden sm:inline">0{idx + 1} /</span>
              <span>{sys.title}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Interactive Canvas Container */}
      <div
        id={`panel-${activeSystem.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeSystem.id}`}
        className="relative"
      >
        {/* Active System Description Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-t-xl bg-[#15171A] border-t border-x border-[#24272C]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-[#E8E6E1]">
              {activeSystem.title}
            </span>
            <span className="h-3 w-[1px] bg-[#24272C] hidden sm:block" />
            <span className="font-mono text-[10px] text-[#8A8F98] hidden sm:inline">
              {activeSystem.nodes?.length} NODES
              {activeStructure?.subNodes ? ` + ${activeStructure.subNodes.length} RESOURCES` : ''}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {activeSystem.tech?.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1A1D21] text-[#8A8F98] border border-[#24272C]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive Diagram Canvas with Hover & Dimming */}
        <ExplorerCanvas
          system={activeSystem}
          structure={activeStructure}
          selectedNodeId={selectedNode?.id}
          onNodeSelect={(node) => setSelectedNode(node)}
        />

        {/* 3. Node Inspector Panel (Desktop Drawer / Mobile Bottom Sheet) */}
        {selectedNode && (
          <NodeInspectorPanel
            node={selectedNode}
            system={activeSystem}
            onClose={() => setSelectedNode(null)}
            onExploreCaseStudy={onExploreCaseStudy}
          />
        )}
      </div>
    </section>
  );
}
