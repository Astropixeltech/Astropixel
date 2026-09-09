'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  PenTool, 
  Globe, 
  Smartphone, 
  Code, 
  Palette,
  ExternalLink 
} from 'lucide-react';

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  description: string;
  year: string;
  role: string;
  services: { name: string; icon: React.ElementType }[];
  centerImage: string;
  bgImage: string;
  link: string;
}

const RECENT_PROJECTS: ProjectItem[] = [
  {
    id: 'profast',
    number: '(001)',
    title: 'ProFast',
    description:
      'We have worked with companies across various industries to bring their visions to life. Below are some highlights of our featured projects.',
    year: '/2025',
    role: '/Website Designer',
    services: [
      { name: 'Branding', icon: Sparkles },
      { name: 'Web Design', icon: Globe },
      { name: 'Illustration', icon: PenTool },
      { name: 'Icon Design', icon: Layers },
    ],
    centerImage: 'https://framerusercontent.com/images/1WzrSWN32BKGb2pG6QIWWfpTHPU.png?width=1360&height=1560',
    bgImage: 'https://framerusercontent.com/images/1WzrSWN32BKGb2pG6QIWWfpTHPU.png?width=1360&height=1560',
    link: '/work',
  },
  {
    id: 'securex',
    number: '(002)',
    title: 'SecureX',
    description:
      'Elevating digital presence through innovative design and seamless user experiences. Our team crafts solutions that resonate effectively.',
    year: '/2026',
    role: '/UI/UX Design',
    services: [
      { name: 'Branding', icon: Sparkles },
      { name: 'Mobile App', icon: Smartphone },
      { name: 'Web App', icon: Globe },
      { name: 'Icon Design', icon: Layers },
    ],
    centerImage: 'https://framerusercontent.com/images/IORzPl8Blqi7HhFyJt7Jqk0KHPw.png?width=1360&height=2040',
    bgImage: 'https://framerusercontent.com/images/IORzPl8Blqi7HhFyJt7Jqk0KHPw.png?width=1360&height=2040',
    link: '/work',
  },
  {
    id: 'virtualex',
    number: '(003)',
    title: 'Virtualex',
    description:
      'Transforming complex ideas into intuitive platforms that drive business growth. We prioritize clarity and functionality in every development phase.',
    year: '/2025',
    role: '/Web Development',
    services: [
      { name: 'Web Development', icon: Code },
      { name: 'Branding', icon: Sparkles },
      { name: 'Illustration', icon: Palette },
      { name: 'Icon Design', icon: Layers },
    ],
    centerImage: 'https://framerusercontent.com/images/Qt5wpOPx6fAOvjF2d2ImieYikY.png?width=904&height=1200',
    bgImage: 'https://framerusercontent.com/images/Qt5wpOPx6fAOvjF2d2ImieYikY.png?width=904&height=1200',
    link: '/work',
  },
];

