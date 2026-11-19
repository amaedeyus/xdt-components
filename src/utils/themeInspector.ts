import type { ComponentKey, ButtonVariantKey, ComponentStyleOverride, BorderStyle } from '../types/customizer';
import type { ThemeInfo } from '../data/themes';

function rgbToHex(rgbStr: string): string {
  if (!rgbStr) return '#3B82F6';
  const trimmed = rgbStr.trim();
  if (trimmed.startsWith('#')) return trimmed.toUpperCase();
  const match = trimmed.match(/\d+(\.\d+)?/g);
  if (match && match.length >= 3) {
    const r = Math.min(255, Math.max(0, parseInt(match[0], 10)))
      .toString(16)
      .padStart(2, '0');
    const g = Math.min(255, Math.max(0, parseInt(match[1], 10)))
      .toString(16)
      .padStart(2, '0');
    const b = Math.min(255, Math.max(0, parseInt(match[2], 10)))
      .toString(16)
      .padStart(2, '0');
    return `#${r}${g}${b}`.toUpperCase();
  }
  return '#3B82F6';
}

function parseGradient(gradientStr: string): {
  isGradient: boolean;
  direction: string;
  startColor: string;
  endColor: string;
} {
  if (!gradientStr || !gradientStr.includes('gradient')) {
    return {
      isGradient: false,
      direction: '135deg',
      startColor: '#3B82F6',
      endColor: '#6366F1',
    };
  }

  let direction = '135deg';
  if (gradientStr.includes('180deg') || gradientStr.includes('to bottom')) direction = '180deg';
  else if (gradientStr.includes('to right') || gradientStr.includes('90deg')) direction = 'to right';
  else if (gradientStr.includes('45deg')) direction = '45deg';
  else if (gradientStr.includes('to top left')) direction = 'to top left';

  // Extract all colors (hex or rgb/rgba)
  const colorMatches = gradientStr.match(/(rgba?\([^)]+\)|#[0-9A-Fa-f]{3,8})/g) || [];
  const startColor = colorMatches[0] ? rgbToHex(colorMatches[0]) : '#3B82F6';
  const endColor = colorMatches[colorMatches.length - 1]
    ? rgbToHex(colorMatches[colorMatches.length - 1])
    : '#6366F1';

  return {
    isGradient: true,
    direction,
    startColor,
    endColor,
  };
}

export function inspectThemeDefaults(
  activeTheme: ThemeInfo,
  componentKey: ComponentKey,
  buttonVariant: ButtonVariantKey = 'primary'
): ComponentStyleOverride {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return {
      bg: activeTheme.accent,
      textColor: '#FFFFFF',
      useGradient: false,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: activeTheme.accent,
      borderRadius: 8,
      fontFamily: `'${activeTheme.font}', sans-serif`,
      fontWeight: '600',
      fontStyle: 'normal',
      animAccentColor: activeTheme.accent,
      placeholderColor: '#9CA3AF',
      invalidBorderColor: '#EF4444',
    };
  }

  // Find the exact preview element in the DOM for this component
  const themeWrapper = document.querySelector(`[data-theme="${activeTheme.id}"]`);
  let targetEl: Element | null = null;

  if (themeWrapper) {
    if (componentKey === 'button') {
      targetEl = themeWrapper.querySelector(`.theme-btn-${buttonVariant}`);
    } else if (componentKey === 'input') {
      targetEl = themeWrapper.querySelector('.theme-input') || themeWrapper.querySelector('input');
    } else if (componentKey === 'navbar') {
      targetEl = themeWrapper.querySelector('nav') || themeWrapper.querySelector('.theme-surface');
    } else if (componentKey === 'dropdown') {
      targetEl = themeWrapper.querySelector('.theme-btn') || themeWrapper.querySelector('.theme-surface');
    } else {
      targetEl = themeWrapper.querySelector('.theme-surface') || themeWrapper;
    }
  }

  const wrapperComputed = themeWrapper ? window.getComputedStyle(themeWrapper) : null;
  const computed = targetEl ? window.getComputedStyle(targetEl) : wrapperComputed;

  const themeAccent = activeTheme.accent || '#3B82F6';
  const themeDanger =
    wrapperComputed?.getPropertyValue('--theme-danger').trim() || '#EF4444';
  const themePlaceholder =
    wrapperComputed?.getPropertyValue('--theme-input-placeholder').trim() || '#9CA3AF';

  // Check background image or variable
  const rawBgImage =
    computed?.backgroundImage && computed.backgroundImage !== 'none'
      ? computed.backgroundImage
      : wrapperComputed?.getPropertyValue(
          componentKey === 'button'
            ? `--theme-${buttonVariant}-bg`
            : componentKey === 'input'
            ? '--theme-input-bg'
            : '--theme-surface'
        ).trim() || '';

  const gradientInfo = parseGradient(rawBgImage);

  const rawBgColor =
    computed?.backgroundColor && computed.backgroundColor !== 'rgba(0, 0, 0, 0)'
      ? computed.backgroundColor
      : wrapperComputed?.getPropertyValue('--theme-surface').trim() || activeTheme.surface;

  const hexBg = rgbToHex(rawBgColor);

  const rawTextColor = computed?.color ? rgbToHex(computed.color) : '#FFFFFF';

  const rawBorderWidth = computed?.borderTopWidth ? parseInt(computed.borderTopWidth, 10) : 1;
  const rawBorderStyle = (computed?.borderTopStyle as BorderStyle) || 'solid';
  const rawBorderColor = computed?.borderTopColor ? rgbToHex(computed.borderTopColor) : themeAccent;

  const rawRadius = computed?.borderTopLeftRadius
    ? parseInt(computed.borderTopLeftRadius, 10)
    : 8;

  const rawFontFamily =
    computed?.fontFamily || wrapperComputed?.getPropertyValue('--theme-font').trim() || `'${activeTheme.font}', sans-serif`;
  const rawFontWeight = computed?.fontWeight || '600';
  const rawFontStyle = (computed?.fontStyle as 'normal' | 'italic') || 'normal';

  const rawBoxShadow = computed?.boxShadow && computed.boxShadow !== 'none' ? computed.boxShadow : '';
  const rawTextShadow = computed?.textShadow && computed.textShadow !== 'none' ? computed.textShadow : '';

  return {
    bg: gradientInfo.isGradient ? gradientInfo.startColor : hexBg,
    textColor: rawTextColor,
    useGradient: gradientInfo.isGradient,
    gradientDirection: gradientInfo.direction,
    gradientStart: gradientInfo.startColor,
    gradientEnd: gradientInfo.endColor,
    borderWidth: isNaN(rawBorderWidth) ? 1 : rawBorderWidth,
    borderStyle: rawBorderStyle,
    borderColor: rawBorderColor,
    borderRadius: isNaN(rawRadius) ? 8 : rawRadius,
    fontFamily: rawFontFamily,
    fontWeight: rawFontWeight,
    fontStyle: rawFontStyle,
    shadowColor: rawBoxShadow ? 'rgba(0, 0, 0, 0.25)' : 'transparent',
    shadowOffsetX: 0,
    shadowOffsetY: 4,
    shadowBlur: 12,
    shadowSpread: 0,
    textShadowColor: rawTextShadow ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
    textShadowOffsetX: 0,
    textShadowOffsetY: 1,
    textShadowBlur: 2,
    animAccentColor: themeAccent,
    placeholderColor: themePlaceholder,
    placeholderFont: rawFontFamily,
    placeholderStyle: 'normal',
    invalidBorderColor: themeDanger,
    invalidAnimation: 'none',
  };
}
