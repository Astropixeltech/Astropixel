import React, { useState, useRef } from 'react';
import { 
  Type, 
  Image as ImageIcon, 
  LayoutGrid, 
  PlaySquare, 
  Code2, 
  Settings, 
  Save, 
  ArrowLeft,
  X,
  Sparkles,
  Plus,
  Eye,
  Loader2,
  ExternalLink
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    client: initialData?.client || '',
    tagsText: Array.isArray(initialData?.tags) ? initialData.tags.join(', ') : '',
    is_featured: initialData?.is_featured ?? false,
    is_published: initialData?.is_published ?? true,
  });

  const [blocks, setBlocks] = useState<Block[]>(initialData?.content_blocks || []);
  const [isSaving, setIsSaving] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const blockTypes = [
    { type: 'image' as const, label: 'Single Image', icon: ImageIcon, desc: 'Full-bleed or centered mockup' },
    { type: 'text' as const, label: 'Rich Narrative', icon: Type, desc: 'Typography, headings & quotes' },
    { type: 'image_grid' as const, label: 'Photo Grid', icon: LayoutGrid, desc: 'Multi-column photo showcase' },
    { type: 'video' as const, label: 'Video Player', icon: PlaySquare, desc: 'YouTube, Vimeo or MP4' },
    { type: 'embed' as const, label: 'Code / Prototype', icon: Code2, desc: 'Figma or iframe embed' },
  ];

  const handleAddBlock = (type: Block['type'], initialContent: any = null) => {
    const newBlock: Block = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      content: initialContent || (type === 'image_grid' ? { images: [] } : {}),
    };
    setBlocks((prev) => [...prev, newBlock]);
  };

  const handleBlockChange = (index: number, updatedBlock: Block) => {
    setBlocks((prev) => {
      const next = [...prev];
      next[index] = updatedBlock;
      return next;
    });
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    setBlocks((prev) => {
      const next = [...prev];
      if (direction === 'up' && index > 0) {
        [next[index - 1], next[index]] = [next[index], next[index - 1]];
      } else if (direction === 'down' && index < next.length - 1) {
        [next[index + 1], next[index]] = [next[index], next[index + 1]];
      }
      return next;
    });
  };

  const handleDeleteBlock = (index: number) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!workData.title.trim()) {
      setShowSettings(true);
      toast.error('Please enter a project title in settings');
      return;
    }

    setIsSaving(true);
    try {
      const parsedTags = workData.tagsText
        ? workData.tagsText.split(',').map((t: string) => t.trim()).filter(Boolean)
        : [];

      const payload = {
        id: initialData?.id,
        title: workData.title,
        description: workData.description,
        category: workData.category,
        image_url: workData.image_url,
        live_url: workData.live_url,
        project_url: workData.live_url,
        client: workData.client,
        tags: parsedTags,
        is_featured: workData.is_featured,
        is_published: workData.is_published,
        content_blocks: blocks,
      };

      const res = await fetch('/api/works', {
        method: initialData?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Failed to save project');
      }

      toast.success('Project published successfully!');
      if (onSaveSuccess) onSaveSuccess();
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error(error.message || 'Error saving project.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-[88vh] bg-background rounded-2xl border border-border/80 overflow-hidden shadow-xl">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-card/90 backdrop-blur-md border-b border-border/60">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onCancel} className="gap-1.5 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <div className="h-4 w-px bg-border/60" />
          <h1 className="font-bold text-base text-foreground truncate max-w-sm">
            {workData.title || 'Untitled Project'}
          </h1>
          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
            {workData.category}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant={showSettings ? 'default' : 'outline'}
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="gap-1.5 text-xs"
          >
            <Settings className="w-3.5 h-3.5" /> Project Info & Cover
          </Button>

          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="gap-2 text-xs bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 text-white font-semibold shadow-md"
          >
            {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            {isSaving ? 'Publishing...' : 'Save & Publish'}
          </Button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50 dark:bg-[#0B0D11]">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Project Hero Banner Preview */}
            <div className="p-6 rounded-2xl bg-card border border-border/60 shadow-xs mb-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <span className="text-[11px] font-mono text-primary uppercase tracking-widest font-bold">
                    Case Study Preview
                  </span>
                  <h2 className="text-2xl font-bold text-foreground">
                    {workData.title || 'Your Project Headline'}
                  </h2>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {workData.description || 'Add your project summary and deliverables in Project Settings.'}
                  </p>
                </div>
                {workData.image_url ? (
                  <img
                    src={workData.image_url}
                    alt="Cover preview"
                    className="w-24 h-16 object-cover rounded-xl border border-border shrink-0"
                  />
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setShowSettings(true)} className="text-xs gap-1">
                    <ImageIcon className="w-3.5 h-3.5" /> Set Cover Image
                  </Button>
                )}
              </div>
            </div>

            {/* Content Blocks Canvas */}
            {blocks.length === 0 ? (
              <div className="py-20 text-center rounded-2xl border-2 border-dashed border-border/80 bg-card/40 p-8 space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-xs">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Build your Behance-style Case Study</h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                    Add high-res mockups, design philosophy text, photo grids, and video reels to create a stunning presentation.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-2xl mx-auto pt-2">
                  {blockTypes.map((b) => (
                    <button
                      key={b.type}
                      type="button"
                      onClick={() => handleAddBlock(b.type)}
                      className="group p-4 rounded-xl border border-border/60 bg-card hover:bg-primary/5 hover:border-primary/40 transition-all flex flex-col items-center justify-center gap-2 cursor-pointer shadow-xs hover:scale-105"
                    >
                      <div className="w-10 h-10 rounded-xl bg-secondary/80 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <b.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-foreground">{b.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
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

                {/* Bottom Add Module Trigger */}
                <div className="pt-6 border-t border-border/60">
                  <p className="text-center text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
                    + Add Next Section Block
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {blockTypes.map((b) => (
                      <Button
                        key={b.type}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddBlock(b.type)}
                        className="gap-2 text-xs hover:border-primary/50 hover:bg-primary/5"
                      >
                        <b.icon className="w-3.5 h-3.5 text-primary" />
                        {b.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Settings Sidebar */}
        {showSettings && (
          <aside className="w-84 md:w-96 bg-card border-l border-border/80 overflow-y-auto p-6 space-y-5 shrink-0 z-20">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Settings className="w-4 h-4 text-primary" /> Project Metadata & Cover
              </h3>
              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-xs font-semibold">Project Title *</Label>
                <Input
                  value={workData.title}
                  onChange={(e) => setWorkData({ ...workData, title: e.target.value })}
                  placeholder="e.g. Fintech Mobile App UI/UX"
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Category</Label>
                <Select
                  value={workData.category}
                  onValueChange={(val) => setWorkData({ ...workData, category: val })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web Design & Development</SelectItem>
                    <SelectItem value="branding">Logo & Branding</SelectItem>
                    <SelectItem value="graphics">Graphic Design</SelectItem>
                    <SelectItem value="motion">Motion & Video</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs font-semibold">Short Description</Label>
                <Textarea
                  value={workData.description}
                  onChange={(e) => setWorkData({ ...workData, description: e.target.value })}
                  placeholder="Brief summary of client challenge and design solution..."
                  rows={3}
                  className="mt-1 text-xs"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Cover Showcase Image</Label>
                <div className="mt-1">
                  <ImageUploader
                    value={workData.image_url}
                    onChange={(url) => setWorkData({ ...workData, image_url: url })}
                    folder="works"
                    placeholder="Upload cover image"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold">Live Project URL / Demo Link</Label>
                <Input
                  value={workData.live_url}
                  onChange={(e) => setWorkData({ ...workData, live_url: e.target.value })}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-xs font-semibold">Tags (comma-separated)</Label>
                <Input
                  value={workData.tagsText}
                  onChange={(e) => setWorkData({ ...workData, tagsText: e.target.value })}
                  placeholder="UI/UX, Mobile App, Figma, Tailwind"
                  className="mt-1 text-xs"
                />
              </div>

              <div className="p-3.5 rounded-xl border border-border/60 bg-secondary/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-xs font-semibold cursor-pointer">Featured Project</Label>
                    <p className="text-[11px] text-muted-foreground">Highlight on homepage</p>
                  </div>
                  <Switch
                    checked={workData.is_featured}
                    onCheckedChange={(c) => setWorkData({ ...workData, is_featured: c })}
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                  <div>
                    <Label className="text-xs font-semibold cursor-pointer">Published</Label>
                    <p className="text-[11px] text-muted-foreground">Make visible on website</p>
                  </div>
                  <Switch
                    checked={workData.is_published}
                    onCheckedChange={(c) => setWorkData({ ...workData, is_published: c })}
                  />
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default ProjectBuilder;
