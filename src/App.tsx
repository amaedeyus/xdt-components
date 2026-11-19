import { useState, useEffect, useRef } from 'react';
import { THEMES, type ThemeInfo } from './data/themes';
import { COMPONENT_SNIPPETS } from './data/snippets';
import { Button } from './components/ui/Button';
import { Input, Textarea, Select, Checkbox, Toggle } from './components/ui/Input';
import { Panel, Modal, AlertBanner } from './components/ui/Container';
import { Navbar } from './components/ui/Navbar';
import { Dropdown } from './components/ui/Dropdown';
import { ProgressBar, StepTracker } from './components/ui/ProgressBar';
import {
  StatBlock,
  DataTable,
  PieChart,
  BarChart,
} from './components/ui/DataDisplay';
import { IconLibrary } from './components/icons/IconLibrary';
import { ComponentCustomizer } from './components/customizer/ComponentCustomizer';
import {
  type ComponentKey,
  type ComponentStyleOverride,
} from './types/customizer';
import {
  getComponentCustomStyles,
  getComponentAnimationClasses,
  getComponentAnimationAttrs,
  generateExportableCssSnippet,
  generateExportableJsxSnippet,
} from './utils/customizerStyles';
import {
  Copy,
  Check,
  ArrowRight,
  Send,
  Mail,
  Sparkles,
  Home,
  Layers,
  Settings,
  Edit,
  Trash2,
  Share2,
  Sliders,
  RotateCcw,
  Sun,
  Moon,
  Unlock,
  Lock,
  Activity,
  Server,
  Cpu,
} from 'lucide-react';

export default function App() {
  const [activeThemeId, setActiveThemeId] = useState<string>('claymorphism');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Persistent Light/Dark Mode via localStorage
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('xdt-showcase-color-mode');
      return saved !== null ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('xdt-showcase-color-mode', isDarkMode ? 'dark' : 'light');
    } catch {}
  }, [isDarkMode]);

  // Mode: Default vs. Customizable
  const [isCustomizableMode, setIsCustomizableMode] = useState<boolean>(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(true);

  // Component Overrides
  const [componentOverrides, setComponentOverrides] = useState<
    Record<ComponentKey, ComponentStyleOverride>
  >({
    button: {},
    input: {},
    container: {},
    navbar: {},
    dropdown: {},
    progressbar: {},
    datadisplay: {},
  });

  // Copied feedback states
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [copiedThemeCss, setCopiedThemeCss] = useState<boolean>(false);

  // Code Panel Tabs per component
  const [activeButtonTab, setActiveButtonTab] = useState<'usage' | 'code' | 'custom-css'>('usage');
  const [activeInputTab, setActiveInputTab] = useState<'usage' | 'code' | 'custom-css'>('usage');
  const [activeContainerTab, setActiveContainerTab] = useState<'usage' | 'code' | 'custom-css'>('usage');
  const [activeNavbarTab, setActiveNavbarTab] = useState<'usage' | 'code' | 'custom-css'>('usage');
  const [activeDropdownTab, setActiveDropdownTab] = useState<'usage' | 'code' | 'custom-css'>('usage');
  const [activeProgressTab, setActiveProgressTab] = useState<'usage' | 'code' | 'custom-css'>('usage');
  const [activeDataDisplayTab, setActiveDataDisplayTab] = useState<'usage' | 'code' | 'custom-css'>('usage');

  // Interactive component demo states
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [demoCheckbox, setDemoCheckbox] = useState<boolean>(true);
  const [demoToggle, setDemoToggle] = useState<boolean>(true);
  const [sampleText, setSampleText] = useState<string>('alex_xdt');
  const [demoModalOpen, setDemoModalOpen] = useState<boolean>(false);
  const [demoProgressVal, setDemoProgressVal] = useState<number>(68);
  const [demoCurrentStep, setDemoCurrentStep] = useState<number>(2);
  const [activeDemoNav, setActiveDemoNav] = useState<string>('components');
  const [isInvalidDemoTriggered, setIsInvalidDemoTriggered] = useState<boolean>(false);

  // Scroll reactive progress bar ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeTheme: ThemeInfo =
    THEMES.find((t) => t.id === activeThemeId) || THEMES[0];

  const handleCopy = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(identifier);
    setTimeout(() => {
      setCopiedSection(null);
    }, 2000);
  };

  const handleCopyThemeCss = () => {
    navigator.clipboard.writeText(activeTheme.cssTokens);
    setCopiedThemeCss(true);
    setTimeout(() => {
      setCopiedThemeCss(false);
    }, 2000);
  };

  const handleUpdateOverride = (
    key: ComponentKey,
    updates: Partial<ComponentStyleOverride>
  ) => {
    setComponentOverrides((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        ...updates,
      },
    }));
  };

  const handleResetComponent = (key: ComponentKey) => {
    setComponentOverrides((prev) => ({
      ...prev,
      [key]: {},
    }));
  };

  const handleResetAll = () => {
    setComponentOverrides({
      button: {},
      input: {},
      container: {},
      navbar: {},
      dropdown: {},
      progressbar: {},
      datadisplay: {},
    });
  };

  // Helper to determine active styles for a component
  const getStylesFor = (key: ComponentKey): React.CSSProperties => {
    if (!isCustomizableMode) return {};
    return getComponentCustomStyles(componentOverrides[key]);
  };

  const getAnimClassesFor = (key: ComponentKey): string => {
    if (!isCustomizableMode) return '';
    return getComponentAnimationClasses(componentOverrides[key]);
  };

  const getAnimAttrsFor = (key: ComponentKey): Record<string, string> => {
    if (!isCustomizableMode) return {};
    return getComponentAnimationAttrs(componentOverrides[key]);
  };

  // Category navigation items
  const navCategories = [
    { id: 'all', label: 'All Components' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'inputs', label: 'Inputs & Forms' },
    { id: 'containers', label: 'Containers' },
    { id: 'navbar', label: 'Navigation Bar' },
    { id: 'dropdowns', label: 'Dropdowns' },
    { id: 'progress', label: 'Progress Bars' },
    { id: 'datadisplay', label: 'Data & Reports' },
    { id: 'icons', label: 'Icon Library' },
  ];

  // Showcase shell color palette (Soft Rose / Warm Neutral)
// Dark mode:  Main bg #161416, Elevated #211D20, Accent #E07A9B, Secondary accent #B85C7A, Text #F3EFF1
// Light mode: Main bg #FAF7F8, Elevated #FFFFFF, Text #2B1E25, Accent #D64D7C

const shellBg         = isDarkMode ? '#161416' : '#FAF7F8'; // Warm dark charcoal / Soft alabaster-blush
const headerBg        = isDarkMode ? '#211D20' : '#FFFFFF'; // Neutral elevated surfaces reduce glare
const navBarBg        = isDarkMode ? '#211D20' : '#FFFFFF';
const sidebarBg       = isDarkMode ? '#1C191B' : '#F4ECEF'; // Subtle rose-tinted gray for visual separation
const cardBg          = isDarkMode ? '#211D20' : '#FFFFFF';

const textPrimary     = isDarkMode ? '#F3EFF1' : '#2B1E25'; // Soft off-white / Deep plum-charcoal (less harsh than pure black/navy)
const textMuted       = isDarkMode ? '#A6989F' : '#6E5A63'; // Warm muted taupe-pink
const borderSolid     = isDarkMode ? '#362D32' : '#EADCE2'; // Delicate dusty-rose border

