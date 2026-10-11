"use client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { router } from "better-auth/api";
import { redirect } from "next/navigation";

interface User {
  name: string;
  email: string;
  password: string;
  rewritePassword: string;
}

export default function SignUpPage() {

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
    }

    if (user.password !== user.rewritePassword) {
      wrongPasswordError();
      return;
    }

    const { data: userData, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      callbackURL: "/"
    })

    if (error) {
      toast.error(error.message);
      console.log(error.message)
      return;
    }

    if (userData) {
      toast.success("সফলভাবে সাইন আপ হয়েছে।");
      console.log(userData)
      redirect("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      {/* Header section */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-sm text-gray-500 mt-1">
          বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      {/* Card Container */}
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <Form
          className="flex w-full flex-col gap-4"
          render={(props) => <form {...props} data-custom="foo" />}
          onSubmit={onSubmit}
        >
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
              className="mt-1"
              placeholder="যেমন: রহিম উদ্দিন"
            />
            <FieldError />
          </TextField>

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
              className="mt-1"
              placeholder="you@example.com"
            />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                passwordLenghtError();
                return;
              }
              if (!/[A-Z]/.test(value)) {
                uppercaseError();
                return;
              }
              if (!/[0-9]/.test(value)) {
                numberError();
                return;
              }
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">পাসওয়ার্ড</Label>
            <Input
              className="mt-1"
              placeholder="কমপক্ষে ৮ অক্ষর"
            />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="rewritePassword"
            type="password"
            validate={(value) => {
              return null;
            }}
          >
            <Label className="text-sm font-medium text-gray-700">পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input
              className="mt-1"
              placeholder="আবার লিখুন"
            />
            <FieldError />
          </TextField>

          <Button
            type="submit"
            className="w-full bg-[#00873E] text-white font-medium py-2.5 rounded-lg hover:bg-[#007032] transition-colors mt-2"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Button>

          {/* Divider */}
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-xs">অথবা</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Social Logins */}
          <div className="flex items-center justify-between w-full gap-3">
            <Button
              className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg font-medium"
              variant="tertiary"
            >
              <FcGoogle size={20} />
              Google দিয়ে চালিয়ে যান
            </Button>
            <Button
              className="w-full flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg font-medium"
              variant="tertiary"
            >
              <FaGithub size={20} />
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          {/* Footer links inside card */}
          <div className="text-center text-sm text-gray-600 mt-4">
            অ্যাকাউন্ট আছে?{" "}
            <a href="#" className="text-[#00873E] font-medium hover:underline">
              সাইন ইন করুন
            </a>
          </div>
        </Form>
      </div>

      {/* Bottom Back Link */}
      <Link href="/" className="mt-6 text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}