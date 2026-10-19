"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLinkItemProps {
  href: string;
  title: string;
  icon: string;
}

export default function NavLinkItem({
  href,
  title,
  icon,
}: NavLinkItemProps) {
  const pathname = usePathname();

  const categoryPath = `/productsByCategory/${href}`;
  const isActive = pathname === categoryPath;

  return (
    <Link
      href={categoryPath}
      className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "bg-green-100 text-green-700"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <span>{icon}</span>
      <span>{title}</span>
    </Link>
  );
}