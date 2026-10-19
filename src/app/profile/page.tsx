"use client";

import { Button, Form, Input, Label } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineError } from "react-icons/md";
import { toast } from "react-toastify";
import {
  getCurrentUser,
  signOut,
  updateUser,
} from "@/lib/actions/auth-actions";

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

const SettingsClientPage = () => {
  const router = useRouter();

  const [user, setUser] = useState<CurrentUser | null>(null);
  const [name, setName] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (cancelled) return;

        if (!currentUser) {
          router.replace("/sign-in");
          return;
        }

        setUser(currentUser);
        setName(currentUser.name ?? "");
      } catch (err) {
        console.error("Load user error:", err);

        if (!cancelled) {
          setError("অ্যাকাউন্টের তথ্য লোড করা যায়নি।");
        }
      } finally {
        if (!cancelled) {
          setIsPending(false);
        }
      }
    };

    void loadUser();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const handleUpdateName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const result = await updateUser({ name });

      if (!result.success) {
        setError(result.message);
        toast.error(result.message);
        return;
      }

      // Fetch the updated user data from the server.
      const updatedUser = await getCurrentUser();

      if (updatedUser) {
        setUser(updatedUser);
        setName(updatedUser.name ?? "");
      }

      setSuccessMessage(result.message);
      toast.success(result.message);

      router.refresh();
    } catch (err) {
      console.error("Update user error:", err);

      const message =
        err instanceof Error ? err.message : "প্রোফাইল আপডেট করা যায়নি।";

      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      const result = await signOut();

      if (!result.success) {
        toast.error("লগ আউট সফল হয়নি।");
        return;
      }

      toast.success("লগ আউট সফল হয়েছে।");
      router.replace("/");
      router.refresh();

    } 
    
    catch (err) {
      console.error("Sign out error:", err);
      toast.error("লগ আউট সফল হয়নি।");
    } 
    
    finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#f3f6f3] p-8">
        অ্যাকাউন্টের তথ্য লোড হচ্ছে...
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#f3f6f3] p-8">
        {error || "অ্যাকাউন্টের তথ্য পাওয়া যায়নি।"}
        <Button onClick={() => router.replace("/sign-in")}>লগইন</Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f6f3] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-gray-800">
            আমার প্রোফাইল
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </header>

        <section className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="flex min-w-0 items-center gap-4">
            {user.image ? (
              <Image
                src={user.image}
                alt="Profile"
                width="34"
                height="34"
                className="h-14 w-14 rounded-full border border-gray-200 object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xl font-bold text-gray-600">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-gray-800">
                {user.name || "User"}
              </h2>
              <p className="truncate text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            isDisabled={isSigningOut}
            onClick={handleSignOut}
            className="shrink-0 text-rose-500 border-rose-500"
          >
            <FiLogOut />
            {isSigningOut ? "লগ আউট হচ্ছে..." : "সাইন আউট"}
          </Button>
        </section>

        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="mb-6 text-base font-bold text-gray-800">
            তথ্য
          </h3>

          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              <MdOutlineError className="shrink-0 text-lg" />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {successMessage}
            </div>
          )}

          <Form onSubmit={handleUpdateName} className="flex flex-col gap-4">
            <div className="flex w-full flex-col gap-1">
              <Label htmlFor="name">নাম</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={1}
                maxLength={100}
                className="w-full"
              />
            </div>

            <Button
              type="submit"
              isDisabled={
                isLoading || !name.trim() || name.trim() === user.name.trim()
              }
              className="mt-2 w-full bg-[#05893E] text-white hover:bg-[#046c35]"
            >
              {isLoading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করো"}
            </Button>
          </Form>
        </section>
      </div>
    </main>
  );
};

export default SettingsClientPage;
