export interface ComponentSnippet {
  id: string;
  name: string;
  description: string;
  usageJsx: string;
  componentTsx: string;
}

export const COMPONENT_SNIPPETS: Record<string, ComponentSnippet> = {
  button: {
    id: 'button',
    name: 'Button',
    description: 'Versatile button component supporting multiple variants, sizes, and reactive states across all 18 themes.',
    usageJsx: `import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary" size="md">
        Primary Action
      </Button>

      <Button variant="primary" size="md" rightIcon={<ArrowRight size={16} />}>
        Get Started
      </Button>

      <Button variant="secondary" size="md">
        Secondary
      </Button>

      <Button variant="outline" size="md">
        Outline
      </Button>

      <Button variant="ghost" size="md">
        Ghost
      </Button>

      <Button variant="primary" size="sm" leftIcon={<Sparkles size={14} />}>
        Small
      </Button>
    </div>
  );
}`,
    componentTsx: `import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 min-h-[30px]',
    md: 'text-sm px-4 py-2 gap-2 min-h-[38px]',
    lg: 'text-base px-6 py-3 gap-2.5 min-h-[46px]',
  };

  const variantClass = \`theme-btn-\${variant}\`;

  return (
    <button
      disabled={disabled || isLoading}
      className={\`theme-btn \${variantClass} \${sizeClasses[size]} \${
        disabled || isLoading ? 'opacity-50 cursor-not-allowed shadow-none' : ''
      } \${className}\`}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : leftIcon ? (
        <span className="inline-flex shrink-0 items-center">{leftIcon}</span>
      ) : null}
      
      {children && <span>{children}</span>}

      {!isLoading && rightIcon && (
        <span className="inline-flex shrink-0 items-center">{rightIcon}</span>
      )}
    </button>
  );
};`,
  },
  input: {
    id: 'input',
    name: 'Input & Forms',
    description: 'Comprehensive input suite including text input, textarea, select dropdown, checkbox, toggle switch, and validation states.',
    usageJsx: `import { Input, Textarea, Select, Checkbox, Toggle } from '@/components/ui/Input';
import { Mail } from 'lucide-react';
import { useState } from 'react';

export function FormDemo() {
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="space-y-4 max-w-md">
      <Input
        label="Email Address"
        placeholder="name@example.com"
        leftIcon={<Mail size={16} />}
        helperText="System verification"
      />

      <Input
        label="Subdomain"
        defaultValue="invalid@"
        error="Only alphanumeric characters allowed"
      />

      <Select
        label="Theme Preset"
        options={[
          { value: 'claymorphism', label: 'Claymorphism 3D' },
          { value: 'frutiger-aero', label: 'Frutiger Aero Glossy' },
        ]}
      />

      <Textarea label="Notes" placeholder="Write feedback..." rows={2} />

      <Checkbox
        label="Synchronize tokens"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />

      <Toggle
        label="Real-time preview"
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
      />
    </div>
  );
}`,
    componentTsx: `import React from 'react';

export interface BaseInputProps {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  required?: boolean;
}

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    BaseInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<TextInputProps> = ({
  label,
  helperText,
  error,
  success,
  required,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold tracking-wide" style={{ color: 'var(--theme-text)' }}>
          {label}
        </label>
      )}

      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span className="absolute left-3 flex items-center pointer-events-none" style={{ color: 'var(--theme-text-muted)' }}>
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          className={\`theme-input w-full px-3 py-2 text-sm transition-all \${
            leftIcon ? 'pl-9' : ''
          } \${rightIcon ? 'pr-9' : ''} \${
            error ? '!border-red-500' : success ? '!border-emerald-500' : ''
          } \${className}\`}
          {...props}
        />
      </div>

      {error ? (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      ) : helperText ? (
        <span className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>{helperText}</span>
      ) : null}
    </div>
  );
};`,
  },
  container: {
    id: 'container',
    name: 'Containers & Surfaces',
    description: 'Surface panels, elevated blocks, alert banners, and interactive modal dialogs.',
    usageJsx: `import { Panel, ElevatedBlock, AlertBanner, Modal } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export function ContainerDemo() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Surface Panel */}
      <Panel
        title="Project Architecture"
        subtitle="Active workspace configuration"
        action={<Button variant="outline" size="sm">Export</Button>}
      >
        <p className="text-xs text-muted">Modular multi-theme UI components.</p>
      </Panel>

      {/* Alert Banner */}
      <AlertBanner variant="info" title="Deployment Notice">
        All 18 visual themes initialized and loaded.
      </AlertBanner>

      {/* Trigger Modal */}
      <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Export"
      >
        <p>Export all theme CSS variables into your local design system?</p>
      </Modal>
    </div>
  );
}`,
    componentTsx: `import React from 'react';

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({
  title,
  subtitle,
  action,
  footer,
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={\`theme-surface p-5 flex flex-col text-left transition-all \${className}\`} {...props}>
      {(title || subtitle || action) && (
        <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-black/10 dark:border-white/10">
          <div>
            {title && <h3 className="font-bold text-base" style={{ color: 'var(--theme-text)' }}>{title}</h3>}
            {subtitle && <p className="text-xs mt-0.5" style={{ color: 'var(--theme-text-muted)' }}>{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="flex-1">{children}</div>
      {footer && <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10">{footer}</div>}
    </div>
  );
};`,
  },
  navbar: {
    id: 'navbar',
    name: 'Navigation Bar',
    description: 'Responsive top navigation with brand slot, active indicators, mobile menu toggle, and actions.',
    usageJsx: `import { Navbar } from '@/components/ui/Navbar';
import { Button } from '@/components/ui/Button';
import { Home, Layers, Settings } from 'lucide-react';
import { useState } from 'react';

export function NavbarDemo() {
  const [active, setActive] = useState('overview');

  return (
    <Navbar
      brand={<span className="font-bold text-sm">XDT System</span>}
      activeId={active}
      onSelect={(id) => setActive(id)}
      items={[
        { id: 'overview', label: 'Overview', icon: <Home size={14} /> },
        { id: 'components', label: 'Components', icon: <Layers size={14} /> },
        { id: 'settings', label: 'Settings', icon: <Settings size={14} /> },
      ]}
      actions={<Button size="sm">Sign In</Button>}
    />
  );
}`,
    componentTsx: `import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export interface NavbarProps {
  brand: React.ReactNode;
  items: NavItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  actions?: React.ReactNode;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  items,
  activeId,
  onSelect,
  actions,
  className = '',
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className={\`theme-surface px-5 py-3 w-full transition-all \${className}\`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">{brand}</div>
        <div className="hidden md:flex items-center gap-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect?.(item.id)}
              className="px-3.5 py-1.5 text-xs font-medium transition-all flex items-center gap-2"
              style={{
                color: item.id === activeId ? 'var(--theme-text)' : 'var(--theme-text-muted)',
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        {actions && <div className="hidden md:flex items-center gap-3">{actions}</div>}
      </div>
    </nav>
  );
};`,
  },
  dropdown: {
    id: 'dropdown',
    name: 'Dropdown',
    description: 'Accessible click-triggered menu with keyboard navigation, dividers, and destructive states.',
    usageJsx: `import { Dropdown } from '@/components/ui/Dropdown';
import { Edit, Trash2, Copy, Share2 } from 'lucide-react';

export function DropdownDemo() {
  return (
    <Dropdown
      label="Manage Project"
      items={[
        { id: 'edit', label: 'Edit Metadata', icon: <Edit size={14} /> },
        { id: 'duplicate', label: 'Duplicate Preset', icon: <Copy size={14} /> },
        { id: 'share', label: 'Share Link', icon: <Share2 size={14} /> },
        { id: 'div-1', label: '', divider: true },
        { id: 'delete', label: 'Delete Theme', icon: <Trash2 size={14} />, destructive: true },
      ]}
      onSelect={(item) => console.log('Selected:', item.id)}
    />
  );
}`,
    componentTsx: `import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  divider?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  label?: string;
  trigger?: React.ReactNode;
  items: DropdownItem[];
  onSelect?: (item: DropdownItem) => void;
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label = 'Options',
  trigger,
  items,
  onSelect,
  align = 'left',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className={\`relative inline-block text-left \${className}\`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="theme-btn theme-btn-secondary px-3.5 py-2 text-xs flex items-center gap-2"
      >
        <span>{label}</span>
        <ChevronDown size={14} />
      </button>

      {isOpen && (
        <div className="absolute z-40 mt-1.5 w-48 theme-surface py-1">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => { onSelect?.(item); setIsOpen(false); }}
              className="w-full text-left px-3.5 py-2 text-xs flex items-center gap-2.5"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};`,
  },
  progressbar: {
    id: 'progressbar',
    name: 'Progress Bar & Steps',
    description: 'Horizontal and vertical progress bars with percentage readout, step tracker, and passive scroll tracking.',
    usageJsx: `import { ProgressBar, StepTracker } from '@/components/ui/ProgressBar';
import { useState, useRef } from 'react';

export function ProgressDemo() {
  const [val, setVal] = useState(65);
  const [step, setStep] = useState(2);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-6 max-w-md">
      {/* Horizontal Controlled */}
      <ProgressBar value={val} label="Pipeline" size="md" />

      {/* Vertical Orientation */}
      <ProgressBar orientation="vertical" value={val} height={160} label="Charge" />

      {/* Step Reactive */}
      <ProgressBar mode="steps" currentStep={step} totalSteps={4} label="Checkout Steps" />

      {/* Scroll Reactive */}
      <ProgressBar mode="scroll" targetRef={scrollRef} label="Reading Progress" />
    </div>
  );
}`,
    componentTsx: `import React, { useState, useEffect } from 'react';

export type ProgressOrientation = 'horizontal' | 'vertical';
export type ProgressMode = 'controlled' | 'steps' | 'scroll';

export interface ProgressBarProps {
  value?: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  orientation?: ProgressOrientation;
  mode?: ProgressMode;
  currentStep?: number;
  totalSteps?: number;
  targetRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value = 0,
  label,
  showPercentage = true,
  size = 'md',
  orientation = 'horizontal',
  mode = 'controlled',
  currentStep = 1,
  totalSteps = 4,
  targetRef,
  className = '',
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (mode !== 'scroll') return;
    const calculate = () => {
      const el = targetRef?.current || document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setScrollProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    const target = targetRef?.current || window;
    target.addEventListener('scroll', calculate, { passive: true });
    return () => target.removeEventListener('scroll', calculate);
  }, [mode, targetRef]);

  const computedValue = mode === 'steps' ? (currentStep / totalSteps) * 100 : mode === 'scroll' ? scrollProgress : value;
  const pct = Math.min(100, Math.max(0, computedValue));

  if (orientation === 'vertical') {
    return (
      <div className={\`inline-flex flex-col items-center gap-2 \${className}\`}>
        <div className="h-44 w-3.5 bg-[var(--theme-surface-alt)] overflow-hidden flex flex-col justify-end">
          <div className="w-full bg-[var(--theme-primary-bg)] transition-all" style={{ height: \`\${pct}%\` }} />
        </div>
        {showPercentage && <span className="text-xs font-mono">{Math.round(pct)}%</span>}
      </div>
    );
  }

  return (
    <div className={\`w-full flex flex-col gap-1.5 \${className}\`}>
      <div className="flex justify-between text-xs">
        {label && <span>{label}</span>}
        {showPercentage && <span className="font-mono">{Math.round(pct)}%</span>}
      </div>
      <div className="w-full h-2.5 bg-[var(--theme-surface-alt)] overflow-hidden">
        <div className="h-full bg-[var(--theme-primary-bg)] transition-all" style={{ width: \`\${pct}%\` }} />
      </div>
    </div>
  );
};`,
  },
  datadisplay: {
    id: 'datadisplay',
    name: 'Data & Reports',
    description: 'Data tables with sorting, interactive SVG pie/donut charts, and KPI summary stat blocks.',
    usageJsx: `import { DataTable, PieChart, StatBlock, BarChart } from '@/components/ui/DataDisplay';

export function DataDisplayDemo() {
  return (
    <div className="space-y-6">
      {/* KPI Stat Block */}
      <div className="grid grid-cols-2 gap-4">
        <StatBlock
          label="Total Yield"
          value="48.2k"
          delta={{ value: '14.8%', isPositive: true, period: 'last week' }}
        />
        <StatBlock
          label="Incident Rate"
          value="0.12%"
          delta={{ value: '2.4%', isPositive: false, period: 'average' }}
        />
      </div>

      {/* Donut Chart */}
      <PieChart
        data={[
          { label: 'Compute', value: 45 },
          { label: 'Storage', value: 25 },
          { label: 'Network', value: 20 },
          { label: 'Edge', value: 10 },
        ]}
      />

      {/* Data Table */}
      <DataTable
        columns={[
          { key: 'module', title: 'Module', sortable: true },
          { key: 'latency', title: 'Latency', sortable: true },
          { key: 'status', title: 'Status' },
        ]}
        data={[
          { module: 'Auth Core', latency: '24ms', status: 'Operational' },
          { module: 'Mesh Routing', latency: '48ms', status: 'Optimal' },
        ]}
      />
    </div>
  );
}`,
    componentTsx: `import React, { useState } from 'react';

// StatBlock, DataTable, PieChart, BarChart
export { StatBlock, DataTable, PieChart, BarChart } from '@/components/ui/DataDisplay';`,
  },
};
