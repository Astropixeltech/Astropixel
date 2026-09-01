import React from 'react';
import Image from 'next/image';

interface Block {
  id: string;
  type: string;
  content: any;
}

export const ProjectViewer: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="flex flex-col gap-8 md:gap-16 max-w-5xl mx-auto py-8">
      {blocks.map((block) => {
        switch (block.type) {
          case 'image':
            return (
              <div key={block.id} className="w-full flex justify-center">
                <img
                  src={block.content.url}
                  alt={block.content.alt || 'Project Image'}
                  loading="lazy"
                  className="w-full h-auto rounded-lg object-contain shadow-sm"
                />
              </div>
            );
          
          case 'text':
            return (
              <div key={block.id} className="w-full prose prose-lg dark:prose-invert max-w-none px-4 md:px-0">
                <div dangerouslySetInnerHTML={{ __html: block.content.html || '' }} />
              </div>
            );

          case 'image_grid':
            return (
              <div key={block.id} className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {block.content.images?.map((imgUrl: string, idx: number) => (
                  <div key={idx} className="relative aspect-square">
                    <img
                      src={imgUrl}
                      alt={\`Grid image \${idx + 1}\`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover rounded-md shadow-sm hover:scale-[1.02] transition-transform"
                    />
                  </div>
                ))}
              </div>
            );

          case 'video':
            return (
              <div key={block.id} className="w-full flex justify-center aspect-video rounded-lg overflow-hidden shadow-sm">
                {block.content.url.includes('youtube.com') || block.content.url.includes('vimeo.com') ? (
                  <iframe 
                    src={block.content.url} 
                    className="w-full h-full" 
                    allowFullScreen 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <video 
                    src={block.content.url} 
                    controls 
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            );

          case 'embed':
            return (
              <div key={block.id} className="w-full flex justify-center rounded-lg overflow-hidden shadow-sm">
                <div dangerouslySetInnerHTML={{ __html: block.content.code || '' }} className="w-full" />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default ProjectViewer;
