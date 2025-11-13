// packages/ui/src/components/Button.tsx
import React from 'react';
import '../styles.css';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'solid' | 'ghost' | 'outline' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string; // CSS variable or color
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'solid', size = 'md', color = 'var(--ui-color-primary)', loading, leftIcon, rightIcon, children, ...rest }, ref) => {
    const className = `ui-btn ui-btn--${variant} ui-btn--${size}`;
    const style: React.CSSProperties = {
      // allow using CSS variables or raw colors
      ['--ui-btn-bg-color' as any]: color,
    };

    return (
      <button ref={ref} className={className} style={style} disabled={rest.disabled || loading} {...rest}>
        {loading ? <span className="ui-btn__spinner" aria-hidden /> : leftIcon ? <span className="ui-btn__icon">{leftIcon}</span> : null}
        <span className="ui-btn__label">{children}</span>
        {rightIcon ? <span className="ui-btn__icon">{rightIcon}</span> : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
