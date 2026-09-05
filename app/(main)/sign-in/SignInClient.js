'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/lib/api';
import { Input } from '@/app/ui/Input';
import { Button } from '@/app/ui/Button';
import { useAlert, Alert } from '@/app/ui/Alert';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export default function SignInPage() {
  const router = useRouter();
  const { alert, show } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const { t, dir } = useLanguage();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.signIn(form);
      router.push('/dashboard');
    } catch (err) {
      show('error', err.info?.message || t.auth.signInError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6" dir={dir}>
      <div className="w-full max-w-sm space-y-5 sm:space-y-6">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold">{t.auth.signInHeading}</h1>
          <p className="text-sm text-gray-500 mt-1">{t.auth.signInSub}</p>
        </div>

        {alert && <Alert type={alert.type} message={alert.message} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t.auth.emailLabel}
            name="email"
            type="email"
            required
            placeholder="shop@gmail.com"
            value={form.email}
            onChange={handleChange}
          />
          <Input
            label={t.auth.passwordLabel}
            name="password"
            type="password"
            required
            placeholder="shop123456"
            value={form.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
            {t.auth.signInBtn}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500">
          {t.auth.noAccount}{' '}
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            {t.auth.signUpLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
