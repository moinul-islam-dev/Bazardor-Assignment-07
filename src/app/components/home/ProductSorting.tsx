
"use client";

import { useMemo, useState } from "react";
import ItemCard from "@/app/components/home/ItemCard";

interface PriceChange {
  dir: "up" | "down" | "flat";
  pct: number;
}

interface Product {
  id: number;
  category: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: PriceChange;
}

interface ProductSortingProps {
  items: Product[];
}

export default function ProductSorting({
  items,
}: ProductSortingProps) {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedItems = useMemo(() => {
    const products = [...items];

    if (sortOrder === "low-to-high") {
      products.sort((a, b) => a.today - b.today);
    } else if (sortOrder === "high-to-low") {
      products.sort((a, b) => b.today - a.today);
    }

    return products;
  }, [items, sortOrder]);

  return (
    <>
      {/* Sorting UI */}
      <section className="flex items-center justify-end rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort-products"
            className="text-sm font-medium text-gray-600"
          >
            সাজান
          </label>

          <select
            id="sort-products"
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value)}
            className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low-to-high">
              দাম: কম থেকে বেশি
            </option>
            <option value="high-to-low">
              দাম: বেশি থেকে কম
            </option>
          </select>
        </div>
      </section>

      {/* Total Products */}
      <p className="text-sm font-medium text-gray-600">
        মোট {sortedItems.length}টি পণ্য দেখানো হচ্ছে
      </p>

      {/* Products Grid */}
      {sortedItems.length > 0 ? (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedItems.map((item) => (
            <ItemCard
              key={item.id}
              categoryId={item.category}
              productId={item.id}
              nameBn={item.nameBn}
              unit={item.unit}
              image={item.image}
              today={item.today}
              change={item.change}
            />
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
          <p className="text-lg font-semibold text-gray-700">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
          <p className="mt-2 text-sm text-gray-500">
            ক্যাটাগরি ID পরীক্ষা করে আবার চেষ্টা করো।
          </p>
        </section>
      )}
    </>
  );
}
