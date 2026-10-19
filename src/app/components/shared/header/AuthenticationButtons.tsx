"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthenticationButtons = () => {
  const pathname = usePathname();
  const isSignInActive = pathname === "/sign-in";
  const isSignUpActive = pathname === "/sign-up";

  return (
    <div className="flex gap-4">
      <Link
        href="/sign-in"
        className={`${isSignInActive ? "bg-green-600 text-slate-100 shadow-md shadow-green-400" : "bg-gray-200"} hover:shadow-lg duration-200 hover:scale-90 px-6 py-2 bg-gray-200 rounded-xl text-center`}
      >
        সাইন ইন
      </Link>

      <Link
        href="/sign-up"
        className={`${isSignUpActive ? "bg-green-600 text-slate-100 shadow-md shadow-green-400" : "bg-gray-200"} hover:shadow-lg duration-200 hover:scale-90 px-6 py-2 bg-gray-200 rounded-xl text-center`}
      >
        সাইন আপ
      </Link>
    </div>
  );
};

export default AuthenticationButtons;
