import React, { useState } from 'react';
import WorkflowCanvas from '../diagram/WorkflowCanvas';
import { WORKFLOW_STRUCTURES } from '../../data/workflows';
import {
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

export default function WorkflowStrip({
  system,
  index,
  isExpanded,
  onToggle,
  onExplore,
}) {
  const structure = WORKFLOW_STRUCTURES[system.id];
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const isSystem02 = system.id === 'system-02';
  const accentColor = isSystem02 ? '#A78BFA' : '#3DDC97';

  return (
    <div
      className={`rounded-xl border transition-all duration-300 ${
        isExpanded
          ? 'bg-[#15171A] border-[#363A42] shadow-2xl'
          : 'bg-[#121417] hover:bg-[#15171A] border-[#24272C] hover:border-[#363A42]'
      }`}
    >
      {/* 1. Header / Collapsed Strip Trigger (Accessible Accordion) */}
      <button
        type="button"
        id={`strip-header-${system.id}`}
        aria-expanded={isExpanded}
        aria-controls={`strip-content-${system.id}`}
        onClick={onToggle}
        className="w-full p-4 sm:p-6 text-start flex flex-col lg:flex-row lg:items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DDC97] rounded-xl cursor-pointer select-none"
      >
        {/* Left Side: Mono Tag + Title */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span className="font-mono text-[10px] tracking-wider text-[#8A8F98] uppercase">
              {system.monoTag}
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-[#E8E6E1] font-normal leading-tight">
            {system.title}
          </h3>
        </div>

        {/* Center: Inline Mini Diagram Representation */}
        <div
          className="hidden md:flex items-center gap-1.5 py-1 px-3 rounded-lg bg-[#0E0F11]/60 border border-[#24272C] max-w-md overflow-hidden"
          dir="ltr"
        >
          {system.nodes.map((node, nIdx) => (
            <React.Fragment key={node.id}>
              <span
                className={`font-mono text-[10px] px-1.5 py-0.5 rounded truncate max-w-[110px] ${
                  nIdx === 0
                    ? 'bg-[#FF9F43]/10 text-[#FF9F43] border border-[#FF9F43]/20'
                    : isSystem02 && nIdx === 1
                    ? 'bg-[#A78BFA]/10 text-[#A78BFA] border border-[#A78BFA]/20'
                    : 'bg-[#15171A] text-[#8A8F98] border border-[#24272C]'
                }`}
              >
                {node.name}
              </span>
              {nIdx < system.nodes.length - 1 && (
                <span className="text-[#363A42] text-[10px]">→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Right Side: Tech Stack Tags & Accordion Indicator */}
        <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0">
          <div className="flex flex-wrap items-center gap-1.5">
            {system.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#121417] text-[#8A8F98] border border-[#24272C]"
              >
                {t}
              </span>
            ))}
            {system.tech.length > 3 && (
              <span className="font-mono text-[10px] text-[#5A606A]">
                +{system.tech.length - 3}
              </span>
            )}
          </div>

          <div
            className={`w-8 h-8 rounded-full bg-[#121417] border border-[#24272C] flex items-center justify-center text-[#8A8F98] transition-transform duration-300 ${
              isExpanded ? 'rotate-180 text-[#E8E6E1] bg-[#1E2025]' : ''
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </button>

      {/* 2. Expanded Content Panel */}
      {isExpanded && (
        <div
          id={`strip-content-${system.id}`}
          role="region"
          aria-labelledby={`strip-header-${system.id}`}
          className="border-t border-[#24272C] p-4 sm:p-6 lg:p-7 space-y-7 animate-fadeIn"
        >
          {/* Problem Statement Card */}
          <div className="p-4 rounded-lg bg-[#0E0F11]/80 border border-[#24272C]">
            <div className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F98] mb-1">
              THE PROBLEM TO SOLVE
            </div>
            <p className="font-sans text-sm text-[#E8E6E1] leading-relaxed">
              {system.problem}
            </p>
          </div>

          {/* Full SVG Diagram Canvas Engine */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-[#8A8F98] uppercase tracking-wider">
                ARCHITECTURE & EXECUTION MAP
              </span>
              <span className="font-mono text-[10px] text-[#5A606A]">
                HAND-BUILT SVG / PURE REACT
              </span>
            </div>
            <WorkflowCanvas
              system={system}
              structure={structure}
              selectedNodeId={selectedNodeId}
              onNodeSelect={setSelectedNodeId}
            />
          </div>

          {/* System 03 Specialized Pipeline Strip */}
          {system.pipelineStrip && (
            <div className="p-3.5 rounded-lg bg-[#0E0F11] border border-[#24272C]">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#5A606A] mb-2.5">
                DATA PIPELINE CONTINUUM
              </div>
              <div
                className="flex items-center justify-between overflow-x-auto gap-2 text-xs font-mono"
                dir="ltr"
              >
                {system.pipelineStrip.map((step, sIdx) => (
                  <React.Fragment key={step}>
                    <div className="px-2.5 py-1 rounded bg-[#15171A] border border-[#24272C] text-[#E8E6E1] shrink-0">
                      {step}
                    </div>
                    {sIdx < system.pipelineStrip.length - 1 && (
                      <span className="text-[#3DDC97] shrink-0 font-bold">→</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}

          {/* "What Happens Inside" Execution Steps */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#8A8F98] mb-3">
              WHAT HAPPENS INSIDE THE WORKFLOW
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {system.steps.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[#0E0F11]/40 border border-[#1E2025]"
                >
                  <span
                    className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#15171A] border border-[#24272C] shrink-0"
                    style={{ color: accentColor }}
                  >
                    0{sIdx + 1}
                  </span>
                  <span className="font-sans text-xs text-[#E8E6E1] leading-relaxed">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions: Explore Workflow */}
          <div className="pt-4 border-t border-[#24272C] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3DDC97]" />
              <span className="font-mono text-xs text-[#8A8F98]">
                Real verified workflow implementation from n8n
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onExplore?.(system.id)}
                className="group inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded bg-[#1F2329] hover:bg-[#3DDC97] text-[#E8E6E1] hover:text-[#0E0F11] border border-[#24272C] hover:border-[#3DDC97] font-mono text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DDC97]"
              >
                <span>Explore Workflow</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
