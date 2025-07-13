"use client";

import React, { useEffect, useState } from "react";

interface Stock {
  id: number;
  name: string;
  stock: number;
}

export default function StocksPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStocks() {
      try {
        const res = await fetch("/api/stocks");
        if (!res.ok) throw new Error("Failed to fetch stocks");
        const data = await res.json();
        setStocks(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchStocks();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Stock Produk</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Nama Produk
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Stok
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {stocks.map((stock) => (
              <tr key={stock.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm">{stock.id}</td>
                <td className="px-6 py-4 text-sm">{stock.name}</td>
                <td className="px-6 py-4 text-sm">{stock.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
