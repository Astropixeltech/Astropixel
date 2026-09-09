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
  range: [number, number];
  targetScale: number;
}

function StackingCard({ project, index, total, progress, range, targetScale }: CardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth scroll scale & rotation transforms as subsequent cards stack over
  const scale = useTransform(progress, range, [1, targetScale]);
  const rotate = useTransform(progress, range, [0, index % 2 === 0 ? -1.5 : 1.5]);
  const opacity = useTransform(progress, range, [1, 0.65]);

  return (
    <div
      ref={containerRef}
      className="sticky top-24 lg:top-28 flex items-center justify-center mb-16 lg:mb-24"
      style={{
        top: `calc(100px + ${index * 30}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
          rotate,
          opacity: index === total - 1 ? 1 : opacity,
          transformOrigin: 'top center',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full max-w-6xl rounded-[32px] sm:rounded-[44px] overflow-hidden border border-white/20 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85)] bg-[#0c0b12]"
      >
        {/* ── Blurred Background Image Layer ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <img
            src={project.bgImage}
            alt=""
            className="w-full h-full object-cover filter blur-[65px] brightness-[0.7] saturate-[1.45] scale-135 transition-transform duration-700"
          />
          {/* Subtle dark glass tint */}
          <div className="absolute inset-0 bg-black/35 backdrop-blur-md" />
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
    <section ref={containerRef} className="py-20 lg:py-28 relative bg-[#050409] text-white">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-orange-500/10 via-purple-600/10 to-cyan-500/10 blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 lg:mb-20">
          {/* Framer-style Badge: ( 02 ) Featured Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xs"
          >
            <span className="font-mono text-xs font-bold text-[#FF4C03]">(</span>
            <span className="font-mono text-xs font-semibold text-white/70">02</span>
            <span className="font-mono text-xs font-bold text-[#FF4C03]">)</span>
            <span className="text-xs font-semibold text-white tracking-wide">Featured Projects</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white"
          >
            Our Recent Work
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-white/60 max-w-2xl leading-relaxed"
          >
            Our cross-functional teams work together to achieve outstanding portfolios across all the digital channels.
          </motion.p>
        </div>

        {/* ── Stacking Cards Deck ── */}
        <div className="relative">
          {RECENT_PROJECTS.map((project, i) => {
            const targetScale = 1 - (RECENT_PROJECTS.length - i) * 0.04;
            return (
              <StackingCard
                key={project.id}
                project={project}
                index={i}
                total={RECENT_PROJECTS.length}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </div>

        {/* ── Bottom CTA Link ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 lg:mt-16 flex justify-center"
        >
          <Link
            href="/work"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold text-sm shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_35px_rgba(255,255,255,0.25)]"
          >
            <span>Explore All Works</span>
            <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
