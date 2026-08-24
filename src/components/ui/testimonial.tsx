'use client';

import React, { useRef } from 'react';
import { Variants } from 'framer-motion';
import { TimelineContent } from '@/components/ui/timeline-animation';

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export function ClientFeedback() {
  const testimonialRef = useRef<HTMLDivElement>(null);

  return (
    <main className="w-full bg-slate-50/50 py-16 sm:py-24 border-t border-slate-100" ref={testimonialRef}>
      <section className="container mx-auto px-4 max-w-6xl">
        <article className="text-center space-y-3 mb-12 sm:mb-16">
          <TimelineContent
            as="h2"
            className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-slate-900 max-w-2xl mx-auto"
            animationNum={0}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            What Our Clients Say About AstroPixel
          </TimelineContent>
          <TimelineContent
            as="p"
            className="mx-auto text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed"
            animationNum={1}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            Real feedback from global founders, agency partners, and client brands.
          </TimelineContent>
        </article>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
              &quot;AstroPixel completely transformed our brand identity and Web UI. Their team in Bangladesh delivers world-class design with remarkable speed and precision.&quot;
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop"
                alt="Amin One"
                className="w-11 h-11 rounded-full object-cover border border-slate-200"
              />
              <div>
                <h3 className="font-bold text-sm text-slate-900">Amin One</h3>
                <p className="text-xs text-slate-500">Founder, Amin One Brand</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md flex flex-col justify-between space-y-4 hover:shadow-lg transition-shadow">
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed italic">
              &quot;Working with Sofiullah and AstroPixel was seamless. They turned our complex SaaS platform concept into a sleek, high-converting product.&quot;
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?q=80&w=150&auto=format&fit=crop"
                alt="Bepro Digital"
                className="w-11 h-11 rounded-full object-cover border border-slate-700"
              />
              <div>
                <h3 className="font-bold text-sm text-white">Bepro Digital</h3>
                <p className="text-xs text-slate-400">Product Director, Bepro</p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic">
              &quot;AstroPixel delivers top-tier UI/UX and web development. Their attention to detail and modern Next.js implementation surpassed our expectations.&quot;
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                alt="Static Vibes"
                className="w-11 h-11 rounded-full object-cover border border-slate-200"
              />
              <div>
                <h3 className="font-bold text-sm text-slate-900">Static Vibes</h3>
                <p className="text-xs text-slate-500">Creative Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ClientFeedback;
