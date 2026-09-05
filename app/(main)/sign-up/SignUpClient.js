'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authApi } from '@/lib/api';
import { Input } from '@/app/ui/Input';
import { Button } from '@/app/ui/Button';
import { useAlert, Alert } from '@/app/ui/Alert';
import { useLanguage } from '@/lib/i18n/LanguageProvider';

export default function SignUpPage() {
  const router = useRouter();
  const { alert, show } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { t, dir } = useLanguage();

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.signUp(form);
      router.push('/sign-in');
    } catch (err) {
      show('error', err.info?.message || t.auth.signUpError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6" dir={dir}>
      <div className="w-full max-w-sm space-y-5 sm:space-y-6">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-bold">{t.auth.signUpHeading}</h1>
          <p className="text-sm text-gray-500 mt-1">{t.auth.signUpSub}</p>
        </div>

        {alert && <Alert type={alert.type} message={alert.message} />}

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm text-gray-700 space-y-1.5" dir={dir}>
          <p className="font-semibold text-gray-900">{t.demoAccount.title}</p>
          <p className="text-gray-600">{t.demoAccount.description}</p>
          <div className="font-mono text-xs bg-white border border-gray-200 rounded-md p-2 space-y-1 select-all">
            <div>{t.demoAccount.emailLabel} <span className="font-bold text-gray-900">shop@gmail.com</span></div>
            <div>{t.demoAccount.passwordLabel} <span className="font-bold text-gray-900">shop123456</span></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t.auth.nameLabel}
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />
          <Input
            label={t.auth.emailLabel}
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
          />
          <Input
            label={t.auth.passwordLabel}
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
          />
          <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
            {t.auth.signUpBtn}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500">
          {t.auth.haveAccount}{' '}
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            {t.auth.signInLink}
          </Link>
        </p>
      </div>
    </div>
  );
}
