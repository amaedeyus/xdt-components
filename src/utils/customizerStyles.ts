import type React from 'react';
import type { ComponentStyleOverride, ComponentKey, ButtonVariantKey } from '../types/customizer';

/**
 * Generates an inline style object containing scoped CSS custom properties
 * that components read (or standard CSS properties for font and text-shadow).
 */
export function getComponentCustomStyles(
  override?: ComponentStyleOverride,
  activeButtonVariant?: ButtonVariantKey
): React.CSSProperties {
  if (!override || Object.keys(override).length === 0) return {};

  const effectiveOverride: ComponentStyleOverride =
    activeButtonVariant && override.buttonVariants && override.buttonVariants[activeButtonVariant]
      ? { ...override, ...override.buttonVariants[activeButtonVariant] }
      : override;

  const styles: Record<string, string> = {};

  // Gradient vs. Solid Fill
  if (effectiveOverride.useGradient && effectiveOverride.gradientStart && effectiveOverride.gradientEnd) {
    const dir = effectiveOverride.gradientDirection || '135deg';
    const gradStr = `linear-gradient(${dir}, ${effectiveOverride.gradientStart}, ${effectiveOverride.gradientEnd})`;
    styles['--theme-primary-bg'] = gradStr;
    styles['--theme-surface'] = gradStr;
    styles['--theme-input-bg'] = gradStr;
    styles['--theme-accent'] = effectiveOverride.gradientStart;
  } else if (effectiveOverride.bg) {
    styles['--theme-primary-bg'] = effectiveOverride.bg;
    styles['--theme-surface'] = effectiveOverride.bg;
    styles['--theme-input-bg'] = effectiveOverride.bg;
    styles['--theme-accent'] = effectiveOverride.bg;
  }

  // Variant-specific mappings for button if present
  if (override.buttonVariants) {
    if (override.buttonVariants.primary) {
      const p = override.buttonVariants.primary;
      if (p.useGradient && p.gradientStart && p.gradientEnd) {
        styles['--theme-primary-bg'] = `linear-gradient(${p.gradientDirection || '135deg'}, ${p.gradientStart}, ${p.gradientEnd})`;
      } else if (p.bg) {
        styles['--theme-primary-bg'] = p.bg;
      }
      if (p.textColor) styles['--theme-primary-text'] = p.textColor;
      // Explicitly bind primary border variables
      if (p.borderWidth !== undefined) styles['--xdt-btn-primary-border-width'] = `${p.borderWidth}px`;
      if (p.borderStyle) styles['--xdt-btn-primary-border-style'] = p.borderStyle;
      if (p.borderColor) styles['--xdt-btn-primary-border-color'] = p.borderColor;
      if (p.shadowColor) {
        styles['--theme-primary-shadow'] = `${p.shadowOffsetX ?? 0}px ${p.shadowOffsetY ?? 4}px ${p.shadowBlur ?? 12}px ${p.shadowSpread ?? 0}px ${p.shadowColor}`;
      }
    }
    if (override.buttonVariants.secondary) {
      const s = override.buttonVariants.secondary;
      if (s.useGradient && s.gradientStart && s.gradientEnd) {
        styles['--theme-secondary-bg'] = `linear-gradient(${s.gradientDirection || '135deg'}, ${s.gradientStart}, ${s.gradientEnd})`;
      } else if (s.bg) {
        styles['--theme-secondary-bg'] = s.bg;
      }
      if (s.textColor) styles['--theme-secondary-text'] = s.textColor;
      // Explicitly bind secondary border variables so CSS can override with higher specificity
      if (s.borderWidth !== undefined) styles['--xdt-btn-secondary-border-width'] = `${s.borderWidth}px`;
      if (s.borderStyle) styles['--xdt-btn-secondary-border-style'] = s.borderStyle;
      if (s.borderColor) styles['--xdt-btn-secondary-border-color'] = s.borderColor;
      if (s.shadowColor) {
        styles['--theme-secondary-shadow'] = `${s.shadowOffsetX ?? 0}px ${s.shadowOffsetY ?? 4}px ${s.shadowBlur ?? 12}px ${s.shadowSpread ?? 0}px ${s.shadowColor}`;
      }
    }
    if (override.buttonVariants.outline) {
      const o = override.buttonVariants.outline;
      if (o.bg) styles['--theme-outline-bg'] = o.bg;
      if (o.textColor) styles['--theme-outline-text'] = o.textColor;
      if (o.borderColor) {
        styles['--theme-outline-border'] = `${o.borderWidth ?? 1}px ${o.borderStyle ?? 'solid'} ${o.borderColor}`;
      }
      if (o.shadowColor) {
        styles['--theme-outline-shadow'] = `${o.shadowOffsetX ?? 0}px ${o.shadowOffsetY ?? 4}px ${o.shadowBlur ?? 12}px ${o.shadowSpread ?? 0}px ${o.shadowColor}`;
      }
    }
    if (override.buttonVariants.ghost) {
      const g = override.buttonVariants.ghost;
      if (g.textColor) styles['--theme-ghost-text'] = g.textColor;
      if (g.bg) styles['--theme-ghost-hover'] = g.bg;
    }
  }

  // Text Color
  if (effectiveOverride.textColor) {
    styles['--theme-primary-text'] = effectiveOverride.textColor;
    styles['--theme-text'] = effectiveOverride.textColor;
    styles['--theme-input-text'] = effectiveOverride.textColor;
  }

  // Animation Accent / Glow Color
  if (effectiveOverride.animAccentColor) {
    styles['--xdt-anim-accent'] = effectiveOverride.animAccentColor;
  }

  // Input Placeholder & Validation Hooks
  if (effectiveOverride.placeholderColor) {
    styles['--xdt-input-placeholder-color'] = effectiveOverride.placeholderColor;
  }
  if (effectiveOverride.placeholderFont) {
    styles['--xdt-input-placeholder-font'] = effectiveOverride.placeholderFont;
  }
  if (effectiveOverride.placeholderStyle) {
    styles['--xdt-input-placeholder-style'] = effectiveOverride.placeholderStyle;
  }
  if (effectiveOverride.invalidBorderColor) {
    styles['--xdt-input-invalid-border'] = effectiveOverride.invalidBorderColor;
  }

  // Borders & Geometry
  if (effectiveOverride.borderWidth !== undefined) {
    styles['--theme-border-width'] = `${effectiveOverride.borderWidth}px`;
  }
  if (effectiveOverride.borderStyle) {
    styles['--theme-border-style'] = effectiveOverride.borderStyle;
  }
  if (effectiveOverride.borderColor) {
    styles['--theme-border'] = effectiveOverride.borderColor;
    styles['--theme-input-border'] = `${effectiveOverride.borderWidth ?? 1}px ${
      effectiveOverride.borderStyle ?? 'solid'
    } ${effectiveOverride.borderColor}`;
  }
  if (effectiveOverride.borderRadius !== undefined) {
    styles['--theme-radius'] = `${effectiveOverride.borderRadius}px`;
    styles['--theme-radius-sm'] = `${Math.max(0, effectiveOverride.borderRadius - 4)}px`;
    styles['--theme-radius-lg'] = `${effectiveOverride.borderRadius + 6}px`;
  }

  // Box Shadow
  if (
    effectiveOverride.shadowOffsetX !== undefined ||
    effectiveOverride.shadowOffsetY !== undefined ||
    effectiveOverride.shadowBlur !== undefined ||
    effectiveOverride.shadowSpread !== undefined ||
    effectiveOverride.shadowColor
  ) {
    const x = effectiveOverride.shadowOffsetX ?? 0;
    const y = effectiveOverride.shadowOffsetY ?? 4;
    const blur = effectiveOverride.shadowBlur ?? 12;
    const spread = effectiveOverride.shadowSpread ?? 0;
    const color = effectiveOverride.shadowColor || 'rgba(0, 0, 0, 0.25)';
    const shadowStr = `${x}px ${y}px ${blur}px ${spread}px ${color}`;

    styles['--theme-shadow-surface'] = shadowStr;
    styles['--theme-primary-shadow'] = shadowStr;
  }

  // Text Shadow
  if (
    effectiveOverride.textShadowOffsetX !== undefined ||
    effectiveOverride.textShadowOffsetY !== undefined ||
    effectiveOverride.textShadowBlur !== undefined ||
    effectiveOverride.textShadowColor
  ) {
    const tx = effectiveOverride.textShadowOffsetX ?? 0;
    const ty = effectiveOverride.textShadowOffsetY ?? 1;
    const tblur = effectiveOverride.textShadowBlur ?? 2;
    const tcolor = effectiveOverride.textShadowColor || 'rgba(0, 0, 0, 0.3)';
    styles['--custom-text-shadow'] = `${tx}px ${ty}px ${tblur}px ${tcolor}`;
    styles['textShadow'] = `${tx}px ${ty}px ${tblur}px ${tcolor}`;
  }

  // Typography
  if (effectiveOverride.fontFamily) {
    styles['--theme-font'] = effectiveOverride.fontFamily;
    styles['fontFamily'] = effectiveOverride.fontFamily;
  }
  if (effectiveOverride.fontWeight) {
    styles['fontWeight'] = effectiveOverride.fontWeight;
  }
  if (effectiveOverride.fontStyle) {
    styles['fontStyle'] = effectiveOverride.fontStyle;
  }

  return styles as React.CSSProperties;
}

