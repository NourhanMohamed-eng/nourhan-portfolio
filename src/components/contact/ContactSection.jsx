import React from 'react';
import { contactInfo } from '../../data/content.en';
import { Mail, ArrowUpRight, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      aria-label="Contact and Inquiries"
    >
      <div className="p-8 sm:p-12 rounded-2xl bg-[#121417] border border-[#24272C] shadow-2xl relative overflow-hidden">
        
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#8A8F98 0.75px, transparent 0.75px)',
            backgroundSize: '16px 16px',
          }}
        />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#15171A] border border-[#24272C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97]" />
            <span className="font-mono text-[10px] sm:text-xs tracking-wider text-[#8A8F98] uppercase">
              {contactInfo.label}
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-[#E8E6E1] font-normal leading-[1.08] tracking-normal">
            {contactInfo.title}
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#8A8F98] leading-relaxed pt-1">
            {contactInfo.description}
          </p>

          {/* Primary Action Affordances */}
          <div className="pt-6 flex flex-col sm:flex-row sm:items-center gap-3">
            
            {/* Primary 1: Mailto Action */}
            <a
              href={contactInfo.mailtoHref}
              aria-label="Send an email to Nourhan Mohamed to start a conversation"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#3DDC97] hover:bg-[#4AE3A2] text-[#0E0F11] font-mono text-sm font-semibold transition-all duration-200 shadow-lg shadow-[#3DDC97]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DDC97] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0F11]"
            >
              <Mail className="w-4 h-4 stroke-[2.5]" />
              <span>{contactInfo.ctaText}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            {/* Primary 2: LinkedIn */}
            <a
              href={contactInfo.primaryLinks[0].href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={contactInfo.primaryLinks[0].ariaLabel}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#15171A] hover:bg-[#1B1E22] border border-[#24272C] hover:border-[#363A42] text-[#E8E6E1] font-mono text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3DDC97]"
            >
              <span>{contactInfo.primaryLinks[0].name}</span>
              <ArrowUpRight className="w-4 h-4 text-[#8A8F98]" />
            </a>

            {/* Primary 3: Khamsat */}
            <a
              href={contactInfo.primaryLinks[1].href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={contactInfo.primaryLinks[1].ariaLabel}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-[#15171A] hover:bg-[#1B1E22] border border-[#24272C] hover:border-[#363A42] text-[#E8E6E1] font-mono text-sm transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3DDC97]"
            >
              <span>{contactInfo.primaryLinks[1].name}</span>
              <ArrowUpRight className="w-4 h-4 text-[#8A8F98]" />
            </a>
          </div>

          {/* Email address display (shown as visible text once only) */}
          <div className="pt-2">
            <span className="font-mono text-xs text-[#8A8F98]">
              Direct inbox: <span className="text-[#E8E6E1]">{contactInfo.email}</span>
            </span>
          </div>

          {/* Secondary Links: Plain small text, no logos or badges */}
          <div className="pt-6 border-t border-[#1E2025] flex flex-wrap items-center gap-4 text-xs font-mono">
            <span className="text-[#8A8F98] uppercase tracking-wider text-[10px]">
              Other Profiles:
            </span>

            {contactInfo.secondaryLinks.map((item) => {
              if (item.isActive && item.href) {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.ariaLabel}
                    className="text-[#8A8F98] hover:text-[#E8E6E1] transition-colors underline-offset-4 hover:underline py-2.5 px-1 min-h-[44px] inline-flex items-center"
                  >
                    {item.name}
                  </a>
                );
              }

              // Disabled link (Mostaql under review)
              return (
                <span
                  key={item.name}
                  aria-disabled="true"
                  className="text-[#4A4E57] cursor-not-allowed select-none inline-flex items-center gap-1 py-2.5 px-1 min-h-[44px]"
                  title={item.ariaLabel}
                >
                  <span>{item.name}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-[#1A1D21] text-[#6A707C] border border-[#24272C]">
                      {item.badge}
                    </span>
                  )}
                </span>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
