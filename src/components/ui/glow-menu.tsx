"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export interface MenuItem {
  icon: LucideIcon | React.FC
  label: string
  href: string
  gradient: string
  iconColor: string
}

export interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuItem[]
  activeItem?: string
  onItemClick?: (label: string, href: string) => void
}

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
}

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const sharedTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(
  ({ className, items, activeItem, onItemClick, ...props }, ref) => {
    const { theme } = useTheme()
    const isDarkTheme = theme === "dark"

    return (
      <motion.nav
        ref={ref}
        className={cn(
          "p-1 rounded-full bg-transparent border-none shadow-none relative overflow-hidden",
          className,
        )}
        initial="initial"
        whileHover="hover"
        {...props}
      >
        <ul className="flex items-center gap-1 sm:gap-2 relative z-10">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = item.label === activeItem

            return (
              <motion.li key={item.label} className="relative">
                <button
                  onClick={() => onItemClick?.(item.label, item.href)}
                  className="block w-full text-left"
                >
                  <motion.div
                    className="block rounded-xl overflow-visible group relative"
                    style={{ perspective: "600px" }}
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 px-3.5 sm:px-4 py-2 relative z-10 bg-transparent transition-colors rounded-xl font-bold text-xs sm:text-sm tracking-wide",
                        isActive
                          ? "text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]"
                          : "text-slate-200 hover:text-white group-hover:text-white",
                      )}
                      variants={itemVariants}
                      transition={sharedTransition as any}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center bottom",
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300 shrink-0",
                          isActive ? item.iconColor : "text-white",
                          `group-hover:${item.iconColor}`,
                        )}
                      >
                        <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                      </span>
                      <span className="font-semibold">{item.label}</span>
                    </motion.div>
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 px-3.5 sm:px-4 py-2 absolute inset-0 z-10 bg-transparent transition-colors rounded-xl font-bold text-xs sm:text-sm tracking-wide",
                        isActive
                          ? "text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.5)]"
                          : "text-slate-200 hover:text-white group-hover:text-white",
                      )}
                      variants={backVariants}
                      transition={sharedTransition as any}
                      style={{
                        transformStyle: "preserve-3d",
                        transformOrigin: "center top",
                        rotateX: 90,
                      }}
                    >
                      <span
                        className={cn(
                          "transition-colors duration-300 shrink-0",
                          isActive ? item.iconColor : "text-white",
                          `group-hover:${item.iconColor}`,
                        )}
                      >
                        <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                      </span>
                      <span className="font-semibold">{item.label}</span>
                    </motion.div>
                  </motion.div>
                </button>
              </motion.li>
            )
          })}
        </ul>
      </motion.nav>
    )
  },
)

MenuBar.displayName = "MenuBar"
