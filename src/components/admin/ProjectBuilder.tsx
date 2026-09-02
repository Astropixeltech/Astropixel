import React, { useState } from 'react';
import { 
  Type, 
  Image as ImageIcon, 
  LayoutGrid, 
  PlaySquare, 
  Code2, 
  Settings, ArrowLeft, 
  Save, 
  X,
  Palette,
  MousePointerClick,
  Cuboid,
  Aperture
} from 'lucide-react';
import {
  Block,
  TextBlockEditor,
  ImageBlockEditor,
  ImageGridBlockEditor,
  VideoBlockEditor,
  EmbedBlockEditor,
} from './BuilderBlocks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import ImageUploader from './ImageUploader';
import { toast } from 'sonner';

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
  });

  const [blocks, setBlocks] = useState<Block[]>(initialData?.content_blocks || []);
  const [isSaving, setIsSaving] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const blockTypes = [
    { type: 'image', label: 'Image', icon: ImageIcon },
    { type: 'text', label: 'Text', icon: Type },
    { type: 'image_grid', label: 'Photo Grid', icon: LayoutGrid },
    { type: 'video', label: 'Video & Audio', icon: PlaySquare },
    { type: 'embed', label: 'Embed', icon: Code2 },
    { type: 'lightroom', label: 'Lightroom', icon: Aperture, disabled: true },
    { type: 'prototype', label: 'Prototype', icon: MousePointerClick, disabled: true },
    { type: '3d', label: '3D', icon: Cuboid, disabled: true },
  ];

  const handleAddBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: type === 'image_grid' ? [] : '',
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
    if (!workData.title) {
      toast.error('Project title is required');
      return;
    }
    setIsSaving(true);
    try {
      const payload = {
        ...workData,
        project_url: workData.live_url,
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

      toast.success('Project saved successfully!');
      if (onSaveSuccess) onSaveSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Error saving project. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-full min-h-[85vh] bg-gray-50/50 dark:bg-slate-900/50 rounded-xl border overflow-hidden">
      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="sticky top-0 z-10 flex justify-between items-center p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={onCancel} className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
            </Button>
            <h1 className="font-semibold text-lg">
              {workData.title || 'Untitled Project'}
            </h1>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={isSaving}
            className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          >
            {isSaving ? 'Saving...' : 'Save & Publish'}
          </Button>
        </div>

        <div className="flex-1 p-6 lg:p-12">
          <div className="max-w-4xl mx-auto space-y-6">
            {blocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 min-h-[500px]">
                <h2 className="text-2xl font-medium text-slate-700 dark:text-slate-300 mb-10">
                  Start building your project:
                </h2>
                <div className="flex flex-wrap justify-center gap-6 max-w-3xl">
                  {blockTypes.map((b) => (
                    <button
                      key={b.type}
                      disabled={b.disabled}
                      onClick={() => !b.disabled && handleAddBlock(b.type as Block['type'])}
                      className="group flex flex-col items-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-center text-blue-600 transition-transform group-hover:scale-105 group-hover:shadow-md">
                        <b.icon className="w-8 h-8" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                        {b.label}
                      </span>
                    </button>
                  ))}
                </div>
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
                    case 'text': return <TextBlockEditor {...commonProps} />;
                    case 'image': return <ImageBlockEditor {...commonProps} />;
                    case 'image_grid': return <ImageGridBlockEditor {...commonProps} />;
                    case 'video': return <VideoBlockEditor {...commonProps} />;
                    case 'embed': return <EmbedBlockEditor {...commonProps} />;
                    default: return null;
                  }
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar (Settings & Tools) */}
      <div className="w-80 bg-white dark:bg-slate-950 border-l overflow-y-auto flex flex-col">
        {showSettings ? (
          <div className="p-5 flex-1 space-y-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b">
              <Button variant="ghost" size="icon" onClick={() => setShowSettings(false)} className="h-8 w-8 -ml-2 rounded-full">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="font-semibold text-base">Project Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label>Project Title</Label>
                <Input
                  value={workData.title}
                  onChange={(e) => setWorkData({ ...workData, title: e.target.value })}
                  placeholder="Title"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Input
                  value={workData.category}
                  onChange={(e) => setWorkData({ ...workData, category: e.target.value })}
                  placeholder="e.g. Web Design"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea
                  value={workData.description}
                  onChange={(e) => setWorkData({ ...workData, description: e.target.value })}
                  rows={3}
                  placeholder="Short description..."
                />
              </div>
              <div className="space-y-1.5">
                <Label>Cover Image</Label>
                <ImageUploader
                  value={workData.image_url}
                  onChange={(url) => setWorkData({ ...workData, image_url: url })}
                  folder="works"
                />
              </div>
              <div className="space-y-1.5">
                <Label>Live Link</Label>
                <Input
                  value={workData.live_url}
                  onChange={(e) => setWorkData({ ...workData, live_url: e.target.value })}
                  placeholder="https://"
                />
              </div>
              
              <div className="pt-4 space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg border bg-slate-50 dark:bg-slate-900/50">
                  <div>
                    <Label className="cursor-pointer">Featured</Label>
                    <p className="text-[10px] text-muted-foreground">Show on homepage</p>
                  </div>
                  <Switch
                    checked={workData.is_featured}
                    onCheckedChange={(checked) => setWorkData({ ...workData, is_featured: checked })}
                  />
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg border bg-slate-50 dark:bg-slate-900/50">
                  <div>
                    <Label className="cursor-pointer">Published</Label>
                    <p className="text-[10px] text-muted-foreground">Make it public</p>
                  </div>
                  <Switch
                    checked={workData.is_published}
                    onCheckedChange={(checked) => setWorkData({ ...workData, is_published: checked })}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="p-5 border-b">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Add Content</h3>
              <div className="grid grid-cols-2 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                {blockTypes.map((b) => (
                  <button
                    key={b.type}
                    disabled={b.disabled}
                    onClick={() => !b.disabled && handleAddBlock(b.type as Block['type'])}
                    className="flex flex-col items-center justify-center gap-2 py-4 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <b.icon className="w-5 h-5 text-slate-700 dark:text-slate-300" strokeWidth={1.5} />
                    <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">{b.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 border-b">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Edit Project</h3>
              <div className="grid grid-cols-2 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                <button className="flex flex-col items-center justify-center gap-2 py-4 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors opacity-50 cursor-not-allowed">
                  <Palette className="w-5 h-5 text-slate-700 dark:text-slate-300" strokeWidth={1.5} />
                  <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Styles</span>
                </button>
                <button 
                  onClick={() => setShowSettings(true)}
                  className="flex flex-col items-center justify-center gap-2 py-4 bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  <Settings className="w-5 h-5 text-slate-700 dark:text-slate-300" strokeWidth={1.5} />
                  <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">Settings</span>
                </button>
              </div>
              <div className="mt-3">
                <button className="w-full py-2.5 rounded-full border text-xs font-medium bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors opacity-50 cursor-not-allowed">
                  Custom Button
                </button>
                <p className="text-[10px] text-center text-slate-500 mt-2">Customize the call to action on your project</p>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Attach Assets</h3>
              <div className="rounded-lg border p-4 bg-slate-50/50 dark:bg-slate-900/50">
                <button className="w-full py-2.5 rounded-full border bg-white dark:bg-slate-950 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors opacity-50 cursor-not-allowed flex items-center justify-center gap-2">
                  <Aperture className="w-3.5 h-3.5" /> Attach Assets
                </button>
                <p className="text-[10px] text-center text-slate-500 mt-3 leading-relaxed">
                  Add files like fonts, illustrations, photos, zips, or templates.
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectBuilder;
