"use client";

import React from "react";

interface ButtonProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export default function Example({
  text,
  href,
  onClick,
  className = "",
  children,
}: ButtonProps) {
  const content = children || text || "Click Me";

  return (
    <>
      <style>{`
        @keyframes rotate {
          100% {
            transform: rotate(1turn);
          }
        }
    
        .rainbow::before {
          content: '';
          position: absolute;
          z-index: -2;
          left: -50%;
          top: -50%;
          width: 200%;
          height: 200%;
          background-position: 100% 50%;
          background-repeat: no-repeat;
          background-size: 50% 30%;
          filter: blur(6px);
          background-image: linear-gradient(#FFF);
          animation: rotate 4s linear infinite;
        }
      `}</style>
      <div className={`rainbow relative z-0 bg-white/20 overflow-hidden p-0.5 inline-flex items-center justify-center rounded-xl hover:scale-105 transition duration-300 active:scale-100 shadow-[0_4px_18px_-2px_rgba(124,58,237,0.5)] ${className}`}>
        {href ? (
          <a
            href={href}
            className="group relative px-4 py-2 sm:px-4.5 sm:py-2 text-xs sm:text-sm text-white rounded-[10px] font-semibold bg-gradient-to-r from-[#2E1065] via-[#3B0764] to-[#581C87] hover:from-[#3B0764] hover:to-[#6B21A8] backdrop-blur flex items-center justify-center gap-1.5 whitespace-nowrap overflow-hidden border border-white/20"
          >
            {/* Glossy top-right flare */}
            <div aria-hidden className="absolute top-0 right-0 w-6 h-6 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.35),transparent_70%)] pointer-events-none rounded-tr-[10px]" />
            {content}
          </a>
        ) : (
          <button
            onClick={onClick}
            className="group relative px-4 py-2 sm:px-4.5 sm:py-2 text-xs sm:text-sm text-white rounded-[10px] font-semibold bg-gradient-to-r from-[#2E1065] via-[#3B0764] to-[#581C87] hover:from-[#3B0764] hover:to-[#6B21A8] backdrop-blur flex items-center justify-center gap-1.5 whitespace-nowrap overflow-hidden border border-white/20"
          >
            {/* Glossy top-right flare */}
            <div aria-hidden className="absolute top-0 right-0 w-6 h-6 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.35),transparent_70%)] pointer-events-none rounded-tr-[10px]" />
            {content}
          </button>
        )}
      </div>
    </>
  );
}

export { Example as RainbowButton };
