import React from 'react';

export interface ColorPickerFieldProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  isDarkMode?: boolean;
  className?: string;
}

// Convert rgb/rgba or hex string to valid 6-char hex for <input type="color">
function toHex6(val: string): string {
  if (!val) return '#3B82F6';
  const trimmed = val.trim();
  if (/^#[0-9A-Fa-f]{6}$/.test(trimmed)) return trimmed;
  if (/^#[0-9A-Fa-f]{3}$/.test(trimmed)) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`;
  }
  if (/^rgba?\s*\(/.test(trimmed)) {
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
  }
  return '#3B82F6';
}

export const ColorPickerField: React.FC<ColorPickerFieldProps> = ({
  label,
  value,
  onChange,
  isDarkMode = true,
  className = '',
}) => {
  const hex6 = toHex6(value);

  const borderSolid = isDarkMode ? '#333333' : '#E5E7EB';
  const textPrimary = isDarkMode ? '#F0F0F0' : '#111827';
  const inputBg = isDarkMode ? '#1A1A1A' : '#FFFFFF';

  return (
    <div className={`space-y-1.5 text-left ${className}`}>
      <label className="font-semibold block text-xs" style={{ color: textPrimary }}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        <div
          className="relative w-8 h-8 shrink-0 overflow-hidden border"
          style={{ borderColor: borderSolid }}
        >
          <input
            type="color"
            value={hex6}
            onChange={(e) => onChange(e.target.value.toUpperCase())}
            className="absolute -inset-2 w-12 h-12 cursor-pointer p-0 border-0"
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#3B82F6 or rgba(...)"
          className="flex-1 px-3 py-1.5 font-mono text-xs border"
          style={{
            backgroundColor: inputBg,
            borderColor: borderSolid,
            color: textPrimary,
          }}
        />
      </div>
    </div>
  );
};
