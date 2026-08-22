import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, Star, ArrowUpRight } from "lucide-react"
import { TextReveal } from "./text-reveal"
import gsap from "gsap"
import { ShinyButton } from "@/components/ui/shiny-button"
import { Button } from "@/components/ui/button"

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

          {/* CTA Button — Particles animated button style */}
          <div data-hero-cta className="flex flex-col items-center mb-5 sm:mb-6 md:mb-8">
            <Button
              render={<a href={ctaHref} />}
              className="group not-disabled:inset-shadow-none mx-auto flex cursor-pointer items-center justify-center gap-0 rounded-full border-none bg-transparent px-0 py-2 font-normal shadow-none hover:bg-transparent [:hover,[data-pressed]]:bg-transparent"
            >
              <span className="rounded-full bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#9333EA] px-6 py-3 text-white font-semibold text-xs sm:text-sm tracking-wide duration-500 ease-in-out group-hover:bg-[#7C3AED] group-hover:text-white group-hover:transition-colors shadow-[0_6px_22px_-4px_rgba(124,58,237,0.55)]">
                {ctaText}
              </span>
              <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-gradient-to-r from-[#7C3AED] to-[#9333EA] p-3 sm:p-3.5 text-white duration-500 ease-in-out group-hover:bg-[#9333EA] group-hover:text-white group-hover:transition-colors shadow-[0_6px_22px_-4px_rgba(124,58,237,0.55)]">
                <ArrowUpRight className="absolute h-4 w-4 sm:h-5 sm:w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
                <ArrowUpRight className="absolute h-4 w-4 sm:h-5 sm:w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
              </div>
            </Button>
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
