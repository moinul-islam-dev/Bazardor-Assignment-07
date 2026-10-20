"use client";

import Image from "next/image";
import Link from "next/link";
import LiveDate from "../shared/header/LiveDate";
import basket from "@/assets/basket.png"

const BannerSection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto mt-8 ">
      <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-[#F8FAF8] px-6 py-8 sm:px-10 sm:py-12 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          
          {/* Left Text Content */}
          <div className="flex flex-1 flex-col items-start text-left">
            {/* Live Date Badge */}
            <div className="inline-flex items-center rounded-full bg-green-200 px-3.5 py-1 text-xs font-semibold text-[#00873E]">
              <LiveDate />
            </div>

            {/* Main Heading */}
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-600 sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            {/* Call to Action Button */}
            <Link
              href="/products"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#00873E] px-6 py-2.5 text-sm font-medium text-white shadow-md shadow-green-400 transition-colors hover:bg-[#007032] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00873E]"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          {/* Right Basket Illustration / Image */}
          <div className="relative flex shrink-0 items-center justify-center">
            {/* Background Shadow/Oval under basket */}
            <div className="absolute -bottom-2 h-6 w-3/4 rounded-full bg-gray-200/60 blur-xs" />
            
            <Image
              src={basket}
              alt="বাজারের ঝুড়ি"
              width={260}
              height={220}
              className="relative z-10 h-auto w-48 object-contain sm:w-56 md:w-64"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default BannerSection;