interface PriceChange {
  dir: "up" | "down";
  pct: number;
}

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Item {
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
  markets: Market[];
}

const loadAllItems = async (): Promise<Item[]> => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      {
        next: {
          revalidate: 60 * 5,
        },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP status: ${res.status}`);
    }

    const items: Item[] = await res.json();

    return items;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};

const Marquee = async () => {
  const allItems = await loadAllItems();

  // Display the first 8 products
  const items = allItems.slice(0, 8);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="relative overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-12 before:bg-[linear-gradient(to_right,var(--color-background),transparent)] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-12 after:bg-[linear-gradient(to_left,var(--color-background),transparent)]">
      <div className="flex w-max animate-marquee">
        {/* First Group */}
        <div className="flex shrink-0 items-center">
          {items.slice(0, 10).map((item) => (
            <div
              key={item.id}
              className="flex h-12 w-40 shrink-0 items-center justify-center gap-2 px-4 md:w-64"
            >
              <span className="text-sm">{item.image}</span>

              <div className="flex min-w-0 gap-2">
                <span className="truncate text-sm font-medium text-gray-700">
                  {item.nameBn}
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-gray-900">
                    ৳{item.today}
                  </span>

                  <span className="text-xs text-gray-500">/{item.unit}</span>

                  <span
                    className={`text-xs font-medium ${
                      item.change.dir === "up"
                        ? "text-red-600"
                        : item.change.dir === "down"
                          ? "text-emerald-600"
                          : "text-gray-500"
                    }`}
                  >
                    {item.change.dir === "up"
                      ? "▲"
                      : item.change.dir === "down"
                        ? "▼"
                        : ""}
                    {Math.abs(item.change.pct)}%
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Duplicate Group for Infinite Scrolling */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex h-12 w-40 shrink-0 items-center justify-center gap-2 px-4 md:w-64"
            >
              <span className="text-sm">{item.image}</span>

              <div className="flex min-w-0 gap-2">
                <span className="truncate text-sm font-medium text-gray-700">
                  {item.nameBn}
                </span>

                <span className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-gray-900">
                    ৳{item.today}
                  </span>

                  <span className="text-xs text-gray-500">/{item.unit}</span>

                  <span
                    className={`text-xs font-medium ${
                      item.change.dir === "up"
                        ? "text-red-600"
                        : item.change.dir === "down"
                          ? "text-emerald-600"
                          : "text-gray-500"
                    }`}
                  >
                    {item.change.dir === "up"
                      ? "▲"
                      : item.change.dir === "down"
                        ? "▼"
                        : ""}
                    {Math.abs(item.change.pct)}%
                  </span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
