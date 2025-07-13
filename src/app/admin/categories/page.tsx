'use client'

import React, { useEffect, useState } from 'react'

type CategoryType = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories')
        if (!res.ok) throw new Error('Failed to fetch categories')
        const data: CategoryType[] = await res.json()
        setCategories(data)
      } catch (err) {
        if (err instanceof Error) setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (loading) return <p className="p-6">Loading categories...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Daftar Kategori</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Nama Kategori</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Dibuat Pada</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Diperbarui Pada</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((cat) => (
              <tr key={cat.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-mono text-sm">{cat.id}</td>
                <td className="px-6 py-4 font-semibold">{cat.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(cat.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
