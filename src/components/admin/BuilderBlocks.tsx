import React, { useRef, useState, useEffect } from 'react';
import { 
  ChevronDown, Type, Bold, Italic, Underline, AlignLeft, 
  AlignCenter, AlignRight, Link2, Link2Off, RemoveFormatting, WrapText,
  Trash2, Upload, GripVertical
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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
      <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col space-y-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 shadow-sm rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:hover:text-slate-400"
        >
          <GripVertical className="w-4 h-4 rotate-180" />
        </button>
        <button
          onClick={onDelete}
          className="p-1.5 text-red-400 hover:text-white hover:bg-red-500 bg-white dark:bg-slate-800 shadow-sm rounded-md border border-slate-200 dark:border-slate-700 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={isLast}
          className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-800 shadow-sm rounded-md border border-slate-200 dark:border-slate-700 disabled:opacity-30 disabled:hover:text-slate-400"
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
// TEXT EDITOR
// ==========================================
export const TextBlockEditor: React.FC<BlockEditorProps> = (props) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showParaMenu, setShowParaMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showSizeMenu, setShowSizeMenu] = useState(false);

  // Initialize content once
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
      <div className="border border-slate-200 dark:border-slate-800 rounded-lg shadow-sm overflow-visible bg-white dark:bg-[#0f1115] focus-within:ring-1 focus-within:ring-slate-300 transition-all relative">
        {/* Dark Toolbar */}
        <div className="bg-[#1a1a1a] flex flex-wrap items-center text-white px-2 py-1.5 rounded-t-lg select-none relative z-10">
          
          {/* Paragraph Style Dropdown */}
          <div className="relative">
            <button onClick={() => setShowParaMenu(!showParaMenu)} className="flex items-center gap-1.5 hover:bg-white/10 px-3 py-1.5 rounded transition-colors text-sm font-medium">
              Paragraph <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            {showParaMenu && (
              <div className="absolute top-full left-0 mt-1 w-32 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg overflow-hidden py-1">
                {['H1', 'H2', 'H3', 'P'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => { exec('formatBlock', tag); setShowParaMenu(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    {tag === 'P' ? 'Paragraph' : `Heading ${tag.replace('H', '')}`}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="w-px h-5 bg-white/20 mx-1"></div>
          
          {/* Font Family Dropdown */}
          <div className="relative">
            <button onClick={() => setShowFontMenu(!showFontMenu)} className="flex items-center gap-1.5 hover:bg-white/10 px-3 py-1.5 rounded transition-colors text-sm">
              Helvetica <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            {showFontMenu && (
              <div className="absolute top-full left-0 mt-1 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg overflow-hidden py-1">
                {['Helvetica', 'Arial', 'Times New Roman', 'Courier New', 'Georgia'].map((font) => (
                  <button
                    key={font}
                    onClick={() => { exec('fontName', font); setShowFontMenu(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                    style={{ fontFamily: font }}
                  >
                    {font}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="w-px h-5 bg-white/20 mx-1"></div>
          
          {/* Font Size Dropdown */}
          <div className="relative">
            <button onClick={() => setShowSizeMenu(!showSizeMenu)} className="flex items-center gap-1.5 hover:bg-white/10 px-3 py-1.5 rounded transition-colors text-sm">
              20 <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            {showSizeMenu && (
              <div className="absolute top-full left-0 mt-1 w-16 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg overflow-hidden py-1">
                {[1, 2, 3, 4, 5, 6, 7].map((size) => (
                  <button
                    key={size}
                    onClick={() => { exec('fontSize', size.toString()); setShowSizeMenu(false); }}
                    className="w-full text-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="w-px h-5 bg-white/20 mx-1"></div>

          {/* Inline Styles */}
          <div className="flex items-center gap-0.5 px-2">
            <div className="relative">
               <button onClick={() => setShowColorMenu(!showColorMenu)} className="p-1.5 hover:bg-white/10 rounded transition-colors text-sm font-serif border-b-2 border-transparent hover:border-white/40">
                T
               </button>
               {showColorMenu && (
                <div className="absolute top-full left-0 mt-1 p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md shadow-lg grid grid-cols-4 gap-1 w-32">
                  {['#000000', '#ffffff', '#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7', '#64748b'].map((color) => (
                    <button
                      key={color}
                      onClick={() => { exec('foreColor', color); setShowColorMenu(false); }}
                      className="w-6 h-6 rounded border border-slate-200 dark:border-slate-700"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
               )}
            </div>
            
            <button onClick={() => exec('bold')} className="p-1.5 hover:bg-white/10 rounded transition-colors text-sm font-serif font-bold">
              B
            </button>
            <button onClick={() => exec('italic')} className="p-1.5 hover:bg-white/10 rounded transition-colors text-sm font-serif italic">
              I
            </button>
            <button onClick={() => exec('underline')} className="p-1.5 hover:bg-white/10 rounded transition-colors text-sm font-serif underline">
              U
            </button>
          </div>

          <div className="w-px h-5 bg-white/20 mx-1"></div>

          {/* Alignment */}
          <div className="flex items-center gap-0.5 px-2">
            <button onClick={() => exec('justifyLeft')} className="p-1.5 hover:bg-white/10 rounded transition-colors">
              <AlignLeft className="w-4 h-4" />
            </button>
            <button onClick={() => exec('justifyCenter')} className="p-1.5 hover:bg-white/10 rounded transition-colors">
              <AlignCenter className="w-4 h-4" />
            </button>
            <button onClick={() => exec('justifyRight')} className="p-1.5 hover:bg-white/10 rounded transition-colors">
              <AlignRight className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-5 bg-white/20 mx-1"></div>

          {/* Links & Format */}
          <div className="flex items-center gap-0.5 px-2">
            <button onClick={() => { const url = prompt('URL:'); if(url) exec('createLink', url); }} className="p-1.5 hover:bg-white/10 rounded transition-colors">
              <Link2 className="w-4 h-4" />
            </button>
            <button onClick={() => exec('unlink')} className="p-1.5 hover:bg-white/10 rounded transition-colors opacity-50 hover:opacity-100">
              <Link2Off className="w-4 h-4" />
            </button>
            <button onClick={() => exec('removeFormat')} className="p-1.5 hover:bg-white/10 rounded transition-colors">
              <RemoveFormatting className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Content Editable Area */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onBlur={handleInput}
          className="w-full p-6 text-slate-900 dark:text-slate-100 min-h-[160px] outline-none prose prose-slate dark:prose-invert max-w-none empty:before:content-['Enter_your_text_here...'] empty:before:text-slate-400"
          style={{ fontSize: '18px', lineHeight: '1.6' }}
        />
      </div>
    </BaseBlockWrapper>
  );
};


// ==========================================
// IMAGE EDITOR
// ==========================================
export const ImageBlockEditor: React.FC<BlockEditorProps> = (props) => {
  return (
    <BaseBlockWrapper {...props} hideBorder={true}>
      <div className="relative group/image">
        {props.block.content?.url ? (
          <img
            src={props.block.content.url}
            alt="Project Asset"
            className="w-full h-auto object-cover rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
          />
        ) : (
          <div className="w-full aspect-[21/9] bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center">
            <span className="text-slate-400 font-medium">Image Uploading...</span>
          </div>
        )}
      </div>
    </BaseBlockWrapper>
  );
};


// ==========================================
// IMAGE GRID EDITOR
// ==========================================
export const ImageGridBlockEditor: React.FC<BlockEditorProps> = (props) => {
  const images: string[] = props.block.content?.images || [];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleGridUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const toastId = toast.loading(`Uploading ${files.length} images...`);
    const newUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        try {
          const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
          const fileName = `works/grid-${Date.now()}-${Math.random().toString(36).substr(2, 6)}.${ext}`;
          
          const { data, error } = await supabase.storage
            .from('media-uploads')
            .upload(fileName, file, { cacheControl: '3600', upsert: false });

          if (error) throw error;
          
          if (data) {
            const { data: urlData } = supabase.storage.from('media-uploads').getPublicUrl(data.path);
            newUrls.push(urlData.publicUrl);
          }
        } catch (uploadErr) {
          console.error('Supabase upload failed, falling back to local base64:', uploadErr);
          // Fallback to base64 data URL
          const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve((event.target?.result as string) || '');
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
          });
          if (dataUrl) newUrls.push(dataUrl);
        }
      }

      if (newUrls.length > 0) {
        props.onChange({
          ...props.block,
          content: { ...props.block.content, images: [...images, ...newUrls] },
        });
        toast.success(`Successfully added ${newUrls.length} images to grid!`, { id: toastId });
      } else {
        toast.error('Failed to add images.', { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred during upload.', { id: toastId });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    props.onChange({
      ...props.block,
      content: { ...props.block.content, images: newImages },
    });
  };

  return (
    <BaseBlockWrapper {...props} hideBorder={true}>
      <div className="bg-white dark:bg-[#0f1115] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {images.map((url, i) => (
              <div key={i} className="relative group/griditem aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
                <img src={url} alt={`Grid item ${i}`} className="w-full h-full object-cover" />
                <button
                  onClick={() => handleRemoveImage(i)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-md opacity-0 group-hover/griditem:opacity-100 transition-opacity shadow-sm"
                  title="Remove Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleGridUpload}
        />
        
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full py-12 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 hover:text-blue-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex flex-col items-center justify-center gap-3 disabled:opacity-50"
        >
          {isUploading ? (
            <span className="font-medium animate-pulse">Uploading Images...</span>
          ) : (
            <>
              <Upload className="w-8 h-8 opacity-70" />
              <span className="font-medium">Upload Photos to Grid</span>
              <span className="text-xs opacity-70">You can select multiple photos at once</span>
            </>
          )}
        </button>
      </div>
    </BaseBlockWrapper>
  );
};


// ==========================================
// VIDEO EDITOR
// ==========================================
export const VideoBlockEditor: React.FC<BlockEditorProps> = (props) => {
  return (
    <BaseBlockWrapper {...props} hideBorder={true}>
      <div className="relative group/video w-full rounded-xl overflow-hidden bg-[#0f1115] border border-slate-800 aspect-video flex items-center justify-center shadow-sm">
        {props.block.content?.url ? (
          <video src={props.block.content.url} controls className="w-full h-full object-contain" />
        ) : (
          <span className="text-slate-400 font-medium">Video Uploading...</span>
        )}
      </div>
    </BaseBlockWrapper>
  );
};


// ==========================================
// EMBED EDITOR
// ==========================================
export const EmbedBlockEditor: React.FC<BlockEditorProps> = (props) => {
  return (
    <BaseBlockWrapper {...props}>
      <textarea
        className="w-full p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm shadow-inner"
        rows={4}
        placeholder="Paste embed iframe code here (e.g., YouTube, Figma, Spotify)"
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
          className="mt-4 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700"
          dangerouslySetInnerHTML={{ __html: props.block.content.code }}
        />
      )}
    </BaseBlockWrapper>
  );
};
