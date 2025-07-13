"use client";

import { Tag } from "@prisma/client";
import React, { useEffect, useState } from "react";

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch("/api/tags");
        if (!res.ok) throw new Error("Gagal memuat data tags");
        const data: Tag[] = await res.json();
        setTags(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTags();
  }, []);

  if (loading) return <p className="p-6">Loading tags...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Daftar Tag</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Nama Tag
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tags.map((tag) => (
              <tr key={tag.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-800">{tag.id}</td>
                <td className="px-6 py-4 text-sm font-medium">{tag.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
