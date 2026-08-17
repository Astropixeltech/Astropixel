import React, { useRef } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";

function ClientFeedback() {
  const testimonialRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  return (
    <main className="w-full bg-white text-black py-8 md:py-14 rounded-3xl overflow-hidden">
      <section className="relative h-full container mx-auto" ref={testimonialRef}>
        <article className="max-w-screen-md mx-auto text-center space-y-3 mb-10 md:mb-14">
          <TimelineContent
            as="h2"
            className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-slate-900 max-w-xl mx-auto"
            animationNum={0}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            Trusted by Startups & World's Leading Brands
          </TimelineContent>
          <TimelineContent
            as="p"
            className="mx-auto text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed"
            animationNum={1}
            customVariants={revealVariants}
            timelineRef={testimonialRef}
          >
            See how our partners accelerate their growth and craft iconic digital experiences with AstroPixel.
          </TimelineContent>
        </article>

        <div className="lg:grid lg:grid-cols-3 gap-4 flex flex-col w-full px-2 sm:px-4">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <TimelineContent
              animationNum={0}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-1 flex flex-col justify-between relative bg-slate-950 text-white overflow-hidden rounded-2xl border border-slate-800 p-6 shadow-xl"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />
              <article className="relative z-10 mt-auto flex flex-col justify-between h-full min-h-[220px]">
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
                  "AstroPixel has been a true game-changer for us. Their service is top-notch and their team is incredibly responsive at every stage."
                </p>
                <div className="flex justify-between items-center pt-6 border-t border-slate-800/80 mt-6">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-white">Guillermo Rauch</h3>
                    <p className="text-xs sm:text-sm text-slate-400">CEO of Enigma</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop"
                    alt="Guillermo Rauch"
                    loading="eager"
                    decoding="sync"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-slate-700 shadow-md"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={1}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-1 flex flex-col justify-between relative bg-blue-600 text-white overflow-hidden rounded-2xl border border-blue-500 p-6 shadow-xl"
            >
              <article className="relative z-10 mt-auto flex flex-col justify-between h-full min-h-[180px]">
                <p className="text-blue-50 text-sm sm:text-base leading-relaxed">
                  "We've seen incredible results with AstroPixel. Their deep expertise, dedication, and strategic design boosted our conversion."
                </p>
                <div className="flex justify-between items-center pt-5 border-t border-blue-500/80 mt-5">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-white">Rika Shinoda</h3>
                    <p className="text-xs sm:text-sm text-blue-200">CEO of Kintsugi</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1512485694743-9c9538b4e6e0?q=80&w=200&auto=format&fit=crop"
                    alt="Rika Shinoda"
                    loading="eager"
                    decoding="sync"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-blue-400 shadow-md"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <TimelineContent
              animationNum={2}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-slate-900 text-white overflow-hidden rounded-2xl border border-slate-800 p-6 shadow-xl"
            >
              <article className="relative z-10 mt-auto">
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  "Their team is highly professional, and their innovative AI-powered design solutions have truly transformed how we launch products."
                </p>
                <div className="flex justify-between items-center pt-5 border-t border-slate-800 mt-5">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-white">Reacher</h3>
                    <p className="text-xs sm:text-sm text-slate-400">CEO of OdeaoLabs</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=200&auto=format&fit=crop"
                    alt="Reacher"
                    loading="eager"
                    decoding="sync"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={3}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-slate-900 text-white overflow-hidden rounded-2xl border border-slate-800 p-6 shadow-xl"
            >
              <article className="relative z-10 mt-auto">
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  "We're extremely satisfied with AstroPixel. Their design quality and execution speed have exceeded all our expectations."
                </p>
                <div className="flex justify-between items-center pt-5 border-t border-slate-800 mt-5">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-white">John Davis</h3>
                    <p className="text-xs sm:text-sm text-slate-400">CEO of Labsbo</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=200&auto=format&fit=crop"
                    alt="John Davis"
                    loading="eager"
                    decoding="sync"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={4}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex flex-col justify-between relative bg-slate-900 text-white overflow-hidden rounded-2xl border border-slate-800 p-6 shadow-xl"
            >
              <article className="relative z-10 mt-auto">
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  "Their customer communication and execution is absolutely exceptional. Always available and incredibly helpful."
                </p>
                <div className="flex justify-between items-center pt-5 border-t border-slate-800 mt-5">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-white">Steven Sunny</h3>
                    <p className="text-xs sm:text-sm text-slate-400">CEO of Boxefi</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                    alt="Steven Sunny"
                    loading="eager"
                    decoding="sync"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <TimelineContent
              animationNum={5}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-1 flex flex-col justify-between relative bg-blue-600 text-white overflow-hidden rounded-2xl border border-blue-500 p-6 shadow-xl"
            >
              <article className="relative z-10 mt-auto flex flex-col justify-between h-full min-h-[180px]">
                <p className="text-blue-50 text-sm sm:text-base leading-relaxed">
                  "AstroPixel has been a key strategic design partner in our journey from early stage startup to Series B scaleup."
                </p>
                <div className="flex justify-between items-center pt-5 border-t border-blue-500/80 mt-5">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-white">Alex Mercer</h3>
                    <p className="text-xs sm:text-sm text-blue-200">Founder of OdeaoLabs</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1563237023-b1e970526dcb?q=80&w=200&auto=format&fit=crop"
                    alt="Alex Mercer"
                    loading="eager"
                    decoding="sync"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-blue-400 shadow-md"
                  />
                </div>
              </article>
            </TimelineContent>

            <TimelineContent
              animationNum={6}
              customVariants={revealVariants}
              timelineRef={testimonialRef}
              className="flex-1 flex flex-col justify-between relative bg-slate-950 text-white overflow-hidden rounded-2xl border border-slate-800 p-6 shadow-xl"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />
              <article className="relative z-10 mt-auto flex flex-col justify-between h-full min-h-[220px]">
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  "AstroPixel has been a true partner for us. Their design craftsmanship, combined with deep technical strategy, has transformed our brand's global presence."
                </p>
                <div className="flex justify-between items-center pt-6 border-t border-slate-800/80 mt-6">
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-white">Paul Brauch</h3>
                    <p className="text-xs sm:text-sm text-slate-400">CTO of Spectrum</p>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1590086782957-93c06ef21604?q=80&w=200&auto=format&fit=crop"
                    alt="Paul Brauch"
                    loading="eager"
                    decoding="sync"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-slate-700 shadow-md"
                  />
                </div>
              </article>
            </TimelineContent>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ClientFeedback;
