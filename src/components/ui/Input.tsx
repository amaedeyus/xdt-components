import React from 'react';

export type InvalidAnimationType = 'none' | 'shake' | 'pulse' | 'bounce' | 'flash';

export interface BaseInputProps {
  label?: string;
  helperText?: string;
  error?: string;
  success?: string;
  required?: boolean;
  invalid?: boolean;
  invalidAnimation?: InvalidAnimationType;
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
  invalid = false,
  invalidAnimation = 'none',
  leftIcon,
  rightIcon,
  className = '',
  id,
  style,
  ...props
}) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;
  const isInvalid = Boolean(error || invalid);

  const animClass =
    isInvalid && invalidAnimation !== 'none'
      ? `anim-invalid-${invalidAnimation}`
      : '';

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold tracking-wide"
          style={{ color: 'var(--theme-text)' }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span
            className="absolute left-3 flex items-center pointer-events-none"
            style={{ color: 'var(--theme-text-muted)' }}
          >
            {leftIcon}
          </span>
        )}

        <input
          id={inputId}
          className={`theme-input w-full px-3 py-2 text-sm transition-all ${
            leftIcon ? 'pl-9' : ''
          } ${rightIcon ? 'pr-9' : ''} ${animClass} ${className}`}
          style={{
            borderColor: isInvalid
              ? 'var(--xdt-input-invalid-border, #EF4444)'
              : success
              ? '#10B981'
              : undefined,
            ...style,
          }}
          {...props}
        />

        {rightIcon && (
          <span
            className="absolute right-3 flex items-center pointer-events-none"
            style={{ color: 'var(--theme-text-muted)' }}
          >
            {rightIcon}
          </span>
        )}
      </div>

      {error ? (
        <span
          className="text-xs font-medium"
          style={{ color: 'var(--xdt-input-invalid-border, #EF4444)' }}
        >
          {error}
        </span>
      ) : success ? (
        <span className="text-xs text-emerald-600 font-medium">{success}</span>
      ) : helperText ? (
        <span
          className="text-xs"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          {helperText}
        </span>
      ) : null}
    </div>
  );
};

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseInputProps {}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  helperText,
  error,
  success,
  required,
  invalid = false,
  invalidAnimation = 'none',
  className = '',
  id,
  rows = 3,
  style,
  ...props
}) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;
  const isInvalid = Boolean(error || invalid);

  const animClass =
    isInvalid && invalidAnimation !== 'none'
      ? `anim-invalid-${invalidAnimation}`
      : '';

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold tracking-wide"
          style={{ color: 'var(--theme-text)' }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <textarea
        id={inputId}
        rows={rows}
        className={`theme-input w-full px-3 py-2 text-sm transition-all resize-y ${animClass} ${className}`}
        style={{
          borderColor: isInvalid
            ? 'var(--xdt-input-invalid-border, #EF4444)'
            : success
            ? '#10B981'
            : undefined,
          ...style,
        }}
        {...props}
      />

      {error ? (
        <span
          className="text-xs font-medium"
          style={{ color: 'var(--xdt-input-invalid-border, #EF4444)' }}
        >
          {error}
        </span>
      ) : success ? (
        <span className="text-xs text-emerald-600 font-medium">{success}</span>
      ) : helperText ? (
        <span
          className="text-xs"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          {helperText}
        </span>
      ) : null}
    </div>
  );
};

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    BaseInputProps {
  options: SelectOption[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  helperText,
  error,
  success,
  required,
  invalid = false,
  invalidAnimation = 'none',
  options,
  className = '',
  id,
  style,
  ...props
}) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;
  const isInvalid = Boolean(error || invalid);

  const animClass =
    isInvalid && invalidAnimation !== 'none'
      ? `anim-invalid-${invalidAnimation}`
      : '';

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold tracking-wide"
          style={{ color: 'var(--theme-text)' }}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          id={inputId}
          className={`theme-input w-full px-3 py-2 text-sm appearance-none pr-8 transition-all cursor-pointer ${animClass} ${className}`}
          style={{
            borderColor: isInvalid
              ? 'var(--xdt-input-invalid-border, #EF4444)'
              : undefined,
            ...style,
          }}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <span
          className="absolute right-3 pointer-events-none flex items-center"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      {error ? (
        <span
          className="text-xs font-medium"
          style={{ color: 'var(--xdt-input-invalid-border, #EF4444)' }}
        >
          {error}
        </span>
      ) : helperText ? (
        <span
          className="text-xs"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          {helperText}
        </span>
      ) : null}
    </div>
  );
};

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  className = '',
  id,
  checked,
  ...props
}) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <label
      htmlFor={inputId}
      className={`inline-flex items-start gap-2.5 cursor-pointer select-none text-left ${className}`}
    >
      <div className="relative flex items-center mt-0.5">
        <input
          type="checkbox"
          id={inputId}
          checked={checked}
          className="sr-only peer"
          {...props}
        />
        <div
          className="w-4 h-4 border flex items-center justify-center transition-all peer-focus:ring-2 peer-focus:ring-offset-1"
          style={{
            borderRadius: 'var(--theme-radius-sm, 3px)',
            borderColor: 'var(--theme-border)',
            backgroundColor: checked
              ? 'var(--theme-accent, #3B82F6)'
              : 'var(--theme-input-bg)',
            boxShadow: 'var(--theme-input-shadow)',
          }}
        >
          {checked && (
            <svg
              className="w-3 h-3 text-white stroke-[3]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>

      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span
              className="text-xs font-medium"
              style={{ color: 'var(--theme-text)' }}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              className="text-[11px]"
              style={{ color: 'var(--theme-text-muted)' }}
            >
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
};

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  label,
  description,
  className = '',
  id,
  checked,
  ...props
}) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <label
      htmlFor={inputId}
      className={`inline-flex items-center justify-between gap-4 cursor-pointer select-none ${className}`}
    >
      {(label || description) && (
        <div className="flex flex-col text-left">
          {label && (
            <span
              className="text-xs font-medium"
              style={{ color: 'var(--theme-text)' }}
            >
              {label}
            </span>
          )}
          {description && (
            <span
              className="text-[11px]"
              style={{ color: 'var(--theme-text-muted)' }}
            >
              {description}
            </span>
          )}
        </div>
      )}

      <div className="relative">
        <input
          type="checkbox"
          id={inputId}
          checked={checked}
          className="sr-only peer"
          {...props}
        />
        <div
          className="w-10 h-5 transition-colors relative"
          style={{
            borderRadius: '9999px',
            backgroundColor: checked
              ? 'var(--theme-accent, #3B82F6)'
              : 'var(--theme-surface-alt, #D1D5DB)',
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div
            className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-transform ${
              checked ? 'left-[22px]' : 'left-[4px]'
            }`}
            style={{
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
          />
        </div>
      </div>
    </label>
  );
};
