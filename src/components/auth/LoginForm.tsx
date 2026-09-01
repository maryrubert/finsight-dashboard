import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import {
  loginSchema,
  type LoginFormData,
} from '@/schemas/login.schema';

export function LoginForm() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginFormData) {
    const authenticated = signIn(data.email, data.password);

    if (!authenticated) {
      setErrorMessage('Invalid email or password.');
      return;
    }

    setErrorMessage('');
    navigate('/dashboard');
  }

  return (
    <section className="flex min-h-screen flex-1 items-center justify-center bg-slate-50 px-6 py-10">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white lg:hidden">
            <Lock size={22} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Welcome back
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Sign in to access your FinSight dashboard.
          </p>
        </div>

        <form
          className="space-y-5"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <Mail size={18} className="text-slate-400" />

              <input
                id="email"
                type="email"
                autoComplete="off"
                placeholder=""
                {...register('email')}
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <Lock size={18} className="text-slate-400" />

              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder=""
                {...register('password')}
                className="w-full bg-transparent text-sm outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword
                    ? 'Ocultar senha'
                    : 'Mostrar senha'
                }
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          {errorMessage && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </p>
          )}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300"
              />
              Remember me
            </label>

            <button
              type="button"
              className="font-medium text-blue-600"
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            className="h-12 w-full rounded-2xl text-sm"
          >
            Sign in
          </Button>
        </form>
      </div>
    </section>
  );
}