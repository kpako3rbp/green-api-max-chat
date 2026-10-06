
import React from 'react';
import styles from './Layout.module.css';

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <main className={styles.page}>
      <div className={styles.layer1}></div>
      <div className={styles.layer2}></div>
      <div className={styles.layer3}></div>

      {children}
    </main>
  );
};
