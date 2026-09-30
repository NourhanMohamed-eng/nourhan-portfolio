import React, { useState } from 'react';
import { techStack } from '../../data/content.en';
import { ArrowRight, Workflow, Bot, Network, Terminal, Globe, Check } from 'lucide-react';

const CATEGORY_ICONS = {
  'Automation': Workflow,
  'AI & LLM': Bot,
  'Integration': Network,
  'Programming': Terminal,
  'Web & Systems': Globe,
};

export default function StackSection() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section
      id="stack"
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      aria-label="Technical Stack and Connected Toolbox"
    >
      {/* Header */}
      <div className="space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#15171A] border border-[#24272C]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97]" />
          <span className="font-mono text-[10px] sm:text-xs tracking-wider text-[#8A8F98] uppercase">
            05 / TECHNICAL STACK
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl text-[#E8E6E1] font-normal leading-[1.08] tracking-normal">
          What I Build With.
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#8A8F98] max-w-2xl leading-relaxed">
          Not a wall of disconnected tools, but an integrated system of automation engines, communication protocols, AI models, and data persistence layers.
        </p>
      </div>

      {/* Connected Toolbox Chain Strip */}
      <div className="mb-12 p-4 sm:p-5 rounded-xl bg-[#121417] border border-[#24272C]">
        <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-[#8A8F98]">
          <span className="uppercase tracking-wider">CONNECTED TOOLCHAIN PIPELINE</span>
          <span className="text-[#3DDC97]">END-TO-END AUTOMATION</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 py-1">
          {techStack.toolboxChain.map((tool, idx) => {
            const isLast = idx === techStack.toolboxChain.length - 1;
            const isAi = tool.includes('AI');

            return (
              <React.Fragment key={tool}>
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                    isAi
                      ? 'bg-[#A78BFA]/10 border-[#A78BFA]/30 text-[#E8E6E1]'
                      : 'bg-[#15171A] border-[#24272C] text-[#E8E6E1]'
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: isAi ? '#A78BFA' : '#3DDC97' }}
                  />
                  <span>{tool}</span>
                </div>
                {!isLast && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#5A606A] shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Grouped Technical System Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {techStack.groups.map((group) => {
          const Icon = CATEGORY_ICONS[group.category] || Workflow;
          const isAi = group.category.includes('AI');

          return (
            <div
              key={group.category}
              className="p-5 rounded-xl bg-[#121417] border border-[#24272C] hover:border-[#363A42] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div
                    className={`w-7 h-7 rounded flex items-center justify-center shrink-0 border ${
                      isAi
                        ? 'bg-[#A78BFA]/10 text-[#A78BFA] border-[#A78BFA]/30'
                        : 'bg-[#3DDC97]/10 text-[#3DDC97] border-[#3DDC97]/30'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-mono text-xs font-semibold text-[#E8E6E1] uppercase tracking-wider">
                    {group.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => {
                    const isHovered = hoveredSkill === skill;

                    return (
                      <span
                        key={skill}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className={`font-mono text-xs px-2.5 py-1 rounded bg-[#15171A] border transition-all cursor-default ${
                          isHovered
                            ? 'border-[#3DDC97] text-[#3DDC97] shadow-sm'
                            : 'border-[#24272C] text-[#8A8F98] hover:text-[#E8E6E1]'
                        }`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#1E2025] flex items-center justify-between text-[10px] font-mono text-[#5A606A]">
                <span>{group.skills.length} TECHNOLOGIES</span>
                <span className="text-[#3DDC97]">READY</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
