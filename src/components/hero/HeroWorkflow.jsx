import React, { useState, useEffect, useRef } from 'react';
import { heroWorkflow } from '../../data/content.en';
import {
  Zap,
  Cpu,
  Sparkles,
  GitBranch,
  Send,
  Check,
} from 'lucide-react';

const NODE_ICONS = {
  input: Zap,
  process: Cpu,
  ai: Sparkles,
  decision: GitBranch,
  action: Send,
};

const ACCENT_COLORS = {
  orange: {
    border: 'border-[#FF9F43]',
    bg: 'bg-[#FF9F43]/10',
    text: 'text-[#FF9F43]',
    dot: 'bg-[#FF9F43]',
    glow: 'rgba(255, 159, 67, 0.25)',
  },
  blue: {
    border: 'border-[#5B9DFF]',
    bg: 'bg-[#5B9DFF]/10',
    text: 'text-[#5B9DFF]',
    dot: 'bg-[#5B9DFF]',
    glow: 'rgba(91, 157, 255, 0.25)',
  },
  violet: {
    border: 'border-[#A78BFA]',
    bg: 'bg-[#A78BFA]/10',
    text: 'text-[#A78BFA]',
    dot: 'bg-[#A78BFA]',
    glow: 'rgba(167, 139, 250, 0.25)',
  },
  green: {
    border: 'border-[#3DDC97]',
    bg: 'bg-[#3DDC97]/10',
    text: 'text-[#3DDC97]',
    dot: 'bg-[#3DDC97]',
    glow: 'rgba(61, 220, 151, 0.25)',
  },
};

export default function HeroWorkflow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Detect reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Sequential execution loop
  useEffect(() => {
    if (prefersReducedMotion || isPaused) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % (heroWorkflow.nodes.length + 1));
    }, 950);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, isPaused]);

  return (
    <div
      ref={containerRef}
      dir="ltr"
      className="w-full bg-[#121417] border border-[#24272C] rounded-xl p-4 sm:p-6 lg:p-7 relative overflow-hidden shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Interactive automation workflow demonstration"
    >
      {/* Top Console Bar */}
      <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-[#1E2025] gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#3DDC97] animate-pulse shrink-0" />
          <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#8A8F98] uppercase truncate">
            LIVE SYSTEM PIPELINE
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-[10px] text-[#5A606A] uppercase hidden sm:inline">
            STATUS:
          </span>
          <span className="font-mono text-[9px] sm:text-[10px] text-[#3DDC97] px-2 py-0.5 rounded bg-[#3DDC97]/10 border border-[#3DDC97]/20 whitespace-nowrap">
            {prefersReducedMotion || activeStep === heroWorkflow.nodes.length ? 'EXECUTED ✓' : 'PROCESSING...'}
          </span>
        </div>
      </div>

      {/* Desktop Horizontal Workflow */}
      <div className="hidden md:flex items-center justify-between relative py-4">
        {heroWorkflow.nodes.map((node, index) => {
          const Icon = NODE_ICONS[node.id] || Zap;
          const color = ACCENT_COLORS[node.accent] || ACCENT_COLORS.green;
          const isExecuted = prefersReducedMotion || activeStep >= index;
          const isCurrent = !prefersReducedMotion && activeStep === index;

          return (
            <React.Fragment key={node.id}>
              {/* Node Card */}
              <div
                className={`relative flex flex-col items-start p-3.5 rounded-lg border transition-all duration-300 min-w-[130px] lg:min-w-[150px] ${
                  isCurrent
                    ? `${color.border} ${color.bg} shadow-lg scale-105`
                    : isExecuted
                    ? 'border-[#363A42] bg-[#15171A]'
                    : 'border-[#1E2025] bg-[#101214] opacity-50'
                }`}
              >
                {/* Ports */}
                {index > 0 && (
                  <span className="absolute -start-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#24272C] border border-[#363A42]" />
                )}
                {index < heroWorkflow.nodes.length - 1 && (
                  <span className="absolute -end-1.5 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#24272C] border border-[#363A42]" />
                )}

                {/* Node Header */}
                <div className="flex items-center justify-between w-full mb-2">
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center ${color.bg} ${color.text}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {isExecuted && (
                    <span className="text-[#3DDC97] bg-[#3DDC97]/10 p-0.5 rounded-full">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>

                {/* Node Title & Subtitle */}
                <span className="font-mono text-xs font-semibold text-[#E8E6E1] tracking-wider">
                  {node.label}
                </span>
                <span className="font-mono text-[10px] text-[#8A8F98] mt-0.5 truncate w-full">
                  {node.sub}
                </span>
              </div>

              {/* Connecting Edge Connector with Pulse */}
              {index < heroWorkflow.nodes.length - 1 && (
                <div className="flex-1 relative h-6 flex items-center justify-center px-1">
                  <div className="w-full h-[2px] bg-[#1E2025] relative overflow-hidden">
                    {/* Animated Data Packet */}
                    {(!prefersReducedMotion && activeStep > index) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#3DDC97] to-transparent animate-pulse" />
                    )}
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile Vertical Workflow Pipeline */}
      <div className="flex md:hidden flex-col space-y-3">
        {heroWorkflow.nodes.map((node, index) => {
          const Icon = NODE_ICONS[node.id] || Zap;
          const color = ACCENT_COLORS[node.accent] || ACCENT_COLORS.green;
          const isExecuted = prefersReducedMotion || activeStep >= index;
          const isCurrent = !prefersReducedMotion && activeStep === index;

          return (
            <div key={node.id} className="relative">
              <div
                className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
                  isCurrent
                    ? `${color.border} ${color.bg}`
                    : isExecuted
                    ? 'border-[#363A42] bg-[#15171A]'
                    : 'border-[#1E2025] bg-[#101214] opacity-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded flex items-center justify-center ${color.bg} ${color.text}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-mono text-xs font-semibold text-[#E8E6E1]">
                      {node.label}
                    </div>
                    <div className="font-mono text-[10px] text-[#8A8F98]">
                      {node.sub}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-[#5A606A] uppercase">
                    STAGE 0{index + 1}
                  </span>
                  {isExecuted && (
                    <span className="text-[#3DDC97]">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>

              {/* Connecting line between stacked nodes */}
              {index < heroWorkflow.nodes.length - 1 && (
                <div className="h-2.5 w-[2px] bg-[#24272C] ms-6 my-0.5" />
              )}
            </div>
          );
        })}
      </div>

      {/* Interactive Micro Affordance */}
      <div className="mt-4 pt-3 border-t border-[#1E2025] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 text-[9px] sm:text-[10px] font-mono text-[#5A606A]">
        <span>AUTONOMOUS EXECUTION LOOP</span>
        <span>HOVER TO INSPECT STATE</span>
      </div>
    </div>
  );
}
