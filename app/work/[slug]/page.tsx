import React from 'react';
import { prisma } from '@/lib/db/prisma';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectViewer from '@/components/work/ProjectViewer';
import { Metadata } from 'next';

export const revalidate = 60; // ISR

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const work = await prisma.work.findFirst({
    where: { OR: [{ slug: params.slug }, { id: params.slug }] }
  });

  if (!work) return { title: 'Project Not Found' };

  return {
    title: `${work.title} - AstroPixel Project`,
    description: work.description || 'View this project on AstroPixel.',
    openGraph: {
      images: [work.image_url || 'https://astropixel.tech/og-image.png'],
    }
  };
}

export default async function WorkDetailPage({ params }: { params: { slug: string } }) {
  const work = await prisma.work.findFirst({
    where: { OR: [{ slug: params.slug }, { id: params.slug }] }
  });

  if (!work || !work.is_published) {
    notFound();
  }

  // Parse blocks (it is stored as JSON)
  let blocks = [];
  try {
    if (work.content_blocks) {
      blocks = typeof work.content_blocks === 'string' 
        ? JSON.parse(work.content_blocks) 
        : work.content_blocks;
    }
  } catch (err) {
    console.error('Failed to parse blocks', err);
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <div className="w-full bg-slate-50 dark:bg-slate-900/50 pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          {work.category && (
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-sm font-medium uppercase tracking-wider">
              {work.category}
            </span>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
            {work.title}
          </h1>
          {work.description && (
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              {work.description}
            </p>
          )}
        </div>
      </div>

      {/* Cover Image */}
      {work.image_url && (
        <div className="w-full max-w-7xl mx-auto px-4 -mt-8 relative z-10">
          <img 
            src={work.image_url} 
            alt={work.title} 
            className="w-full h-auto rounded-2xl shadow-2xl object-cover max-h-[80vh]"
          />
        </div>
      )}

      {/* Project Content Blocks */}
      <div className="px-4 py-16 md:py-24">
        {blocks && blocks.length > 0 ? (
          <ProjectViewer blocks={blocks} />
        ) : (
          <div className="max-w-4xl mx-auto text-center py-20">
            <p className="text-slate-500">More details coming soon...</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
