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
    light: string
    dark: string
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

    React.useEffect(() => {
      const root = innerRef.current;
      if (!root) return;
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

      const ctx = gsap.context(() => {
        const targets = ["[data-hero-title]", "[data-hero-desc]", "[data-hero-cta]"];
        gsap.fromTo(
          targets,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.12,
            clearProps: "all",
          }
        );
      }, root);
      return () => ctx.revert();
    }, []);

    return (
      <div className={cn("relative min-h-0 flex flex-col items-center justify-start pt-28 md:pt-32 pb-2 md:pb-4 px-0 text-center overflow-hidden bg-black text-white", className)} ref={innerRef} {...props}>
        {/* Custom background image — 100% full clarity without black overlay */}
        {bottomImage && bottomImage.light && (
          <div className="absolute inset-0 z-0 opacity-100">
            <img 
              src={bottomImage.light} 
              alt="" 
              aria-hidden
              className="w-full h-full object-cover object-center"
              onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
            />
          </div>
        )}
        
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 space-y-6 md:space-y-8">
          {/* Main Headline */}
          <h1 className="text-[31px] md:text-[52px] lg:text-[70px] font-bold tracking-tight text-white leading-[1.2]">
            <span className="block whitespace-pre-line">Vision Into Reality.{"\n"}Pixel by Pixel.</span>
            <span className="block text-white/70">{"\n"}</span>
          </h1>

          {/* Description */}
          <TextReveal
            preset="slide"
            delay={0.5}
            className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 leading-relaxed"
          >
            {typeof description === 'string' ? description : (description as any)?.props?.children || ''}
          </TextReveal>

          {/* CTA and Trust Elements */}
          <div data-hero-cta className="flex flex-col items-center gap-8">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {/* Shiny Button */}
              <ShinyButton href={ctaHref}>{ctaText}</ShinyButton>

              {/* User Avatars and Stars */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i} 
                      className="w-6 h-6 rounded-full border border-white bg-neutral-200 overflow-hidden ring-1 ring-neutral-100"
                    >
                      <img 
                        src={`https://i.pravatar.cc/100?img=${i + 10}`} 
                        alt="User" 
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-start gap-0.5">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={10} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-white/50 tracking-wide uppercase">
                    Trusted by 123+ clients
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {children && (
          <div className="relative z-10 w-full px-0 mt-2 md:mt-4 overflow-hidden">
            {children}
          </div>
        )}
      </div>
    )
  },
)
HeroSection.displayName = "HeroSection"

export { HeroSection }
