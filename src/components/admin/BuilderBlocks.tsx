import React from 'react';

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

const BaseBlockWrapper: React.FC<BlockEditorProps & { children: React.ReactNode }> = ({
  block,
  onMoveUp,
  onMoveDown,
  onDelete,
  isFirst,
  isLast,
  children,
}) => {
  return (
    <div className="relative border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg p-4 mb-4 shadow-sm group transition-all">
      <div className="absolute right-2 top-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30"
          title="Move Up"
        >
          &uarr;
        </button>
        <button
          onClick={onMoveDown}
          disabled={isLast}
          className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 disabled:opacity-30"
          title="Move Down"
        >
          &darr;
        </button>
        <button
          onClick={onDelete}
          className="p-1 text-red-500 hover:text-red-700"
          title="Delete Block"
        >
          &times;
        </button>
      </div>
      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
        {block.type.replace('_', ' ')} Block
      </div>
      <div>{children}</div>
    </div>
  );
};

export const TextBlockEditor: React.FC<BlockEditorProps> = (props) => {
  return (
    <BaseBlockWrapper {...props}>
      <textarea
        className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        placeholder="Enter your text here..."
        value={props.block.content?.text || ''}
        onChange={(e) =>
          props.onChange({
            ...props.block,
            content: { ...props.block.content, text: e.target.value },
          })
        }
      />
    </BaseBlockWrapper>
  );
};

export const ImageBlockEditor: React.FC<BlockEditorProps> = (props) => {
  return (
    <BaseBlockWrapper {...props}>
      <input
        type="text"
        className="w-full p-2 mb-2 border border-slate-200 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Image URL"
        value={props.block.content?.url || ''}
        onChange={(e) =>
          props.onChange({
            ...props.block,
            content: { ...props.block.content, url: e.target.value },
          })
        }
      />
      <input
        type="text"
        className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Caption (optional)"
        value={props.block.content?.caption || ''}
        onChange={(e) =>
          props.onChange({
            ...props.block,
            content: { ...props.block.content, caption: e.target.value },
          })
        }
      />
      {props.block.content?.url && (
        <div className="mt-4">
          <img
            src={props.block.content.url}
            alt="Preview"
            className="max-h-48 object-contain rounded-md"
          />
        </div>
      )}
    </BaseBlockWrapper>
  );
};

export const ImageGridBlockEditor: React.FC<BlockEditorProps> = (props) => {
  const images: string[] = props.block.content?.images || [];

  const handleAddImage = () => {
    props.onChange({
      ...props.block,
      content: { ...props.block.content, images: [...images, ''] },
    });
  };

  const handleUpdateImage = (index: number, url: string) => {
    const newImages = [...images];
    newImages[index] = url;
    props.onChange({
      ...props.block,
      content: { ...props.block.content, images: newImages },
    });
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    props.onChange({
      ...props.block,
      content: { ...props.block.content, images: newImages },
    });
  };

  return (
    <BaseBlockWrapper {...props}>
      <div className="space-y-2 mb-3">
        {images.map((url, i) => (
          <div key={i} className="flex space-x-2">
            <input
              type="text"
              className="flex-1 p-2 border border-slate-200 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Image URL ${i + 1}`}
              value={url}
              onChange={(e) => handleUpdateImage(i, e.target.value)}
            />
            <button
              onClick={() => handleRemoveImage(i)}
              className="px-3 py-2 text-red-500 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={handleAddImage}
        className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 text-sm font-medium transition-colors"
      >
        + Add Image to Grid
      </button>
    </BaseBlockWrapper>
  );
};

export const VideoBlockEditor: React.FC<BlockEditorProps> = (props) => {
  return (
    <BaseBlockWrapper {...props}>
      <input
        type="text"
        className="w-full p-2 border border-slate-200 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Video URL (e.g., MP4 link)"
        value={props.block.content?.url || ''}
        onChange={(e) =>
          props.onChange({
            ...props.block,
            content: { ...props.block.content, url: e.target.value },
          })
        }
      />
    </BaseBlockWrapper>
  );
};

export const EmbedBlockEditor: React.FC<BlockEditorProps> = (props) => {
  return (
    <BaseBlockWrapper {...props}>
      <textarea
        className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-md bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
        rows={3}
        placeholder="Paste embed code (e.g., YouTube iframe)"
        value={props.block.content?.code || ''}
        onChange={(e) =>
          props.onChange({
            ...props.block,
            content: { ...props.block.content, code: e.target.value },
          })
        }
      />
    </BaseBlockWrapper>
  );
};
