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
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

export default function RenderFunction() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      console.log(data);
      toast.success("সফলভাবে সাইন ইন হয়েছে।");
    }

    if (error) {
      console.log(error);
      toast.error("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
      <Form
        className="w-xl p-10 bg-white border border-gray-200 rounded-3xl shadow-lg flex flex-col gap-6"
        render={(props) => <form {...props} data-custom="foo" />}
        onSubmit={onSubmit}
      >
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-3">সাইন ইন</h1>
          <p className="text-sm text-gray-500">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "দয়া করে একটি সঠিক ইমেল অ্যাড্রেস দিন"; // Translated validation message
            }

            return null;
          }}
        >
          <Label className="block text-lg font-semibold mb-2 text-left">
            ইমেইল
          </Label>
          <Input
            placeholder="you@example.com"
            className="w-full px-5 py-4 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-green-300 focus:border-green-500"
          />
          <FieldError className="text-red-500 text-sm mt-1 text-left" />
        </TextField>

        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"; // Translated validation message
            }
            if (!/[A-Z]/.test(value)) {
              return "পাসওয়ার্ডে অন্তত একটি বড় হাতের অক্ষর থাকতে হবে"; // Translated validation message
            }
            if (!/[0-9]/.test(value)) {
              return "পাসওয়ার্ডে অন্তত একটি সংখ্যা থাকতে হবে"; // Translated validation message
            }

            return null;
          }}
        >
          <Label className="block text-lg font-semibold mb-2 text-left">
            পাসওয়ার্ড
          </Label>
          <Input
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="w-full px-5 py-4 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-green-300 focus:border-green-500"
          />
          <FieldError className="text-red-500 text-sm mt-1 text-left" />
        </TextField>

        <Link href="/signin">
          {/* <Button
            type="submit"
            className="w-full bg-[#10a352] hover:bg-[#0d8e48] text-white font-bold py-4 rounded-xl text-2xl"
          >
          Primary Button
          </Button> */}

          <Button
            type="submit"
            className="mt-2 min-h-11 w-full rounded-lg bg-[#00873E] px-4 py-2.5 font-medium text-white transition-colors hover:bg-[#007032]"
          >
            সাইন ইন
          </Button>
        </Link>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-sm text-gray-500">অথবা</span>
          </div>
        </div>

        <div className="flex gap-4">
          {/* <Button className="flex-1 flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-4 rounded-xl text-lg">
            <FcGoogle className="text-3xl" /> Google দিয়ে চালিয়ে যান
          </Button>
          <Button className="flex-1 flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-4 rounded-xl text-lg">
            <FaGithub className="text-3xl" /> GitHub দিয়ে চালিয়ে যান
          </Button> */}

          <Button className="w-full" variant="tertiary">
            <FcGoogle />
            Sign in with Google
          </Button>
          <Button className="w-full" variant="tertiary">
            <FaGithub />
            Sign in with GitHub
          </Button>
        </div>

        <p className="text-center text-lg text-gray-600 mt-6">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="text-[#10a352] font-semibold hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </Form>

      <Link
        href="/"
        className="mt-10 text-sm text-gray-500 hover:text-gray-700 hover:underline"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
