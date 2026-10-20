"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface UpdateUserProps {
  name: string;
}

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user ?? null;
}

export const signUp = async ({ name, email, password }: SignUpProps) => {
  try {
    const userData = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: "/",
      },
    });

    if (!userData) throw new Error("Failed to create an account");

    return userData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const signIn = async ({ email, password }: SignInProps) => {
  try {
    const userData = await auth.api.signInEmail({
      body: {
        email,
        password,
        rememberMe: true,
        callbackURL: "/",
      },
    });

    if (!userData) {
      throw new Error("Sign-in failed. wrong email or password");
    }

    return userData;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const signInSocial = async (provider: "github" | "google") => {
  try {
    const { url } = await auth.api.signInSocial({
      body: {
        provider,
        callbackURL: "/",
      },
    });

    if (!url) {
      throw new Error("Failed to initialize social authentication.");
    }

    return url;
  } catch (err) {
    console.error("Social authentication failed:", err);
    throw err;
  }
};

export const signOut = async () => {
  const result = await auth.api.signOut({
    // Pass the current request headers so Better Auth can read and set cookies.
    headers: await headers(),
  });

  if (!result.success) {
    throw new Error("Logout failed");
  }

  return result;
};

export async function updateUser({ name }: UpdateUserProps) {
  try {
    const requestHeaders = await headers();

    // Get the currently authenticated user's session.
    const session = await auth.api.getSession({
      headers: requestHeaders,
    });

    if (!session) {
      return {
        success: false,
        message: "তোমাকে আগে লগইন করতে হবে।",
      };
    }

    const trimmedName = name.trim();

    if (!trimmedName) {
      return {
        success: false,
        message: "নাম খালি রাখা যাবে না।",
      };
    }

    if (trimmedName.length > 100) {
      return {
        success: false,
        message: "নাম সর্বোচ্চ ১০০ অক্ষরের হতে পারবে।",
      };
    }

    // Better Auth updates the user associated with this session.
    await auth.api.updateUser({
      headers: requestHeaders,
      body: {
        name: trimmedName,
      },
    });

    return {
      success: true,
      message: "প্রোফাইল সফলভাবে আপডেট হয়েছে।",
    };
  } catch (error) {
    console.error("Update user error:", error);

    return {
      success: false,
      message: "প্রোফাইল আপডেট করা যায়নি।",
    };
  }
}
