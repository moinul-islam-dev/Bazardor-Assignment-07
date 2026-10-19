import BannerSection from "./components/home/BannerSection";
import ItemCard from "./components/home/ItemCard";


interface PriceChange {
  dir: "up" | "down" | "flat";
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



const getUpPricedItems = (allItems: Item[]): Item[] => {

  const upPricedItems = allItems.filter(
    item => item.change.dir === "up"
  )

  return upPricedItems;
}



const getDownPricedItems = (allItems: Item[]): Item[] => {

  const downPricedItems = allItems.filter(
    item => item.change.dir === "down"
  )

  return downPricedItems;
}

const Home = async () => {

  const allItems: Item[] = await loadAllItems();

  const upPricedItems = getUpPricedItems(allItems);
  
  const  downPricedItems = getDownPricedItems(allItems);



  return(
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Banner Section */}
      <BannerSection />

      {/* Products Section */}
      <section id="products" className="mt-10 space-y-12">
        
        {/* দাম বৃদ্ধি পাওয়া পণ্যের তালিকা */}
        {upPricedItems.length > 0 && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                <span className="text-red-500">▲</span> দাম বেড়েছে যে পণ্যগুলোর
              </h2>
              
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {upPricedItems.slice(0, 6).map((item) => (
                <ItemCard
                  key={item.id}
                  nameBn={item.nameBn}
                  unit={item.unit}
                  image={item.image}
                  today={item.today}
                  change={item.change}
                />
              ))}
            </div>
          </div>
        )}

        {/* দাম কমে যাওয়া পণ্যের তালিকা */}
        {downPricedItems.length > 0 && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                <span className="text-green-500">▼</span> দাম কমেছে যে পণ্যগুলোর
              </h2>
              
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {downPricedItems.slice(0, 6).map((item) => (
                <ItemCard
                  key={item.id}
                  nameBn={item.nameBn}
                  unit={item.unit}
                  image={item.image}
                  today={item.today}
                  change={item.change}
                />
              ))}
            </div>
          </div>
        )}


        {allItems.length > 0 && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                সব পণ্য
              </h2>
                মোট {allItems.length} টি পণ্য দেখানো হচ্ছে

              </div>
              
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {allItems.map((item) => (
                <ItemCard
                  key={item.id}
                  nameBn={item.nameBn}
                  unit={item.unit}
                  image={item.image}
                  today={item.today}
                  change={item.change}
                />
              ))}
            </div>
          </div>
        )}

        {/* যদি কোনো পণ্য না পাওয়া যায় */}
        {allItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-500">কোনো পণ্যের তথ্য পাওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।</p>
          </div>
        )}

      </section>
    </main>
  )
}

export default Home;
