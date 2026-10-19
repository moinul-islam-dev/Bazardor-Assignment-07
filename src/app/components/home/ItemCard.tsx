export interface ItemCardProps {
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

export default function ItemCard({
  nameBn,
  unit,
  image,
  today,
  change,
}: ItemCardProps) {

  const isUp = change.dir === "up";
  const isDown = change.dir === "down";


  const badgeColor = isUp
    ? "text-red-600 bg-red-50"
    : isDown
      ? "text-green-600 bg-green-50"
      : "text-gray-600 bg-gray-50";

  const arrowSymbol = isUp ? "▲" : isDown ? "▼" : "•";

  return (
    <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md sm:p-5">
      {/* Top Section: Image & Title/Unit */}
      <div className="flex items-center gap-4">
        {/* Product Image Container */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-2">
          <span className="text-4xl" role="img" aria-label={nameBn}>
            {image}
          </span>
        </div>

        {/* Name & Unit */}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-gray-900">{nameBn}</h3>
          <span className="text-sm text-gray-500">per {unit}</span>
        </div>
      </div>

      {/* Bottom Section: Price & Change Percentage */}
      <div className="mt-4 flex items-end justify-between border-t border-gray-50 pt-4">
        {/* Today's Price */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">আজকের দাম</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              {today}
            </span>
            <span className="text-sm font-medium text-gray-700">টাকা</span>
          </div>
        </div>

        {/* Change Badge */}
        <div
          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${badgeColor}`}
        >
          <span>{arrowSymbol}</span>
          <span>{change.pct}%</span>
        </div>
      </div>
    </div>
  );
}