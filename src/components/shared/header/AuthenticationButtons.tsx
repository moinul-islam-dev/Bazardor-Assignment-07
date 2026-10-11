"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthenticationButtons = () => {
  const pathname = usePathname();
  const isSignInActive = pathname === "/signin";
  const isSignUpActive = pathname === "/signup";

  return (
    <div className="flex gap-4">
      <Link
        href="/signin"
        className={`${isSignInActive ? "bg-green-800" : "bg-gray-200"} px-6 py-2 bg-gray-200 rounded-3xl text-center`}
      >
        সাইন ইন
      </Link>

      <Link
        href="/signup"
        className={`${isSignUpActive ? "bg-green-800" : "bg-gray-200"} px-6 py-2 bg-gray-200 rounded-3xl text-center`}
      >
        সাইন আপ
      </Link>
    </div>
  );
};

export default AuthenticationButtons;
