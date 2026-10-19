import type { Category } from "@/types/category.type";

export interface CategoryPageProps {
    params: Promise<{ categoryId: string }>
}

const getCategory = async (categoryId: string): Promise<Category[]> => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`);

        if(!res.ok) {
            throw new Error(`HTTP status: ${res.status}`)
        }

        const categoryData = await res.json();
        return categoryData;
    }

    catch(error) {
        console.error("Failed to fetch categories data", error);
        return [];
    }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
    const { categoryId } = await params;
    const category = await getCategory(categoryId);
    return (
        <div>
            
        </div>
    )
}