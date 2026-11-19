import React, { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

// ==========================================
// 1. STAT / KPI SUMMARY BLOCK (No tags or pills)
// ==========================================
export interface StatBlockProps {
  label: string;
  value: string | number;
  delta?: {
    value: string;
    isPositive: boolean;
    period?: string;
  };
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const StatBlock: React.FC<StatBlockProps> = ({
  label,
  value,
  delta,
  icon,
  className = '',
  style,
}) => {
  return (
    <div
      className={`theme-surface p-5 flex flex-col justify-between text-left transition-all ${className}`}
      style={style}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="text-xs font-medium tracking-normal"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          {label}
        </span>
        {icon && (
          <div
            className="p-1.5"
            style={{
              color: 'var(--theme-text)',
              backgroundColor: 'var(--theme-surface-alt, rgba(0,0,0,0.05))',
              borderRadius: 'var(--theme-radius-sm, 4px)',
            }}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3">
        <div
          className="font-display text-2xl font-bold tracking-tight"
          style={{ color: 'var(--theme-text)' }}
        >
          {value}
        </div>

        {delta && (
          <div className="mt-1 flex items-center gap-1.5 text-xs font-semibold">
            {delta.isPositive ? (
              <span className="text-emerald-600 flex items-center gap-0.5">
                <ArrowUp size={13} strokeWidth={2.5} />
                <span>+{delta.value}</span>
              </span>
            ) : (
              <span className="text-rose-600 flex items-center gap-0.5">
                <ArrowDown size={13} strokeWidth={2.5} />
                <span>-{delta.value}</span>
              </span>
            )}
            {delta.period && (
              <span
                className="font-normal text-[11px]"
                style={{ color: 'var(--theme-text-muted)' }}
              >
                vs {delta.period}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// 2. DATA TABLE (Sortable, Striped, Hover)
// ==========================================
export interface TableColumn<T> {
  key: keyof T | string;
  title: string;
  sortable?: boolean;
  align?: 'left' | 'center' | 'right';
  render?: (row: T, index: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  keyField?: keyof T;
  striped?: boolean;
  headerFill?: string;
  rowHoverBg?: string;
  borderColor?: string;
  emptyMessage?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  keyField,
  striped = false,
  headerFill,
  rowHoverBg,
  borderColor,
  emptyMessage = 'No records found',
  className = '',
  style,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;
      const compare = valA > valB ? 1 : -1;
      return sortDirection === 'asc' ? compare : -compare;
    });
  }, [data, sortKey, sortDirection]);

  return (
    <div
      className={`theme-surface overflow-x-auto w-full text-left transition-all ${className}`}
      style={style}
    >
      <table className="w-full text-xs border-collapse">
        <thead>
          <tr
            style={{
              backgroundColor: headerFill || 'var(--theme-surface-alt, rgba(0,0,0,0.04))',
              borderBottom: `2px solid ${borderColor || 'var(--theme-border, #E5E7EB)'}`,
            }}
          >
            {columns.map((col) => {
              const alignClass =
                col.align === 'right'
                  ? 'text-right'
                  : col.align === 'center'
                  ? 'text-center'
                  : 'text-left';

              return (
                <th
                  key={String(col.key)}
                  onClick={() => col.sortable && handleSort(String(col.key))}
                  className={`py-3 px-4 font-semibold select-none ${alignClass} ${
                    col.sortable ? 'cursor-pointer hover:opacity-80' : ''
                  }`}
                  style={{ color: 'var(--theme-text)' }}
                >
                  <div
                    className={`inline-flex items-center gap-1.5 ${
                      col.align === 'right'
                        ? 'justify-end'
                        : col.align === 'center'
                        ? 'justify-center'
                        : 'justify-start'
                    }`}
                  >
                    <span>{col.title}</span>
                    {col.sortable && (
                      <span style={{ color: 'var(--theme-text-muted)' }}>
                        {sortKey === col.key ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp size={12} />
                          ) : (
                            <ArrowDown size={12} />
                          )
                        ) : (
                          <ArrowUpDown size={12} />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((row, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <tr
                  key={keyField ? String(row[keyField]) : idx}
                  className="transition-colors group"
                  style={{
                    backgroundColor:
                      striped && !isEven
                        ? 'var(--theme-surface-alt, rgba(0,0,0,0.02))'
                        : 'transparent',
                    borderBottom: `1px solid ${borderColor || 'var(--theme-border, rgba(0,0,0,0.06))'}`,
                  }}
                  onMouseEnter={(e) => {
                    if (rowHoverBg) e.currentTarget.style.backgroundColor = rowHoverBg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      striped && !isEven
                        ? 'var(--theme-surface-alt, rgba(0,0,0,0.02))'
                        : 'transparent';
                  }}
                >
                  {columns.map((col) => {
                    const alignClass =
                      col.align === 'right'
                        ? 'text-right'
                        : col.align === 'center'
                        ? 'text-center'
                        : 'text-left';

                    return (
                      <td
                        key={String(col.key)}
                        className={`py-3 px-4 ${alignClass}`}
                        style={{ color: 'var(--theme-text)' }}
                      >
                        {col.render ? col.render(row, idx) : row[col.key]}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-8 text-center"
                style={{ color: 'var(--theme-text-muted)' }}
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ==========================================
// 3. PIE & DONUT CHART (Zero-dependency SVG)
// ==========================================
export interface PieSlice {
  label: string;
  value: number;
  color?: string;
}

export interface PieChartProps {
  data: PieSlice[];
  donut?: boolean;
  size?: number;
  innerRadiusRatio?: number;
  paletteOverrides?: string[];
  showLegend?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  donut = true,
  size = 180,
  innerRadiusRatio = 0.6,
  paletteOverrides,
  showLegend = true,
  className = '',
  style,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = data.reduce((sum, item) => sum + item.value, 0);

  const defaultPalette = paletteOverrides || [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#EC4899',
    '#06B6D4',
  ];

  const center = size / 2;
  const radius = size / 2 - 8;
  const innerRadius = donut ? radius * innerRadiusRatio : 0;

  let accumulatedAngle = 0;

  const slices = data.map((item, idx) => {
    const sliceAngle = total > 0 ? (item.value / total) * 360 : 0;
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + sliceAngle;
    accumulatedAngle += sliceAngle;

    // Convert degrees to radians
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const largeArcFlag = sliceAngle > 180 ? 1 : 0;

    let pathData = '';
    if (donut) {
      const ix1 = center + innerRadius * Math.cos(startRad);
      const iy1 = center + innerRadius * Math.sin(startRad);
      const ix2 = center + innerRadius * Math.cos(endRad);
      const iy2 = center + innerRadius * Math.sin(endRad);

      pathData = [
        `M ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${ix2} ${iy2}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${ix1} ${iy1}`,
        'Z',
      ].join(' ');
    } else {
      pathData = [
        `M ${center} ${center}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z',
      ].join(' ');
    }

    const color = item.color || defaultPalette[idx % defaultPalette.length];
    const percentage = total > 0 ? Math.round((item.value / total) * 100) : 0;

    return {
      ...item,
      pathData,
      color,
      percentage,
    };
  });

  const activeSlice = hoveredIndex !== null ? slices[hoveredIndex] : null;

  return (
    <div
      className={`theme-surface p-5 flex flex-col md:flex-row items-center justify-around gap-6 text-left transition-all ${className}`}
      style={style}
    >
      {/* SVG Chart */}
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {slices.map((slice, idx) => (
            <path
              key={slice.label}
              d={slice.pathData}
              fill={slice.color}
              stroke="var(--theme-surface, #FFFFFF)"
              strokeWidth={1.5}
              className="transition-transform duration-150 cursor-pointer hover:opacity-90"
              style={{
                transform:
                  hoveredIndex === idx
                    ? 'scale(1.03)'
                    : 'scale(1)',
                transformOrigin: `${center}px ${center}px`,
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </svg>

        {/* Center Readout for Donut Chart */}
        {donut && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ color: 'var(--theme-text)' }}
          >
            <span className="font-display font-bold text-lg leading-tight">
              {activeSlice ? `${activeSlice.percentage}%` : `${total}`}
            </span>
            <span
              className="text-[10px] font-medium truncate max-w-[80px]"
              style={{ color: 'var(--theme-text-muted)' }}
            >
              {activeSlice ? activeSlice.label : 'Total Units'}
            </span>
          </div>
        )}
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex flex-col gap-2 min-w-[140px] text-xs">
          {slices.map((slice, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={slice.label}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`flex items-center justify-between gap-3 p-1 rounded-sm cursor-pointer transition-colors ${
                  isHovered ? 'bg-black/5 dark:bg-white/10' : ''
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span
                    className="w-2.5 h-2.5 shrink-0"
                    style={{ backgroundColor: slice.color }}
                  />
                  <span
                    className="truncate font-medium"
                    style={{ color: 'var(--theme-text)' }}
                  >
                    {slice.label}
                  </span>
                </div>
                <span
                  className="font-mono text-[11px]"
                  style={{ color: 'var(--theme-text-muted)' }}
                >
                  {slice.percentage}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. BAR BREAKDOWN (Comparative Metric Bars)
// ==========================================
export interface BarMetric {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  sublabel?: string;
}

export interface BarChartProps {
  data: BarMetric[];
  title?: string;
  paletteOverrides?: string[];
  className?: string;
  style?: React.CSSProperties;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  paletteOverrides,
  className = '',
  style,
}) => {
  const highestValue = Math.max(...data.map((d) => d.value), 1);

  const defaultPalette = paletteOverrides || [
    '#3B82F6',
    '#10B981',
    '#6366F1',
    '#F59E0B',
    '#EC4899',
  ];

  return (
    <div
      className={`theme-surface p-5 flex flex-col gap-4 text-left transition-all ${className}`}
      style={style}
    >
      {title && (
        <div
          className="font-bold text-xs uppercase tracking-wider"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          {title}
        </div>
      )}

      <div className="space-y-3.5">
        {data.map((item, idx) => {
          const max = item.maxValue || highestValue;
          const percentage = Math.min(100, Math.max(0, (item.value / max) * 100));
          const color = item.color || defaultPalette[idx % defaultPalette.length];

          return (
            <div key={item.label} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium" style={{ color: 'var(--theme-text)' }}>
                  {item.label}
                </span>
                <span className="font-mono text-xs" style={{ color: 'var(--theme-text)' }}>
                  {item.value}
                </span>
              </div>

              {/* Bar track */}
              <div
                className="w-full h-2.5 overflow-hidden"
                style={{
                  borderRadius: 'var(--theme-radius-sm, 3px)',
                  backgroundColor: 'var(--theme-surface-alt, rgba(0,0,0,0.08))',
                }}
              >
                <div
                  className="h-full transition-all duration-300 ease-out"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color,
                    borderRadius: 'var(--theme-radius-sm, 3px)',
                  }}
                />
              </div>

              {item.sublabel && (
                <div
                  className="text-[10px]"
                  style={{ color: 'var(--theme-text-muted)' }}
                >
                  {item.sublabel}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
