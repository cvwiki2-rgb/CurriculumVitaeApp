import classNames from 'classnames';
import styles from './button.module.scss';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outlined' | 'contained' | 'text';
  color?: 'primary' | 'secondary';
  disabled?: boolean;
  children: string;
}

export const Button = ({
  variant = 'contained',
  color = 'primary',
  disabled = false,
  children,
  className,
  ...rest
}: ButtonProps) => {
  const buttonClassName = classNames(
    styles.button,
    styles[variant],
    styles[color],
    className,
  );

  return (
    <button className={buttonClassName} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
