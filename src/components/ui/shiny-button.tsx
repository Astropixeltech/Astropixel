"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ShinyButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className,
  href,
  onClick,
  ...props
}) => {
  const buttonEl = (
    <motion.button
      initial={{ scale: 0.96 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.94 }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 15,
      }}
      onClick={onClick}
      {...props}
      className={cn(
        "shiny-button-container relative rounded-full px-6 py-2.5 font-medium backdrop-blur-xl transition-all duration-300 ease-in-out cursor-pointer inline-flex items-center justify-center bg-neutral-950/90 text-white border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.75)] hover:border-cyan-400 overflow-hidden",
        className
      )}
    >
      {/* Background Radial Glow */}
      <span className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.35)_0%,transparent_70%)] pointer-events-none" />

      {/* Shiny Text */}
      <span
        className="shiny-button-text relative z-10 block text-sm font-semibold tracking-wide uppercase text-white"
      >
        {children}
      </span>

      {/* Shiny Border Sweep */}
      <span
        style={{
          mask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
          WebkitMask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
        className="shiny-button-border absolute inset-0 z-20 block rounded-[inherit] p-[1.5px] pointer-events-none"
      />
    </motion.button>
  );

  if (href) {
    if (href.startsWith("http") || href.startsWith("#")) {
      return (
        <a href={href} className="inline-block no-underline">
          {buttonEl}
        </a>
      );
    }
    return (
      <Link to={href} className="inline-block no-underline">
        {buttonEl}
      </Link>
    );
  }

  return buttonEl;
};

export default { ShinyButton };
