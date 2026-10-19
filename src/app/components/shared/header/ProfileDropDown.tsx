
"use client";

import { Dropdown, Separator } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "@/lib/actions/auth-actions";

interface CurrentUser {
  name: string;
  image?: string | null;
}

interface ProfileDropDownProps {
  user: CurrentUser;
}

const ProfileDropDown = ({ user }: ProfileDropDownProps) => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const result = await signOut();

      if (!result.success) {
        toast.error("লগ আউট সফল হয়নি।");
        return;
      }

      toast.success("লগ আউট সফল হয়েছে।");

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("লগ আউট সফল হয়নি।");
    }
  };

  const name = user.name?.trim() || "User";
  const image = user.image?.trim();

  return (
    <div>
      <Dropdown>
        <Dropdown.Trigger>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-gray-100 p-1.5 pr-3 transition-colors hover:bg-gray-200/80"
          >
            {image ? (
              <Image
                src={image}
                alt={`${name}'s profile`}
                width={36}
                height={36}
                className="h-9 w-9 rounded-full border border-gray-200 object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold uppercase text-green-700">
                {name !== "User" ? name.charAt(0) : "U"}
              </div>
            )}

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
            <Dropdown.Item
              id="profile"
              textValue="প্রোফাইল"
              onClick={() => router.push("/profile")}
            >
              প্রোফাইল
            </Dropdown.Item>

            <Separator />

            <Dropdown.Item
              id="logout"
              textValue="লগ আউট"
              variant="danger"
              onClick={handleSignOut}
            >
              লগ আউট
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  );
};

export default ProfileDropDown;
