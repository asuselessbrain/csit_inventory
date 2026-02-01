"use server";

import { cookies } from "next/headers";

export const verifyOtp = async (data: { email: string; otp: string }) => {
  const cookieStore = await cookies();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();
    if (result.success) {
      cookieStore.set("accessToken", result.data.data.token, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 1000 * 60 * 60 * 24,
      });
      cookieStore.set("refreshToken", result.data.data.refreshToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 30,
      });
    }
    return result;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
    const cookieStore = await cookies();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/logout`, {
      method: "GET",
      credentials: "include",
    });

    const result = await res.json();

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return result;
  } catch (error) {
    throw error;
  }
};
