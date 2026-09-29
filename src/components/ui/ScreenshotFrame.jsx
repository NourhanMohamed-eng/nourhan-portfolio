import React, { useState, Suspense, lazy } from 'react';
import { ZoomIn, Check, Maximize2 } from 'lucide-react';

const Lightbox = lazy(() => import('./Lightbox'));

export default function ScreenshotFrame({
  src,
  alt,
  title,
  subtitle = 'n8n Canvas Execution',
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-[#121417] border border-[#24272C] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-[#363A42]">
        
        {/* Frame Top Header (Browser / Workspace bar) */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#15171A] border-b border-[#24272C] select-none">
          {/* Left: Window Dots & Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#24272C] border border-[#363A42]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#24272C] border border-[#363A42]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#24272C] border border-[#363A42]" />
            </div>

            <div className="h-3 w-[1px] bg-[#24272C]" />

            <div className="flex items-center gap-2 font-mono text-xs text-[#8A8F98]">
              <span className="text-[#5A606A]">Personal /</span>
              <span className="text-[#E8E6E1] font-medium truncate max-w-[200px] sm:max-w-none">
                {title}
              </span>
            </div>
          </div>

          {/* Right: Zoom trigger affordance */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1B1E22] hover:bg-[#24272C] text-[#8A8F98] hover:text-[#E8E6E1] border border-[#24272C] text-[11px] font-mono transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3DDC97]"
            title="Click to view full uncropped resolution in Lightbox"
          >
            <ZoomIn className="w-3.5 h-3.5 text-[#3DDC97]" />
            <span className="hidden sm:inline">Expand Canvas</span>
          </button>
        </div>

        {/* Image Preview with Hover Affordance */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setLightboxOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setLightboxOpen(true);
            }
          }}
          className="group relative cursor-zoom-in overflow-hidden bg-[#0E0F11] aspect-[1660/915] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3DDC97]"
          title="Click to zoom and view full resolution"
        >
          <img
            src={src}
            alt={alt}
            width="1660"
            height="915"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#15171A]/90 backdrop-blur-sm border border-[#3DDC97]/40 text-[#E8E6E1] font-mono text-xs shadow-xl">
              <Maximize2 className="w-4 h-4 text-[#3DDC97]" />
              <span>Click to open full-resolution Lightbox</span>
            </div>
          </div>
        </div>

        {/* Frame Footer */}
        <div className="px-4 py-2.5 bg-[#15171A] border-t border-[#24272C] flex items-center justify-between text-[11px] font-mono text-[#5A606A]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3DDC97]" />
            <span>REAL N8N WORKSPACE CAPTURE</span>
          </div>
          <span>RESOLUTION: 1660 × 915px</span>
        </div>
      </div>

      {/* Lazy Lightbox Modal */}
      {lightboxOpen && (
        <Suspense fallback={null}>
          <Lightbox
            src={src}
            alt={alt}
            title={title}
            onClose={() => setLightboxOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
}