const accentPrimary   = isDarkMode ? '#E07A9B' : '#D64D7C'; // Desaturated rose-pink (comfortable contrast)
const accentSecondary = isDarkMode ? '#B85C7A' : '#E88AA9'; // Muted berry / Soft pastel pink
const ctaBtnBg        = isDarkMode ? '#D65A82' : '#D64D7C'; // Rich rose for clear button affordance

  return (
    <div
      className="min-h-screen flex flex-col antialiased transition-colors duration-150"
      style={{ backgroundColor: shellBg, color: textPrimary }}
    >
      {/* Top Application Header */}
      <header
        className="h-14 px-6 flex items-center justify-between z-30 transition-colors"
        style={{
          backgroundColor: headerBg,
          borderBottom: `1px solid ${borderSolid}`,
        }}
      >
        {/* Brand Slot */}
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 flex items-center justify-center font-bold text-xs"
            style={{ backgroundColor: accentPrimary, color: textPrimary }}
          >
            X
          </div>
          <span className="font-display font-semibold text-base tracking-normal">
            XDT Component Library
          </span>
        </div>

        {/* Top Header Actions: Mode Toggle + Reset + Edit Styles + Copy Theme CSS aligned directly together */}
        <div className="flex items-center gap-2.5">
          {/* Mode Switcher: Default vs. Customizable */}
          <div
            className="flex items-center p-0.5 border"
            style={{
              backgroundColor: isDarkMode ? '#1A1A1D' : '#F5F5F5',
              borderColor: borderSolid,
            }}
          >
            <button
              onClick={() => setIsCustomizableMode(false)}
              className="px-3 py-1 text-xs font-medium transition-colors flex items-center gap-1.5"
              style={{
                backgroundColor: !isCustomizableMode ? accentPrimary : 'transparent',
                color: !isCustomizableMode ? textPrimary : textMuted,
                fontWeight: !isCustomizableMode ? 600 : 400,
              }}
            >
              <Lock size={12} />
              <span>Default</span>
            </button>
            <button
              onClick={() => {
                setIsCustomizableMode(true);
                setIsCustomizerOpen(true);
              }}
              className="px-3 py-1 text-xs font-medium transition-colors flex items-center gap-1.5"
              style={{
                backgroundColor: isCustomizableMode ? accentSecondary : 'transparent',
                color: isCustomizableMode ? textPrimary : textMuted,
                fontWeight: isCustomizableMode ? 600 : 400,
              }}
            >
              <Unlock size={12} />
              <span>Customizable</span>
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={handleResetAll}
            title="Reset all component custom styles to theme default"
            className="px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5 border"
            style={{
              backgroundColor: isDarkMode ? '#1A1A1D' : '#F5F5F5',
              borderColor: borderSolid,
              color: textPrimary,
            }}
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>

          {/* Edit Styles Drawer Toggle (when in Customizable Mode) */}
          {isCustomizableMode && (
            <button
              onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
              className="px-3 py-1.5 text-xs font-medium transition-colors flex items-center gap-1.5"
              style={{
                backgroundColor: isCustomizerOpen ? accentSecondary : ctaBtnBg,
                color: textPrimary,
              }}
            >
              <Sliders size={13} />
              <span>{isCustomizerOpen ? 'Hide Customizer' : 'Edit Styles'}</span>
            </button>
          )}

          {/* Copy Theme CSS Action Button */}
          <button
            onClick={handleCopyThemeCss}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium transition-colors"
            style={{ backgroundColor: ctaBtnBg, color: textPrimary }}
          >
            {copiedThemeCss ? (
              <>
                <Check size={14} />
                <span>Copied CSS Variables</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Theme CSS</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Top Navigation Bar: Centered horizontally, NO "Categories:" label */}
      <nav
        className="px-6 py-2.5 flex items-center justify-center overflow-x-auto gap-2 z-20 transition-colors"
        style={{
          backgroundColor: navBarBg,
          borderBottom: `1px solid ${borderSolid}`,
        }}
      >
        <div className="flex items-center gap-2">
          {navCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-3.5 py-1.5 text-xs font-medium transition-colors shrink-0"
              style={{
                backgroundColor: activeCategory === cat.id ? accentPrimary : 'transparent',
                color: activeCategory === cat.id ? '#F0F0F0' : textMuted,
                borderBottom: activeCategory === cat.id ? `2px solid ${accentSecondary}` : 'none',
                fontWeight: activeCategory === cat.id ? 600 : 400,
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Body: Sidebar + Canvas + Scoped Customizer */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: 18 Themes */}
        <aside
          className="w-64 flex flex-col shrink-0 overflow-y-auto transition-colors"
          style={{
            backgroundColor: sidebarBg,
            borderRight: `1px solid ${borderSolid}`,
          }}
        >
          <div className="p-4 flex flex-col gap-2">
            <div
              className="text-xs font-semibold px-2 py-1"
              style={{ color: textMuted }}
            >
              Select Theme (18 Variations)
            </div>

            <div className="flex flex-col gap-1">
              {THEMES.map((theme) => {
                const isActive = theme.id === activeThemeId;
                return (
                  <button
                    key={theme.id}
                    onClick={() => setActiveThemeId(theme.id)}
                    className="flex items-center justify-between px-3 py-2 text-left text-xs transition-colors"
                    style={{
                      backgroundColor: isActive
                        ? isDarkMode
                          ? '#4A1E3A'
                          : '#FFB3D6'
                        : 'transparent',
                      color: isActive ? textPrimary : textMuted,
                      borderLeft: isActive ? `2px solid ${accentPrimary}` : 'none',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      {/* Geometric flower icon — crisp SVG blossom using theme accent color */}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0"
                        aria-hidden="true"
                      >
                        <ellipse cx="7" cy="2.8" rx="1.5" ry="2.4" fill={theme.accent} transform="rotate(0 7 7)" />
                        <ellipse cx="7" cy="2.8" rx="1.5" ry="2.4" fill={theme.accent} transform="rotate(60 7 7)" />
                        <ellipse cx="7" cy="2.8" rx="1.5" ry="2.4" fill={theme.accent} transform="rotate(120 7 7)" />
                        <ellipse cx="7" cy="2.8" rx="1.5" ry="2.4" fill={theme.accent} transform="rotate(180 7 7)" />
                        <ellipse cx="7" cy="2.8" rx="1.5" ry="2.4" fill={theme.accent} transform="rotate(240 7 7)" />
                        <ellipse cx="7" cy="2.8" rx="1.5" ry="2.4" fill={theme.accent} transform="rotate(300 7 7)" />
                        <circle cx="7" cy="7" r="2.1" fill={theme.accent} />
                        <circle cx="7" cy="7" r="1.1" fill="#ffffff" opacity="0.65" />
                      </svg>
                      <span className="truncate">{theme.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main
          className="flex-1 overflow-y-auto p-8 space-y-10 transition-colors"
          style={{ backgroundColor: shellBg }}
        >
          {/* Active Theme Info Header */}
          <div
            className="p-6 space-y-2 transition-colors"
            style={{
              backgroundColor: cardBg,
              border: `1px solid ${borderSolid}`,
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h1
                    className="font-display text-2xl font-bold tracking-tight"
                    style={{ color: textPrimary }}
                  >
                    {activeTheme.name}
                  </h1>
                  <span className="text-xs font-medium" style={{ color: textMuted }}>
                    Font: {activeTheme.font}
                  </span>
                </div>
                <p className="text-sm max-w-2xl leading-relaxed" style={{ color: textMuted }}>
                  {activeTheme.description}
                </p>
              </div>

              <div
                className="text-xs px-3 py-1.5 flex items-center gap-2 self-start md:self-auto"
                style={{
                  backgroundColor: isDarkMode ? '#1A1A1A' : '#F3F4F6',
                  color: isCustomizableMode ? accentSecondary : textMuted,
                  border: `1px solid ${borderSolid}`,
                  fontWeight: 600,
                }}
              >
                {isCustomizableMode ? <Unlock size={13} /> : <Lock size={13} />}
                <span>
                  {isCustomizableMode
                    ? 'Customizable Mode Active'
                    : 'Theme Baseline Locked'}
                </span>
              </div>
            </div>
          </div>

          {/* Conditional View: Icon Library Page */}
          {activeCategory === 'icons' ? (
            <IconLibrary activeThemeId={activeTheme.id} />
          ) : (
            <>
              {/* Category 1: Buttons */}
              {(activeCategory === 'all' || activeCategory === 'buttons') && (
                <section id="buttons" className="space-y-4">
                  <div>
                    <h2
                      className="font-display text-lg font-semibold"
                      style={{ color: textPrimary }}
                    >
                      Buttons
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: textMuted }}>
                      Variants, sizing, and reactive states
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    {/* Left Column: Live Themed Preview */}
                    <div
                      data-theme={activeTheme.id}
                      style={getStylesFor('button')}
                      className="theme-preview-wrapper p-8 min-h-[380px] flex flex-col justify-between border"
                      {...getAnimAttrsFor('button')}
                    >
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <div
                            className="text-xs font-semibold"
                            style={{ color: 'var(--theme-text-muted, #6B7280)' }}
                          >
                            Variants
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <Button
                              variant="primary"
                              size="md"
                              className={getAnimClassesFor('button')}
                              {...getAnimAttrsFor('button')}
                            >
                              Primary Action
                            </Button>
                            <Button
                              variant="secondary"
                              size="md"
                              className={getAnimClassesFor('button')}
                              {...getAnimAttrsFor('button')}
                            >
                              Secondary
                            </Button>
                            <Button
                              variant="outline"
                              size="md"
                              className={getAnimClassesFor('button')}
                              {...getAnimAttrsFor('button')}
                            >
                              Outline
                            </Button>
                            <Button
                              variant="ghost"
                              size="md"
                              className={getAnimClassesFor('button')}
                              {...getAnimAttrsFor('button')}
                            >
                              Ghost
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div
                            className="text-xs font-semibold"
                            style={{ color: 'var(--theme-text-muted, #6B7280)' }}
                          >
                            Sizing & Icons
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <Button
                              variant="primary"
                              size="sm"
                              leftIcon={<Sparkles size={14} />}
                              className={getAnimClassesFor('button')}
                              {...getAnimAttrsFor('button')}
                            >
                              Small
                            </Button>
                            <Button
                              variant="primary"
                              size="md"
                              rightIcon={<ArrowRight size={16} />}
                              className={getAnimClassesFor('button')}
                              {...getAnimAttrsFor('button')}
                            >
                              Medium
                            </Button>
                            <Button
                              variant="secondary"
                              size="lg"
                              rightIcon={<Send size={18} />}
                              className={getAnimClassesFor('button')}
                              {...getAnimAttrsFor('button')}
                            >
                              Large
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div
                            className="text-xs font-semibold"
                            style={{ color: 'var(--theme-text-muted, #6B7280)' }}
                          >
                            Reactive States
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <Button
                              variant="primary"
                              size="md"
                              isLoading={btnLoading}
                              onClick={() => setBtnLoading(!btnLoading)}
                              className={getAnimClassesFor('button')}
                              {...getAnimAttrsFor('button')}
                            >
                              {btnLoading ? 'Processing' : 'Click For Loading'}
                            </Button>
                            <Button variant="primary" size="md" disabled>
                              Disabled
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div
                        className="pt-4 text-[11px] flex items-center justify-between"
                        style={{ color: 'var(--theme-text-muted, #6B7280)' }}
                      >
                        <span>Theme: {activeTheme.name}</span>
                        <span>
                          {isCustomizableMode && Object.keys(componentOverrides.button).length > 0
                            ? 'Custom Overrides Active'
                            : 'Baseline Tokens Active'}
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Code Panel */}
                    <div
                      className="flex flex-col overflow-hidden border"
                      style={{
                        backgroundColor: '#1E222D',
                        borderColor: borderSolid,
                      }}
                    >
                      <div className="bg-[#171B26] px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveButtonTab('usage')}
                            className={`px-3 py-1 text-xs transition-colors ${
                              activeButtonTab === 'usage'
                                ? 'bg-[#222838] text-white font-medium'
                                : 'text-[#9CA3AF] hover:text-white'
                            }`}
                          >
                            Usage JSX
                          </button>
                          <button
                            onClick={() => setActiveButtonTab('code')}
                            className={`px-3 py-1 text-xs transition-colors ${
                              activeButtonTab === 'code'
                                ? 'bg-[#222838] text-white font-medium'
                                : 'text-[#9CA3AF] hover:text-white'
                            }`}
                          >
                            Component TSX
                          </button>
                          {isCustomizableMode && (
                            <button
                              onClick={() => setActiveButtonTab('custom-css')}
                              className={`px-3 py-1 text-xs transition-colors ${
                                activeButtonTab === 'custom-css'
                                  ? 'bg-[#004D61] text-white font-medium'
                                  : 'text-[#9CA3AF] hover:text-white'
                              }`}
                            >
                              Custom CSS
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            const snippet =
                              activeButtonTab === 'custom-css'
                                ? generateExportableCssSnippet('button', componentOverrides.button)
                                : activeButtonTab === 'usage'
                                ? generateExportableJsxSnippet(
                                    'button',
                                    COMPONENT_SNIPPETS.button.usageJsx,
                                    isCustomizableMode ? componentOverrides.button : undefined
                                  )
                                : COMPONENT_SNIPPETS.button.componentTsx;
                            handleCopy(snippet, 'button');
                          }}
                          className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white px-2 py-1 transition-colors"
                        >
                          {copiedSection === 'button' ? (
                            <>
                              <Check size={13} className="text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-4 text-xs font-mono text-[#D1D5DB] overflow-x-auto flex-1 leading-relaxed bg-[#0F121A]">
                        <code>
                          {activeButtonTab === 'custom-css'
                            ? generateExportableCssSnippet('button', componentOverrides.button)
                            : activeButtonTab === 'usage'
                            ? generateExportableJsxSnippet(
                                'button',
                                COMPONENT_SNIPPETS.button.usageJsx,
                                isCustomizableMode ? componentOverrides.button : undefined
                              )
                            : COMPONENT_SNIPPETS.button.componentTsx}
                        </code>
                      </pre>
                    </div>
                  </div>
                </section>
              )}

              {/* Category 2: Inputs & Forms */}
              {(activeCategory === 'all' || activeCategory === 'inputs') && (
                <section id="inputs" className="space-y-4">
                  <div>
                    <h2
                      className="font-display text-lg font-semibold"
                      style={{ color: textPrimary }}
                    >
                      Inputs & Forms
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: textMuted }}>
                      Text inputs, select dropdowns, textareas, checkboxes, and toggles
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <div
                      data-theme={activeTheme.id}
                      style={getStylesFor('input')}
                      className="theme-preview-wrapper p-8 min-h-[480px] flex flex-col justify-between border"
                    >
                      <div className="space-y-5 max-w-lg">
                        <div
                          className="flex items-center justify-between pb-2 border-b"
                          style={{ borderColor: 'var(--theme-border, #E5E7EB)' }}
                        >
                          <span
                            className="text-xs font-semibold"
                            style={{ color: 'var(--theme-text-muted, #6B7280)' }}
                          >
                            Interactive Form Controls
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsInvalidDemoTriggered(!isInvalidDemoTriggered)}
                            className="px-2.5 py-1 text-xs font-medium transition-colors border flex items-center gap-1.5"
                            style={{
                              backgroundColor: isInvalidDemoTriggered ? '#822659' : (isDarkMode ? '#222222' : '#F3F4F6'),
                              borderColor: isInvalidDemoTriggered ? '#822659' : borderSolid,
                              color: isInvalidDemoTriggered ? '#F0F0F0' : textMuted,
                            }}
                          >
                            <span>Trigger Invalid State</span>
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isInvalidDemoTriggered ? 'bg-red-400 animate-pulse' : 'bg-gray-400'
                              }`}
                            />
                          </button>
                        </div>

                        <Input
                          label="Account Identifier"
                          placeholder="Enter username or email"
                          leftIcon={<Mail size={16} />}
                          helperText="System verification"
                          value={sampleText}
                          onChange={(e) => setSampleText(e.target.value)}
                          invalid={isInvalidDemoTriggered}
                          invalidAnimation={componentOverrides.input?.invalidAnimation}
                          className={getAnimClassesFor('input')}
                        />

                        <Input
                          label="Subdomain Prefix"
                          defaultValue="invalid_subdomain@"
                          error={
                            isInvalidDemoTriggered
                              ? 'Input validation error: characters must be lowercase letters and dashes only'
                              : undefined
                          }
                          invalid={isInvalidDemoTriggered}
                          invalidAnimation={componentOverrides.input?.invalidAnimation}
                          className={getAnimClassesFor('input')}
                        />

                        <Select
                          label="Active Theme Preset"
                          value={activeThemeId}
                          onChange={(e) => setActiveThemeId(e.target.value)}
                          invalid={isInvalidDemoTriggered}
                          invalidAnimation={componentOverrides.input?.invalidAnimation}
                          className={getAnimClassesFor('input')}
                          options={THEMES.map((t) => ({
                            value: t.id,
                            label: t.name,
                          }))}
                        />

                        <Textarea
                          label="Design Feedback"
                          placeholder="Provide notes on border geometry and lighting..."
                          rows={2}
                          invalid={isInvalidDemoTriggered}
                          invalidAnimation={componentOverrides.input?.invalidAnimation}
                          className={getAnimClassesFor('input')}
                        />

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                          <Checkbox
                            label="Auto-synchronize tokens"
                            description="Broadcast overrides immediately"
                            checked={demoCheckbox}
                            onChange={(e) => setDemoCheckbox(e.target.checked)}
                          />

                          <Toggle
                            label="Real-time Shadows"
                            checked={demoToggle}
                            onChange={(e) => setDemoToggle(e.target.checked)}
                          />
                        </div>
                      </div>

                      <div
                        className="pt-6 text-[11px] flex items-center justify-between"
                        style={{ color: 'var(--theme-text-muted, #6B7280)' }}
                      >
                        <span>Theme: {activeTheme.name}</span>
                        <span>
                          {isCustomizableMode && Object.keys(componentOverrides.input).length > 0
                            ? 'Custom Overrides Active'
                            : 'Baseline Tokens Active'}
                        </span>
                      </div>
                    </div>

                    <div
                      className="flex flex-col overflow-hidden border"
                      style={{
                        backgroundColor: '#1E222D',
                        borderColor: borderSolid,
                      }}
                    >
                      <div className="bg-[#171B26] px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveInputTab('usage')}
                            className={`px-3 py-1 text-xs transition-colors ${
                              activeInputTab === 'usage'
                                ? 'bg-[#222838] text-white font-medium'
                                : 'text-[#9CA3AF] hover:text-white'
                            }`}
                          >
                            Usage JSX
                          </button>
                          <button
                            onClick={() => setActiveInputTab('code')}
                            className={`px-3 py-1 text-xs transition-colors ${
                              activeInputTab === 'code'
                                ? 'bg-[#222838] text-white font-medium'
                                : 'text-[#9CA3AF] hover:text-white'
                            }`}
                          >
                            Component TSX
                          </button>
                          {isCustomizableMode && (
                            <button
                              onClick={() => setActiveInputTab('custom-css')}
                              className={`px-3 py-1 text-xs transition-colors ${
                                activeInputTab === 'custom-css'
                                  ? 'bg-[#004D61] text-white font-medium'
                                  : 'text-[#9CA3AF] hover:text-white'
                              }`}
                            >
                              Custom CSS
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            const snippet =
                              activeInputTab === 'custom-css'
                                ? generateExportableCssSnippet('input', componentOverrides.input)
                                : activeInputTab === 'usage'
                                ? generateExportableJsxSnippet(
                                    'input',
                                    COMPONENT_SNIPPETS.input.usageJsx,
                                    isCustomizableMode ? componentOverrides.input : undefined
                                  )
                                : COMPONENT_SNIPPETS.input.componentTsx;
                            handleCopy(snippet, 'input');
                          }}
                          className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white px-2 py-1 transition-colors"
                        >
                          {copiedSection === 'input' ? (
                            <>
                              <Check size={13} className="text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-4 text-xs font-mono text-[#D1D5DB] overflow-x-auto flex-1 leading-relaxed bg-[#0F121A]">
                        <code>
                          {activeInputTab === 'custom-css'
                            ? generateExportableCssSnippet('input', componentOverrides.input)
                            : activeInputTab === 'usage'
                            ? generateExportableJsxSnippet(
                                'input',
                                COMPONENT_SNIPPETS.input.usageJsx,
                                isCustomizableMode ? componentOverrides.input : undefined
                              )
                            : COMPONENT_SNIPPETS.input.componentTsx}
                        </code>
                      </pre>
                    </div>
                  </div>
                </section>
              )}

              {/* Category 3: Containers */}
              {(activeCategory === 'all' || activeCategory === 'containers') && (
                <section id="containers" className="space-y-4">
                  <div>
                    <h2
                      className="font-display text-lg font-semibold"
                      style={{ color: textPrimary }}
                    >
                      Containers & Surfaces
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: textMuted }}>
                      Surface panels, elevated callouts, alert banners, and modal dialogs
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <div
                      data-theme={activeTheme.id}
                      style={getStylesFor('container')}
                      className="theme-preview-wrapper p-8 min-h-[460px] flex flex-col justify-between border"
                    >
                      <div className="space-y-5">
                        <Panel
                          title="Design System Pipeline"
                          subtitle="Multi-theme active workspace"
                          className={getAnimClassesFor('container')}
                          action={
                            <Button variant="outline" size="sm">
                              Manage
                            </Button>
                          }
                          footer={
                            <div className="flex items-center justify-between text-xs text-[#6B7280]">
                              <span>Status: Synchronized</span>
                              <span>18 Themes Active</span>
                            </div>
                          }
                        >
                          <p
                            className="text-xs leading-relaxed"
                            style={{ color: 'var(--theme-text-muted, #6B7280)' }}
                          >
                            Components adapt through CSS custom properties. Each aesthetic
                            layer establishes bespoke lighting, shadows, and structural borders.
                          </p>
                        </Panel>

                        <AlertBanner
                          variant="info"
                          title="Architecture Deployment"
                          className={getAnimClassesFor('container')}
                          onDismiss={() => {}}
                        >
                          Full set of 18 visual themes and reusable primitives deployed.
                        </AlertBanner>

                        <div className="pt-2 flex items-center gap-3">
                          <Button
                            variant="primary"
                            onClick={() => setDemoModalOpen(true)}
                            className={getAnimClassesFor('container')}
                          >
                            Preview Themed Modal
                          </Button>
                        </div>
                      </div>

                      <Modal
                        isOpen={demoModalOpen}
                        onClose={() => setDemoModalOpen(false)}
                        title="Export Tokens"
                        actions={
                          <>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => setDemoModalOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => {
                                handleCopyThemeCss();
                                setDemoModalOpen(false);
                              }}
                            >
                              Copy CSS
                            </Button>
                          </>
                        }
                      >
                        <p className="text-xs leading-relaxed">
                          Export all CSS variables for {activeTheme.name} to incorporate into your
                          project build.
                        </p>
                      </Modal>

                      <div
                        className="pt-6 text-[11px] flex items-center justify-between"
                        style={{ color: 'var(--theme-text-muted, #6B7280)' }}
                      >
                        <span>Theme: {activeTheme.name}</span>
                        <span>
                          {isCustomizableMode && Object.keys(componentOverrides.container).length > 0
                            ? 'Custom Overrides Active'
                            : 'Baseline Tokens Active'}
                        </span>
                      </div>
                    </div>

                    <div
                      className="flex flex-col overflow-hidden border"
                      style={{
                        backgroundColor: '#1E222D',
                        borderColor: borderSolid,
                      }}
                    >
                      <div className="bg-[#171B26] px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveContainerTab('usage')}
                            className={`px-3 py-1 text-xs transition-colors ${
                              activeContainerTab === 'usage'
                                ? 'bg-[#222838] text-white font-medium'
                                : 'text-[#9CA3AF] hover:text-white'
                            }`}
                          >
                            Usage JSX
                          </button>
                          <button
                            onClick={() => setActiveContainerTab('code')}
                            className={`px-3 py-1 text-xs transition-colors ${
                              activeContainerTab === 'code'
                                ? 'bg-[#222838] text-white font-medium'
                                : 'text-[#9CA3AF] hover:text-white'
                            }`}
                          >
                            Component TSX
                          </button>
                          {isCustomizableMode && (
                            <button
                              onClick={() => setActiveContainerTab('custom-css')}
                              className={`px-3 py-1 text-xs transition-colors ${
                                activeContainerTab === 'custom-css'
                                  ? 'bg-[#004D61] text-white font-medium'
                                  : 'text-[#9CA3AF] hover:text-white'
                              }`}
                            >
                              Custom CSS
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            const snippet =
                              activeContainerTab === 'custom-css'
                                ? generateExportableCssSnippet('container', componentOverrides.container)
                                : activeContainerTab === 'usage'
                                ? generateExportableJsxSnippet(
                                    'container',
                                    COMPONENT_SNIPPETS.container.usageJsx,
                                    isCustomizableMode ? componentOverrides.container : undefined
                                  )
                                : COMPONENT_SNIPPETS.container.componentTsx;
                            handleCopy(snippet, 'container');
                          }}
                          className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white px-2 py-1 transition-colors"
                        >
                          {copiedSection === 'container' ? (
                            <>
                              <Check size={13} className="text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-4 text-xs font-mono text-[#D1D5DB] overflow-x-auto flex-1 leading-relaxed bg-[#0F121A]">
                        <code>
                          {activeContainerTab === 'custom-css'
                            ? generateExportableCssSnippet('container', componentOverrides.container)
                            : activeContainerTab === 'usage'
                            ? generateExportableJsxSnippet(
                                'container',
                                COMPONENT_SNIPPETS.container.usageJsx,
                                isCustomizableMode ? componentOverrides.container : undefined
                              )
                            : COMPONENT_SNIPPETS.container.componentTsx}
                        </code>
                      </pre>
                    </div>
                  </div>
                </section>
              )}

              {/* Category 4: Navigation Bar */}
              {(activeCategory === 'all' || activeCategory === 'navbar') && (
                <section id="navbar" className="space-y-4">
                  <div>
                    <h2
                      className="font-display text-lg font-semibold"
                      style={{ color: textPrimary }}
                    >
                      Navigation Bar
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: textMuted }}>
                      Responsive top navigation bar with brand, active link indicator, and mobile menu
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <div
                      data-theme={activeTheme.id}
                      style={getStylesFor('navbar')}
                      className="theme-preview-wrapper p-8 min-h-[340px] flex flex-col justify-between border"
                    >
                      <div className="space-y-6">
                        <Navbar
                          brand={
                            <div className="flex items-center gap-2">
                              <span
                                className="w-5 h-5 flex items-center justify-center font-bold text-xs"
                                style={{
                                  backgroundColor: 'var(--theme-accent, #3B82F6)',
                                  color: 'var(--theme-primary-text, #fff)',
                                }}
                              >
                                X
                              </span>
                              <span
                                className="font-bold text-xs"
                                style={{ color: 'var(--theme-text)' }}
                              >
                                Brand.ui
                              </span>
                            </div>
                          }
                          activeId={activeDemoNav}
                          onSelect={(id) => setActiveDemoNav(id)}
                          className={getAnimClassesFor('navbar')}
                          items={[
                            { id: 'overview', label: 'Overview', icon: <Home size={14} /> },
                            { id: 'components', label: 'Components', icon: <Layers size={14} /> },
                            { id: 'settings', label: 'Settings', icon: <Settings size={14} /> },
                          ]}
                          actions={
                            <Button variant="primary" size="sm">
                              Connect
                            </Button>
                          }
                        />

                        <div
                          className="p-4 theme-surface text-xs text-left"
                          style={{ color: 'var(--theme-text-muted)' }}
                        >
                          Active Navigation Tab:{' '}
                          <span className="font-bold" style={{ color: 'var(--theme-text)' }}>
                            {activeDemoNav}
                          </span>
                        </div>
                      </div>

                      <div
                        className="pt-4 text-[11px] flex items-center justify-between"
                        style={{ color: 'var(--theme-text-muted, #6B7280)' }}
                      >
                        <span>Theme: {activeTheme.name}</span>
                        <span>
                          {isCustomizableMode && Object.keys(componentOverrides.navbar).length > 0
                            ? 'Custom Overrides Active'
                            : 'Baseline Tokens Active'}
                        </span>
                      </div>
                    </div>

                    <div
                      className="flex flex-col overflow-hidden border"
                      style={{
                        backgroundColor: '#1E222D',
                        borderColor: borderSolid,
                      }}
                    >
                      <div className="bg-[#171B26] px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveNavbarTab('usage')}
                            className={`px-3 py-1 text-xs transition-colors ${
                              activeNavbarTab === 'usage'
                                ? 'bg-[#222838] text-white font-medium'
                                : 'text-[#9CA3AF] hover:text-white'
                            }`}
                          >
                            Usage JSX
                          </button>
                          <button
                            onClick={() => setActiveNavbarTab('code')}
                            className={`px-3 py-1 text-xs transition-colors ${
                              activeNavbarTab === 'code'
                                ? 'bg-[#222838] text-white font-medium'
                                : 'text-[#9CA3AF] hover:text-white'
                            }`}
                          >
                            Component TSX
                          </button>
                          {isCustomizableMode && (
                            <button
                              onClick={() => setActiveNavbarTab('custom-css')}
                              className={`px-3 py-1 text-xs transition-colors ${
                                activeNavbarTab === 'custom-css'
                                  ? 'bg-[#004D61] text-white font-medium'
                                  : 'text-[#9CA3AF] hover:text-white'
                              }`}
                            >
                              Custom CSS
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            const snippet =
                              activeNavbarTab === 'custom-css'
                                ? generateExportableCssSnippet('navbar', componentOverrides.navbar)
                                : activeNavbarTab === 'usage'
                                ? generateExportableJsxSnippet(
                                    'navbar',
                                    COMPONENT_SNIPPETS.navbar.usageJsx,
                                    isCustomizableMode ? componentOverrides.navbar : undefined
                                  )
                                : COMPONENT_SNIPPETS.navbar.componentTsx;
                            handleCopy(snippet, 'navbar');
                          }}
                          className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white px-2 py-1 transition-colors"
                        >
                          {copiedSection === 'navbar' ? (
                            <>
                              <Check size={13} className="text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-4 text-xs font-mono text-[#D1D5DB] overflow-x-auto flex-1 leading-relaxed bg-[#0F121A]">
                        <code>
                          {activeNavbarTab === 'custom-css'
                            ? generateExportableCssSnippet('navbar', componentOverrides.navbar)
                            : activeNavbarTab === 'usage'
                            ? generateExportableJsxSnippet(
                                'navbar',
                                COMPONENT_SNIPPETS.navbar.usageJsx,
                                isCustomizableMode ? componentOverrides.navbar : undefined
                              )
                            : COMPONENT_SNIPPETS.navbar.componentTsx}
                        </code>
                      </pre>
                    </div>
                  </div>
                </section>
              )}

              {/* Category 5: Dropdown */}
              {(activeCategory === 'all' || activeCategory === 'dropdowns') && (
                <section id="dropdowns" className="space-y-4">
                  <div>
                    <h2
                      className="font-display text-lg font-semibold"
                      style={{ color: textPrimary }}
                    >
                      Dropdowns
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: textMuted }}>
                      Accessible click-triggered menu with keyboard navigation and divider items
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <div
                      data-theme={activeTheme.id}
                      style={getStylesFor('dropdown')}
                      className="theme-preview-wrapper p-8 min-h-[340px] flex flex-col justify-between border"
                    >
                      <div className="space-y-6">
                        <div className="flex flex-wrap items-center gap-4">
                          <Dropdown
                            label="Project Actions"
                            className={getAnimClassesFor('dropdown')}
                            items={[
                              {
                                id: 'edit',
                                label: 'Edit Properties',
                                icon: <Edit size={14} />,
                              },
                              {
                                id: 'duplicate',
                                label: 'Duplicate Tokens',
                                icon: <Copy size={14} />,
                              },
                              {
                                id: 'share',
                                label: 'Share Link',
                                icon: <Share2 size={14} />,
                              },
                              { id: 'div-1', label: '', divider: true },
                              {
                                id: 'delete',
                                label: 'Delete Item',
                                icon: <Trash2 size={14} />,
                                destructive: true,
                              },
                            ]}
                          />

                          <Dropdown
                            label="Theme Options"
                            align="right"
                            className={getAnimClassesFor('dropdown')}
                            items={[
                              { id: '1', label: 'Export Variables' },
                              { id: '2', label: 'Dark Mode Sync' },
                              { id: '3', label: 'High Contrast' },
                            ]}
                          />
                        </div>
                      </div>

                      <div
                        className="pt-4 text-[11px] flex items-center justify-between"
                        style={{ color: 'var(--theme-text-muted, #6B7280)' }}
                      >
                        <span>Theme: {activeTheme.name}</span>
                        <span>
                          {isCustomizableMode && Object.keys(componentOverrides.dropdown).length > 0
                            ? 'Custom Overrides Active'
                            : 'Baseline Tokens Active'}
                        </span>
                      </div>
                    </div>

                    <div
                      className="flex flex-col overflow-hidden border"
                      style={{
                        backgroundColor: '#1E222D',
                        borderColor: borderSolid,
                      }}
                    >
                      <div className="bg-[#171B26] px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveDropdownTab('usage')}
                            className={`px-3 py-1 text-xs transition-colors ${
                              activeDropdownTab === 'usage'
                                ? 'bg-[#222838] text-white font-medium'
                                : 'text-[#9CA3AF] hover:text-white'
                            }`}
                          >
                            Usage JSX
                          </button>
                          <button
                            onClick={() => setActiveDropdownTab('code')}
                            className={`px-3 py-1 text-xs transition-colors ${
                              activeDropdownTab === 'code'
                                ? 'bg-[#222838] text-white font-medium'
                                : 'text-[#9CA3AF] hover:text-white'
                            }`}
                          >
                            Component TSX
                          </button>
                          {isCustomizableMode && (
                            <button
                              onClick={() => setActiveDropdownTab('custom-css')}
                              className={`px-3 py-1 text-xs transition-colors ${
                                activeDropdownTab === 'custom-css'
                                  ? 'bg-[#004D61] text-white font-medium'
                                  : 'text-[#9CA3AF] hover:text-white'
                              }`}
                            >
                              Custom CSS
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            const snippet =
                              activeDropdownTab === 'custom-css'
                                ? generateExportableCssSnippet('dropdown', componentOverrides.dropdown)
                                : activeDropdownTab === 'usage'
                                ? generateExportableJsxSnippet(
                                    'dropdown',
                                    COMPONENT_SNIPPETS.dropdown.usageJsx,
                                    isCustomizableMode ? componentOverrides.dropdown : undefined
                                  )
                                : COMPONENT_SNIPPETS.dropdown.componentTsx;
                            handleCopy(snippet, 'dropdown');
                          }}
                          className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white px-2 py-1 transition-colors"
                        >
                          {copiedSection === 'dropdown' ? (
                            <>
                              <Check size={13} className="text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-4 text-xs font-mono text-[#D1D5DB] overflow-x-auto flex-1 leading-relaxed bg-[#0F121A]">
                        <code>
                          {activeDropdownTab === 'custom-css'
                            ? generateExportableCssSnippet('dropdown', componentOverrides.dropdown)
                            : activeDropdownTab === 'usage'
                            ? generateExportableJsxSnippet(
                                'dropdown',
                                COMPONENT_SNIPPETS.dropdown.usageJsx,
                                isCustomizableMode ? componentOverrides.dropdown : undefined
                              )
                            : COMPONENT_SNIPPETS.dropdown.componentTsx}
                        </code>
                      </pre>
                    </div>
                  </div>
                </section>
              )}

              {/* Category 6: Progress Bars (Expanded: Vertical, Steps, Scroll) */}
              {(activeCategory === 'all' || activeCategory === 'progress') && (
                <section id="progress" className="space-y-4">
                  <div>
                    <h2
                      className="font-display text-lg font-semibold"
                      style={{ color: textPrimary }}
                    >
                      Progress Bars & Steps
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: textMuted }}>
                      Horizontal and vertical bars with controlled, step-reactive, and scroll-reactive modes
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    <div
                      data-theme={activeTheme.id}
                      style={getStylesFor('progressbar')}
                      className="theme-preview-wrapper p-8 min-h-[460px] flex flex-col justify-between border"
                    >
                      <div className="space-y-8">
                        {/* 1. Controlled Horizontal Progress with -15 / +15 */}
                        <div className="space-y-2">
                          <span
                            className="text-xs font-semibold block"
                            style={{ color: 'var(--theme-text)' }}
                          >
                            Horizontal Controlled
                          </span>
                          <ProgressBar
                            value={demoProgressVal}
                            label="Component Token Build"
                            size="md"
                            orientation={componentOverrides.progressbar.orientation || 'horizontal'}
                            trackColor={componentOverrides.progressbar.trackColor}
                            fillColor={componentOverrides.progressbar.fillColor}
                            thickness={componentOverrides.progressbar.thickness}
                            className={getAnimClassesFor('progressbar')}
                          />
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() => setDemoProgressVal((v) => Math.max(0, v - 15))}
                              className="px-2 py-1 text-[11px] theme-btn theme-btn-secondary"
                            >
                              -15%
                            </button>
                            <button
                              onClick={() => setDemoProgressVal((v) => Math.min(100, v + 15))}
                              className="px-2 py-1 text-[11px] theme-btn theme-btn-primary"
                            >
                              +15%
                            </button>
                          </div>
                        </div>

                        {/* 2. Vertical Progress Bar Demo */}
                        <div className="space-y-2">
                          <span
                            className="text-xs font-semibold block"
                            style={{ color: 'var(--theme-text)' }}
                          >
                            Vertical Progress & Battery Levels
                          </span>
                          <div className="flex items-end gap-6 pt-1">
                            <ProgressBar
                              orientation="vertical"
                              value={demoProgressVal}
                              height={140}
                              label="Buffer"
                              trackColor={componentOverrides.progressbar.trackColor}
                              fillColor={componentOverrides.progressbar.fillColor}
                              className={getAnimClassesFor('progressbar')}
                            />
                            <ProgressBar
                              orientation="vertical"
                              value={92}
                              height={140}
                              label="Signal"
                              className={getAnimClassesFor('progressbar')}
                            />
                            <ProgressBar
                              orientation="vertical"
                              value={40}
                              height={140}
                              label="Power"
                              className={getAnimClassesFor('progressbar')}
                            />
                          </div>
                        </div>

                        {/* 3. Reactive Step Mode Demo */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span
                              className="text-xs font-semibold"
                              style={{ color: 'var(--theme-text)' }}
                            >
                              Reactive Step Mode (Step {demoCurrentStep} of 4)
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setDemoCurrentStep((s) => Math.max(1, s - 1))}
                                disabled={demoCurrentStep <= 1}
                                className="px-2 py-0.5 text-[11px] theme-btn theme-btn-secondary disabled:opacity-40"
                              >
                                Prev
                              </button>
                              <button
                                onClick={() => setDemoCurrentStep((s) => Math.min(4, s + 1))}
                                disabled={demoCurrentStep >= 4}
                                className="px-2 py-0.5 text-[11px] theme-btn theme-btn-primary disabled:opacity-40"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                          <ProgressBar
                            mode="steps"
                            currentStep={demoCurrentStep}
                            totalSteps={4}
                            label="Checkout Completion"
                            trackColor={componentOverrides.progressbar.trackColor}
                            fillColor={componentOverrides.progressbar.fillColor}
                            className={getAnimClassesFor('progressbar')}
                          />
                          <StepTracker
                            currentStep={demoCurrentStep - 1}
                            onStepClick={(i) => setDemoCurrentStep(i + 1)}
                            steps={[
                              { id: '1', title: 'Aesthetic' },
                              { id: '2', title: 'Tokens' },
                              { id: '3', title: 'Components' },
                              { id: '4', title: 'Export' },
                            ]}
                          />
                        </div>

                        {/* 4. Passive Scroll-Reactive Progress Bar Demo */}
                        <div className="space-y-2">
                          <span
                            className="text-xs font-semibold block"
                            style={{ color: 'var(--theme-text)' }}
                          >
                            Scroll-Reactive Container Demo
                          </span>
                          <ProgressBar
                            mode="scroll"
                            targetRef={scrollContainerRef}
                            label="Container Scroll Readout"
                            trackColor={componentOverrides.progressbar.trackColor}
                            fillColor={componentOverrides.progressbar.fillColor}
                            className={getAnimClassesFor('progressbar')}
                          />
                          <div
                            ref={scrollContainerRef}
                            className="h-28 overflow-y-auto p-3 text-xs leading-relaxed border"
                            style={{
                              backgroundColor: 'var(--theme-surface-alt, rgba(0,0,0,0.03))',
                              borderColor: 'var(--theme-border, #E5E7EB)',
                              color: 'var(--theme-text-muted)',
                            }}
                          >
                            <p className="font-semibold mb-2" style={{ color: 'var(--theme-text)' }}>
                              Scroll inside this box to test the reactive scroll tracking listener:
                            </p>
                            <p className="mb-2">
                              1. The component attaches an optimized passive scroll event listener to
                              this target container.
                            </p>
                            <p className="mb-2">
                              2. As you scroll down through these design specifications, the progress
                              percentage recalculates automatically.
                            </p>
                            <p className="mb-2">
                              3. Token parameters: orientation, track background, active fill color,
                              and container height adjust synchronously.
                            </p>
                            <p>
                              4. All 18 theme aesthetic palettes support this fluid orientation and
                              reactive tracking mode.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className="pt-6 text-[11px] flex items-center justify-between"
                        style={{ color: 'var(--theme-text-muted, #6B7280)' }}
                      >
                        <span>Theme: {activeTheme.name}</span>
                        <span>
                          {isCustomizableMode && Object.keys(componentOverrides.progressbar).length > 0
                            ? 'Custom Overrides Active'
                            : 'Baseline Tokens Active'}
                        </span>
                      </div>
                    </div>

                    <div
                      className="flex flex-col overflow-hidden border"
                      style={{
                        backgroundColor: '#1E222D',
                        borderColor: borderSolid,
                      }}
                    >
                      <div className="bg-[#171B26] px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveProgressTab('usage')}
                            className={`px-3 py-1 text-xs transition-colors ${
                              activeProgressTab === 'usage'
                                ? 'bg-[#222838] text-white font-medium'
                                : 'text-[#9CA3AF] hover:text-white'
                            }`}
                          >
                            Usage JSX
                          </button>
                          <button
                            onClick={() => setActiveProgressTab('code')}
                            className={`px-3 py-1 text-xs transition-colors ${
                              activeProgressTab === 'code'
                                ? 'bg-[#222838] text-white font-medium'
                                : 'text-[#9CA3AF] hover:text-white'
                            }`}
                          >
                            Component TSX
                          </button>
                          {isCustomizableMode && (
                            <button
                              onClick={() => setActiveProgressTab('custom-css')}
                              className={`px-3 py-1 text-xs transition-colors ${
                                activeProgressTab === 'custom-css'
                                  ? 'bg-[#004D61] text-white font-medium'
                                  : 'text-[#9CA3AF] hover:text-white'
                              }`}
                            >
                              Custom CSS
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            const snippet =
                              activeProgressTab === 'custom-css'
                                ? generateExportableCssSnippet('progressbar', componentOverrides.progressbar)
                                : activeProgressTab === 'usage'
                                ? generateExportableJsxSnippet(
                                    'progressbar',
                                    COMPONENT_SNIPPETS.progressbar.usageJsx,
                                    isCustomizableMode ? componentOverrides.progressbar : undefined
                                  )
                                : COMPONENT_SNIPPETS.progressbar.componentTsx;
                            handleCopy(snippet, 'progressbar');
                          }}
                          className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white px-2 py-1 transition-colors"
                        >
                          {copiedSection === 'progressbar' ? (
                            <>
                              <Check size={13} className="text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-4 text-xs font-mono text-[#D1D5DB] overflow-x-auto flex-1 leading-relaxed bg-[#0F121A]">
                        <code>
                          {activeProgressTab === 'custom-css'
                            ? generateExportableCssSnippet('progressbar', componentOverrides.progressbar)
                            : activeProgressTab === 'usage'
                            ? generateExportableJsxSnippet(
                                'progressbar',
                                COMPONENT_SNIPPETS.progressbar.usageJsx,
                                isCustomizableMode ? componentOverrides.progressbar : undefined
                              )
                            : COMPONENT_SNIPPETS.progressbar.componentTsx}
                        </code>
                      </pre>
                    </div>
                  </div>
                </section>
              )}

              {/* Category 7: Data & Reports */}
              {(activeCategory === 'all' || activeCategory === 'datadisplay') && (
                <section id="datadisplay" className="space-y-4">
                  <div>
                    <h2
                      className="font-display text-lg font-semibold"
                      style={{ color: textPrimary }}
                    >
                      Data & Reports
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: textMuted }}>
                      Data tables with sorting, interactive SVG pie/donut charts, and KPI summary stat blocks
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
                    {/* Left Column: Live Themed Preview */}
                    <div
                      data-theme={activeTheme.id}
                      style={getStylesFor('datadisplay')}
                      className="theme-preview-wrapper p-8 min-h-[480px] flex flex-col justify-between border"
                    >
                      <div className="space-y-6">
                        {/* 1. Stat / KPI Blocks (Strictly NO pills or tags) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <StatBlock
                            label="Throughput"
                            value="148.4k"
                            delta={{ value: '18.2%', isPositive: true, period: 'week' }}
                            icon={<Activity size={16} />}
                            className={getAnimClassesFor('datadisplay')}
                          />
                          <StatBlock
                            label="Latency"
                            value="14ms"
                            delta={{ value: '2.1%', isPositive: false, period: 'average' }}
                            icon={<Server size={16} />}
                            className={getAnimClassesFor('datadisplay')}
                          />
                          <StatBlock
                            label="Active Nodes"
                            value="32"
                            delta={{ value: '4 nodes', isPositive: true }}
                            icon={<Cpu size={16} />}
                            className={getAnimClassesFor('datadisplay')}
                          />
                        </div>

                        {/* 2. Charts: Donut & Comparative Bar Breakdown */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <PieChart
                            donut={true}
                            data={[
                              { label: 'Compute', value: 42 },
                              { label: 'Memory', value: 28 },
                              { label: 'Storage', value: 18 },
                              { label: 'Network', value: 12 },
                            ]}
                            className={getAnimClassesFor('datadisplay')}
                          />

                          <BarChart
                            title="Resource Distribution"
                            data={[
                              { label: 'Edge Gateways', value: 84 },
                              { label: 'Database Cluster', value: 65 },
                              { label: 'Cache Cluster', value: 48 },
                              { label: 'Auth Workers', value: 22 },
                            ]}
                            className={getAnimClassesFor('datadisplay')}
                          />
                        </div>

                        {/* 3. Responsive Sortable Data Table */}
                        <div>
                          <DataTable
                            striped={true}
                            headerFill={componentOverrides.datadisplay.tableHeaderFill}
                            rowHoverBg={componentOverrides.datadisplay.tableRowHoverBg}
                            borderColor={componentOverrides.datadisplay.tableBorderColor}
                            columns={[
                              { key: 'service', title: 'Service Name', sortable: true },
                              { key: 'runtime', title: 'Runtime', sortable: true },
                              { key: 'uptime', title: 'Uptime', align: 'right', sortable: true },
                              { key: 'status', title: 'System State', align: 'right' },
                            ]}
                            data={[
                              { service: 'Authentication Core', runtime: 'Node 22', uptime: '99.98%', status: 'Normal' },
                              { service: 'Routing Gateway', runtime: 'Go 1.23', uptime: '99.95%', status: 'Optimal' },
                              { service: 'Queue Workers', runtime: 'Rust', uptime: '99.99%', status: 'Active' },
                              { service: 'Object Cache', runtime: 'Redis 7', uptime: '99.90%', status: 'Degraded' },
                            ]}
                            className={getAnimClassesFor('datadisplay')}
                          />
                        </div>
                      </div>

                      <div
                        className="pt-6 text-[11px] flex items-center justify-between"
                        style={{ color: 'var(--theme-text-muted, #6B7280)' }}
                      >
                        <span>Theme: {activeTheme.name}</span>
                        <span>
                          {isCustomizableMode && Object.keys(componentOverrides.datadisplay).length > 0
                            ? 'Custom Overrides Active'
                            : 'Baseline Tokens Active'}
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Code Panel */}
                    <div
                      className="flex flex-col overflow-hidden border"
                      style={{
                        backgroundColor: '#1E222D',
                        borderColor: borderSolid,
                      }}
                    >
                      <div className="bg-[#171B26] px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveDataDisplayTab('usage')}
                            className={`px-3 py-1 text-xs transition-colors ${
                              activeDataDisplayTab === 'usage'
                                ? 'bg-[#222838] text-white font-medium'
                                : 'text-[#9CA3AF] hover:text-white'
                            }`}
                          >
                            Usage JSX
                          </button>
                          <button
                            onClick={() => setActiveDataDisplayTab('code')}
                            className={`px-3 py-1 text-xs transition-colors ${
                              activeDataDisplayTab === 'code'
                                ? 'bg-[#222838] text-white font-medium'
                                : 'text-[#9CA3AF] hover:text-white'
                            }`}
                          >
                            Component TSX
                          </button>
                          {isCustomizableMode && (
                            <button
                              onClick={() => setActiveDataDisplayTab('custom-css')}
                              className={`px-3 py-1 text-xs transition-colors ${
                                activeDataDisplayTab === 'custom-css'
                                  ? 'bg-[#004D61] text-white font-medium'
                                  : 'text-[#9CA3AF] hover:text-white'
                              }`}
                            >
                              Custom CSS
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            const snippet =
                              activeDataDisplayTab === 'custom-css'
                                ? generateExportableCssSnippet('datadisplay', componentOverrides.datadisplay)
                                : activeDataDisplayTab === 'usage'
                                ? generateExportableJsxSnippet(
                                    'datadisplay',
                                    COMPONENT_SNIPPETS.datadisplay.usageJsx,
                                    isCustomizableMode ? componentOverrides.datadisplay : undefined
                                  )
                                : COMPONENT_SNIPPETS.datadisplay.componentTsx;
                            handleCopy(snippet, 'datadisplay');
                          }}
                          className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white px-2 py-1 transition-colors"
                        >
                          {copiedSection === 'datadisplay' ? (
                            <>
                              <Check size={13} className="text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-4 text-xs font-mono text-[#D1D5DB] overflow-x-auto flex-1 leading-relaxed bg-[#0F121A]">
                        <code>
                          {activeDataDisplayTab === 'custom-css'
                            ? generateExportableCssSnippet('datadisplay', componentOverrides.datadisplay)
                            : activeDataDisplayTab === 'usage'
                            ? generateExportableJsxSnippet(
                                'datadisplay',
                                COMPONENT_SNIPPETS.datadisplay.usageJsx,
                                isCustomizableMode ? componentOverrides.datadisplay : undefined
                              )
                            : COMPONENT_SNIPPETS.datadisplay.componentTsx}
                        </code>
                      </pre>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}
        </main>

        {/* Collapsible Per-Component Customizer Drawer (Scoped to activeCategory) */}
        {isCustomizableMode && (
          <ComponentCustomizer
            overrides={componentOverrides}
            onUpdateOverride={handleUpdateOverride}
            onResetComponent={handleResetComponent}
            onResetAll={handleResetAll}
            isDarkMode={isDarkMode}
            isOpen={isCustomizerOpen}
            onClose={() => setIsCustomizerOpen(false)}
            activeCategory={activeCategory}
            activeTheme={activeTheme}
          />
        )}
      </div>

      {/* Floating Light/Dark Mode Button (Fixed Bottom-Right) */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className="fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center transition-all shadow-md border"
        style={{
          backgroundColor: isDarkMode ? '#262626' : '#FFFFFF',
          borderColor: borderSolid,
          color: textPrimary,
        }}
        aria-label="Toggle Light/Dark Mode"
      >
        {isDarkMode ? (
          <Sun size={17} className="text-amber-400" />
        ) : (
          <Moon size={17} className="text-sky-600" />
        )}
      </button>
    </div>
  );
}
