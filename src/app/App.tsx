import { Layout } from '@/shared/ui/Layout';
import { useAuth } from '../features/auth';
import { AuthPage } from '../pages/AuthPage';
import { ChatPage } from '../pages/ChatPage';

export const App = () => {
  const { credentials, login, logout } = useAuth();

  if (!credentials) {
    return (
      <Layout>
        <AuthPage onLogin={login} />
      </Layout>
    );
  }

  return (
    <Layout>
      <ChatPage credentials={credentials} onLogout={logout} />
    </Layout>
  );
};
