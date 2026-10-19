"use client";

import { Dropdown, Label, Separator } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "@/lib/actions/auth-actions";


interface ProfileDropDownProps {
    name: string | undefined;
}


const ProfileDropDown = ({ name }: ProfileDropDownProps) => {



    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut();

            toast.success("Logged out successfully!");

            router.replace("/");
            router.refresh();
        } catch {
            toast.error("Failed to log out!");
        }
    };

    return (
        <div>
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
                            {name || "User"}
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
        </div>
    );
};

export default ProfileDropDown;
