import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, Star, ArrowUpRight } from "lucide-react"
import { TextReveal } from "./text-reveal"
import gsap from "gsap"

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
      <div className={cn("relative min-h-screen flex flex-col items-center justify-start pt-32 pb-16 px-4 text-center overflow-hidden", className)} ref={innerRef} {...props}>
        {/* Full-screen background image */}
        {bottomImage && (
          <div className="absolute inset-0 z-0">
            <img 
              src={bottomImage.light} 
              alt="Hero Background" 
              className="w-full h-full object-cover"
            />
            {/* Removed overlay to show image clearly */}

          </div>
        )}
        
        
        <div className="relative z-10 max-w-5xl mx-auto space-y-6 md:space-y-8">
          {/* Main Headline */}
          <h1 className="text-[22px] md:text-[36px] lg:text-[48px] font-bold tracking-tight text-white leading-[1.2]">
            <span className="block">We Create Brands Beyond the Ordinary.</span>
            <span className="block text-white/70">Powered by Design, Technology & Innovation</span>
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
              {/* Ref-styled Button */}
              <a
                href={ctaHref}
                className="group relative flex items-center gap-2 bg-neutral-950 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:bg-neutral-800"
              >
                <span>{ctaText}</span>
                <div className="bg-white text-neutral-950 p-1 rounded-full transition-transform group-hover:rotate-45">
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </div>
              </a>

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
                    Trusted by 1000+ clients
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid options can be applied here if needed in the future */}

      </div>
    )
  },
)
HeroSection.displayName = "HeroSection"

export { HeroSection }
