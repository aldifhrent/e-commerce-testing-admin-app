// app/products/page.tsx (atau sesuai dengan struktur routing Anda)

"use client";

import React from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Produk A",
    description: "Deskripsi produk A",
    price: 120000,
    stock: 10,
    imageUrl: "https://via.placeholder.com/80",
  },
  {
    id: 2,
    name: "Produk B",
    description: "Deskripsi produk B",
    price: 95000,
    stock: 5,
    imageUrl: "https://via.placeholder.com/80",
  },
];

export default function ProductsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Daftar Produk</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Gambar</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Nama</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Deskripsi</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Harga</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Stok</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sampleProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-4 text-sm font-medium">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.description}</td>
                <td className="px-6 py-4 text-sm text-gray-800">Rp {product.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-800">{product.stock}</td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button className="text-red-600 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