/**
 * Returns the CSS class names for hover and active animations.
 */
export function getComponentAnimationClasses(
  override?: ComponentStyleOverride,
  activeButtonVariant?: ButtonVariantKey
): string {
  if (!override) return '';
  const effectiveOverride: ComponentStyleOverride =
    activeButtonVariant && override.buttonVariants && override.buttonVariants[activeButtonVariant]
      ? { ...override, ...override.buttonVariants[activeButtonVariant] }
      : override;

  const classes: string[] = [];

  // Hover animations
  if (effectiveOverride.hoverAnimation && effectiveOverride.hoverAnimation !== 'none') {
    classes.push(`anim-hover-${effectiveOverride.hoverAnimation}`);
  }

  // Active animations
  if (effectiveOverride.activeAnimation && effectiveOverride.activeAnimation !== 'none') {
    classes.push(`anim-active-${effectiveOverride.activeAnimation}`);
  }

  return classes.join(' ');
}

/**
 * Returns data-attribute props for hover/active animations to be spread onto wrapper elements.
 * These match [data-hover-anim="..."] and [data-active-anim="..."] CSS rules.
 */
export function getComponentAnimationAttrs(
  override?: ComponentStyleOverride,
  activeButtonVariant?: ButtonVariantKey
): Record<string, string> {
  if (!override) return {};
  const effectiveOverride: ComponentStyleOverride =
    activeButtonVariant && override.buttonVariants && override.buttonVariants[activeButtonVariant]
      ? { ...override, ...override.buttonVariants[activeButtonVariant] }
      : override;

  const attrs: Record<string, string> = {};

  if (effectiveOverride.hoverAnimation && effectiveOverride.hoverAnimation !== 'none') {
    attrs['data-hover-anim'] = effectiveOverride.hoverAnimation;
  }
  if (effectiveOverride.activeAnimation && effectiveOverride.activeAnimation !== 'none') {
    attrs['data-active-anim'] = effectiveOverride.activeAnimation;
  }

  return attrs;
}