interface CardProps {
  project: ProjectItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function StackingCard({ project, index, total, progress }: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Card 0 (ProFast):
  // As Card 1 arrives (progress 0.0 -> 0.45), Card 0 tilts (-2deg), scales down (0.85), moves down (y: 35px), and tucks inside (opacity -> 0)
  const scale0 = useTransform(progress, [0.0, 0.45], [1, 0.85]);
  const rotate0 = useTransform(progress, [0.0, 0.45], [0, -2]);
  const y0 = useTransform(progress, [0.0, 0.45], [0, 35]);
  const opacity0 = useTransform(progress, [0.25, 0.45], [1, 0]);

  // Card 1 (SecureX):
  // As Card 2 arrives (progress 0.45 -> 0.88), Card 1 tilts (2deg), scales down (0.85), moves down (y: 35px), and tucks completely inside Card 3 (opacity -> 0)
  const scale1 = useTransform(progress, [0.45, 0.88], [1, 0.85]);
  const rotate1 = useTransform(progress, [0.45, 0.88], [0, 2]);
  const y1 = useTransform(progress, [0.45, 0.88], [0, 35]);
  const opacity1 = useTransform(progress, [0.68, 0.88], [1, 0]);

  // Card 2 (Virtualex - 3rd / Final Card):
  // Stays 100% straight (rotate: 0), scale: 1, fully visible
  const scale2 = useTransform(progress, [0, 1], [1, 1]);
  const rotate2 = useTransform(progress, [0, 1], [0, 0]);
  const y2 = useTransform(progress, [0, 1], [0, 0]);
  const opacity2 = useTransform(progress, [0, 1], [1, 1]);

  const scale = index === 0 ? scale0 : index === 1 ? scale1 : scale2;
  const rotate = index === 0 ? rotate0 : index === 1 ? rotate1 : rotate2;
  const y = index === 0 ? y0 : index === 1 ? y1 : y2;
  const opacity = index === 0 ? opacity0 : index === 1 ? opacity1 : opacity2;

  return (
    <div
      ref={containerRef}
      className={`sticky top-20 sm:top-24 flex items-center justify-center ${
        index === total - 1 ? 'mb-4 lg:mb-6' : 'mb-8 sm:mb-12 lg:mb-14'
      }`}
      style={{
        zIndex: index + 10,
      }}
    >
      <motion.div
        style={{
          scale,
          rotate,
          y,
          opacity,
          transformOrigin: 'bottom center',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full max-w-6xl rounded-[32px] sm:rounded-[44px] overflow-hidden border border-white/15 shadow-none bg-[#0d0c15] will-change-transform transform-gpu"
      >
        {/* ── Solid Base Layer (Guarantees zero bleed-through) ── */}
        <div className="absolute inset-0 bg-[#0d0c15] z-0" />

        {/* ── Blurred Background Image Layer ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <img
            src={project.bgImage}
            alt=""
            className="w-full h-full object-cover filter blur-[60px] brightness-[0.7] saturate-[1.45] scale-135"
          />
          {/* Subtle dark glass tint overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* ── Card Content: 3-Column Bento Arrangement ── */}
        <div className="relative z-10 p-7 sm:p-10 lg:p-12 min-h-[460px] lg:min-h-[520px] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* 1. Left Column: Number, Title, Description */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 lg:space-y-16">
            <div className="space-y-2">
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white/70 block">
                {project.number}
              </span>
              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.05]">
                {project.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xs font-normal">
              {project.description}
            </p>
          </div>

          {/* 2. Center Column: Sharp Rounded Square Showcase Image */}
          <div className="lg:col-span-4 flex justify-center items-center my-2 lg:my-0">
            <Link href={project.link} className="block relative group/image w-full max-w-[320px] sm:max-w-[340px] aspect-square rounded-[26px] sm:rounded-[32px] overflow-hidden border border-white/30 shadow-[0_15px_45px_rgba(0,0,0,0.6)] cursor-pointer bg-black/40">
              <img
                src={project.centerImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/image:scale-105"
                loading="lazy"
              />
              
              {/* Glass Glare Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Floating Center Badge on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="px-4 py-2 rounded-full bg-black/75 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg border border-white/20">
                  <span>View Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          </div>

          {/* 3. Right Column: Year, Role, Services Pills */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 lg:space-y-12 lg:pl-6">
            {/* Year & Role */}
            <div className="space-y-4">
              <div>
                <span className="block text-white/50 text-[11px] font-mono uppercase tracking-wider mb-0.5">
                  Year
                </span>
                <span className="font-semibold text-white text-sm sm:text-base">
                  {project.year}
                </span>
              </div>

              <div>
                <span className="block text-white/50 text-[11px] font-mono uppercase tracking-wider mb-0.5">
                  Role
                </span>
                <span className="font-semibold text-white text-sm sm:text-base">
                  {project.role}
                </span>
              </div>
            </div>

            {/* Services 2x2 Glass Pills */}
            <div className="space-y-2">
              <span className="block text-white/50 text-[11px] font-mono uppercase tracking-wider">
                Services
              </span>
              <div className="grid grid-cols-2 gap-2">
                {project.services.map((svc, idx) => {
                  const Icon = svc.icon;
                  return (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white text-[11px] sm:text-xs font-medium backdrop-blur-md transition-colors"
                    >
                      <Icon className="w-3.5 h-3.5 text-white/80 shrink-0" />
                      <span className="truncate">{svc.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default function RecentWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={containerRef} className="pt-8 pb-4 lg:pt-12 lg:pb-6 relative bg-white text-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center space-y-3 mb-10 lg:mb-14">
          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-semibold font-display tracking-tight text-black"
          >
            Featured <span className="font-serif italic font-normal gradient-text">Projects</span> &amp; <span className="font-serif italic font-normal gradient-text">Works.</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base lg:text-lg text-black/60 max-w-2xl leading-relaxed"
          >
            Our cross-functional teams work together to achieve outstanding portfolios across all the digital channels.
          </motion.p>
        </div>

        {/* ── Stacking Cards Deck ── */}
        <div className="relative">
          {RECENT_PROJECTS.map((project, i) => (
            <StackingCard
              key={project.id}
              project={project}
              index={i}
              total={RECENT_PROJECTS.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* ── Bottom CTA Link ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 lg:mt-12 flex justify-center relative z-20"
        >
          <Link
            href="/work"
            className="group relative inline-flex items-center gap-3.5 px-7 py-3.5 rounded-xl bg-black text-white font-medium text-sm shadow-lg transition-all duration-300 hover:bg-zinc-900 hover:shadow-xl hover:scale-[1.02]"
          >
            <span className="tracking-wide">Explore All Works</span>
            <div className="w-6 h-6 rounded-md bg-white text-black flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
