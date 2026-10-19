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

export const signUp = async ({ name, email, password }: SignUpProps) => {
  try {
    const userData = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        callbackURL: "http://localhost:3000/",
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
        callbackURL: "http://localhost:3000/",
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
        callbackURL: "http://localhost:3000/",
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

  return result;
};
