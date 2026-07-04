import { BrandPanel } from '@/components/auth/BrandPanel';
import { LoginForm } from '@/components/auth/LoginForm';

function LoginPage() {
  return (
    <main className="flex min-h-screen bg-slate-50">
      <BrandPanel />
      <LoginForm />
    </main>
  );
}

export default LoginPage;