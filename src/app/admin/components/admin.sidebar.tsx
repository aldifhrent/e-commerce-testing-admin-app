"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function AdminSidebar() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div>Loading sidebar...</div>;

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col justify-between">
      <div>
        <div className="p-4 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>

        <nav className="p-4 space-y-2">
          <Link href="/admin/dashboard" className="block hover:text-blue-400">
            Dashboard
          </Link>
          <Link href="/admin/products" className="block hover:text-blue-400">
            Products
          </Link>
          <Link href="/admin/colors" className="block hover:text-blue-400">
            Colors
          </Link>
          <Link href="/admin/tags" className="block hover:text-blue-400">
            Tags
          </Link>
                <Link href="/admin/categories" className="block hover:text-blue-400">
            Categories
          </Link>
          <Link href="/admin/discounts" className="block hover:text-blue-400">
            Discounts
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-700 text-sm">
        {session?.user ? (
          <>
            <div className="font-medium">{session.user.name}</div>
            <div className="text-gray-400 mb-2">{session.user.email}</div>
            <button
              onClick={() => signOut()}
              className="text-red-400 hover:text-red-300 underline"
            >
              Logout
            </button>
          </>
        ) : (
          <div className="text-red-400">Not logged in</div>
        )}
      </div>
    </aside>
  );
}
