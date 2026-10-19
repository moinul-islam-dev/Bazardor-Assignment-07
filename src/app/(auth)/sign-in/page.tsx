"use client";

import { Button, Form, Input, Label } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineError } from "react-icons/md";
import { toast } from "react-toastify";
import { signIn, signInSocial } from "@/lib/actions/auth-actions";

const SignInPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSocialAuth = async (provider: "google" | "github") => {
    setIsLoading(true);
    setError("");

    try {
      // TODO: Better Auth social sign-in logic
      // console.log(`handleSocial: ${provider}`);

      const url = await signInSocial(provider);

      window.location.assign(url);

      toast.success("লগ ইন সফল হয়েছে");
    } catch (err) {
      setError(
        `Authentication error: ${
          err instanceof Error ? err.message : "Unknown error"
        }`,
      );

      toast.error("লগ ইন সফল হয়নি।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    setIsLoading(true);

    try {
      // TODO: Better Auth sign-in logic
      // console.log("sign-in", { email, password });
      const res = await signIn({ email, password });

      if (!res.user) {
        setError("Invalid email or password");
      }

      // TODO: Redirect only after successful authentication
      toast.success("লগ ইন সফল হয়েছে");

      router.replace("/");
      router.refresh();
    } catch (err) {
      setError(
        `Authentication error: ${
          err instanceof Error ? err.message : "Unknown error"
        }`,
      );

      toast.error("লগ ইন সফল হয়নি।");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f3f6f3] px-4 py-12 sm:px-6 lg:px-8">
      <header className="mb-8 max-w-md text-center">
        <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-gray-800">
          {"সাইন ইন"}
        </h1>

        <p className="text-sm text-gray-600">
          {"বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"}
        </p>
      </header>

      <section className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
          >
            <MdOutlineError aria-hidden="true" className="shrink-0 text-lg" />
            <span>{error}</span>
          </div>
        )}

        <Form onSubmit={handleEmailAuth} className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-1">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              ইমেইল
            </Label>

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className="w-full"
            />
          </div>

          <div className="flex w-full flex-col gap-1">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              পাসওয়ার্ড
            </Label>

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={"current-password"}
              minLength={8}
              required
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            isDisabled={isLoading}
            className="mt-2 w-full rounded-lg bg-[#058240] py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-[#046c35] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </Button>
        </Form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>

          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 text-gray-500">অথবা</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="tertiary"
            isDisabled={isLoading}
            onClick={() => handleSocialAuth("google")}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            <FcGoogle className="text-lg" />
            <span>Google দিয়ে চালিয়ে যান</span>
          </Button>

          <Button
            type="button"
            variant="tertiary"
            isDisabled={isLoading}
            onClick={() => handleSocialAuth("github")}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            <FaGithub className="text-lg text-black" />
            <span>GitHub দিয়ে চালিয়ে যান</span>
          </Button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          {"অ্যাকাউন্ট নেই? "}

          <button
            type="button"
            disabled={isLoading}
            className="cursor-pointer font-semibold text-[#058240] hover:underline disabled:opacity-50"
          >
            <Link href="/sign-up">{"সাইন আপ করুন"}</Link>
          </button>
        </div>
      </section>

      <footer className="mt-6 text-center">
        <Link
          href="/"
          className="text-xs text-gray-500 transition-colors hover:text-gray-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </footer>
    </main>
  );
};

export default SignInPage;
