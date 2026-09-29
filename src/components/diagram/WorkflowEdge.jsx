import React from 'react';

export default function WorkflowEdge({
  fromNode,
  toNode,
  badge,
  label,
  type = 'standard',
  animated = true,
  delay = 0,
}) {
  if (!fromNode || !toNode) return null;

  let pathD = '';
  let midX = 0;
  let midY = 0;

  if (type === 'sub-attachment') {
    // Edge comes from bottom port of parent to top port of subNode
    const x1 = fromNode.x + fromNode.width * 0.5;
    const y1 = fromNode.y + fromNode.height;
    const x2 = toNode.x + toNode.width * 0.5;
    const y2 = toNode.y;

    const cy1 = y1 + 35;
    const cy2 = y2 - 35;
    pathD = `M ${x1} ${y1} C ${x1} ${cy1}, ${x2} ${cy2}, ${x2} ${y2}`;
    midX = (x1 + x2) / 2;
    midY = (y1 + y2) / 2;
  } else {
    // Standard horizontal flow: from right port of source to left port of target
    const x1 = fromNode.x + fromNode.width;
    const y1 = fromNode.y + fromNode.height * 0.5;
    const x2 = toNode.x;
    const y2 = toNode.y + toNode.height * 0.5;

    const dx = Math.max(Math.abs(x2 - x1) * 0.5, 30);
    pathD = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
    midX = (x1 + x2) / 2;
    midY = (y1 + y2) / 2;
  }

  const isDashed = type === 'sub-attachment';
  const strokeColor = isDashed ? '#A78BFA' : '#3DDC97';

  return (
    <g className="transition-all duration-500">
      {/* Background shadow stroke */}
      <path
        d={pathD}
        fill="none"
        stroke="#1E2025"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Main Connection Edge */}
      <path
        d={pathD}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={isDashed ? '4 4' : '300'}
        strokeDashoffset={isDashed ? '0' : (animated ? '0' : '300')}
        style={{
          transition: `stroke-dashoffset 0.8s ease-out ${delay}ms`,
          opacity: isDashed ? 0.75 : 0.9,
        }}
      />

      {/* Target port circle */}
      <circle
        cx={type === 'sub-attachment' ? toNode.x + toNode.width * 0.5 : toNode.x}
        cy={type === 'sub-attachment' ? toNode.y : toNode.y + toNode.height * 0.5}
        r="3"
        fill="#15171A"
        stroke={strokeColor}
        strokeWidth="1.5"
      />

      {/* Source port circle */}
      <circle
        cx={type === 'sub-attachment' ? fromNode.x + fromNode.width * 0.5 : fromNode.x + fromNode.width}
        cy={type === 'sub-attachment' ? fromNode.y + fromNode.height : fromNode.y + fromNode.height * 0.5}
        r="3"
        fill="#15171A"
        stroke={strokeColor}
        strokeWidth="1.5"
      />

      {/* Optional Port Label (e.g. -POST-) */}
      {label && (
        <g transform={`translate(${fromNode.x + fromNode.width + 12}, ${fromNode.y + fromNode.height * 0.5})`}>
          <text
            className="font-mono text-[9px] font-semibold fill-[#8A8F98]"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {label}
          </text>
        </g>
      )}

      {/* Execution Item Count Badge (e.g. '1 item', '4 items') */}
      {badge && (
        <g transform={`translate(${midX}, ${midY - 9})`}>
          <rect
            x="-22"
            y="-7"
            width="44"
            height="14"
            rx="7"
            fill="#121417"
            stroke="#24272C"
            strokeWidth="1"
          />
          <text
            className="font-mono text-[8px] fill-[#8A8F98] select-none"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {badge}
          </text>
        </g>
      )}
    </g>
  );
}
