'use client';

import React, { useRef } from 'react';
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
  Palette 
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

function CardContent({ project }: { project: ProjectItem }) {
  return (
    <div className="relative w-full rounded-[32px] sm:rounded-[44px] overflow-hidden border border-white/25 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.5)] p-6 sm:p-8 lg:p-12 min-h-[440px] sm:min-h-[480px] lg:min-h-[500px] flex flex-col justify-between">
      {/* ── 1. Blurred Background Artwork ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <img
          src={project.bgImage}
          alt=""
          className="w-full h-full object-cover filter blur-[60px] sm:blur-[70px] brightness-[0.85] saturate-[1.4] scale-135"
        />
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* ── 2. 3-Column Card Layout ── */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center h-full">
        
        {/* ── Left Column: Number, Title, Description ── */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 lg:space-y-16">
          <div className="space-y-1.5">
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white/80 block">
              {project.number}
            </span>
            <h3 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.05]">
              {project.title}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-[280px] font-normal">
            {project.description}
          </p>
        </div>

        {/* ── Center Column: Rounded Square Thumbnail ── */}
        <div className="lg:col-span-4 flex justify-center items-center my-2 lg:my-0">
          <Link 
            href={project.link} 
            className="group/thumb block relative w-full max-w-[240px] sm:max-w-[290px] lg:max-w-[320px] aspect-square rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/35 shadow-[0_20px_50px_rgba(0,0,0,0.55)] cursor-pointer bg-black/40 transition-transform duration-500 hover:scale-[1.03]"
          >
            <img
              src={project.centerImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/thumb:scale-108"
              loading="lazy"
            />

            {/* Hover Badge */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-xs">
              <div className="px-4 py-2 rounded-full bg-black/85 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xl border border-white/25">
                <span>View Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        </div>

        {/* ── Right Column: Year, Role, Services 2x2 Pills ── */}
        <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-6 lg:space-y-12 lg:pl-6">
          {/* Year & Role */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <span className="block text-white/70 text-[11px] sm:text-xs font-mono uppercase tracking-wider mb-0.5">
                Year
              </span>
              <span className="font-semibold text-white text-sm sm:text-base">
                {project.year}
              </span>
            </div>

            <div>
              <span className="block text-white/70 text-[11px] sm:text-xs font-mono uppercase tracking-wider mb-0.5">
                Role
              </span>
              <span className="font-semibold text-white text-sm sm:text-base">
                {project.role}
              </span>
            </div>
          </div>

          {/* Services 2x2 Glass Pills */}
          <div className="space-y-2">
            <span className="block text-white/70 text-[11px] sm:text-xs font-mono uppercase tracking-wider">
              Services
            </span>
            <div className="grid grid-cols-2 gap-2">
              {project.services.map((svc, idx) => {
                const Icon = svc.icon;
                return (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white text-[11px] sm:text-xs font-medium backdrop-blur-md transition-all duration-300"
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
    </div>
  );
}

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  total: number;
}

function ProjectCard({ project, index, total }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Track scroll from when this card hits the sticky header until its container has fully scrolled
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  const isLast = index === total - 1;
  const rotateTarget = index % 2 === 0 ? 3.5 : -3.5;

  // 1. Until the next card reaches halfway (0 -> 0.45), current card stays completely straight, full scale & 100% opaque.
  // 2. When the next card passes halfway (0.45 -> 0.95), current card gradually sinks downward (+50px), tilts, scales down, and fades out into/behind the next card!
  const scale = useTransform(scrollYProgress, [0, 0.45, 0.95], [1, 1, 0.82]);
  const rotate = useTransform(scrollYProgress, [0, 0.45, 0.95], [0, 0, rotateTarget]);
  const opacity = useTransform(scrollYProgress, [0, 0.45, 0.9], [1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.45, 0.95], [0, 0, 50]);

  return (
    <div
      ref={cardRef}
      className={`min-h-[90vh] sm:min-h-screen relative flex items-start justify-center ${
        isLast ? 'pb-16' : 'pb-0'
      }`}
      style={{ zIndex: index + 10 }}
    >
      <motion.div
        style={{
          scale: isLast ? 1 : scale,
          rotate: isLast ? 0 : rotate,
          opacity: isLast ? 1 : opacity,
          y: isLast ? 0 : y,
          transformOrigin: 'center center',
        }}
        className="sticky top-20 sm:top-24 w-full max-w-5xl px-4 sm:px-6"
      >
        <CardContent project={project} />
      </motion.div>
    </div>
  );
}

export default function RecentWorkSection() {
  return (
    <section className="relative bg-white text-slate-900 pt-16 sm:pt-24 pb-20 sm:pb-32">
      {/* ── Section Header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="flex flex-col items-center text-center space-y-3">
          {/* Framer-style Badge: ( 02 ) Featured Projects */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 shadow-xs">
            <span className="font-mono text-xs font-bold text-[#FF4C03]">(</span>
            <span className="font-mono text-xs font-semibold text-slate-600">02</span>
            <span className="font-mono text-xs font-bold text-[#FF4C03]">)</span>
            <span className="text-xs font-semibold text-slate-800 tracking-wide">Featured Projects</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight text-slate-900">
            Our Recent Work
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Our cross-functional teams work together to achieve outstanding portfolios across all the digital channels.
          </p>
        </div>
      </div>

      {/* ── Pinned Stacking Deck ── */}
      <div className="relative max-w-7xl mx-auto">
        {RECENT_PROJECTS.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            total={RECENT_PROJECTS.length}
          />
        ))}
      </div>

      {/* ── Bottom CTA Link ── */}
      <div className="flex justify-center mt-12 sm:mt-16">
        <Link
          href="/work"
          className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-slate-900 text-white font-bold text-sm shadow-xl transition-all duration-300 hover:scale-105 hover:bg-black"
        >
          <span>Explore All Works</span>
          <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>
    </section>
  );
}
