import React, { useState, useMemo, useRef, useEffect } from 'react';
import WorkflowNode from '../diagram/WorkflowNode';
import WorkflowEdge from '../diagram/WorkflowEdge';
import MobileWorkflowPipeline from '../diagram/MobileWorkflowPipeline';

export default function ExplorerCanvas({
  system,
  structure,
  selectedNodeId,
  onNodeSelect,
}) {
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const containerRef = useRef(null);

  // Calculate connected nodes & edges when a node is hovered
  const { connectedNodeIds, connectedEdgeIds } = useMemo(() => {
    if (!hoveredNodeId) {
      return { connectedNodeIds: null, connectedEdgeIds: null };
    }

    const nodeIds = new Set([hoveredNodeId]);
    const edgeIds = new Set();

    // Check standard edges
    structure.edges.forEach((edge) => {
      if (edge.from === hoveredNodeId) {
        nodeIds.add(edge.to);
        edgeIds.add(edge.id);
      } else if (edge.to === hoveredNodeId) {
        nodeIds.add(edge.from);
        edgeIds.add(edge.id);
      }
    });

    // Check subNodes (for System 02 AI Agent)
    if (structure.subNodes) {
      structure.subNodes.forEach((sub) => {
        if (hoveredNodeId === sub.parentId) {
          nodeIds.add(sub.id);
          edgeIds.add(`sub-edge-${sub.id}`);
        } else if (hoveredNodeId === sub.id) {
          nodeIds.add(sub.parentId);
          edgeIds.add(`sub-edge-${sub.id}`);
        }
      });
    }

    return { connectedNodeIds: nodeIds, connectedEdgeIds: edgeIds };
  }, [hoveredNodeId, structure]);

  // Find hovered node object for tooltip
  const hoveredNode = useMemo(() => {
    if (!hoveredNodeId) return null;
    const standardNode = system.nodes.find((n) => n.id === hoveredNodeId);
    if (standardNode) return standardNode;

    // Search in subConnections
    for (const n of system.nodes) {
      if (n.subConnections) {
        const sub = n.subConnections.find((sc) => sc.id === hoveredNodeId);
        if (sub) return sub;
      }
    }
    return null;
  }, [hoveredNodeId, system]);

  // Find position for floating tooltip
  const tooltipCoords = useMemo(() => {
    if (!hoveredNodeId) return null;
    const nodeGeom =
      structure.nodes.find((n) => n.id === hoveredNodeId) ||
      structure.subNodes?.find((n) => n.id === hoveredNodeId);

    if (!nodeGeom) return null;

    return {
      x: nodeGeom.x + nodeGeom.width * 0.5,
      y: Math.max(nodeGeom.y - 14, 20),
    };
  }, [hoveredNodeId, structure]);

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-xl bg-[#121417] border border-[#24272C] p-3 sm:p-6 overflow-hidden transition-all duration-300"
    >
      {/* Visual Canvas Grid Background */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#8A8F98 0.75px, transparent 0.75px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* Screen Reader Ordered List */}
      <div className="sr-only">
        <h4>{system.title} Automation Execution Graph</h4>
        <ol>
          {system.nodes.map((node, index) => (
            <li key={node.id}>
              Step {index + 1}: {node.name} ({node.type}) - {node.purpose}
            </li>
          ))}
        </ol>
      </div>

      {/* Floating Role Tooltip on Hover */}
      {hoveredNode && tooltipCoords && (
        <div
          className="absolute z-20 pointer-events-none transition-all duration-150 transform -translate-x-1/2 -translate-y-full mb-2 hidden md:block"
          style={{
            left: `${(tooltipCoords.x / (structure.viewBox.split(' ')[2] || 900)) * 100}%`,
            top: `${(tooltipCoords.y / (structure.viewBox.split(' ')[3] || 300)) * 100}%`,
          }}
        >
          <div className="px-3 py-1.5 rounded-md bg-[#15171A]/95 backdrop-blur-md border border-[#3DDC97]/40 text-[#E8E6E1] text-[11px] font-mono shadow-xl max-w-xs whitespace-normal">
            <div className="flex items-center gap-1.5 text-[#3DDC97] font-semibold text-[9px] uppercase tracking-wider mb-0.5">
              <span>{hoveredNode.type || 'NODE'}</span>
            </div>
            <p className="text-[#8A8F98] text-[10px] leading-tight">
              {hoveredNode.role || hoveredNode.purpose}
            </p>
          </div>
        </div>
      )}

      {/* 1. Desktop SVG Canvas Engine (>= 768px) */}
      <div className="hidden md:block w-full overflow-x-auto py-2">
        <svg
          viewBox={structure.viewBox}
          className="w-full h-auto min-w-[760px] max-w-full select-none"
        >
          <defs>
            <filter id="explorer-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Edges */}
          {structure.edges.map((edge) => {
            const fromNode = structure.nodes.find((n) => n.id === edge.from);
            const toNode = structure.nodes.find((n) => n.id === edge.to);

            const isEdgeHighlighted = connectedEdgeIds?.has(edge.id);
            const isEdgeDimmed = connectedEdgeIds && !isEdgeHighlighted;

            return (
              <g
                key={edge.id}
                style={{
                  opacity: isEdgeDimmed ? 0.15 : 1,
                  transition: 'opacity 0.25s ease-out',
                }}
              >
                <WorkflowEdge
                  fromNode={fromNode}
                  toNode={toNode}
                  badge={edge.badge}
                  label={edge.label}
                  type={edge.type}
                  animated={true}
                  delay={0}
                />
              </g>
            );
          })}

          {/* Sub-Attachment Edges (for System 02 AI Agent) */}
          {structure.subNodes?.map((subNode) => {
            const parentNode = structure.nodes.find((n) => n.id === subNode.parentId);
            const edgeId = `sub-edge-${subNode.id}`;
            const isHighlighted = connectedEdgeIds?.has(edgeId);
            const isDimmed = connectedEdgeIds && !isHighlighted;

            return (
              <g
                key={edgeId}
                style={{
                  opacity: isDimmed ? 0.15 : 1,
                  transition: 'opacity 0.25s ease-out',
                }}
              >
                <WorkflowEdge
                  fromNode={parentNode}
                  toNode={subNode}
                  badge={subNode.badge}
                  type="sub-attachment"
                  animated={true}
                  delay={0}
                />
              </g>
            );
          })}

          {/* Standard Pipeline Nodes */}
          {structure.nodes.map((node) => {
            const content = system.nodes.find((n) => n.id === node.id);
            const isHighlighted =
              selectedNodeId === node.id || connectedNodeIds?.has(node.id);
            const isDimmed = connectedNodeIds && !connectedNodeIds.has(node.id);

            return (
              <g
                key={node.id}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                <WorkflowNode
                  node={node}
                  content={content}
                  isActive={true}
                  isHighlighted={isHighlighted}
                  isDimmed={isDimmed}
                  delay={0}
                  onClick={() => onNodeSelect?.(content || node)}
                />
              </g>
            );
          })}

          {/* Sub-Nodes (Attachment resources: Gemini, Memory, Sheets Tool) */}
          {structure.subNodes?.map((subNode) => {
            const parentNode = system.nodes.find((n) => n.id === subNode.parentId);
            const subContent = parentNode?.subConnections?.find((sc) => sc.id === subNode.id);
            const isHighlighted =
              selectedNodeId === subNode.id || connectedNodeIds?.has(subNode.id);
            const isDimmed = connectedNodeIds && !connectedNodeIds.has(subNode.id);

            return (
              <g
                key={subNode.id}
                onMouseEnter={() => setHoveredNodeId(subNode.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
              >
                <WorkflowNode
                  node={subNode}
                  content={{
                    name: subContent?.nodeName || subNode.portName,
                    subtitle: subContent?.subtitle || subNode.subtitle,
                  }}
                  isActive={true}
                  isHighlighted={isHighlighted}
                  isDimmed={isDimmed}
                  delay={0}
                  onClick={() => onNodeSelect?.(subContent || subNode)}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* 2. Mobile Vertical Pipeline (< 768px) */}
      <div className="block md:hidden w-full">
        <MobileWorkflowPipeline
          system={system}
          structure={structure}
          onSelectNode={(node) => onNodeSelect?.(node)}
        />
      </div>

      {/* Canvas Interaction Hint Footer */}
      <div className="mt-3 pt-2.5 border-t border-[#1E2025] flex items-center justify-between text-[10px] font-mono text-[#5A606A]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97]" />
          <span>STATUS: EXECUTED ✓</span>
        </div>

        <span className="text-[#8A8F98]">
          <span className="hidden sm:inline">HOVER TO TRACE • </span>CLICK TO INSPECT NODE
        </span>
      </div>
    </div>
  );
}
