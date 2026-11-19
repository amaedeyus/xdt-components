import React, { useState } from 'react';
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
    <nav
      className={`theme-surface px-5 py-3 w-full transition-all ${className}`}
    >
      <div className="flex items-center justify-between">
        {/* Brand Slot */}
        <div className="flex items-center gap-3">{brand}</div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  item.onClick?.();
                  onSelect?.(item.id);
                }}
                className={`relative px-3.5 py-1.5 text-xs font-medium transition-all flex items-center gap-2`}
                style={{
                  borderRadius: 'var(--theme-radius-sm, 4px)',
                  color: isActive ? 'var(--theme-text)' : 'var(--theme-text-muted)',
                  backgroundColor: isActive
                    ? 'rgba(0, 0, 0, 0.06)'
                    : 'transparent',
                }}
              >
                {item.icon}
                <span>{item.label}</span>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-0.5"
                    style={{
                      backgroundColor: 'var(--theme-accent, #3B82F6)',
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop Actions Slot */}
        {actions && <div className="hidden md:flex items-center gap-3">{actions}</div>}

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 transition-colors"
            style={{ color: 'var(--theme-text)' }}
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Dropdown */}
      {mobileOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-black/10 dark:border-white/10 mt-3 flex flex-col gap-1 text-left">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  item.onClick?.();
                  onSelect?.(item.id);
                  setMobileOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-xs font-medium transition-all flex items-center gap-2.5"
                style={{
                  borderRadius: 'var(--theme-radius-sm, 4px)',
                  color: isActive ? 'var(--theme-text)' : 'var(--theme-text-muted)',
                  backgroundColor: isActive
                    ? 'rgba(0, 0, 0, 0.08)'
                    : 'transparent',
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
          {actions && <div className="pt-3 mt-1 flex flex-col gap-2">{actions}</div>}
        </div>
      )}
    </nav>
  );
};
