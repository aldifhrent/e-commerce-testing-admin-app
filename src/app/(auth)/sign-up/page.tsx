"use client";

import { useState } from "react";
import AuthForm, { SignUpData } from "../components/auth.form";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignUp(data: SignUpData) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Failed to sign up");
        return;
      }

      // Setelah berhasil daftar, redirect ke halaman sign in
      window.location.href = "/sign-in";
    } catch (err) {
      if (err instanceof Error) {
        setError("Network error, please try again");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && <p className="text-red-600 text-center mb-2">{error}</p>}

      <AuthForm
        mode="signup"
        showRememberMe={false}
        showSocialLogin={false}
        onSubmit={handleSignUp}
      />
      {loading && <p className="text-center mt-2">Loading...</p>}
    </>
  );
}
