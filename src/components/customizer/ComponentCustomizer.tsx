import React, { useState, useEffect } from 'react';
import {
  FONT_OPTIONS,
  HOVER_ANIMATIONS,
  ACTIVE_ANIMATIONS,
  INVALID_ANIMATIONS,
  GRADIENT_DIRECTIONS,
  type ComponentKey,
  type ComponentStyleOverride,
  type ButtonVariantKey,
  type BorderStyle,
} from '../../types/customizer';
import type { ThemeInfo } from '../../data/themes';
import { ColorPickerField } from './ColorPickerField';
import { inspectThemeDefaults } from '../../utils/themeInspector';
import { RotateCcw, X, Sliders, ArrowLeftRight } from 'lucide-react';

export interface ComponentCustomizerProps {
  overrides: Record<ComponentKey, ComponentStyleOverride>;
  onUpdateOverride: (key: ComponentKey, updates: Partial<ComponentStyleOverride>) => void;
  onResetComponent: (key: ComponentKey) => void;
  onResetAll: () => void;
  isDarkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string; // 'all' | 'buttons' | 'inputs' | 'containers' | 'navbar' | 'dropdowns' | 'progress' | 'datadisplay' | 'icons'
  activeTheme: ThemeInfo;
}

export const ComponentCustomizer: React.FC<ComponentCustomizerProps> = ({
  overrides,
  onUpdateOverride,
  onResetComponent,
  onResetAll,
  isDarkMode,
  isOpen,
  onClose,
  activeCategory,
  activeTheme,
}) => {
  // Map category to component key
  const categoryToKey: Record<string, ComponentKey> = {
    buttons: 'button',
    inputs: 'input',
    containers: 'container',
    navbar: 'navbar',
    dropdowns: 'dropdown',
    progress: 'progressbar',
    datadisplay: 'datadisplay',
  };

  const initialKey: ComponentKey = categoryToKey[activeCategory] || 'button';
  const [activeComponent, setActiveComponent] = useState<ComponentKey>(initialKey);
  const [activeButtonVariant, setActiveButtonVariant] = useState<ButtonVariantKey>('primary');
  const [activeSection, setActiveSection] = useState<
    'colors' | 'borders' | 'shadows' | 'typography' | 'animations' | 'special'
  >('colors');

  // Sync active component when activeCategory changes
  useEffect(() => {
    if (categoryToKey[activeCategory]) {
      setActiveComponent(categoryToKey[activeCategory]);
    }
  }, [activeCategory]);

  if (!isOpen) return null;

  // Determine allowed component list based on category
  const isCategoryFiltered = activeCategory !== 'all' && !!categoryToKey[activeCategory];
  const renderedComponentKey = isCategoryFiltered ? categoryToKey[activeCategory] : activeComponent;

  // Inspect theme defaults dynamically from resolved CSS / DOM
  const themeDefaults = inspectThemeDefaults(
    activeTheme,
    renderedComponentKey,
    activeButtonVariant
  );

  const rawOverride = overrides[renderedComponentKey] || {};

  // For button, support per-variant overrides
  let currentTargetOverride = rawOverride;
  if (renderedComponentKey === 'button') {
    const variantOverride = rawOverride.buttonVariants?.[activeButtonVariant];
    currentTargetOverride = { ...rawOverride, ...(variantOverride || {}) };
  }

  // Pre-populated fields: user override -> theme default
  const useGradient = currentTargetOverride.useGradient ?? themeDefaults.useGradient ?? false;
  const gradientDir = currentTargetOverride.gradientDirection || themeDefaults.gradientDirection || '135deg';
  const gradientStart = currentTargetOverride.gradientStart || themeDefaults.gradientStart || activeTheme.accent;
  const gradientEnd = currentTargetOverride.gradientEnd || themeDefaults.gradientEnd || '#6366F1';

  const bgColor = currentTargetOverride.bg || themeDefaults.bg || activeTheme.accent;
  const textColor = currentTargetOverride.textColor || themeDefaults.textColor || '#FFFFFF';

  const borderWidth = currentTargetOverride.borderWidth ?? themeDefaults.borderWidth ?? 1;
  const borderStyle: BorderStyle = currentTargetOverride.borderStyle ?? themeDefaults.borderStyle ?? 'solid';
  const borderColor = currentTargetOverride.borderColor || themeDefaults.borderColor || activeTheme.accent;
  const borderRadius = currentTargetOverride.borderRadius ?? themeDefaults.borderRadius ?? 8;

  const shadowX = currentTargetOverride.shadowOffsetX ?? themeDefaults.shadowOffsetX ?? 0;
  const shadowY = currentTargetOverride.shadowOffsetY ?? themeDefaults.shadowOffsetY ?? 4;
  const shadowBlur = currentTargetOverride.shadowBlur ?? themeDefaults.shadowBlur ?? 12;
  const shadowSpread = currentTargetOverride.shadowSpread ?? themeDefaults.shadowSpread ?? 0;
  const shadowColor = currentTargetOverride.shadowColor || themeDefaults.shadowColor || 'rgba(0, 0, 0, 0.25)';

  const textShadowX = currentTargetOverride.textShadowOffsetX ?? themeDefaults.textShadowOffsetX ?? 0;
  const textShadowY = currentTargetOverride.textShadowOffsetY ?? themeDefaults.textShadowOffsetY ?? 1;
  const textShadowBlur = currentTargetOverride.textShadowBlur ?? themeDefaults.textShadowBlur ?? 2;
  const textShadowColor = currentTargetOverride.textShadowColor || themeDefaults.textShadowColor || 'rgba(0, 0, 0, 0.3)';

  const fontFamily = currentTargetOverride.fontFamily || themeDefaults.fontFamily || `'${activeTheme.font}', sans-serif`;
  const fontWeight = currentTargetOverride.fontWeight || themeDefaults.fontWeight || '600';
  const fontStyle = currentTargetOverride.fontStyle || themeDefaults.fontStyle || 'normal';

  const hoverAnimation = currentTargetOverride.hoverAnimation || 'none';
  const activeAnimation = currentTargetOverride.activeAnimation || 'none';
  const animAccentColor = currentTargetOverride.animAccentColor || themeDefaults.animAccentColor || activeTheme.accent;

  // Input & Form specifics
  const placeholderColor = currentTargetOverride.placeholderColor || themeDefaults.placeholderColor || '#9CA3AF';
  const placeholderFont = currentTargetOverride.placeholderFont || themeDefaults.placeholderFont || fontFamily;
  const placeholderStyle = currentTargetOverride.placeholderStyle || themeDefaults.placeholderStyle || 'normal';
  const invalidBorderColor = currentTargetOverride.invalidBorderColor || themeDefaults.invalidBorderColor || '#EF4444';
  const invalidAnimation = currentTargetOverride.invalidAnimation || themeDefaults.invalidAnimation || 'none';

  // Specific properties
  const orientation = currentTargetOverride.orientation || 'horizontal';
  const progressMode = currentTargetOverride.progressMode || 'controlled';
  const trackColor = currentTargetOverride.trackColor || (isDarkMode ? '#333333' : '#E5E7EB');
  const fillColor = currentTargetOverride.fillColor || activeTheme.accent;
  const thickness = currentTargetOverride.thickness ?? 10;
  const barHeight = currentTargetOverride.barHeight ?? 180;

  const tableHeaderFill = currentTargetOverride.tableHeaderFill || (isDarkMode ? '#262626' : '#F9FAFB');
  const tableRowHoverBg = currentTargetOverride.tableRowHoverBg || 'rgba(0, 77, 97, 0.15)';
  const tableBorderColor = currentTargetOverride.tableBorderColor || (isDarkMode ? '#333333' : '#E5E7EB');

  const handleUpdate = (updates: Partial<ComponentStyleOverride>) => {
    if (renderedComponentKey === 'button') {
      const existingVariants = rawOverride.buttonVariants || {};
      const currentVariantOverride = existingVariants[activeButtonVariant] || {};
      const updatedVariant = {
        ...currentVariantOverride,
        ...updates,
      };

      onUpdateOverride('button', {
        ...rawOverride,
        buttonVariants: {
          ...existingVariants,
          [activeButtonVariant]: updatedVariant,
        },
      });
    } else {
      onUpdateOverride(renderedComponentKey, updates);
    }
  };

  const handleSwapGradient = () => {
    handleUpdate({
      gradientStart: gradientEnd,
      gradientEnd: gradientStart,
    });
  };

  // Customizer drawer palette — elevated surface aligned with showcase shell
  // Dark: #3B1C32 elevated, #2A1428 deeper, text #F5F5F5, accent #6A1E55 / #A64D79
  // Light: #FFCEE3 elevated, #FFA8CF deeper, text #021A54, accent #FF85BB
  const bgSurface = isDarkMode ? '#3B1C32' : '#FFCEE3';
  const bgHeader = isDarkMode ? '#2A1428' : '#FFA8CF';
  const textPrimary = isDarkMode ? '#F5F5F5' : '#021A54';
  const textMuted = isDarkMode ? '#C9A8BB' : '#3A5080';
  const borderColorSolid = isDarkMode ? '#5A2E48' : '#F0A8CC';
  const accentPrimary = isDarkMode ? '#6A1E55' : '#FF85BB';
  const accentSecondary = isDarkMode ? '#A64D79' : '#FF85BB';

  const selectedHoverObj = HOVER_ANIMATIONS.find((a) => a.value === hoverAnimation);
  const selectedActiveObj = ACTIVE_ANIMATIONS.find((a) => a.value === activeAnimation);
  const showAnimAccent = Boolean(selectedHoverObj?.usesAccent || selectedActiveObj?.usesAccent);

  return (
    <aside
      className="w-80 md:w-96 flex flex-col shrink-0 transition-colors z-20 text-left"
      style={{
        backgroundColor: bgSurface,
        color: textPrimary,
        borderLeft: `1px solid ${borderColorSolid}`,
      }}
    >
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between"
        style={{
          backgroundColor: bgHeader,
          borderBottom: `1px solid ${borderColorSolid}`,
        }}
      >
        <div className="flex items-center gap-2">
          <Sliders size={15} style={{ color: textPrimary }} />
          <span className="font-display font-semibold text-sm tracking-normal">
            Component Customizer
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onResetAll}
            title="Reset All Component Overrides"
            className="p-1.5 transition-colors flex items-center gap-1 text-xs"
            style={{ color: textMuted }}
          >
            <RotateCcw size={12} />
            <span>Reset All</span>
          </button>

          <button
            onClick={onClose}
            className="p-1 transition-colors"
            style={{ color: textMuted }}
          >
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Context-Aware Indicator or Component Selector */}
      {!isCategoryFiltered ? (
        <div
          className="px-3 py-2 flex flex-wrap gap-1.5"
          style={{
            backgroundColor: isDarkMode ? '#1E1E1E' : '#F3F4F6',
            borderBottom: `1px solid ${borderColorSolid}`,
          }}
        >
          {(
            [
              { id: 'button', name: 'Buttons' },
              { id: 'input', name: 'Inputs' },
              { id: 'container', name: 'Containers' },
              { id: 'navbar', name: 'Navbar' },
              { id: 'dropdown', name: 'Dropdowns' },
              { id: 'progressbar', name: 'Progress' },
              { id: 'datadisplay', name: 'Data' },
            ] as const
          ).map((comp) => {
            const isSelected = activeComponent === comp.id;
            const hasCustom = !!overrides[comp.id] && Object.keys(overrides[comp.id]).length > 0;

            return (
              <button
                key={comp.id}
                onClick={() => setActiveComponent(comp.id)}
                className="px-2.5 py-1 text-xs font-medium transition-colors flex items-center gap-1.5"
                style={{
                  backgroundColor: isSelected ? accentPrimary : 'transparent',
                  color: isSelected ? '#F0F0F0' : textMuted,
                  borderBottom: isSelected ? `2px solid ${accentSecondary}` : 'none',
                }}
              >
                <span>{comp.name}</span>
                {hasCustom && <span className="w-1.5 h-1.5 rounded-full bg-[#822659]" />}
              </button>
            );
          })}
        </div>
      ) : (
        <div
          className="px-4 py-2 flex items-center justify-between text-xs"
          style={{
            backgroundColor: isDarkMode ? '#1E1E1E' : '#F3F4F6',
            borderBottom: `1px solid ${borderColorSolid}`,
          }}
        >
          <span className="font-semibold" style={{ color: textPrimary }}>
            Scoped to: {renderedComponentKey.toUpperCase()}
          </span>
          <span style={{ color: textMuted }}>
            {activeTheme.name} Defaults Loaded
          </span>
        </div>
      )}

      {/* Button Per-Variant Selector (Visible only when configuring Buttons) */}
      {renderedComponentKey === 'button' && (
        <div
          className="px-4 py-2 flex items-center gap-2 border-b text-xs"
          style={{
            backgroundColor: isDarkMode ? '#222222' : '#FFFFFF',
            borderColor: borderColorSolid,
          }}
        >
          <span className="font-semibold text-[11px]" style={{ color: textMuted }}>
            Variant:
          </span>
          {(['primary', 'secondary', 'outline', 'ghost'] as const).map((variant) => (
            <button
              key={variant}
              onClick={() => setActiveButtonVariant(variant)}
              className="px-2.5 py-1 capitalize text-xs font-medium transition-colors"
              style={{
                backgroundColor: activeButtonVariant === variant ? accentSecondary : 'transparent',
                color: activeButtonVariant === variant ? '#F0F0F0' : textMuted,
              }}
            >
              {variant}
            </button>
          ))}
        </div>
      )}

      {/* Control Tabs */}
      <div
        className="grid grid-cols-6 text-center text-xs font-medium border-b"
        style={{
          backgroundColor: bgHeader,
          borderColor: borderColorSolid,
        }}
      >
        {(
          [
            { id: 'colors', label: 'Color' },
            { id: 'borders', label: 'Border' },
            { id: 'shadows', label: 'Shadow' },
            { id: 'typography', label: 'Type' },
            { id: 'animations', label: 'Motion' },
            { id: 'special', label: 'Options' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className="py-2 text-[11px] transition-colors"
            style={{
              color: activeSection === tab.id ? '#F0F0F0' : textMuted,
              backgroundColor: activeSection === tab.id ? accentPrimary : 'transparent',
              borderBottom: activeSection === tab.id ? `2px solid ${accentSecondary}` : 'none',
              fontWeight: activeSection === tab.id ? 600 : 400,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Section Form Controls */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-xs">
        {/* Header & Reset this component */}
        <div
          className="flex items-center justify-between pb-2 border-b"
          style={{ borderColor: borderColorSolid }}
        >
          <span className="font-semibold capitalize text-sm" style={{ color: textPrimary }}>
            {renderedComponentKey === 'button'
              ? `Button (${activeButtonVariant})`
              : renderedComponentKey}
          </span>
          <button
            onClick={() => onResetComponent(renderedComponentKey)}
            className="text-[11px] flex items-center gap-1 transition-colors"
            style={{ color: textMuted }}
          >
            <RotateCcw size={11} />
            <span>Reset {renderedComponentKey}</span>
          </button>
        </div>

        {/* 1. Colors & Surface */}
        {activeSection === 'colors' && (
          <div className="space-y-4">
            {/* Fill Type Switch: Solid vs. Gradient */}
            <div className="space-y-1.5">
              <label className="font-semibold block" style={{ color: textPrimary }}>
                Fill Type
              </label>
              <div
                className="flex items-center p-0.5 border"
                style={{
                  backgroundColor: isDarkMode ? '#1A1A1A' : '#F3F4F6',
                  borderColor: borderColorSolid,
                }}
              >
                <button
                  type="button"
                  onClick={() => handleUpdate({ useGradient: false })}
                  className="flex-1 py-1.5 text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: !useGradient ? accentPrimary : 'transparent',
                    color: !useGradient ? '#F0F0F0' : textMuted,
                  }}
                >
                  Solid Fill
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleUpdate({
                      useGradient: true,
                      gradientStart: gradientStart || bgColor,
                      gradientEnd: gradientEnd || '#6366F1',
                      gradientDirection: gradientDir,
                    })
                  }
                  className="flex-1 py-1.5 text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: useGradient ? accentPrimary : 'transparent',
                    color: useGradient ? '#F0F0F0' : textMuted,
                  }}
                >
                  Gradient Fill
                </button>
              </div>
            </div>

            {/* Gradient Controls */}
            {useGradient ? (
              <div className="space-y-3.5 pt-1">
                <div className="space-y-1.5">
                  <label className="font-semibold block" style={{ color: textPrimary }}>
                    Gradient Direction
                  </label>
                  <select
                    value={gradientDir}
                    onChange={(e) => handleUpdate({ gradientDirection: e.target.value })}
                    className="w-full px-3 py-1.5 border"
                    style={{
                      backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
                      borderColor: borderColorSolid,
                      color: textPrimary,
                    }}
                  >
                    {GRADIENT_DIRECTIONS.map((dir) => (
                      <option key={dir.value} value={dir.value}>
                        {dir.label}
                      </option>
                    ))}
                  </select>
                </div>

                <ColorPickerField
                  label="Start Color"
                  value={gradientStart}
                  onChange={(c) => handleUpdate({ gradientStart: c })}
                  isDarkMode={isDarkMode}
                />

                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={handleSwapGradient}
                    className="px-3 py-1 text-xs flex items-center gap-1.5 border transition-colors"
                    style={{
                      borderColor: borderColorSolid,
                      color: textMuted,
                      backgroundColor: isDarkMode ? '#262626' : '#F3F4F6',
                    }}
                    title="Swap gradient start and end colors"
                  >
                    <ArrowLeftRight size={12} />
                    <span>Swap Colors</span>
                  </button>
                </div>

                <ColorPickerField
                  label="End Color"
                  value={gradientEnd}
                  onChange={(c) => handleUpdate({ gradientEnd: c })}
                  isDarkMode={isDarkMode}
                />
              </div>
            ) : (
              <ColorPickerField
                label="Fill / Background Color"
                value={bgColor}
                onChange={(c) => handleUpdate({ bg: c })}
                isDarkMode={isDarkMode}
              />
            )}

            <div className="pt-2 border-t" style={{ borderColor: borderColorSolid }}>
              <ColorPickerField
                label="Text Color"
                value={textColor}
                onChange={(c) => handleUpdate({ textColor: c })}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        )}

        {/* 2. Borders & Geometry */}
        {activeSection === 'borders' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between" style={{ color: textPrimary }}>
                <label className="font-semibold">Border Width</label>
                <span className="font-mono text-[11px]">{borderWidth}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                value={borderWidth}
                onChange={(e) => handleUpdate({ borderWidth: parseInt(e.target.value, 10) })}
                className="w-full h-1.5 cursor-pointer accent-[#004D61]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold block" style={{ color: textPrimary }}>
                Border Style
              </label>
              <select
                value={borderStyle}
                onChange={(e) => handleUpdate({ borderStyle: e.target.value as BorderStyle })}
                className="w-full px-3 py-1.5 border"
                style={{
                  backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
                  borderColor: borderColorSolid,
                  color: textPrimary,
                }}
              >
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <option value="double">Double</option>
                <option value="none">None</option>
              </select>
            </div>

            <ColorPickerField
              label="Border Color"
              value={borderColor}
              onChange={(c) => handleUpdate({ borderColor: c })}
              isDarkMode={isDarkMode}
            />

            <div className="space-y-1.5">
              <div className="flex justify-between" style={{ color: textPrimary }}>
                <label className="font-semibold">Border Radius</label>
                <span className="font-mono text-[11px]">{borderRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="48"
                value={borderRadius}
                onChange={(e) => handleUpdate({ borderRadius: parseInt(e.target.value, 10) })}
                className="w-full h-1.5 cursor-pointer accent-[#004D61]"
              />
            </div>
          </div>
        )}

        {/* 3. Shadows (Box Shadow & Text Shadow) */}
        {activeSection === 'shadows' && (
          <div className="space-y-5">
            {/* Box Shadow */}
            <div className="space-y-3">
              <span
                className="font-bold text-[11px] uppercase tracking-wider block"
                style={{ color: textPrimary }}
              >
                Box Shadow
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex justify-between" style={{ color: textMuted }}>
                    <span>Offset X</span>
                    <span className="font-mono">{shadowX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="20"
                    value={shadowX}
                    onChange={(e) => handleUpdate({ shadowOffsetX: parseInt(e.target.value, 10) })}
                    className="w-full h-1.5 accent-[#004D61]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between" style={{ color: textMuted }}>
                    <span>Offset Y</span>
                    <span className="font-mono">{shadowY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="20"
                    value={shadowY}
                    onChange={(e) => handleUpdate({ shadowOffsetY: parseInt(e.target.value, 10) })}
                    className="w-full h-1.5 accent-[#004D61]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between" style={{ color: textMuted }}>
                    <span>Blur</span>
                    <span className="font-mono">{shadowBlur}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    value={shadowBlur}
                    onChange={(e) => handleUpdate({ shadowBlur: parseInt(e.target.value, 10) })}
                    className="w-full h-1.5 accent-[#004D61]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between" style={{ color: textMuted }}>
                    <span>Spread</span>
                    <span className="font-mono">{shadowSpread}px</span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="20"
                    value={shadowSpread}
                    onChange={(e) => handleUpdate({ shadowSpread: parseInt(e.target.value, 10) })}
                    className="w-full h-1.5 accent-[#004D61]"
                  />
                </div>
              </div>

              <ColorPickerField
                label="Shadow Color"
                value={shadowColor}
                onChange={(c) => handleUpdate({ shadowColor: c })}
                isDarkMode={isDarkMode}
              />
            </div>

            {/* Text Shadow */}
            <div
              className="space-y-3 pt-3 border-t"
              style={{ borderColor: borderColorSolid }}
            >
              <span
                className="font-bold text-[11px] uppercase tracking-wider block"
                style={{ color: textPrimary }}
              >
                Text Shadow
              </span>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]" style={{ color: textMuted }}>
                    <span>X</span>
                    <span>{textShadowX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    value={textShadowX}
                    onChange={(e) => handleUpdate({ textShadowOffsetX: parseInt(e.target.value, 10) })}
                    className="w-full h-1.5 accent-[#004D61]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]" style={{ color: textMuted }}>
                    <span>Y</span>
                    <span>{textShadowY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    value={textShadowY}
                    onChange={(e) => handleUpdate({ textShadowOffsetY: parseInt(e.target.value, 10) })}
                    className="w-full h-1.5 accent-[#004D61]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]" style={{ color: textMuted }}>
                    <span>Blur</span>
                    <span>{textShadowBlur}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={textShadowBlur}
                    onChange={(e) => handleUpdate({ textShadowBlur: parseInt(e.target.value, 10) })}
                    className="w-full h-1.5 accent-[#004D61]"
                  />
                </div>
              </div>

              <ColorPickerField
                label="Text Shadow Color"
                value={textShadowColor}
                onChange={(c) => handleUpdate({ textShadowColor: c })}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        )}

        {/* 4. Typography */}
        {activeSection === 'typography' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-semibold block" style={{ color: textPrimary }}>
                Font Family
              </label>
              <select
                value={fontFamily}
                onChange={(e) => handleUpdate({ fontFamily: e.target.value })}
                className="w-full px-3 py-1.5 border"
                style={{
                  backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
                  borderColor: borderColorSolid,
                  color: textPrimary,
                }}
              >
                {FONT_OPTIONS.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold block" style={{ color: textPrimary }}>
                Font Weight
              </label>
              <select
                value={fontWeight}
                onChange={(e) => handleUpdate({ fontWeight: e.target.value })}
                className="w-full px-3 py-1.5 border"
                style={{
                  backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
                  borderColor: borderColorSolid,
                  color: textPrimary,
                }}
              >
                <option value="400">400 (Regular)</option>
                <option value="500">500 (Medium)</option>
                <option value="600">600 (Semi-Bold)</option>
                <option value="700">700 (Bold)</option>
                <option value="800">800 (Extra-Bold)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold block" style={{ color: textPrimary }}>
                Font Style
              </label>
              <div className="flex gap-2">
                {(['normal', 'italic'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => handleUpdate({ fontStyle: s })}
                    className="flex-1 py-1.5 text-xs capitalize transition-colors border"
                    style={{
                      backgroundColor: fontStyle === s ? accentPrimary : 'transparent',
                      color: fontStyle === s ? '#F0F0F0' : textMuted,
                      borderColor: fontStyle === s ? accentSecondary : borderColorSolid,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. Interactive Animations */}
        {activeSection === 'animations' && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-semibold block" style={{ color: textPrimary }}>
                Hover Animation Preset
              </label>
              <select
                value={hoverAnimation}
                onChange={(e) => handleUpdate({ hoverAnimation: e.target.value as any })}
                className="w-full px-3 py-1.5 border"
                style={{
                  backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
                  borderColor: borderColorSolid,
                  color: textPrimary,
                }}
              >
                {HOVER_ANIMATIONS.map((anim) => (
                  <option key={anim.value} value={anim.value}>
                    {anim.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold block" style={{ color: textPrimary }}>
                OnClick / Active Animation Preset
              </label>
              <select
                value={activeAnimation}
                onChange={(e) => handleUpdate({ activeAnimation: e.target.value as any })}
                className="w-full px-3 py-1.5 border"
                style={{
                  backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
                  borderColor: borderColorSolid,
                  color: textPrimary,
                }}
              >
                {ACTIVE_ANIMATIONS.map((anim) => (
                  <option key={anim.value} value={anim.value}>
                    {anim.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Editable Animation Accent Color (shown when selected motion uses accent) */}
            {showAnimAccent && (
              <div className="pt-2 border-t space-y-2" style={{ borderColor: borderColorSolid }}>
                <ColorPickerField
                  label="Animation Accent / Glow Color"
                  value={animAccentColor}
                  onChange={(c) => handleUpdate({ animAccentColor: c })}
                  isDarkMode={isDarkMode}
                />
                <p className="text-[11px]" style={{ color: textMuted }}>
                  Configures the glow, pulse, or border highlight color for motion effects.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 6. Special Component-Specific Options */}
        {activeSection === 'special' && (
          <div className="space-y-4">
            {/* INPUTS & FORMS SPECIAL CONTROLS */}
            {renderedComponentKey === 'input' && (
              <>
                <div className="space-y-3 pb-3 border-b" style={{ borderColor: borderColorSolid }}>
                  <span
                    className="font-bold text-[11px] uppercase tracking-wider block"
                    style={{ color: textPrimary }}
                  >
                    Placeholder Styling
                  </span>

                  <ColorPickerField
                    label="Placeholder Text Color"
                    value={placeholderColor}
                    onChange={(c) => handleUpdate({ placeholderColor: c })}
                    isDarkMode={isDarkMode}
                  />

                  <div className="space-y-1.5">
                    <label className="font-semibold block" style={{ color: textPrimary }}>
                      Placeholder Font Family
                    </label>
                    <select
                      value={placeholderFont}
                      onChange={(e) => handleUpdate({ placeholderFont: e.target.value })}
                      className="w-full px-3 py-1.5 border"
                      style={{
                        backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
                        borderColor: borderColorSolid,
                        color: textPrimary,
                      }}
                    >
                      {FONT_OPTIONS.map((font) => (
                        <option key={font.value} value={font.value}>
                          {font.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold block" style={{ color: textPrimary }}>
                      Placeholder Font Style
                    </label>
                    <div className="flex gap-2">
                      {(['normal', 'italic'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => handleUpdate({ placeholderStyle: s })}
                          className="flex-1 py-1.5 text-xs capitalize transition-colors border"
                          style={{
                            backgroundColor: placeholderStyle === s ? accentPrimary : 'transparent',
                            color: placeholderStyle === s ? '#F0F0F0' : textMuted,
                            borderColor: placeholderStyle === s ? accentSecondary : borderColorSolid,
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <span
                    className="font-bold text-[11px] uppercase tracking-wider block"
                    style={{ color: textPrimary }}
                  >
                    Invalid State Styling
                  </span>

                  <ColorPickerField
                    label="Invalid State Border Color"
                    value={invalidBorderColor}
                    onChange={(c) => handleUpdate({ invalidBorderColor: c })}
                    isDarkMode={isDarkMode}
                  />

                  <div className="space-y-1.5">
                    <label className="font-semibold block" style={{ color: textPrimary }}>
                      Invalid State Animation
                    </label>
                    <select
                      value={invalidAnimation}
                      onChange={(e) => handleUpdate({ invalidAnimation: e.target.value as any })}
                      className="w-full px-3 py-1.5 border"
                      style={{
                        backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
                        borderColor: borderColorSolid,
                        color: textPrimary,
                      }}
                    >
                      {INVALID_ANIMATIONS.map((anim) => (
                        <option key={anim.value} value={anim.value}>
                          {anim.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* PROGRESS BAR SPECIAL CONTROLS */}
            {renderedComponentKey === 'progressbar' && (
              <>
                <div className="space-y-1.5">
                  <label className="font-semibold block" style={{ color: textPrimary }}>
                    Orientation
                  </label>
                  <div className="flex gap-2">
                    {(['horizontal', 'vertical'] as const).map((o) => (
                      <button
                        key={o}
                        onClick={() => handleUpdate({ orientation: o })}
                        className="flex-1 py-1.5 text-xs capitalize transition-colors border"
                        style={{
                          backgroundColor: orientation === o ? accentPrimary : 'transparent',
                          color: orientation === o ? '#F0F0F0' : textMuted,
                          borderColor: orientation === o ? accentSecondary : borderColorSolid,
                        }}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold block" style={{ color: textPrimary }}>
                    Reactive Mode
                  </label>
                  <select
                    value={progressMode}
                    onChange={(e) => handleUpdate({ progressMode: e.target.value as any })}
                    className="w-full px-3 py-1.5 border"
                    style={{
                      backgroundColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
                      borderColor: borderColorSolid,
                      color: textPrimary,
                    }}
                  >
                    <option value="controlled">Controlled (Static Value)</option>
                    <option value="steps">Steps (Step-Reactive)</option>
                    <option value="scroll">Scroll (Passive Scroll-Reactive)</option>
                  </select>
                </div>

                <ColorPickerField
                  label="Fill Bar Color"
                  value={fillColor}
                  onChange={(c) => handleUpdate({ fillColor: c })}
                  isDarkMode={isDarkMode}
                />

                <ColorPickerField
                  label="Track Background Color"
                  value={trackColor}
                  onChange={(c) => handleUpdate({ trackColor: c })}
                  isDarkMode={isDarkMode}
                />

                <div className="space-y-1.5">
                  <div className="flex justify-between" style={{ color: textPrimary }}>
                    <label className="font-semibold">Thickness / Width</label>
                    <span className="font-mono text-[11px]">{thickness}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="32"
                    value={thickness}
                    onChange={(e) => handleUpdate({ thickness: parseInt(e.target.value, 10) })}
                    className="w-full h-1.5 accent-[#004D61]"
                  />
                </div>

                {orientation === 'vertical' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between" style={{ color: textPrimary }}>
                      <label className="font-semibold">Vertical Height</label>
                      <span className="font-mono text-[11px]">{barHeight}px</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="320"
                      value={barHeight}
                      onChange={(e) => handleUpdate({ barHeight: parseInt(e.target.value, 10) })}
                      className="w-full h-1.5 accent-[#004D61]"
                    />
                  </div>
                )}
              </>
            )}

            {/* DATA DISPLAY SPECIAL CONTROLS */}
            {renderedComponentKey === 'datadisplay' && (
              <>
                <ColorPickerField
                  label="Table Header Fill"
                  value={tableHeaderFill}
                  onChange={(c) => handleUpdate({ tableHeaderFill: c })}
                  isDarkMode={isDarkMode}
                />

                <ColorPickerField
                  label="Row Hover Background"
                  value={tableRowHoverBg}
                  onChange={(c) => handleUpdate({ tableRowHoverBg: c })}
                  isDarkMode={isDarkMode}
                />

                <ColorPickerField
                  label="Table Gridline / Border Color"
                  value={tableBorderColor}
                  onChange={(c) => handleUpdate({ tableBorderColor: c })}
                  isDarkMode={isDarkMode}
                />
              </>
            )}

            {renderedComponentKey !== 'progressbar' &&
              renderedComponentKey !== 'datadisplay' &&
              renderedComponentKey !== 'input' && (
                <div className="py-6 text-center" style={{ color: textMuted }}>
                  No specialized parameters for this component. Use Colors, Borders, Shadows, and
                  Typography to customize.
                </div>
              )}
          </div>
        )}
      </div>
    </aside>
  );
};
