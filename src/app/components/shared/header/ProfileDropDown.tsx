"use client";

import { Dropdown, Label, Separator } from "@heroui/react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signOut } from "@/lib/actions/auth-actions";
import { useState } from "react";

interface ProfileDropDownProps {
    name: string | undefined;
}



const ProfileDropDown = ({ name }: ProfileDropDownProps) => {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            const result = await signOut();

            if (!result.success) {
                toast.error("লগ আউট সফল হয়নি।");
                return;
            }

            toast.success("লগ আউট সফল হয়েছে। ");

            router.replace("/");
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
            // toast.error("Failed to log out!");
            toast.error("লগ আউট সফল হয়নি।");
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
                        {name ? (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold uppercase text-green-700">
                                {name.trim().charAt(0).toUpperCase()}
                            </div>
                        ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                                U
                            </div>
                        )}

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
                        <Dropdown.Item
                            id="profile"
                            textValue="প্রোফাইল"
                            onClick={() => router.push("/profile")}
                        >
                            {/* <Link href="/profile">প্রোফাইল</Link> */}
                            প্রোফাইল
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
