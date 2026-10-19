// src/app/components/shared/header/NavLinks.tsx

import NavLinkItem from "./NavLinkItem";

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
      {
        next: { revalidate: 300 },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const data = await response.json();

    // Supports either a direct array or an object containing data.
    const categories: Category[] = Array.isArray(data)
      ? data
      : (data.data ?? []);

    return categories;
  } catch (error) {
    console.error("Failed to load categories:", error);
    return [];
  }
}

export default async function NavLinks() {
  const categories = await getCategories();

  return (
    <nav
      aria-label="Product categories"
      className="flex items-center gap-2 overflow-x-auto"
    >
      {categories.map((category) => (
        <NavLinkItem
          key={category.id}
          href={category.slug || category.id}
          title={category.nameBn}
          icon={category.icon}
        />
      ))}
    </nav>
  );
}