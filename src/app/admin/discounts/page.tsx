'use client'

import React, { useEffect, useState } from 'react'

type DiscountType = {
  id: number
  name: string
  description: string
  amount: number
  isPercent: boolean
  startDate: string
  endDate: string
}

export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<DiscountType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchDiscounts() {
      try {
        const res = await fetch('/api/discounts')
        if (!res.ok) throw new Error('Failed to fetch discounts')
        const data: DiscountType[] = await res.json()
        setDiscounts(data)
      } catch (err) {
        if (err instanceof Error) setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchDiscounts()
  }, [])

  if (loading) return <p className="p-6">Loading discounts...</p>
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Daftar Diskon</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Nama Diskon</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Deskripsi</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Jumlah</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Periode Berlaku</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {discounts.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-semibold">{d.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{d.description}</td>
                <td className="px-6 py-4 text-green-600 font-bold">
                  {d.isPercent ? `${d.amount}%` : `Rp${d.amount.toLocaleString('id-ID')}`}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(d.startDate).toLocaleDateString()} - {new Date(d.endDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
