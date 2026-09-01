import React, { useState } from 'react';
import ImageUploader from './ImageUploader';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Block,
  TextBlockEditor,
  ImageBlockEditor,
  ImageGridBlockEditor,
  VideoBlockEditor,
  EmbedBlockEditor,
} from './BuilderBlocks';

interface ProjectBuilderProps {
  initialData?: any;
  onCancel: () => void;
  onSaveSuccess?: () => void;
}

const ProjectBuilder: React.FC<ProjectBuilderProps> = ({
  initialData,
  onCancel,
  onSaveSuccess,
}) => {
  const [workData, setWorkData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    category: initialData?.category || 'web',
    image_url: initialData?.image_url || '',
    live_url: initialData?.live_url || initialData?.project_url || '',
    is_featured: initialData?.is_featured ?? false,
    is_published: initialData?.is_published ?? true,
    tags: initialData?.tags || [],
  });

  const [blocks, setBlocks] = useState<Block[]>(initialData?.content_blocks || []);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      content: {},
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleBlockChange = (index: number, updatedBlock: Block) => {
    const newBlocks = [...blocks];
    newBlocks[index] = updatedBlock;
    setBlocks(newBlocks);
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    } else if (direction === 'down' && index < newBlocks.length - 1) {
      [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
    }
    setBlocks(newBlocks);
  };

  const handleDeleteBlock = (index: number) => {
    const newBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(newBlocks);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        ...workData,
        content_blocks: blocks,
        id: initialData?.id,
      };

      const res = await fetch('/api/works', {
        method: initialData?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to save project');
      }

      if (onSaveSuccess) {
        onSaveSuccess();
      } else {
        alert('Project saved successfully!');
      }
    } catch (error) {
      console.error(error);
      alert('Error saving project. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {initialData?.id ? 'Edit Project' : 'Create New Project'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Build a Behance-style project case study using blocks.
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-md font-medium text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
          >
            {isSaving ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Project Blocks</h2>
            
            {blocks.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
                <p className="text-slate-500 dark:text-slate-400">No content blocks yet.</p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Add a block to start building your project.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {blocks.map((block, index) => {
                  const commonProps = {
                    key: block.id,
                    block,
                    onChange: (b: Block) => handleBlockChange(index, b),
                    onMoveUp: () => moveBlock(index, 'up'),
                    onMoveDown: () => moveBlock(index, 'down'),
                    onDelete: () => handleDeleteBlock(index),
                    isFirst: index === 0,
                    isLast: index === blocks.length - 1,
                  };

                  switch (block.type) {
                    case 'text':
                      return <TextBlockEditor {...commonProps} />;
                    case 'image':
                      return <ImageBlockEditor {...commonProps} />;
                    case 'image_grid':
                      return <ImageGridBlockEditor {...commonProps} />;
                    case 'video':
                      return <VideoBlockEditor {...commonProps} />;
                    case 'embed':
                      return <EmbedBlockEditor {...commonProps} />;
                    default:
                      return null;
                  }
                })}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Add Content Block</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { type: 'text', label: 'Text' },
                { type: 'image', label: 'Image' },
                { type: 'image_grid', label: 'Image Grid' },
                { type: 'video', label: 'Video' },
                { type: 'embed', label: 'Embed' },
              ].map((b) => (
                <button
                  key={b.type}
                  onClick={() => handleAddBlock(b.type as Block['type'])}
                  className="px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors"
                >
                  + {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 shadow-sm sticky top-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Project Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={workData.title}
                  onChange={(e) => setWorkData({ ...workData, title: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Modern E-commerce App"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={workData.category}
                  onChange={(e) => setWorkData({ ...workData, category: e.target.value })}
                  className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. UI/UX Design"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  value={workData.description}
                  onChange={(e) => setWorkData({ ...workData, description: e.target.value })}
                  rows={4}
                  className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief summary of the project..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBuilder;
