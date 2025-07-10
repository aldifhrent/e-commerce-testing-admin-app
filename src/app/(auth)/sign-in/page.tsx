'use client';

import { useState } from 'react';
import AuthForm, { SignInData } from '../components/auth.form';
import { signIn, getSession } from 'next-auth/react';

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

 

async function handleSignIn(data: SignInData) {
  setLoading(true);
  setError(null);

  try {
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (!res?.ok) {
      setError(res?.error || 'Login failed');
      return;
    }

    const session = await getSession();

    console.log("session user role:", session?.user?.role);

    // Case insensitive check
    if (session?.user?.role?.toLowerCase() !== 'admin') {
      setError('Anda bukan admin, akses dashboard admin ditolak.');
      window.location.href = '/sign-in';
      return;
    }

    window.location.href = '/admin/dashboard';
  } catch (err) {
    if (err instanceof Error) {
      setError('Network error, please try again');
    }
  } finally {
    setLoading(false);
  }
}


  return (
    <>
      {error && <p className="text-red-600 text-center mb-2">{error}</p>}
      <AuthForm mode="signin" onSubmit={handleSignIn} showRememberMe={true} showSocialLogin={true} />
      {loading && <p className="text-center mt-2">Loading...</p>}
    </>
  );
}
