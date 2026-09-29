import React, { useEffect, useRef } from 'react';
import { X, ZoomIn, Download, ExternalLink } from 'lucide-react';

export default function Lightbox({ src, alt, title, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    // Focus close button on mount
    closeButtonRef.current?.focus();

    // Prevent body scroll when lightbox is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Handle Esc key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || 'Workflow screenshot full resolution view'}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      {/* Container to prevent backdrop click closing when clicking inside image */}
      <div
        className="relative max-w-6xl w-full max-h-[92vh] flex flex-col bg-[#121417] border border-[#24272C] rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Lightbox Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#15171A] border-b border-[#24272C]">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#3DDC97]" />
            <span className="font-mono text-xs text-[#E8E6E1] font-medium truncate">
              {title || 'Workflow Interface Screenshot'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded text-[#8A8F98] hover:text-[#E8E6E1] hover:bg-[#1E2025] transition-colors"
              title="Open raw image in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-1.5 rounded text-[#8A8F98] hover:text-[#E8E6E1] hover:bg-[#1E2025] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3DDC97]"
              aria-label="Close Lightbox"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable / Zoomable Image Canvas */}
        <div className="flex-1 overflow-auto p-2 sm:p-4 flex items-center justify-center bg-[#0E0F11]">
          <img
            src={src}
            alt={alt}
            width="1660"
            height="915"
            className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded shadow-lg"
          />
        </div>

        {/* Bottom Metadata Bar */}
        <div className="px-4 py-2 bg-[#15171A] border-t border-[#24272C] flex items-center justify-between text-[11px] font-mono text-[#5A606A]">
          <span>VERIFIED N8N CANVAS EXECUTION</span>
          <span>PRESS ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}
