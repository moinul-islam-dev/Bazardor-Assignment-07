
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f3f5f1] px-4 text-center">
      <p className="text-8xl font-extrabold text-green-600">
        404
      </p>

      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি!
      </h1>

      <p className="mt-3 text-gray-600">
        তুমি যে পৃষ্ঠাটি খুঁজছ, সেটি এখানে নেই।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
      >
        হোম পেজে ফিরে যাও
      </Link>
    </main>
  );
}
