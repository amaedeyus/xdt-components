import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Copy, Check, Search } from 'lucide-react';

interface IconMeta {
  name: string;
  category: string;
  component: React.ComponentType<{ size?: number; className?: string }>;
}

const ICON_REGISTRY: IconMeta[] = [
  // Navigation & UI
  { name: 'ArrowRight', category: 'Navigation & UI', component: Icons.ArrowRight },
  { name: 'ArrowLeft', category: 'Navigation & UI', component: Icons.ArrowLeft },
  { name: 'ArrowUp', category: 'Navigation & UI', component: Icons.ArrowUp },
  { name: 'ArrowDown', category: 'Navigation & UI', component: Icons.ArrowDown },
  { name: 'ChevronDown', category: 'Navigation & UI', component: Icons.ChevronDown },
  { name: 'ChevronUp', category: 'Navigation & UI', component: Icons.ChevronUp },
  { name: 'ChevronRight', category: 'Navigation & UI', component: Icons.ChevronRight },
  { name: 'Menu', category: 'Navigation & UI', component: Icons.Menu },
  { name: 'X', category: 'Navigation & UI', component: Icons.X },
  { name: 'Search', category: 'Navigation & UI', component: Icons.Search },
  { name: 'Filter', category: 'Navigation & UI', component: Icons.Filter },
  { name: 'Home', category: 'Navigation & UI', component: Icons.Home },
  { name: 'Settings', category: 'Navigation & UI', component: Icons.Settings },
  { name: 'Grid', category: 'Navigation & UI', component: Icons.Grid },
  { name: 'MoreVertical', category: 'Navigation & UI', component: Icons.MoreVertical },
  { name: 'MoreHorizontal', category: 'Navigation & UI', component: Icons.MoreHorizontal },

  // Actions & Editing
  { name: 'Edit', category: 'Actions & Editing', component: Icons.Edit },
  { name: 'Trash2', category: 'Actions & Editing', component: Icons.Trash2 },
  { name: 'Copy', category: 'Actions & Editing', component: Icons.Copy },
  { name: 'Check', category: 'Actions & Editing', component: Icons.Check },
  { name: 'Download', category: 'Actions & Editing', component: Icons.Download },
  { name: 'Upload', category: 'Actions & Editing', component: Icons.Upload },
  { name: 'Plus', category: 'Actions & Editing', component: Icons.Plus },
  { name: 'Minus', category: 'Actions & Editing', component: Icons.Minus },
  { name: 'Share2', category: 'Actions & Editing', component: Icons.Share2 },
  { name: 'RefreshCw', category: 'Actions & Editing', component: Icons.RefreshCw },
  { name: 'Maximize', category: 'Actions & Editing', component: Icons.Maximize },
  { name: 'Minimize', category: 'Actions & Editing', component: Icons.Minimize },

  // Communication & Feedback
  { name: 'Mail', category: 'Communication', component: Icons.Mail },
  { name: 'MessageSquare', category: 'Communication', component: Icons.MessageSquare },
  { name: 'Bell', category: 'Communication', component: Icons.Bell },
  { name: 'Send', category: 'Communication', component: Icons.Send },
  { name: 'Heart', category: 'Communication', component: Icons.Heart },
  { name: 'ThumbsUp', category: 'Communication', component: Icons.ThumbsUp },
  { name: 'AlertCircle', category: 'Communication', component: Icons.AlertCircle },
  { name: 'AlertTriangle', category: 'Communication', component: Icons.AlertTriangle },
  { name: 'Info', category: 'Communication', component: Icons.Info },
  { name: 'CheckCircle2', category: 'Communication', component: Icons.CheckCircle2 },
  { name: 'Sparkles', category: 'Communication', component: Icons.Sparkles },

  // Media, Files & Tech
  { name: 'File', category: 'Media & Code', component: Icons.File },
  { name: 'Folder', category: 'Media & Code', component: Icons.Folder },
  { name: 'Image', category: 'Media & Code', component: Icons.Image },
  { name: 'Video', category: 'Media & Code', component: Icons.Video },
  { name: 'Music', category: 'Media & Code', component: Icons.Music },
  { name: 'Code2', category: 'Media & Code', component: Icons.Code2 },
  { name: 'Terminal', category: 'Media & Code', component: Icons.Terminal },
  { name: 'Database', category: 'Media & Code', component: Icons.Database },
  { name: 'Cpu', category: 'Media & Code', component: Icons.Cpu },
  { name: 'Layers', category: 'Media & Code', component: Icons.Layers },

  // Security & Users
  { name: 'Lock', category: 'Security & Access', component: Icons.Lock },
  { name: 'Unlock', category: 'Security & Access', component: Icons.Unlock },
  { name: 'Shield', category: 'Security & Access', component: Icons.Shield },
  { name: 'Key', category: 'Security & Access', component: Icons.Key },
  { name: 'Eye', category: 'Security & Access', component: Icons.Eye },
  { name: 'EyeOff', category: 'Security & Access', component: Icons.EyeOff },
  { name: 'User', category: 'Security & Access', component: Icons.User },
  { name: 'Users', category: 'Security & Access', component: Icons.Users },
];

