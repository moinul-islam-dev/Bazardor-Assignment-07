"use client";

import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

interface User {
  name: string;
  email: string;
  password: string;
  rewritePassword: string;
}

export default function SignUpPage() {
  const router = useRouter();

  const wrongPasswordError = () => toast.error("পাসওয়ার্ড মেলেনি");

  const passwordLenghtError = () =>
    toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");

  const uppercaseError = () =>
    toast.error("পাসওয়ার্ডে কমপক্ষে একটি বড় অক্ষর থাকতে হবে");

  const numberError = () => toast.error("পাসওয়ার্ডে কমপক্ষে একটি সংখ্যা থাকতে হবে");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user: User = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      rewritePassword: formData.get("rewritePassword") as string,
    };

    if (user.password !== user.rewritePassword) {
      wrongPasswordError();
      return;
    }

    try {
      const { data: userData, error } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (userData) {
        toast.success("সফলভাবে সাইন আপ হয়েছে।");
        router.push("/");
      }
    } catch {
      toast.error("সাইন আপ করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center bg-transparent px-4 py-8 sm:px-6 sm:py-12">
      {/* Header */}
      <header className="mb-5 w-full max-w-md text-center sm:mb-6">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখো।
        </p>
      </header>

      {/* Form Card */}
      <section className="w-full max-w-md min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
        <Form
          className="flex w-full min-w-0 flex-col gap-4"
          render={(props) => <form {...props} data-custom="foo" />}
          onSubmit={onSubmit}
        >
          {/* Name */}
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">নাম</Label>

            <Input
              className="mt-1 w-full min-w-0"
              placeholder="যেমন: রহিম উদ্দিন"
            />

            <FieldError />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">ইমেইল</Label>

            <Input
              className="mt-1 w-full min-w-0"
              placeholder="you@example.com"
            />

            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                passwordLenghtError();
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              }

              if (!/[A-Z]/.test(value)) {
                uppercaseError();
                return "কমপক্ষে একটি বড় অক্ষর ব্যবহার করো";
              }

              if (!/[0-9]/.test(value)) {
                numberError();
                return "কমপক্ষে একটি সংখ্যা ব্যবহার করো";
              }

              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">পাসওয়ার্ড</Label>

            <Input
              className="mt-1 w-full min-w-0"
              placeholder="কমপক্ষে ৮ অক্ষর"
            />

            <FieldError />
          </TextField>

          {/* Confirm Password */}
          <TextField
            isRequired
            minLength={8}
            name="rewritePassword"
            type="password"
          >
            <Label className="text-sm font-medium text-gray-700">
              পাসওয়ার্ড নিশ্চিত করো
            </Label>

            <Input className="mt-1 w-full min-w-0" placeholder="আবার লিখো" />

            <FieldError />
          </TextField>

          {/* Submit */}
          <Button
            type="submit"
            className="mt-2 min-h-11 w-full rounded-lg bg-[#00873E] px-4 py-2.5 font-medium text-white transition-colors hover:bg-[#007032]"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Button>

          {/* Divider */}
          <div className="flex w-full items-center gap-3 py-2">
            <div className="h-px min-w-0 flex-1 bg-gray-200" />

            <span className="shrink-0 text-xs text-gray-400">অথবা</span>

            <div className="h-px min-w-0 flex-1 bg-gray-200" />
          </div>

          {/* Social Login */}
          <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
            <Button className="w-full" variant="tertiary">
              <FcGoogle />
              Sign up with Google
            </Button>
            <Button className="w-full" variant="tertiary">
              <FaGithub />
              Sign up with GitHub
            </Button>
          </div>

          {/* Sign In */}
          <p className="mt-2 w-full text-center text-sm leading-6 text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signin"
              className="font-medium text-[#00873E] hover:underline"
            >
              সাইন ইন করো
            </Link>
          </p>
        </Form>
      </section>

      {/* Back to Home */}
      <Link
        href="/"
        className="mt-6 rounded-sm text-center text-sm text-gray-500 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00873E]"
      >
        ← হোম পেজে ফিরে যাও
      </Link>
    </main>
  );
}
