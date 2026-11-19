export type HoverAnimation =
  | 'none'
  | 'lift'
  | 'scale'
  | 'glow'
  | 'neon-pulse'
  | 'border-highlight'
  | 'shift'
  | 'invert';

export type ActiveAnimation =
  | 'none'
  | 'press'
  | 'shrink'
  | 'flash'
  | 'hard-push';

export type InvalidAnimationPreset =
  | 'none'
  | 'shake'
  | 'pulse'
  | 'bounce'
  | 'flash';

export type BorderStyle = 'solid' | 'dashed' | 'double' | 'none';

export type ButtonVariantKey = 'primary' | 'secondary' | 'outline' | 'ghost';

export interface ComponentStyleOverride {
  // Colors & Surface
  bg?: string;
  textColor?: string;

  // Gradient Controls
  useGradient?: boolean;
  gradientDirection?: string;
  gradientStart?: string;
  gradientEnd?: string;

  // Borders & Geometry
  borderWidth?: number; // in px
  borderStyle?: BorderStyle;
  borderColor?: string;
  borderRadius?: number; // in px

  // Box Shadows
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  shadowBlur?: number;
  shadowSpread?: number;
  shadowColor?: string;

  // Text Shadows
  textShadowOffsetX?: number;
  textShadowOffsetY?: number;
  textShadowBlur?: number;
  textShadowColor?: string;

  // Typography
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: 'normal' | 'italic';

  // Interactive Animations
  hoverAnimation?: HoverAnimation;
  activeAnimation?: ActiveAnimation;
  animAccentColor?: string; // Binds to --xdt-anim-accent

  // Input & Form Specific Controls
  placeholderColor?: string;
  placeholderFont?: string;
  placeholderStyle?: 'normal' | 'italic';
  invalidBorderColor?: string;
  invalidAnimation?: InvalidAnimationPreset;

  // Progress Bar Specific Controls
  orientation?: 'horizontal' | 'vertical';
  progressMode?: 'controlled' | 'steps' | 'scroll';
  trackColor?: string;
  fillColor?: string;
  thickness?: number;
  barHeight?: number;

  // Data & Reports Specific Controls
  tableHeaderFill?: string;
  tableRowHoverBg?: string;
  tableBorderColor?: string;
  chartSliceColors?: string[];

  // Per-Variant Button Sub-Overrides
  buttonVariants?: {
    primary?: ComponentStyleOverride;
    secondary?: ComponentStyleOverride;
    outline?: ComponentStyleOverride;
    ghost?: ComponentStyleOverride;
  };
}

export type ComponentKey =
  | 'button'
  | 'input'
  | 'container'
  | 'navbar'
  | 'dropdown'
  | 'progressbar'
  | 'datadisplay';

export const COMPONENT_METADATA: Array<{
  id: ComponentKey;
  name: string;
  description: string;
}> = [
  { id: 'button', name: 'Buttons', description: 'Interactive button actions and variants' },
  { id: 'input', name: 'Inputs & Forms', description: 'Text inputs, selects, textareas, placeholders' },
  { id: 'container', name: 'Containers', description: 'Panels, modals, and alert banners' },
  { id: 'navbar', name: 'Navigation Bar', description: 'Responsive top navigation header' },
  { id: 'dropdown', name: 'Dropdowns', description: 'Click-triggered dropdown menus' },
  { id: 'progressbar', name: 'Progress Bars', description: 'Horizontal/vertical bars and reactive modes' },
  { id: 'datadisplay', name: 'Data & Reports', description: 'Data tables, donut charts, and stat blocks' },
];

export const FONT_OPTIONS = [
  { label: 'Inter (Clean Sans)', value: "'Inter', sans-serif" },
  { label: 'Space Grotesk (Display)', value: "'Space Grotesk', sans-serif" },
  { label: 'Quicksand (Soft Rounded)', value: "'Quicksand', sans-serif" },
  { label: 'Syne (Geometric/Art)', value: "'Syne', sans-serif" },
  { label: 'Playfair Display (Editorial Serif)', value: "'Playfair Display', serif" },
  { label: 'Cormorant Garamond (Classical)', value: "'Cormorant Garamond', serif" },
  { label: 'Shippori Mincho (Japanese Calligraphy)', value: "'Shippori Mincho', serif" },
  { label: 'Cinzel (Classical Inscription)', value: "'Cinzel', serif" },
  { label: 'Outfit (Modern Geometrical)', value: "'Outfit', sans-serif" },
  { label: 'VT323 (8-Bit Pixel)', value: "'VT323', monospace" },
  { label: 'Caveat (Hand-drawn Ink)', value: "'Caveat', cursive, sans-serif" },
];

export const GRADIENT_DIRECTIONS = [
  { label: '135° (Diagonal Top-Left to Bottom-Right)', value: '135deg' },
  { label: 'To Right (Horizontal 90°)', value: 'to right' },
  { label: 'To Bottom (Vertical 180°)', value: 'to bottom' },
  { label: '45° (Diagonal Bottom-Left to Top-Right)', value: '45deg' },
  { label: '180° (Top to Bottom)', value: '180deg' },
  { label: 'To Top Left', value: 'to top left' },
];

export const HOVER_ANIMATIONS: Array<{ label: string; value: HoverAnimation; usesAccent?: boolean }> = [
  { label: 'None', value: 'none' },
  { label: 'Lift (-4px & Shadow)', value: 'lift' },
  { label: 'Scale Up (1.05x)', value: 'scale' },
  { label: 'Accent Glow', value: 'glow', usesAccent: true },
  { label: 'Neon Pulse Glow', value: 'neon-pulse', usesAccent: true },
  { label: 'Accent Border Highlight', value: 'border-highlight', usesAccent: true },
  { label: 'Offset Shift (+3px)', value: 'shift' },
  { label: 'Color Invert', value: 'invert' },
];

export const ACTIVE_ANIMATIONS: Array<{ label: string; value: ActiveAnimation; usesAccent?: boolean }> = [
  { label: 'None', value: 'none' },
  { label: 'Press Down (+3px)', value: 'press' },
  { label: 'Scale Shrink (0.94x)', value: 'shrink' },
  { label: 'Ripple Flash', value: 'flash', usesAccent: true },
  { label: 'Hard Push (Offset + Flatten)', value: 'hard-push' },
];

export const INVALID_ANIMATIONS: Array<{ label: string; value: InvalidAnimationPreset }> = [
  { label: 'None', value: 'none' },
  { label: 'Horizontal Shake', value: 'shake' },
  { label: 'Border Pulse Glow', value: 'pulse' },
  { label: 'Subtle Bounce', value: 'bounce' },
  { label: 'Flash Highlight', value: 'flash' },
];
