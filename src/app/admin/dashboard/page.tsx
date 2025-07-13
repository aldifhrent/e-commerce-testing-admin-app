"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import CardStat from "../components/card.stats";
import Card from "../components/card";

type ColorType = {
  id: number;
  name: string;
  value: string;
};

type DiscountType = {
  id: number;
  name: string;
  description: string;
  amount: number;
  isPercent: boolean;
  startDate: string;
  endDate: string;
};

type CategoryType = {
  id: number;
  name: string;
};

type ProductType = {
  id: number;
  name: string;
  categoryId: number;
};

type TagType = {
  id: number;
  name: string;
};

export default function Dashboard() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [colors, setColors] = useState<ColorType[]>([]);
  const [discounts, setDiscounts] = useState<DiscountType[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardSummary() {
      try {
        const res = await fetch("/api/dashboard");
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        setProducts(data.products ?? []);
        setCategories(data.categories ?? []);
        setColors(data.colors ?? []);
        setDiscounts(data.discounts ?? []);
        setTags(data.tags ?? []);
        setError(null);
      } catch (e) {
        setError("Gagal memuat data dashboard");
        console.error("Error fetching dashboard summary", e);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardSummary();
  }, []);

  if (loading)
    return <div className="p-6 text-center">Loading dashboard...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const totalTags = tags.length;

  // Map categories to product counts for PieChart
  const categoryData = categories
    .map((cat) => ({
      name: cat.name,
      value: products.filter((p) => p.categoryId === cat.id).length,
    }))
    .filter((cat) => cat.value > 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard Admin
            </h1>
            <p className="text-gray-500 text-sm">Selamat datang kembali 👋</p>
          </div>
        </div>

        {/* Stat Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <CardStat
            label="Total Produk"
            value={totalProducts}
            color="bg-blue-100"
          />
          <CardStat
            label="Kategori"
            value={totalCategories}
            color="bg-green-100"
          />
          <CardStat label="Tags" value={totalTags} color="bg-indigo-100" />
          <CardStat
            label="Warna Produk"
            value={colors.length}
            color="bg-purple-100"
          />
          <CardStat
            label="Diskon Aktif"
            value={discounts.length}
            color="bg-yellow-100"
          />
        </div>

        {/* Charts */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Distribusi Kategori
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Warna Produk List */}
        <div className="mt-8 bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Daftar Warna
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colors.map((color) => (
              <Card type="color" data={color} key={color.id} />
            ))}
          </div>
        </div>

        {/* Diskon Aktif List */}
        <div className="mt-8 bg-white rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Diskon Aktif
          </h2>
          <div className="space-y-4">
            {discounts.map((d) => (
              <Card type={"discount"} data={d} key={d.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00C49F"];
