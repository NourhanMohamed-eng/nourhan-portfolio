import React, { useState } from 'react';
import { systems } from '../../data/content.en';
import WorkflowStrip from './WorkflowStrip';

export default function SystemsSection({ onExplore }) {
  const [expandedId, setExpandedId] = useState('system-01'); // First system open by default

  const handleToggle = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="systems"
      className="py-20 sm:py-28 relative border-t border-[#1E2025]"
      aria-labelledby="systems-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-2.5 py-1 rounded bg-[#15171A] border border-[#24272C]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97]" />
              <span className="font-mono text-xs tracking-wider text-[#8A8F98] uppercase">
                01 / CASE STUDIES & ARCHITECTURES
              </span>
            </div>

            <h2
              id="systems-heading"
              className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#E8E6E1] tracking-normal leading-[1.08] font-normal"
            >
              Systems I've Built.
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#8A8F98] max-w-md italic">
            Three different problems. Three different automation architectures.
          </p>
        </div>

        {/* Vertical Case-Study List (Accordion Strips) */}
        <div className="space-y-5" role="region" aria-label="Automated Systems List">
          {systems.map((system, index) => (
            <WorkflowStrip
              key={system.id}
              system={system}
              index={index}
              isExpanded={expandedId === system.id}
              onToggle={() => handleToggle(system.id)}
              onExplore={onExplore}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
