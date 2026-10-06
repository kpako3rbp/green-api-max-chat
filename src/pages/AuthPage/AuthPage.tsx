import { AuthForm } from '../../features/auth';
import { type Credentials } from '../../features/auth/model/auth.types';

import styles from './AuthPage.module.css';

type Props = {
  onLogin: (credentials: Credentials) => Promise<void>;
};

export const AuthPage = ({ onLogin }: Props) => {
  return (
    <main className={styles.page}>
      <AuthForm onSubmit={onLogin} />
    </main>
  );
};