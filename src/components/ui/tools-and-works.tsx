import React, { useState } from 'react';

const tools = [
  { name: 'Next.js', category: 'Framework', icon: '⚡' },
  { name: 'Figma', category: 'Design', icon: '🎨' },
  { name: 'TypeScript', category: 'Language', icon: '🔷' },
  { name: 'Tailwind CSS', category: 'Styling', icon: '🌊' },
  { name: 'Framer Motion', category: 'Animation', icon: '✨' },
  { name: 'Firebase', category: 'Backend', icon: '🔥' },
  { name: 'Supabase', category: 'Database', icon: '⚡' },
  { name: 'PostgreSQL', category: 'SQL DB', icon: '🐘' },
];

const projects = [
  {
    title: 'Aura AI Platform',
    category: 'AI SaaS',
    desc: 'Next-generation AI creative workspace with real-time generative agents.',
    tags: ['React', 'Next.js', 'AI'],
    img: 'https://picsum.photos/seed/aura/800/500',
  },
  {
    title: 'Nexus Fintech Cloud',
    category: 'Web App',
    desc: 'High-frequency transaction dashboard with bank-grade security protocols.',
    tags: ['TypeScript', 'Tailwind', 'Finance'],
    img: 'https://picsum.photos/seed/nexus/800/500',
  },
  {
    title: 'Nova Studio Brand',
    category: 'UI/UX',
    desc: 'Complete identity, dynamic 3D typography, and interactive showcase.',
    tags: ['Figma', 'Branding', 'Design'],
    img: 'https://picsum.photos/seed/nova/800/500',
  },
];

export default function ToolsAndWorksSection() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'AI SaaS', 'Web App', 'UI/UX'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="bg-[#000319] text-white py-24 px-6 relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />
      
      {/* ================= TOOLS SECTION ================= */}
      <section className="max-w-7xl mx-auto mb-32 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            ✦ Tools We Utilize for Excellence
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
            Discover Advanced Tools & Tech
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            We leverage industry-leading software and cutting-edge frameworks to craft digital experiences.
          </p>
        </div>

        {/* Marquee Row */}
        <div className="relative overflow-hidden w-full group py-4">
          <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#000319] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#000319] to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-6 w-max animate-[marquee_30s_linear_infinite] group-hover:[animation-play-state:paused]">
            {[...tools, ...tools, ...tools].map((tool, idx) => (
              <div 
                key={idx}
                className="w-64 p-5 rounded-2xl bg-[#080d26]/80 backdrop-blur-xl border border-white/10 hover:border-blue-500/50 hover:bg-[#0c1438] transition-all duration-300 flex items-center gap-5 cursor-pointer shadow-xl hover:shadow-blue-500/10"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-2xl shrink-0">
                  {tool.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">{tool.name}</h4>
                  <p className="text-sm text-slate-400">{tool.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WORKS SECTION ================= */}
      <section className="max-w-7xl mx-auto relative z-10 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-4">
              Explore Our Portfolio
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              Featured Case Studies
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  filter === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400/20'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="group rounded-[2rem] bg-[#080d26]/60 border border-white/10 overflow-hidden hover:border-blue-500/40 transition-all duration-500 flex flex-col hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d26] via-[#080d26]/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity" />
              </div>
              
              <div className="p-8 flex flex-col flex-1 relative -mt-4 bg-[#080d26]/80 backdrop-blur-md rounded-t-3xl border-t border-white/5">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 text-[10px] uppercase tracking-wider rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                  {project.desc}
                </p>
                <a
                  href="#case-study"
                  className="group/btn inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest"
                >
                  View Project Case Study 
                  <span className="transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
