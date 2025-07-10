"use client";

import { Color } from "@prisma/client";
import React, { useEffect, useState } from "react";


export default function ColorsPage() {
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchColors() {
      try {
        const res = await fetch("/api/colors");
        if (!res.ok) throw new Error("Failed to fetch colors");
        const data: Color[] = await res.json();
        setColors(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchColors();
  }, []);

  if (loading) return <p className="p-6">Loading colors...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Daftar Warna</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Preview
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Nama Warna
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Kode Warna
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {colors.map((color) => (
              <tr key={color.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div
                    style={{ backgroundColor: color.value }}
                    className="w-8 h-8 rounded border border-gray-300"
                    title={color.name}
                  />
                </td>
                <td className="px-6 py-4 text-sm font-medium">{color.name}</td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {color.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