export interface IconLibraryProps {
  activeThemeId: string;
}

export const IconLibrary: React.FC<IconLibraryProps> = ({ activeThemeId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [iconSize, setIconSize] = useState<number>(20);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  const categories = ['All', 'Navigation & UI', 'Actions & Editing', 'Communication', 'Media & Code', 'Security & Access'];

  const filteredIcons = ICON_REGISTRY.filter((icon) => {
    const matchesSearch = icon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || icon.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCopy = (iconName: string) => {
    const snippet = `<${iconName} size={${iconSize}} />`;
    navigator.clipboard.writeText(snippet);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 2000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header & Controls */}
      <div className="bg-[#10131A] p-6 space-y-4">
        <div>
          <h2 className="font-display text-xl font-bold text-[#FFFFFF]">
            Icon Library
          </h2>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
            Vector icons styled through active theme tokens and surfaces
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search icons by name..."
              className="w-full bg-[#171B26] text-sm text-[#F3F4F6] pl-9 pr-4 py-2 border border-[#2D3345] focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          {/* Size Selector */}
          <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
            <span>Size:</span>
            {[16, 20, 24, 32].map((s) => (
              <button
                key={s}
                onClick={() => setIconSize(s)}
                className={`px-2.5 py-1 transition-colors ${
                  iconSize === s
                    ? 'bg-[#3B82F6] text-white font-semibold'
                    : 'bg-[#171B26] text-[#D1D5DB] hover:bg-[#222838]'
                }`}
              >
                {s}px
              </button>
            ))}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#1F2636] text-white font-medium border-b border-[#3B82F6]'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-[#151922]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Themed Icon Grid */}
      <div
        data-theme={activeThemeId}
        className="theme-preview-wrapper p-8"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredIcons.map((icon) => {
            const IconComponent = icon.component;
            const isCopied = copiedIcon === icon.name;

            return (
              <button
                key={icon.name}
                onClick={() => handleCopy(icon.name)}
                title={`Click to copy <${icon.name} />`}
                className="theme-surface p-4 flex flex-col items-center justify-center gap-2.5 transition-all text-center group cursor-pointer"
              >
                <div
                  className="p-3 flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{
                    borderRadius: 'var(--theme-radius-sm, 6px)',
                    backgroundColor: 'var(--theme-input-bg, rgba(0,0,0,0.04))',
                    color: 'var(--theme-text)',
                  }}
                >
                  <IconComponent size={iconSize} />
                </div>

                <span
                  className="text-xs font-medium truncate max-w-full"
                  style={{ color: 'var(--theme-text)' }}
                >
                  {icon.name}
                </span>

                <div className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--theme-text-muted)' }}>
                  {isCopied ? (
                    <>
                      <Check size={11} className="text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={11} className="opacity-60 group-hover:opacity-100" />
                      <span>Copy JSX</span>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {filteredIcons.length === 0 && (
          <div className="py-12 text-center text-sm" style={{ color: 'var(--theme-text-muted)' }}>
            No icons found matching "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};
