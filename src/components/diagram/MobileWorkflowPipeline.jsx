import React from 'react';
import {
  Webhook,
  FileEdit,
  Send,
  Mail,
  Table,
  Bot,
  Sparkles,
  Database,
  Clock,
  Code,
  Zap,
  Check,
  CornerDownRight,
} from 'lucide-react';

const ICON_MAP = {
  Webhook,
  FileEdit,
  Send,
  Mail,
  Table,
  Bot,
  Sparkles,
  Database,
  Clock,
  Code,
  Zap,
};

export default function MobileWorkflowPipeline({ system, structure }) {
  if (!system) return null;

  const nodes = system.nodes || [];
  const rootNodes = nodes.filter((_, idx) => idx < 2); // First stage(s)
  const branchNodes = nodes.filter((_, idx) => idx >= 2); // Subsequent branches

  return (
    <div className="flex flex-col space-y-3 py-2" dir="ltr">
      
      {/* 1. Root Sequential Nodes */}
      {rootNodes.map((node, idx) => {
        const struct = structure?.nodes?.find((n) => n.id === node.id);
        const Icon = ICON_MAP[struct?.icon] || Zap;
        const isViolet = struct?.accent === 'violet';
        const isOrange = struct?.accent === 'orange';

        const colorClasses = isViolet
          ? 'bg-[#A78BFA]/10 text-[#A78BFA] border-[#A78BFA]/30'
          : isOrange
          ? 'bg-[#FF9F43]/10 text-[#FF9F43] border-[#FF9F43]/30'
          : 'bg-[#3DDC97]/10 text-[#3DDC97] border-[#3DDC97]/30';

        return (
          <React.Fragment key={node.id}>
            <div className="flex items-center justify-between p-3 rounded-lg bg-[#15171A] border border-[#24272C]">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-8 h-8 rounded flex items-center justify-center shrink-0 border ${colorClasses}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-xs font-medium text-[#E8E6E1] truncate">
                    {node.name}
                  </div>
                  <div className="font-mono text-[10px] text-[#8A8F98] truncate">
                    {node.subtitle || node.type}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ms-2">
                {node.executionCount && (
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#121417] border border-[#24272C] text-[#8A8F98]">
                    {node.executionCount}
                  </span>
                )}
                <span className="w-4 h-4 rounded-full bg-[#3DDC97]/15 text-[#3DDC97] flex items-center justify-center">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                </span>
              </div>
            </div>

            {/* Sub-connections for AI Agent (System 02) */}
            {node.subConnections && (
              <div className="ms-4 ps-4 border-s-2 border-dashed border-[#A78BFA]/40 space-y-2 my-1">
                <div className="font-mono text-[9px] uppercase tracking-wider text-[#A78BFA]">
                  Connected Resources:
                </div>
                {node.subConnections.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex items-center justify-between p-2 rounded bg-[#121417] border border-[#24272C] text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
                      <div className="min-w-0">
                        <span className="font-mono text-[10px] text-[#8A8F98] block">
                          {sub.portName}:
                        </span>
                        <span className="font-mono text-xs text-[#E8E6E1] truncate block">
                          {sub.nodeName}
                        </span>
                      </div>
                    </div>
                    {sub.badgeCount && (
                      <span className="font-mono text-[9px] text-[#A78BFA] px-1.5 py-0.5 rounded bg-[#A78BFA]/10 shrink-0">
                        {sub.badgeCount}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Vertical connector line */}
            <div className="h-3 w-[2px] bg-[#24272C] ms-7" />
          </React.Fragment>
        );
      })}

      {/* 2. Parallel / Terminal Branches */}
      {branchNodes.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#8A8F98] font-mono text-[10px] ms-2 mb-1">
            <CornerDownRight className="w-3.5 h-3.5 text-[#3DDC97]" />
            <span>DISPATCH BRANCHES ({branchNodes.length}):</span>
          </div>

          <div className="ms-3 ps-3 border-s-2 border-[#3DDC97]/40 space-y-2.5">
            {branchNodes.map((node) => {
              const struct = structure?.nodes?.find((n) => n.id === node.id);
              const Icon = ICON_MAP[struct?.icon] || Zap;

              return (
                <div
                  key={node.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#15171A] border border-[#24272C]"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded flex items-center justify-center shrink-0 bg-[#5B9DFF]/10 text-[#5B9DFF] border border-[#5B9DFF]/20">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-xs font-medium text-[#E8E6E1] truncate">
                        {node.name}
                      </div>
                      <div className="font-mono text-[9px] text-[#8A8F98] truncate">
                        {node.subtitle || node.type}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 ms-2">
                    {node.executionCount && (
                      <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-[#121417] border border-[#24272C] text-[#8A8F98]">
                        {node.executionCount}
                      </span>
                    )}
                    <span className="w-3.5 h-3.5 rounded-full bg-[#3DDC97]/15 text-[#3DDC97] flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
