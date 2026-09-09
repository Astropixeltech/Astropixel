'use client';

import React, { ComponentProps } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// --- Vector Company Logos ---
const Logo01 = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 160 40" fill="currentColor" {...props}>
    <rect x="6" y="10" width="20" height="20" rx="6" fill="currentColor" fillOpacity="0.15" />
    <path d="M12 15h8v2h-8zm0 5h8v2h-8zm0 5h5v2h-5z" fill="currentColor" />
    <text x="36" y="25" fontSize="15" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.05em">TECHCORP</text>
  </svg>
);

const Logo02 = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 160 40" fill="currentColor" {...props}>
    <circle cx="16" cy="20" r="10" fill="currentColor" fillOpacity="0.15" />
    <circle cx="16" cy="20" r="4" fill="currentColor" />
    <text x="36" y="25" fontSize="15" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.05em">InsightTech</text>
  </svg>
);

const Logo03 = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 160 40" fill="currentColor" {...props}>
    <polygon points="16,8 26,26 6,26" fill="currentColor" fillOpacity="0.15" />
    <polygon points="16,14 22,25 10,25" fill="currentColor" />
    <text x="36" y="25" fontSize="15" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.05em">DesignPro</text>
  </svg>
);

const Logo04 = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 160 40" fill="currentColor" {...props}>
    <rect x="8" y="12" width="16" height="16" rx="4" transform="rotate(45 16 20)" fill="currentColor" fillOpacity="0.15" />
    <circle cx="16" cy="20" r="3" fill="currentColor" />
    <text x="36" y="25" fontSize="15" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.05em">BrandBoost</text>
  </svg>
);

const Logo05 = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 170 40" fill="currentColor" {...props}>
    <path d="M8 12l8-4 8 4v16l-8 4-8-4V12z" fill="currentColor" fillOpacity="0.15" />
    <path d="M16 12v16M8 16l8 4 8-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <text x="36" y="25" fontSize="14" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.05em">CodeCrafters</text>
  </svg>
);

const Logo06 = (props: ComponentProps<'svg'>) => (
  <svg viewBox="0 0 160 40" fill="currentColor" {...props}>
    <rect x="6" y="10" width="20" height="20" rx="10" fill="currentColor" fillOpacity="0.15" />
    <path d="M12 14l8 12M20 14l-8 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <text x="36" y="25" fontSize="15" fontWeight="700" fontFamily="sans-serif" letterSpacing="0.05em">InnovateX</text>
  </svg>
);

const TwitterLogo = (props: ComponentProps<'svg'>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>X</title>
    <path
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      fill="currentColor"
    />
  </svg>
);

