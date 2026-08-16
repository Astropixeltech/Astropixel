"use client";

import React from "react";
import { motion, type AnimationProps } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const animationProps: AnimationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

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
  const buttonContent = (
    <motion.button
      {...animationProps}
      {...props}
      onClick={onClick}
      className={cn(
        "relative rounded-full px-6 py-2.5 font-medium backdrop-blur-xl transition-all duration-300 ease-in-out cursor-pointer inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-600 text-white shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:shadow-[0_0_35px_rgba(6,182,212,0.85)] border border-cyan-300/40 hover:border-cyan-200 overflow-hidden",
        className
      )}
    >
      <span
        className="relative block size-full text-sm font-semibold tracking-wide uppercase text-white drop-shadow-sm"
        style={{
          maskImage:
            "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
          WebkitMaskImage:
            "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          WebkitMask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,rgba(255,255,255,0.3)_calc(var(--x)+20%),rgba(255,255,255,0.95)_calc(var(--x)+25%),rgba(255,255,255,0.3)_calc(var(--x)+100%))] p-px pointer-events-none"
      ></span>
    </motion.button>
  );

  if (href) {
    if (href.startsWith("http") || href.startsWith("#")) {
      return (
        <a href={href} className="inline-block no-underline">
          {buttonContent}
        </a>
      );
    }
    return (
      <Link to={href} className="inline-block no-underline">
        {buttonContent}
      </Link>
    );
  }

  return buttonContent;
};

export default { ShinyButton };
