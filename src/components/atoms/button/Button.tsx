import { useRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import classNames from 'classnames';
import styles from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outlined' | 'contained' | 'text';
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  children: ReactNode;
}

export const Button = ({
  variant = 'contained',
  color = 'primary',
  disabled = false,
  children,
  className,
  onClick,
  ...rest
}: ButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    const button = buttonRef.current;
    if (!button) return;
    const ripple = document.createElement('span');
    ripple.className = styles.ripple;

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  };

  const buttonClassName = classNames(
    styles.button,
    styles[variant],
    styles[color],
    className,
  );

  return (
    <button
      ref={buttonRef}
      className={buttonClassName}
      disabled={disabled}
      type="button"
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};
