import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineContentProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "h1" | "h2" | "h3" | "p" | "article" | "section" | "span";
  animationNum?: number;
  customVariants?: Variants;
  timelineRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  children: React.ReactNode;
}

export const TimelineContent = React.forwardRef<HTMLElement, TimelineContentProps>(
  (
    {
      as = "div",
      animationNum = 0,
      customVariants,
      timelineRef,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const Component = motion[as] as any;

    const defaultVariants: Variants = {
      hidden: {
        filter: "blur(10px)",
        y: -20,
        opacity: 0,
      },
      visible: (i: number) => ({
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {
          delay: i * 0.15,
          duration: 0.5,
          ease: "easeOut",
        },
      }),
    };

    const variantsToUse = customVariants || defaultVariants;

    return (
      <Component
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        custom={animationNum}
        variants={variantsToUse}
        className={cn(className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

TimelineContent.displayName = "TimelineContent";
