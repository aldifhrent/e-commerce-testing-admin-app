'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

 const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Produk', href: '/admin/products' },
  { label: 'Kategori', href: '/admin/categories' },
  { label: 'Warna', href: '/admin/colors' },
  { label: 'Stok', href: '/admin/inventory' },
  { label: 'Pesanan', href: '/admin/orders' },
  { label: 'Pelanggan', href: '/admin/customers' },
  { label: 'Diskon & Promo', href: '/admin/discounts' },
  { label: 'Laporan', href: '/admin/reports' },
  { label: 'Pengaturan', href: '/admin/settings' },
  { label: 'User Management', href: '/admin/users' },
  { label: 'Support', href: '/admin/support' },
];


  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-4 flex flex-col">
          {navItems.map(({ label, href }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`px-6 py-3 text-gray-700 hover:bg-gray-200 ${
                  active ? 'bg-gray-200 font-semibold' : ''
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