const TESTIMONIALS = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    company: "TechCorp",
    testimonial:
      "This team completely transformed the way we operate. The efficiency, attention to detail, and design execution are unmatched!",
    avatar:
      "https://cdn.21st.dev/assets/mirror/f7/f72a5321d9c055324b83d9aca5fa248af5f99213b63da015c188955f8b5f0223.jpg",
    logo: Logo01,
  },
  {
    id: 2,
    name: "Sophia Lee",
    designation: "Data Analyst",
    company: "InsightTech",
    testimonial:
      "They saved us countless development hours. The analytics dashboard and sleek UI features are incredibly powerful.",
    avatar:
      "https://cdn.21st.dev/assets/mirror/57/57501d26f0a1500d35e3feb532be175cda3d4ad5d9ab7dd2ddbc346a81687641.jpg",
    logo: Logo02,
  },
  {
    id: 3,
    name: "Michael Johnson",
    designation: "UX Designer",
    company: "DesignPro",
    testimonial:
      "An amazing agency that simplifies complex concepts into intuitive user journeys. Highly recommended for any industry leader.",
    avatar:
      "https://cdn.21st.dev/assets/mirror/55/55053b4b68b2e6eb9cd8d3057617e989f97b0fccf54eb0d46ab3f2907d2c27bb.jpg",
    logo: Logo03,
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "Marketing Specialist",
    company: "BrandBoost",
    testimonial:
      "We've seen a massive surge in client conversions and engagement since launching our new brand visual identity.",
    avatar:
      "https://cdn.21st.dev/assets/mirror/e1/e1e565477a93abaec6a4ffd6a6745e3620bba9e5c0c88418e4b7113667370d65.jpg",
    logo: Logo04,
  },
  {
    id: 5,
    name: "Daniel Martinez",
    designation: "Full-Stack Developer",
    company: "CodeCrafters",
    testimonial:
      "The best collaboration we've had! The engineering quality is rock-solid and the support turnaround is instantaneous.",
    avatar:
      "https://cdn.21st.dev/assets/mirror/7d/7d79089c6788e8d582fe1b03158a3520f2bc805983362f52b8df1558f91577ad.jpg",
    logo: Logo05,
  },
  {
    id: 6,
    name: "Jane Smith",
    designation: "Product Manager",
    company: "InnovateX",
    testimonial:
      "The user experience is exceptional! Every screen is clean, intuitive, and seamlessly scalable across modern web platforms.",
    avatar:
      "https://cdn.21st.dev/assets/mirror/9a/9a06193c1865e5fc792d78adc02dfec25f0473e69596efd694f24d29916b59e4.jpg",
    logo: Logo06,
  },
];

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS)[0];
}) => {
  const Logo = testimonial.logo;

  return (
    <div className="flex w-[340px] sm:w-[380px] shrink-0 flex-col odd:flex-col-reverse gap-4 px-2.5">
      {/* ── Testimonial Bubble Card ── */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:border-purple-200 hover:shadow-[0_8px_30px_-6px_rgba(109,40,217,0.08)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-slate-200/80 shadow-xs">
              <AvatarImage
                className="object-cover"
                src={testimonial.avatar}
                alt={testimonial.name}
              />
              <AvatarFallback className="bg-purple-100 font-semibold text-purple-700 text-sm">
                {testimonial.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-slate-900 text-sm leading-tight">
                {testimonial.name}
              </p>
              <p className="text-slate-500 text-xs mt-0.5">
                {testimonial.designation} • <span className="font-medium text-slate-600">{testimonial.company}</span>
              </p>
            </div>
          </div>
          <Button
            asChild
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
          >
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterLogo className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
        <p className="mt-4 text-[13.5px] sm:text-[14px] text-slate-700 leading-relaxed font-normal">
          &quot;{testimonial.testimonial}&quot;
        </p>
      </div>

      {/* ── Alternating Blueprint Grid Logo Area ── */}
      <div className="relative flex h-36 w-full items-center justify-center rounded-2xl border border-slate-200/80 bg-slate-50/70 p-6 overflow-hidden">
        {/* Company SVG Logo */}
        <Logo className="h-10 w-44 text-slate-400 transition-colors duration-300 hover:text-slate-600" />

        {/* Blueprint Grid Lines Pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #94a3b8 1px, transparent 1px),
              linear-gradient(to bottom, #94a3b8 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `radial-gradient(ellipse at center, black 40%, transparent 85%)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, black 40%, transparent 85%)`,
          }}
        />
      </div>
    </div>
  );
};

export function ClientFeedback() {
  return (
    <section className="w-full bg-white text-slate-900 py-10 sm:py-16 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center space-y-2.5 mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-display tracking-tight text-slate-900 leading-[1.2]">
            Real <span className="font-serif italic font-normal gradient-text">Stories</span> from Visionary <span className="font-serif italic font-normal gradient-text">Clients.</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed font-normal">
            Real feedback and success stories from founders, agency partners, and visionary brands worldwide.
          </p>
        </motion.div>

        {/* Marquee Wrapper — Bounded within the max-w-7xl Container */}
        <div className="relative w-full overflow-hidden">
          {/* Left / Right Soft White Edge Gradient Fade at Container Boundaries */}
          <div 
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-20"
          />
          <div 
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-20"
          />

          {/* Continuous Track */}
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-2">
            {/* First sequence */}
            {TESTIMONIALS.map((item) => (
              <TestimonialCard key={`t1-${item.id}`} testimonial={item} />
            ))}
            {/* Duplicate sequence for seamless 50% loop */}
            {TESTIMONIALS.map((item) => (
              <TestimonialCard key={`t2-${item.id}`} testimonial={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientFeedback;
