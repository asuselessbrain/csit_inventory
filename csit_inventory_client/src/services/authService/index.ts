"use server";
import { IUser } from "@/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return result;
  } catch (error) {
    throw error;
  }
};

export const resendOtp = async (email: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/resend-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      },
    );

    const result = await res.json();

    return result;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value || "";
    if (!accessToken) return null;

    return jwtDecode<IUser>(accessToken);
  } catch {
    return null;
  }
};

export const createStudentAccount = async (data: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/create-student`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();
    return result;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (data: { email: string; token: string }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/verify-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();
    return result;
  } catch (error) {
    throw error;
  }
};
