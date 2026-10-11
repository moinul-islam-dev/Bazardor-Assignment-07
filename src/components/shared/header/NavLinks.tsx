import NavLinkItem from "./NavLinkItem";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const loadCategories = async (): Promise<Category[] | null> => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
    );

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch category data ", error);
    return null;
  }
};

const NavLinks = async () => {
  const categories = await loadCategories();

  console.log(categories?.length);

  return (
    <>
      {categories?.map((category: Category) => (
        <NavLinkItem
          key={category.id}
          href={`/${category.slug}`}
          title={category.nameBn}
          icon={category.icon}
        />
      ))}
    </>
  );
};

export default NavLinks;
