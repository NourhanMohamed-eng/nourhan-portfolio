import React, { useEffect, useRef } from 'react';
import {
  X,
  Zap,
  Cpu,
  ArrowRight,
  Database,
  Sparkles,
  Layers,
  CheckCircle2,
  ExternalLink,
  Code,
  Send,
  Mail,
  Table,
  Bot,
  Brain,
} from 'lucide-react';

const TYPE_ICONS = {
  'Webhook Trigger': Zap,
  'Edit Fields': Cpu,
  'Telegram': Send,
  'Telegram Trigger': Send,
  'Gmail': Mail,
  'Google Sheets': Table,
  'Google Sheets Tool': Table,
  'AI Agent': Bot,
  'Chat Model': Sparkles,
  'Memory': Brain,
  'Schedule Trigger': Zap,
  'Code': Code,
};

export default function NodeInspectorPanel({
  node,
  system,
  onClose,
  onExploreCaseStudy,
}) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    // Focus close button on mount for accessibility
    closeBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!node) return null;

  const isViolet = node.type?.includes('AI') || node.type?.includes('Model') || node.type?.includes('Memory');
  const accentColor = isViolet ? '#A78BFA' : '#3DDC97';
  const IconComponent = TYPE_ICONS[node.type] || Cpu;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Node inspector: ${node.name || node.nodeName}`}
      className="fixed md:absolute inset-0 md:inset-y-0 md:start-auto md:end-0 md:w-[440px] z-50 md:z-30 flex flex-col justify-end md:justify-start"
    >
      {/* Mobile Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Inspector Container (Bottom Sheet on mobile, Side Drawer on desktop) */}
      <div
        ref={panelRef}
        className="relative w-full max-h-[85vh] md:max-h-full h-auto md:h-full bg-[#121417] md:bg-[#121417]/95 md:backdrop-blur-md border-t md:border-t-0 md:border-s border-[#24272C] rounded-t-2xl md:rounded-none flex flex-col shadow-2xl z-10 overflow-hidden"
      >
        {/* Mobile Pull Handle */}
        <div className="w-10 h-1 rounded-full bg-[#24272C] mx-auto mt-2.5 mb-1 md:hidden" />

        {/* Header Bar */}
        <div className="px-5 py-4 bg-[#15171A] border-b border-[#24272C] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-[#24272C]"
              style={{
                backgroundColor: `${accentColor}15`,
                color: accentColor,
              }}
            >
              <IconComponent className="w-4 h-4" />
            </div>

            <div className="min-w-0">
              <span className="font-mono text-[10px] text-[#8A8F98] uppercase tracking-wider block">
                {node.type || 'WORKFLOW NODE'}
              </span>
              <h3 className="font-mono text-sm font-semibold text-[#E8E6E1] truncate">
                {node.name || node.nodeName}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {node.executionCount && (
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1E2025] text-[#8A8F98] border border-[#24272C]">
                {node.executionCount}
              </span>
            )}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#8A8F98] hover:text-[#E8E6E1] hover:bg-[#1E2025] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3DDC97]"
              aria-label="Close inspector panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 text-start font-sans">
          
          {/* Subtitle / Operation Badge if available */}
          {node.subtitle && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#15171A] border border-[#24272C] font-mono text-xs text-[#8A8F98]">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
              <span>Operation: {node.subtitle}</span>
            </div>
          )}

          {/* 1. Purpose */}
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F98] block">
              01 / NODE PURPOSE
            </span>
            <p className="text-xs sm:text-sm text-[#E8E6E1] leading-relaxed bg-[#15171A] p-3 rounded-lg border border-[#24272C]">
              {node.purpose || node.role || 'Performs automated execution step within the workflow pipeline.'}
            </p>
          </div>

          {/* 2. Input Data */}
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F98] block">
              02 / INPUT CONTRACT
            </span>
            <div className="text-xs font-mono text-[#8A8F98] bg-[#0E0F11] p-3 rounded-lg border border-[#1E2025] leading-relaxed break-words">
              {node.input || 'Inbound trigger payload or upstream node execution object'}
            </div>
          </div>

          {/* 3. Processing Logic */}
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F98] block">
              03 / PROCESSING & EXECUTION
            </span>
            <p className="text-xs text-[#E8E6E1] leading-relaxed bg-[#15171A] p-3 rounded-lg border border-[#24272C]">
              {node.processing || 'Processes input fields according to node configuration parameters.'}
            </p>
          </div>

          {/* 4. Output Data */}
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F98] block">
              04 / OUTPUT PAYLOAD
            </span>
            <div className="text-xs font-mono text-[#8A8F98] bg-[#0E0F11] p-3 rounded-lg border border-[#1E2025] leading-relaxed break-words">
              {node.output || 'Standardized output schema passed downstream to subsequent branches'}
            </div>
          </div>

          {/* 5. Connections */}
          <div className="space-y-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#8A8F98] block">
              05 / CONNECTIONS & ROUTING
            </span>
            <div className="text-xs font-mono text-[#E8E6E1] bg-[#15171A] p-3 rounded-lg border border-[#24272C] flex items-start gap-2">
              <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: accentColor }} />
              <span>{node.connections || 'Connected within workflow pipeline'}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#15171A] border-t border-[#24272C] flex items-center justify-between gap-3">
          <span className="font-mono text-[10px] text-[#5A606A]">
            PRESS ESC TO CLOSE
          </span>

          {onExploreCaseStudy && system && (
            <button
              type="button"
              onClick={() => onExploreCaseStudy(system.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1E2025] hover:bg-[#282C34] text-xs font-mono text-[#3DDC97] border border-[#3DDC97]/30 hover:border-[#3DDC97] transition-all"
            >
              <span>Explore Case Study</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
