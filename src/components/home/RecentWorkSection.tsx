'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, Sparkles, Layers, PenTool, Globe, Smartphone, Code, Palette } from 'lucide-react';

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  description: string;
  year: string;
  role: string;
  services: { name: string; icon: React.ElementType }[];
  image: string;
  glowImage: string;
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
    image: 'https://framerusercontent.com/images/1WzrSWN32BKGb2pG6QIWWfpTHPU.png?width=1360&height=1560',
    glowImage: 'https://framerusercontent.com/images/Dn7YlgllTgZlOiEwF37qCzJVNQ.png?width=1200&height=1200',
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
    image: 'https://framerusercontent.com/images/IORzPl8Blqi7HhFyJt7Jqk0KHPw.png?width=1360&height=2040',
    glowImage: 'https://framerusercontent.com/images/IORzPl8Blqi7HhFyJt7Jqk0KHPw.png?width=1360&height=2040',
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
    image: 'https://framerusercontent.com/images/Qt5wpOPx6fAOvjF2d2ImieYikY.png?width=904&height=1200',
    glowImage: 'https://framerusercontent.com/images/Qt5wpOPx6fAOvjF2d2ImieYikY.png?width=904&height=1200',
    link: '/work',
  },
];

function InteractiveProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tilt variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg']);

  // Floating button tracker
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
    setCursorPos({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ perspective: 1200 }}
      className="w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full rounded-[32px] sm:rounded-[40px] bg-[#03020B] border border-white/10 overflow-hidden shadow-2xl transition-shadow duration-500 hover:shadow-[0_20px_70px_-15px_rgba(0,0,0,0.8)]"
      >
        {/* Background Glowing Ambient Art */}
        <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
          <img
            src={project.glowImage}
            alt=""
            className="w-full h-full object-cover filter blur-[60px] scale-125 transition-transform duration-700 group-hover:scale-135"
          />
          <div className="absolute inset-0 bg-[#03020B]/60 backdrop-blur-[20px]" />
        </div>

        {/* Floating Custom "View Project" Cursor Follower */}
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              transform: 'translate(-50%, -50%)',
            }}
            className="pointer-events-none absolute z-40 hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs shadow-2xl backdrop-blur-md"
          >
            <span>View Project</span>
            <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        )}

        <div className="relative z-10 p-6 sm:p-10 lg:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Project Details */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              {/* Project Number & Title */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#FF4C03]">
                  {project.number}
                </span>
                <span className="w-8 h-px bg-white/20" />
              </div>

              <h3 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight leading-tight">
                {project.title}
              </h3>

              <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed max-w-lg">
                {project.description}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 py-5 border-y border-white/10 text-xs sm:text-sm">
              <div>
                <span className="block text-[#676E80] text-[11px] font-mono uppercase tracking-wider mb-1">
                  Year
                </span>
                <span className="font-semibold text-white">{project.year}</span>
              </div>
              <div>
                <span className="block text-[#676E80] text-[11px] font-mono uppercase tracking-wider mb-1">
                  Role
                </span>
                <span className="font-semibold text-white">{project.role}</span>
              </div>
            </div>

            {/* Services Tags */}
            <div className="space-y-2.5">
              <span className="block text-[#676E80] text-[11px] font-mono uppercase tracking-wider">
                Services
              </span>
              <div className="flex flex-wrap gap-2">
                {project.services.map((svc, idx) => {
                  const Icon = svc.icon;
                  return (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.07] border border-white/10 hover:border-white/25 hover:bg-white/15 text-white text-xs font-medium transition-all duration-300"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#FF4C03]" />
                      <span>{svc.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile View Button */}
            <div className="pt-2 lg:hidden">
              <Link
                href={project.link}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-xs shadow-md transition-all hover:bg-white/90"
              >
                <span>View Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Showcase Media */}
          <div className="lg:col-span-6">
            <Link href={project.link} className="block group/media cursor-pointer">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/15 bg-black/40 shadow-inner">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/media:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/media:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function RecentWorkSection() {
  return (
    <section className="py-20 lg:py-28 relative bg-[#03020B] text-white overflow-hidden">
      {/* Background Decorative Grids & Radial Lights */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-[#FF4C03]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-14 lg:mb-20">
          {/* Framer-style Badge (02) Featured Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-xs"
          >
            <span className="font-mono text-xs font-bold text-[#FF4C03]">(</span>
            <span className="font-mono text-xs font-semibold text-[#9CA3AF]">02</span>
            <span className="font-mono text-xs font-bold text-[#FF4C03]">)</span>
            <span className="text-xs font-semibold text-white tracking-wide">Featured Projects</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white"
          >
            Our Recent Work
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-[#9CA3AF] max-w-2xl leading-relaxed"
          >
            Our cross-functional teams work together to achieve outstanding portfolios across all the digital channels.
          </motion.p>
        </div>

        {/* Stacked Project Cards */}
        <div className="space-y-8 lg:space-y-12">
          {RECENT_PROJECTS.map((project, idx) => (
            <InteractiveProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* Bottom CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 lg:mt-20 flex justify-center"
        >
          <Link
            href="/work"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold text-sm shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_35px_rgba(255,255,255,0.2)]"
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
