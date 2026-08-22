"use client";

import React from "react";

interface RainbowButtonProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export default function RainbowButton({
  text,
  href,
  onClick,
  className = "",
  children,
}: RainbowButtonProps) {
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
      <div className={`rainbow relative z-0 bg-white/15 overflow-hidden p-0.5 flex items-center justify-center rounded-full hover:scale-105 transition duration-300 active:scale-100 ${className}`}>
        {href ? (
          <a
            href={href}
            className="px-8 text-sm sm:text-base py-3 text-white rounded-full font-medium bg-gray-900/90 backdrop-blur flex items-center justify-center gap-2"
          >
            {content}
          </a>
        ) : (
          <button
            onClick={onClick}
            className="px-8 text-sm sm:text-base py-3 text-white rounded-full font-medium bg-gray-900/90 backdrop-blur flex items-center justify-center gap-2"
          >
            {content}
          </button>
        )}
      </div>
    </>
  );
}

export { RainbowButton };
