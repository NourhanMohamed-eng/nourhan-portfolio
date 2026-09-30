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

export default function WorkflowNode({
  node,
  content,
  isActive = true,
  isHighlighted = false,
  isDimmed = false,
  delay = 0,
  onClick,
}) {
  const IconComponent = ICON_MAP[node.icon] || Zap;
  const isViolet = node.accent === 'violet';
  const isOrange = node.accent === 'orange';

  const accentBorder = isViolet
    ? 'border-[#A78BFA]'
    : isOrange
    ? 'border-[#FF9F43]'
    : 'border-[#3DDC97]';

  const accentBg = isViolet
    ? 'bg-[#A78BFA]/10 text-[#A78BFA]'
    : isOrange
    ? 'bg-[#FF9F43]/10 text-[#FF9F43]'
    : 'bg-[#3DDC97]/10 text-[#3DDC97]';

  return (
    <foreignObject
      x={node.x}
      y={node.y}
      width={node.width}
      height={node.height}
      className="overflow-visible"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        style={{
          transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
          opacity: isDimmed ? 0.35 : 1,
          transform: isActive ? 'scale(1)' : 'scale(0.92)',
        }}
        className={`group relative flex items-center gap-2.5 p-2 rounded-lg bg-[#15171A] border transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DDC97] ${
          isHighlighted
            ? `${accentBorder} shadow-lg shadow-black/40 ring-1 ${accentBorder}`
            : 'border-[#24272C] hover:border-[#363A42] hover:bg-[#1B1E22]'
        }`}
      >
        {/* Trigger Bolt Badge */}
        {node.isTrigger && (
          <div className="absolute -start-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#FF9F43] flex items-center justify-center text-[#0E0F11] shadow-sm">
            <Zap className="w-2.5 h-2.5 fill-current" />
          </div>
        )}

        {/* Node Icon Tile */}
        <div
          className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${accentBg}`}
        >
          <IconComponent className="w-3.5 h-3.5" />
        </div>

        {/* Node Labels */}
        <div className="flex-1 min-w-0 pe-1">
          <div className="font-mono text-[10px] sm:text-[11px] font-medium text-[#E8E6E1] leading-tight break-words">
            {content?.name || node.name || 'Node'}
          </div>
          <div className="font-mono text-[8px] sm:text-[9px] text-[#8A8F98] truncate mt-0.5">
            {content?.subtitle || node.subtitle || node.type || ''}
          </div>
        </div>

        {/* Status Checkmark Pill */}
        <div className="shrink-0 w-3.5 h-3.5 rounded-full bg-[#3DDC97]/15 text-[#3DDC97] flex items-center justify-center">
          <Check className="w-2.5 h-2.5 stroke-[2.5]" />
        </div>

        {/* Sub-attachment port indicators for AI Agent */}
        {node.hasSubAttachments && (
          <div className="absolute -bottom-1.5 start-0 end-0 flex justify-around px-4 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-[#24272C] border border-[#A78BFA]" title="Chat Model Port" />
            <span className="w-2 h-2 rounded-full bg-[#24272C] border border-[#A78BFA]" title="Memory Port" />
            <span className="w-2 h-2 rounded-full bg-[#24272C] border border-[#A78BFA]" title="Tool Port" />
          </div>
        )}
      </div>
    </foreignObject>
  );
}
