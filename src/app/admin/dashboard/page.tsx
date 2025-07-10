'use client';

import { useSession } from 'next-auth/react';
import { LogOut } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500 animate-pulse">Loading session...</p>
      </div>
    );
  }

  if (status === 'unauthenticated' || !session?.user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-xl font-semibold text-red-600">Anda belum login</p>
        <a
          href="/sign-in"
          className="mt-4 text-blue-500 underline hover:text-blue-700"
        >
          Kembali ke halaman login
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
            <p className="text-gray-500 text-sm">Selamat datang kembali 👋</p>
          </div>
          <Link
            href="/api/auth/signout"
            className="flex items-center text-sm text-red-600 hover:underline"
          >
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </Link>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Nama</p>
              <p className="font-semibold text-gray-800">{session.user.name || '-'}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800">{session.user.email}</p>
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Role</p>
            <p className="font-semibold text-gray-800 uppercase">{session.user.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
