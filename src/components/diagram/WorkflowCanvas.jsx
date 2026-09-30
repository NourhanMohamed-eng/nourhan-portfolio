import React, { useState, useEffect, useRef } from 'react';
import WorkflowNode from './WorkflowNode';
import WorkflowEdge from './WorkflowEdge';
import MobileWorkflowPipeline from './MobileWorkflowPipeline';

export default function WorkflowCanvas({
  system,
  structure,
  onNodeSelect,
  selectedNodeId,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef(null);

  // Detect reduced motion preference
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  // IntersectionObserver: trigger sequential activation once upon entering viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger once only
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Step sequencer: activate nodes and edges sequentially
  useEffect(() => {
    if (!isVisible || prefersReducedMotion) {
      if (prefersReducedMotion) setActiveStep(99);
      return;
    }

    const timer = setInterval(() => {
      setActiveStep((prev) => {
        const total = (structure?.nodes?.length || 0) + (structure?.edges?.length || 0);
        if (prev < total) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 180);

    return () => clearInterval(timer);
  }, [isVisible, prefersReducedMotion, structure]);

  if (!structure) return null;

  const nodeMap = new Map();
  structure.nodes.forEach((n) => nodeMap.set(n.id, n));
  if (structure.subNodes) {
    structure.subNodes.forEach((sn) => nodeMap.set(sn.id, sn));
  }

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#0E0F11]/60 border border-[#24272C] rounded-xl p-3 sm:p-5 relative overflow-hidden"
    >
      {/* 1. Desktop Interactive SVG Canvas (md:block) */}
      <div className="hidden md:block w-full" dir="ltr">
        <svg
          viewBox={structure.viewBox || '0 0 740 280'}
          className="w-full h-auto max-h-[380px] overflow-visible"
          role="img"
          aria-label={`Architecture diagram for ${system.title}`}
        >
          <title>{`Architecture diagram for ${system.title}`}</title>
          <desc>{system.summary}</desc>
          {/* Subtle dot grid on SVG background */}
          <defs>
            <pattern
              id={`grid-${structure.id}`}
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="0.75" fill="rgba(255, 255, 255, 0.08)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#grid-${structure.id})`} rx="8" />

          {/* Regular Edges */}
          {structure.edges.map((edge, idx) => {
            const fromNode = nodeMap.get(edge.from);
            const toNode = nodeMap.get(edge.to);
            const isAnimated = prefersReducedMotion || isVisible;
            return (
              <WorkflowEdge
                key={edge.id}
                fromNode={fromNode}
                toNode={toNode}
                badge={edge.badge}
                label={edge.label}
                type={edge.type}
                animated={isAnimated}
                delay={idx * 160}
              />
            );
          })}

          {/* Sub-Attachment Edges (for AI Agent in System 02) */}
          {structure.subEdges?.map((subEdge, idx) => {
            const fromNode = nodeMap.get(subEdge.from);
            const toNode = nodeMap.get(subEdge.to);
            return (
              <WorkflowEdge
                key={subEdge.id}
                fromNode={fromNode}
                toNode={toNode}
                badge={subEdge.badge}
                type="sub-attachment"
                animated={true}
                delay={500 + idx * 120}
              />
            );
          })}

          {/* Main Nodes */}
          {structure.nodes.map((node, idx) => {
            const content = system.nodes.find((n) => n.id === node.id);
            const isHighlighted = selectedNodeId === node.id;
            const isDimmed = selectedNodeId && !isHighlighted;
            return (
              <WorkflowNode
                key={node.id}
                node={node}
                content={content}
                isActive={prefersReducedMotion || activeStep >= idx}
                isHighlighted={isHighlighted}
                isDimmed={isDimmed}
                delay={idx * 120}
                onClick={() => onNodeSelect?.(node.id)}
              />
            );
          })}

          {/* Sub-Nodes (Attachment resources: Gemini, Memory, Sheets Tool) */}
          {structure.subNodes?.map((subNode, idx) => {
            const parentNode = system.nodes.find((n) => n.id === subNode.parentId);
            const subContent = parentNode?.subConnections?.find((sc) => sc.id === subNode.id);
            const isHighlighted = selectedNodeId === subNode.id;
            const isDimmed = selectedNodeId && !isHighlighted;

            return (
              <WorkflowNode
                key={subNode.id}
                node={subNode}
                content={{
                  name: subContent?.nodeName || subNode.portName,
                  subtitle: subContent?.subtitle || subNode.subtitle,
                }}
                isActive={prefersReducedMotion || isVisible}
                isHighlighted={isHighlighted}
                isDimmed={isDimmed}
                delay={600 + idx * 120}
                onClick={() => onNodeSelect?.(subNode.id)}
              />
            );
          })}
        </svg>
      </div>

      {/* 2. Mobile Vertical Pipeline (< 768px) */}
      <div className="block md:hidden w-full">
        <MobileWorkflowPipeline system={system} structure={structure} />
      </div>

      {/* Bottom Technical Status Bar */}
      <div className="mt-3 pt-2.5 border-t border-[#1E2025] flex items-center justify-between text-[10px] font-mono text-[#5A606A]">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97]" />
          <span>STATUS: EXECUTED ✓</span>
        </div>
      </div>
    </div>
  );
}
