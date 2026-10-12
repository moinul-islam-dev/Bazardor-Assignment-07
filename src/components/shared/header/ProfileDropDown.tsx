"use client";

import { Dropdown, Label, Separator } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import AuthenticationButtons from "./AuthenticationButtons";

const ProfileDropDown = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        console.error("Sign out failed:", error);
        toast.success("লগ আউট করা যায়নি");
        return;
      }

      toast.success("সফল্ভাবে লগ আউট হয়েছে");


      router.replace("/");
      router.refresh();
    }

    catch (error) {
      console.error("Unexpected sign out error:", error);
      toast.error("লগ আউট করার সময় সমস্যা হয়েছে");
    }
  };

  const { data: session } = authClient.useSession();

  console.log(session?.user);

  const { name } = session?.user || {};

  return (
    <div>
      {session?.user ? (
        <Dropdown>
          <Dropdown.Trigger>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-gray-100 p-1.5 pr-3 transition-colors hover:bg-gray-200/80"
            >
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop"
                alt="User Profile"
                width={36}
                height={36}
                className="rounded-full object-cover"
              />

              <span className="text-sm font-semibold text-gray-800">
                {name}
              </span>

              <ChevronDown size={16} className="text-gray-500" />
            </button>
          </Dropdown.Trigger>

          <Dropdown.Popover
            placement="bottom end"
            className="min-w-48 rounded-xl border border-gray-100 bg-white p-1 shadow-lg"
          >
            <Dropdown.Menu>
              <Dropdown.Item id="profile" textValue="প্রোফাইল">
                <Label>
                  <Link href="/profile">প্রোফাইল</Link>
                </Label>
              </Dropdown.Item>

              <Dropdown.Item id="settings" textValue="সেটিংস">
                <Label>
                  <Link href="/settings">সেটিংস</Link>
                </Label>
              </Dropdown.Item>

              <Separator />

              <Dropdown.Item id="logout" textValue="লগ আউট" variant="danger">
                <button type="button" onClick={handleSignOut}>
                  লগ আউট
                </button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      ) : (
        <AuthenticationButtons />
      )}
    </div>
  );
};

export default ProfileDropDown;
