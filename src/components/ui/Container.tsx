import React from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

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
    <div
      className={`theme-surface p-5 flex flex-col text-left transition-all ${className}`}
      {...props}
    >
      {(title || subtitle || action) && (
        <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-black/10 dark:border-white/10">
          <div>
            {title && (
              <h3
                className="font-bold text-base tracking-normal"
                style={{ color: 'var(--theme-text)' }}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                className="text-xs mt-0.5"
                style={{ color: 'var(--theme-text-muted)' }}
              >
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}

      <div className="flex-1">{children}</div>

      {footer && (
        <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10">
          {footer}
        </div>
      )}
    </div>
  );
};

export interface ElevatedBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  accentColor?: string;
}

export const ElevatedBlock: React.FC<ElevatedBlockProps> = ({
  accentColor,
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`theme-surface p-6 relative overflow-hidden transition-all ${className}`}
      style={{
        borderLeft: accentColor ? `4px solid ${accentColor}` : undefined,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="theme-surface w-full max-w-md p-6 relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/10 dark:border-white/10">
          <h3
            className="font-bold text-base"
            style={{ color: 'var(--theme-text)' }}
          >
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:opacity-75 transition-opacity"
            style={{ color: 'var(--theme-text-muted)' }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="text-sm my-3" style={{ color: 'var(--theme-text)' }}>
          {children}
        </div>

        {actions && (
          <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-black/10 dark:border-white/10">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger';

export interface AlertBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  onDismiss?: () => void;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  variant = 'info',
  title,
  onDismiss,
  children,
  className = '',
  ...props
}) => {
  const icons: Record<AlertVariant, React.ReactNode> = {
    info: <Info size={18} className="shrink-0 text-sky-500" />,
    success: <CheckCircle size={18} className="shrink-0 text-emerald-500" />,
    warning: <AlertTriangle size={18} className="shrink-0 text-amber-500" />,
    danger: <AlertCircle size={18} className="shrink-0 text-rose-500" />,
  };

  return (
    <div
      className={`theme-surface p-3.5 flex items-start gap-3 text-left transition-all ${className}`}
      {...props}
    >
      {icons[variant]}
      <div className="flex-1 min-w-0">
        {title && (
          <div
            className="font-semibold text-xs mb-0.5"
            style={{ color: 'var(--theme-text)' }}
          >
            {title}
          </div>
        )}
        <div
          className="text-xs leading-relaxed"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          {children}
        </div>
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="shrink-0 p-0.5 hover:opacity-75"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};
