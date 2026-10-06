import { type ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, type = 'button', ...props }: ButtonProps) => {
  return (
    <button type={type} className={styles.button} {...props}>
      {children}
    </button>
  );
};
