import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
  avg?: number;
}

interface ProductChange {
  dir: "up" | "down" | "flat";
  pct: number;
}

interface ProductDetail {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: ProductChange;
  markets: Market[];
}

interface PageProps {
  params: Promise<{
    categoryId: string;
    productId: string;
  }>;
}

async function getProductDetail(
  categoryId: string,
  productId: string,
): Promise<ProductDetail | null> {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      next: { revalidate: 300 },
    },
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch products. Status: ${response.status}`,
    );
  }

  const result: unknown = await response.json();

  let products: unknown;

  if (Array.isArray(result)) {
    products = result;
  } else if (
    result !== null &&
    typeof result === "object" &&
    "data" in result
  ) {
    products = (result as { data: unknown }).data;
  } else {
    throw new Error("Invalid API response format");
  }

  if (!Array.isArray(products)) {
    throw new Error("API did not return a product array");
  }

  const product = products.find(
    (item): item is ProductDetail =>
      item !== null &&
      typeof item === "object" &&
      "id" in item &&
      "category" in item &&
      String((item as ProductDetail).id) === productId &&
      String((item as ProductDetail).category) === categoryId,
  );

  return product ?? null;
}

// ইংরেজি সংখ্যাকে বাংলায় রূপান্তর করার হেলপার ফাংশন
function toBengaliNumerals(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return "";
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => bengaliDigits[parseInt(digit, 10)]);
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { categoryId, productId } = await params;

  const product = await getProductDetail(categoryId, productId);

  if (!product) {
    notFound();
  }

  // মার্কেট ডেটা থেকে সর্বনিম্ন, সর্বাধিক ও গড় দাম গণনা
  const markets = product.markets || [];
  const minPrice = markets.length
    ? Math.min(...markets.map((m) => m.min))
    : product.today;
  const maxPrice = markets.length
    ? Math.max(...markets.map((m) => m.max))
    : product.today;
  
  const avgPrice = markets.length
    ? Math.round(
        markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / markets.length
      )
    : product.today;

  const priceDiff = Math.abs(product.today - product.yesterday);

  return (
    <main className="min-h-screen bg-[#f4f6f3] px-4 py-6 md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-xs font-medium text-gray-500">
          <Link href="/" className="hover:text-emerald-700">
            হোম
          </Link>
          <span>&gt;</span>
          <Link
            href={`/productsByCategory/${categoryId}`}
            className="hover:text-emerald-700"
          >
            {product.categoryNameBn}
          </Link>
          <span>&gt;</span>
          <span className="text-gray-800">{product.nameBn}</span>
        </nav>

        {/* Top Main Product Banner */}
        <section className="mb-6 flex flex-col justify-between rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100/80 text-3xl">
              {product.image?.startsWith("http") ? (
                <Image
                  src={product.image}
                  alt={product.nameBn}
                  className="h-12 w-12 object-contain"
                />
              ) : (
                <span>{product.image || "🌾"}</span>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {product.nameBn}
              </h1>
              <p className="mt-0.5 text-xs text-gray-500">
                প্রতি {product.unit} - {product.categoryNameBn}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                গতকালকের তুলনায় আজ দাম{" "}
                <span className="font-semibold text-gray-700">
                  {product.change.dir === "up" ? "বেড়েছে" : "কমেছে"}
                </span>{" "}
                - {toBengaliNumerals(priceDiff)} টাকা
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center justify-center rounded-xl bg-gray-50/80 px-6 py-3 text-center md:mt-0">
            <span className="text-xs text-gray-500">আজকের দাম</span>
            <span className="text-3xl font-extrabold text-gray-800">
              {toBengaliNumerals(product.today)}
            </span>
            <span className="text-xs font-medium text-gray-500">
              টাকা / {product.unit}
            </span>
            <div className="mt-1 flex items-center gap-1 text-xs font-bold text-red-500">
              <span>{product.change.dir === "up" ? "▲" : "▼"}</span>
              <span>{toBengaliNumerals(product.change.pct)}%</span>
            </div>
          </div>
        </section>

        {/* Main Section Content Wrapper */}
        <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm">
          {/* দামের সারসংক্ষেপ (Summary Cards) */}
          <section className="mb-8">
            <h2 className="mb-4 text-base font-bold text-gray-900">
              দামের সারসংক্ষেপ
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* সর্বনিম্ন দাম */}
              <div className="rounded-xl border border-gray-100 bg-[#fbfdfb] p-4">
                <p className="text-xs font-medium text-gray-500">
                  সর্বনিম্ন দাম
                </p>
                <p className="mt-2 text-xl font-bold text-emerald-600">
                  {toBengaliNumerals(minPrice)} টাকা
                </p>
                <p className="mt-1 text-[11px] text-gray-400">
                  সবচেয়ে কম দামের বাজার
                </p>
              </div>

              {/* সর্বাধিক দাম */}
              <div className="rounded-xl border border-gray-100 bg-[#fffcfc] p-4">
                <p className="text-xs font-medium text-gray-500">
                  সর্বাধিক দাম
                </p>
                <p className="mt-2 text-xl font-bold text-red-500">
                  {toBengaliNumerals(maxPrice)} টাকা
                </p>
                <p className="mt-1 text-[11px] text-gray-400">
                  সবচেয়ে বেশি দামের বাজার
                </p>
              </div>

              {/* গড় দাম */}
              <div className="rounded-xl border border-gray-100 bg-[#fbfdfb] p-4">
                <p className="text-xs font-medium text-gray-500">গড় দাম</p>
                <p className="mt-2 text-xl font-bold text-emerald-600">
                  {toBengaliNumerals(avgPrice)} টাকা
                </p>
                <p className="mt-1 text-[11px] text-gray-400">
                  প্রতি {product.unit}-এর হিসেবে
                </p>
              </div>
            </div>
          </section>

          {/* বাজারভিত্তিক আজকের দাম (Table) */}
          <section>
            <h2 className="mb-4 text-base font-bold text-gray-900">
              বাজারভিত্তিক আজকের দাম
            </h2>

            {markets.length ? (
              <div className="overflow-hidden rounded-xl border border-gray-200/60 bg-white">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f2f5f1] text-gray-600">
                    <tr>
                      <th className="px-4 py-3 font-semibold">বাজার</th>
                      <th className="px-4 py-3 font-semibold">বিভাগ</th>
                      <th className="px-4 py-3 font-semibold">সর্বনিম্ন</th>
                      <th className="px-4 py-3 font-semibold">সর্বাধিক</th>
                      <th className="px-4 py-3 font-semibold">গড়</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-gray-700">
                    {markets.map((market, index) => {
                      const marketAvg = Math.round(
                        (market.min + market.max) / 2
                      );
                      return (
                        <tr
                          key={`${market.market}-${index}`}
                          className="hover:bg-gray-50/50"
                        >
                          <td className="px-4 py-3 font-medium text-gray-800">
                            {market.market}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {market.division}
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {toBengaliNumerals(market.min)} টাকা
                          </td>
                          <td className="px-4 py-3 text-gray-700">
                            {toBengaliNumerals(market.max)} টাকা
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-800">
                            {toBengaliNumerals(market.avg ?? marketAvg)} টাকা
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="rounded-xl bg-gray-50 p-4 text-center text-xs text-gray-500">
                এই পণ্যের বাজারভিত্তিক তথ্য পাওয়া যায়নি।
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}