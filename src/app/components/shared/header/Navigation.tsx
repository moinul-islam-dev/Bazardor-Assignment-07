import Link from "next/link";
import LiveDate from "./LiveDate";
import Marquee from "./Marquee";
import NavLinks from "./NavLinks";
import ProfileDropDown from "./ProfileDropDown";
import AuthSection from "./AuthSection";

export default function Navigation() {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      {/* Top Header Section */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left Side: Logo & Date */}
        <Link href="/" className="flex items-center space-x-3 group">
          {/* Green Cart Icon Box */}
          <div className="w-12 h-12 bg-green-800 group-hover:bg-green-700 transition-colors rounded-2xl flex items-center justify-center text-white text-xl shadow-sm">
            🛒
          </div>

          {/* Title and Subtitle */}
          <div>
            <h1 className="text-xl font-bold text-slate-800 leading-tight">
              বাজার দর
            </h1>

            <LiveDate />
          </div>
        </Link>

        {/* Right Side: Profile Dropdown */}
        <AuthSection />
      </div>

      {/* Bottom Category Navigation (Using Next.js Link) */}
      <div className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex items-center justify-center md:justify-start lg:pl-8 space-x-6 lg:space-x-10 overflow-x-auto py-2.5 no-scrollbar">
            <NavLinks />
          </nav>
        </div>
      </div>

      <Marquee />
    </header>
  );
}