/**
 * Generates an exportable CSS variable block for copy/paste reflection.
 */
export function generateExportableCssSnippet(
  componentKey: ComponentKey,
  override?: ComponentStyleOverride
): string {
  if (!override || Object.keys(override).length === 0) {
    return `/* Baseline Theme Default Styles Active */\n.theme-${componentKey} {\n  /* Uses active theme CSS variables */\n}`;
  }

  const lines: string[] = [`/* Customized Scoped Styles for ${componentKey} */`, `.${componentKey}-customized {`];

  if (override.useGradient && override.gradientStart && override.gradientEnd) {
    const dir = override.gradientDirection || '135deg';
    lines.push(`  background: linear-gradient(${dir}, ${override.gradientStart}, ${override.gradientEnd});`);
  } else if (override.bg) {
    lines.push(`  --theme-primary-bg: ${override.bg};`);
    lines.push(`  background-color: ${override.bg};`);
  }

  if (override.textColor) {
    lines.push(`  --theme-primary-text: ${override.textColor};`);
    lines.push(`  color: ${override.textColor};`);
  }

  if (override.animAccentColor) {
    lines.push(`  --xdt-anim-accent: ${override.animAccentColor};`);
  }

  if (override.placeholderColor) {
    lines.push(`  --xdt-input-placeholder-color: ${override.placeholderColor};`);
  }
  if (override.placeholderFont) {
    lines.push(`  --xdt-input-placeholder-font: ${override.placeholderFont};`);
  }
  if (override.placeholderStyle) {
    lines.push(`  --xdt-input-placeholder-style: ${override.placeholderStyle};`);
  }
  if (override.invalidBorderColor) {
    lines.push(`  --xdt-input-invalid-border: ${override.invalidBorderColor};`);
  }

  if (override.borderWidth !== undefined) lines.push(`  --theme-border-width: ${override.borderWidth}px;`);
  if (override.borderStyle) lines.push(`  --theme-border-style: ${override.borderStyle};`);
  if (override.borderColor) lines.push(`  --theme-border: ${override.borderColor};`);
  if (override.borderRadius !== undefined) lines.push(`  --theme-radius: ${override.borderRadius}px;`);

  if (override.shadowColor || override.shadowBlur !== undefined) {
    const x = override.shadowOffsetX ?? 0;
    const y = override.shadowOffsetY ?? 4;
    const blur = override.shadowBlur ?? 12;
    const spread = override.shadowSpread ?? 0;
    const col = override.shadowColor || 'rgba(0, 0, 0, 0.25)';
    lines.push(`  box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${col};`);
  }

  if (override.textShadowColor || override.textShadowBlur !== undefined) {
    const tx = override.textShadowOffsetX ?? 0;
    const ty = override.textShadowOffsetY ?? 1;
    const tblur = override.textShadowBlur ?? 2;
    const tcol = override.textShadowColor || 'rgba(0,0,0,0.3)';
    lines.push(`  text-shadow: ${tx}px ${ty}px ${tblur}px ${tcol};`);
  }

  if (override.fontFamily) lines.push(`  font-family: ${override.fontFamily};`);
  if (override.fontWeight) lines.push(`  font-weight: ${override.fontWeight};`);
  if (override.fontStyle) lines.push(`  font-style: ${override.fontStyle};`);

  if (override.hoverAnimation && override.hoverAnimation !== 'none') {
    lines.push(`  /* Hover Animation: anim-hover-${override.hoverAnimation} */`);
  }
  if (override.activeAnimation && override.activeAnimation !== 'none') {
    lines.push(`  /* Active Animation: anim-active-${override.activeAnimation} */`);
  }

  // Per-variant buttons if present
  if (override.buttonVariants) {
    for (const [vKey, vOverride] of Object.entries(override.buttonVariants)) {
      if (vOverride && Object.keys(vOverride).length > 0) {
        lines.push(`  /* ${vKey} variant overrides */`);
        if (vOverride.bg) lines.push(`  --theme-${vKey}-bg: ${vOverride.bg};`);
        if (vOverride.textColor) lines.push(`  --theme-${vKey}-text: ${vOverride.textColor};`);
      }
    }
  }

  lines.push('}');
  return lines.join('\n');
}

