import ItemCard from "@/app/components/home/ItemCard";

export interface MarketPrice {
    market: string;
    division: string;
    min: number;
    max: number;
}

export interface PriceChange {
    dir: "up" | "down" | "flat";
    pct: number;
}

export interface CategoryDetails {
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
    change: PriceChange;
    markets: MarketPrice[];
}

const toBanglaNum = (num: number | string): string => {
    const banglaDigits = [
        "০",
        "১",
        "২",
        "৩",
        "৪",
        "৫",
        "৬",
        "৭",
        "৮",
        "৯",
    ];

    return String(num).replace(/\d/g, (digit) => {
        return banglaDigits[Number(digit)];
    });
};

async function getProducts(
    categoryId: string,
): Promise<CategoryDetails[]> {
    const url = `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(categoryId)}`;

    const response = await fetch(url, {
        next: { revalidate: 300 },
    });

    if (!response.ok) {
        throw new Error(
            `Failed to fetch products. HTTP status: ${response.status}`,
        );
    }

    const products: CategoryDetails[] = await response.json();

    return products;
}

export default async function Page({
    params,
}: {
    params: Promise<{ categoryId: string }>;
}) {
    const { categoryId } = await params;
    const items = await getProducts(categoryId);

    const categoryHeader = items[0];

    return (
        <main className="min-h-screen bg-[#f3f5f1] p-4 font-sans text-gray-800 sm:p-6 md:p-10">
            <div className="mx-auto max-w-6xl space-y-6">
                {/* Category Header */}
                <section className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-100 p-2">
                        <span className="text-4xl" role="img" aria-label="Category icon">
                            {categoryHeader?.categoryIcon ?? "🛒"}
                        </span>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {categoryHeader?.categoryNameBn ?? "পণ্যের তালিকা"}
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            {toBanglaNum(items.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
                        </p>
                    </div>
                </section>

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
                            defaultValue="default"
                            className="cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300"
                        >
                            <option value="default">ডিফল্ট</option>
                            <option value="low-to-high">দাম: কম থেকে বেশি</option>
                            <option value="high-to-low">দাম: বেশি থেকে কম</option>
                        </select>
                    </div>
                </section>

                {/* Total Products */}
                <p className="text-sm font-medium text-gray-600">
                    মোট {toBanglaNum(items.length)}টি পণ্য দেখানো হচ্ছে
                </p>


                {/* Products Grid */}
                {items.length > 0 ? (
                    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {items.map((item) => (
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

            </div>
        </main>
    );
}