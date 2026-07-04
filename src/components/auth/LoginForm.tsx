import { Eye, Lock, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function LoginForm() {
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

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <Mail size={18} className="text-slate-400" />
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <Lock size={18} className="text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
              <Eye size={18} className="text-slate-400" />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-600">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
              Remember me
            </label>

            <button type="button" className="font-medium text-blue-600">
              Forgot password?
            </button>
          </div>

          <Button type="submit" className="h-12 w-full rounded-2xl text-sm">
            Sign in
          </Button>
        </form>
      </div>
    </section>
  );
}