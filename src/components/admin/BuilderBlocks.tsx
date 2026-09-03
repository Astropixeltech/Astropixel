import React, { useRef, useState, useEffect } from 'react';
import { 
  ChevronDown, Type, Bold, Italic, Underline, AlignLeft, 
  AlignCenter, AlignRight, Link2, Link2Off, RemoveFormatting, WrapText,
  Trash2, Upload, GripVertical, Image as ImageIcon, Video, Code2, Plus, Globe
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export interface Block {
  id: string;
  type: 'image' | 'text' | 'image_grid' | 'video' | 'embed';
  content: any;
}

interface BlockEditorProps {
  block: Block;
  onChange: (updatedBlock: Block) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onDelete: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const BaseBlockWrapper: React.FC<BlockEditorProps & { children: React.ReactNode; hideBorder?: boolean }> = ({
  block,
  onMoveUp,
  onMoveDown,
  onDelete,
  isFirst,
  isLast,
  children,
  hideBorder = false,
}) => {
  return (
    <div className={`relative group transition-all mb-6 ${!hideBorder ? 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm' : ''}`}>
      <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col space-y-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={isFirst}
          title="Move Up"
          className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 shadow-sm rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
        >
          <GripVertical className="w-4 h-4 rotate-180" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          title="Delete Block"
          className="p-1.5 text-red-400 hover:text-white hover:bg-red-500 bg-white dark:bg-slate-800 shadow-sm rounded-md border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={isLast}
          title="Move Down"
          className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 shadow-sm rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
        >
          <GripVertical className="w-4 h-4" />
        </button>
      </div>
      {!hideBorder && (
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
          {block.type.replace('_', ' ')}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

// ==========================================
// 1. TEXT BLOCK EDITOR
// ==========================================
export const TextBlockEditor: React.FC<BlockEditorProps> = (props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showParaMenu, setShowParaMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);

  useEffect(() => {
    if (editorRef.current && props.block.content?.html && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = props.block.content.html;
    }
  }, []);

  const handleInput = () => {
    if (editorRef.current) {
      props.onChange({
        ...props.block,
        content: { ...props.block.content, html: editorRef.current.innerHTML },
      });
    }
  };

  const exec = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  return (
    <BaseBlockWrapper {...props} hideBorder={true}>
      <div className="border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-visible bg-white dark:bg-[#0f1115] focus-within:ring-2 focus-within:ring-primary/20 transition-all relative">
        {/* Dark Behance Toolbar */}
        <div className="bg-[#1a1a1a] flex flex-wrap items-center text-white px-3 py-2 rounded-t-xl select-none relative z-10 gap-1.5">
          {/* Paragraph Style Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowParaMenu(!showParaMenu)}
              className="flex items-center gap-1.5 hover:bg-white/10 px-3 py-1.5 rounded text-xs font-medium"
            >
              Style <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            {showParaMenu && (
              <div className="absolute top-full left-0 mt-1 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg overflow-hidden py-1 z-30">
                {['H1', 'H2', 'H3', 'P', 'BLOCKQUOTE'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => { exec('formatBlock', tag); setShowParaMenu(false); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    {tag === 'P' ? 'Paragraph' : tag === 'BLOCKQUOTE' ? 'Quote' : `Heading ${tag.replace('H', '')}`}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="w-px h-5 bg-white/20 mx-1"></div>

          {/* Color Picker */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowColorMenu(!showColorMenu)}
              className="p-1.5 hover:bg-white/10 rounded text-xs font-serif font-bold border-b-2 border-primary"
            >
              A
            </button>
            {showColorMenu && (
              <div className="absolute top-full left-0 mt-1 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg grid grid-cols-4 gap-1.5 w-36 z-30">
                {['#000000', '#ffffff', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#64748b'].map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => { exec('foreColor', color); setShowColorMenu(false); }}
                    className="w-6 h-6 rounded border border-slate-200 dark:border-slate-700"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}
          </div>
          
          <button type="button" onClick={() => exec('bold')} className="p-1.5 hover:bg-white/10 rounded text-xs font-serif font-bold">
            B
          </button>
          <button type="button" onClick={() => exec('italic')} className="p-1.5 hover:bg-white/10 rounded text-xs font-serif italic">
            I
          </button>
          <button type="button" onClick={() => exec('underline')} className="p-1.5 hover:bg-white/10 rounded text-xs font-serif underline">
            U
          </button>

          <div className="w-px h-5 bg-white/20 mx-1"></div>

          {/* Alignment */}
          <button type="button" onClick={() => exec('justifyLeft')} className="p-1.5 hover:bg-white/10 rounded">
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button type="button" onClick={() => exec('justifyCenter')} className="p-1.5 hover:bg-white/10 rounded">
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button type="button" onClick={() => exec('justifyRight')} className="p-1.5 hover:bg-white/10 rounded">
            <AlignRight className="w-3.5 h-3.5" />
          </button>

          <div className="w-px h-5 bg-white/20 mx-1"></div>

          {/* Links */}
          <button type="button" onClick={() => { const url = prompt('Enter link URL:'); if (url) exec('createLink', url); }} className="p-1.5 hover:bg-white/10 rounded">
            <Link2 className="w-3.5 h-3.5" />
          </button>
          <button type="button" onClick={() => exec('removeFormat')} className="p-1.5 hover:bg-white/10 rounded">
            <RemoveFormatting className="w-3.5 h-3.5" />
          </button>
        </div>
        
        {/* Content Editable */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          className="w-full p-6 text-slate-900 dark:text-slate-100 min-h-[140px] outline-none prose prose-slate dark:prose-invert max-w-none text-base leading-relaxed"
        />
      </div>
    </BaseBlockWrapper>
  );
};

// ==========================================
// 2. SINGLE IMAGE BLOCK EDITOR
// ==========================================
export const ImageBlockEditor: React.FC<BlockEditorProps> = (props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState(props.block.content?.url || '');
  const [caption, setCaption] = useState(props.block.content?.caption || '');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setUrlInput(dataUrl);
      props.onChange({
        ...props.block,
        content: { ...props.block.content, url: dataUrl, caption },
      });
      toast.success("Image uploaded!");
    };
    reader.readAsDataURL(file);
  };

  const handleUrlBlur = () => {
    props.onChange({
      ...props.block,
      content: { ...props.block.content, url: urlInput, caption },
    });
  };

  const handleCaptionBlur = () => {
    props.onChange({
      ...props.block,
      content: { ...props.block.content, url: urlInput, caption },
    });
  };

  return (
    <BaseBlockWrapper {...props} hideBorder={true}>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1115] overflow-hidden shadow-sm p-4 space-y-4">
        {urlInput ? (
          <div className="space-y-3">
            <div className="relative group rounded-xl overflow-hidden bg-slate-950/5 border border-slate-200 dark:border-slate-800">
              <img
                src={urlInput}
                alt="Case study asset"
                className="w-full h-auto object-cover max-h-[600px]"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black text-white text-xs font-medium backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
              >
                Change Image
              </button>
            </div>

            <Input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              onBlur={handleCaptionBlur}
              placeholder="Add optional image caption or subtitle..."
              className="text-xs text-center border-0 bg-transparent focus-visible:ring-0 text-muted-foreground"
            />
          </div>
        ) : (
          <div className="py-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center gap-4 text-center px-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Upload Showcase Artwork</p>
              <p className="text-xs text-muted-foreground mt-0.5">High-resolution mockup, UI shot, or brand asset</p>
            </div>
            
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <Button
                type="button"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="gap-2"
              >
                <Upload className="w-3.5 h-3.5" /> Upload File
              </Button>
            </div>

            <div className="w-full max-w-sm flex items-center gap-2 pt-2">
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Or paste direct image URL (https://...)"
                className="text-xs h-8"
              />
              <Button type="button" size="sm" variant="secondary" onClick={handleUrlBlur} className="h-8 text-xs">
                Set
              </Button>
            </div>
          </div>
        )}

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
      </div>
    </BaseBlockWrapper>
  );
};

// ==========================================
// 3. IMAGE GRID BLOCK EDITOR
// ==========================================
export const ImageGridBlockEditor: React.FC<BlockEditorProps> = (props) => {
  const images: string[] = props.block.content?.images || [];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = useState('');

  const handleGridUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          const updated = [...images, dataUrl];
          props.onChange({
            ...props.block,
            content: { ...props.block.content, images: updated },
          });
        }
      };
      reader.readAsDataURL(file);
    });
    toast.success("Added images to grid!");
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    const updated = [...images, urlInput.trim()];
    props.onChange({
      ...props.block,
      content: { ...props.block.content, images: updated },
    });
    setUrlInput('');
    toast.success("Image URL added to grid!");
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    props.onChange({
      ...props.block,
      content: { ...props.block.content, images: updated },
    });
  };

  return (
    <BaseBlockWrapper {...props} hideBorder={true}>
      <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border/50">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-primary" /> Photo Grid ({images.length} images)
          </span>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="h-7 text-xs gap-1"
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus className="w-3 h-3" /> Add Photo
          </Button>
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {images.map((url, i) => (
              <div key={i} className="relative group/griditem aspect-[4/3] rounded-xl overflow-hidden border border-border/60 bg-muted/40 shadow-xs">
                <img src={url} alt={`Grid item ${i}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-md opacity-0 group-hover/griditem:opacity-100 transition-opacity shadow-sm cursor-pointer"
                  title="Remove Image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 border-2 border-dashed border-border/60 rounded-xl flex flex-col items-center justify-center text-center gap-3">
            <p className="text-xs text-muted-foreground">Grid is empty. Add 2 or more images to create a side-by-side gallery.</p>
            <Button type="button" size="sm" onClick={() => fileInputRef.current?.click()} className="gap-1.5">
              <Upload className="w-3.5 h-3.5" /> Upload Photos
            </Button>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2">
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Add image via URL (https://...)"
            className="text-xs h-8"
          />
          <Button type="button" size="sm" variant="secondary" onClick={handleAddUrl} className="h-8 text-xs">
            Add
          </Button>
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGridUpload} />
      </div>
    </BaseBlockWrapper>
  );
};

// ==========================================
// 4. VIDEO BLOCK EDITOR
// ==========================================
export const VideoBlockEditor: React.FC<BlockEditorProps> = (props) => {
  const [videoUrl, setVideoUrl] = useState(props.block.content?.url || '');

  const handleBlur = () => {
    props.onChange({
      ...props.block,
      content: { ...props.block.content, url: videoUrl },
    });
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return null;
    const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?rel=0&modestbranding=1`;
    const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    return null;
  };

  const embedSrc = getEmbedUrl(videoUrl);

  return (
    <BaseBlockWrapper {...props} hideBorder={true}>
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1115] overflow-hidden p-5 shadow-sm space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5 text-primary" /> Video URL / Embed Link
          </label>
          <div className="flex gap-2">
            <Input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              onBlur={handleBlur}
              placeholder="Paste YouTube, Vimeo, or MP4 video URL..."
              className="text-xs"
            />
            <Button type="button" size="sm" onClick={handleBlur}>
              Set Video
            </Button>
          </div>
        </div>

        {videoUrl && (
          <div className="rounded-xl overflow-hidden border border-border bg-black aspect-video flex items-center justify-center">
            {embedSrc ? (
              <iframe
                src={embedSrc}
                title="Video Preview"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video src={videoUrl} controls className="w-full h-full object-contain" />
            )}
          </div>
        )}
      </div>
    </BaseBlockWrapper>
  );
};

// ==========================================
// 5. EMBED BLOCK EDITOR
// ==========================================
export const EmbedBlockEditor: React.FC<BlockEditorProps> = (props) => {
  return (
    <BaseBlockWrapper {...props}>
      <div className="space-y-3">
        <textarea
          className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-mono text-xs focus:ring-1 focus:ring-primary outline-none"
          rows={3}
          placeholder='<iframe src="https://www.figma.com/embed?..." width="100%" height="450"></iframe>'
          value={props.block.content?.code || ''}
          onChange={(e) =>
            props.onChange({
              ...props.block,
              content: { ...props.block.content, code: e.target.value },
            })
          }
        />
        {props.block.content?.code && (
          <div 
            className="rounded-xl overflow-hidden border border-border"
            dangerouslySetInnerHTML={{ __html: props.block.content.code }}
          />
        )}
      </div>
    </BaseBlockWrapper>
  );
};
