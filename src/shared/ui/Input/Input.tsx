import { forwardRef, type InputHTMLAttributes } from 'react';

import styles from './Input.module.css';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
  return (
    <label className={styles.field}>
      {label && <span className={styles.label}>{label}</span>}

      <input ref={ref} className={styles.input} {...props} />

      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
});

Input.displayName = 'Input';