/**
 * Generates an exportable JSX snippet with custom styles reflected.
 */
export function generateExportableJsxSnippet(
  _componentKey: ComponentKey,
  baseJsx: string,
  override?: ComponentStyleOverride
): string {
  if (!override || Object.keys(override).length === 0) {
    return baseJsx;
  }

  const animClasses = getComponentAnimationClasses(override);
  const animComment = animClasses ? `\n  // Animations: ${animClasses}` : '';

  const backgroundProp =
    override.useGradient && override.gradientStart && override.gradientEnd
      ? `  background: 'linear-gradient(${override.gradientDirection || '135deg'}, ${override.gradientStart}, ${override.gradientEnd})',\n`
      : override.bg
      ? `  '--theme-primary-bg': '${override.bg}',\n`
      : '';

  return `// Customized JSX with scoped properties${animComment}
<div style={{
${backgroundProp}${override.textColor ? `  '--theme-primary-text': '${override.textColor}',\n` : ''}${
    override.animAccentColor ? `  '--xdt-anim-accent': '${override.animAccentColor}',\n` : ''
  }${override.borderRadius !== undefined ? `  '--theme-radius': '${override.borderRadius}px',\n` : ''}${
    override.borderColor ? `  '--theme-border': '${override.borderColor}',\n` : ''
  }${override.fontFamily ? `  fontFamily: "${override.fontFamily}",\n` : ''}${
    override.fontWeight ? `  fontWeight: ${override.fontWeight},\n` : ''
  }${override.fontStyle ? `  fontStyle: '${override.fontStyle}',\n` : ''}}}>
${baseJsx}
</div>`;
}
