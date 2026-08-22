import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, Star, ArrowUpRight } from "lucide-react"
import { TextReveal } from "./text-reveal"
import gsap from "gsap"
import { ShinyButton } from "@/components/ui/shiny-button"

interface HeroSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: {
    regular: string
    gradient: string
  }
  description?: React.ReactNode
  ctaText?: string
  ctaHref?: string
  bottomImage?: {
    light: string | { src: string }
    dark: string | { src: string }
  }
  gridOptions?: {
    angle?: number
    cellSize?: number
    opacity?: number
    lightLineColor?: string
    darkLineColor?: string
  }
}

const HeroSection = React.forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    {
      children,
      className,
      title = "Build products for everyone",
      subtitle = {
        regular: "Designing your projects faster with ",
        gradient: "the largest figma UI kit.",
      },
      description = "Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae.",
      ctaText = "Browse courses",
      ctaHref = "#",
      bottomImage,
      gridOptions,
      ...props
    },
    ref,
  ) => {
    const innerRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

    return (
      <div className={cn("relative min-h-0 lg:min-h-[82vh] flex flex-col items-center justify-start pt-24 sm:pt-28 lg:pt-32 pb-4 sm:pb-6 px-0 text-center overflow-hidden bg-black text-white", className)} id="site-hero" ref={innerRef} {...props}>
        {/* Custom background image — 100% full clarity without black overlay */}
        {bottomImage && bottomImage.light && (
          <div className="absolute inset-0 z-0 opacity-100">
            <img 
              src={typeof bottomImage.light === 'string' ? bottomImage.light : (bottomImage.light as any)?.src || '/hero-bg-custom.webp'} 
              alt="AstroPixel Agency Creative Design Showcase Hero Background" 
              width={1920}
              height={1080}
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover object-center"
              onError={(e) => { (e.target as HTMLImageElement).src = "/hero-bg-custom.webp"; }}
            />
          </div>
        )}
        
        {/* Main Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col items-center">
          {/* Main Headline */}
          <h1 className="text-[32px] sm:text-[48px] md:text-[62px] lg:text-[74px] xl:text-[80px] font-bold tracking-tight text-white leading-[1.08] mb-2.5 md:mb-3.5">
            <span className="block">Vision Into <span className="font-serif italic font-normal text-white">Reality.</span></span>
            <span className="block"><span className="font-serif italic font-normal text-white">Pixel</span> by Pixel.</span>
          </h1>

          {/* Description — Rendered instantly */}
          <p
            className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-white/80 font-roboto leading-relaxed tracking-wide mb-5 sm:mb-6 md:mb-7"
            style={{ fontFamily: "'Roboto', sans-serif" }}
          >
            {typeof description === 'string' ? description : (description as any)?.props?.children || ''}
          </p>

          {/* CTA Button — Squarish Vibe matching Let's Connect button */}
          <div data-hero-cta className="flex flex-col items-center mb-5 sm:mb-6 md:mb-8">
            <a
              href={ctaHref}
              className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#9333EA] text-white px-6 py-2.5 sm:px-7 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 shadow-[0_6px_22px_-4px_rgba(124,58,237,0.55)] hover:shadow-[0_10px_28px_rgba(168,85,247,0.8)] hover:scale-[1.02] active:scale-[0.98] border border-white/30 hover:border-white/50 overflow-hidden cursor-pointer"
            >
              {/* Top-right glossy flare overlay */}
              <div aria-hidden className="absolute top-0 right-0 w-10 h-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.45),transparent_70%)] pointer-events-none rounded-tr-xl" />

              <span className="relative z-10 font-semibold tracking-wide">{ctaText}</span>
              <ArrowUpRight size={16} strokeWidth={2.5} className="relative z-10 text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Marquee Carousel at bottom with compact, natural spacing */}
        {children && (
          <div className="relative z-10 w-full px-0 mt-2 sm:mt-4 md:mt-6 overflow-hidden">
            {children}
          </div>
        )}
      </div>
    )
  },
)
HeroSection.displayName = "HeroSection"

export { HeroSection }
