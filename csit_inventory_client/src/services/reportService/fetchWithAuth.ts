"use server";

import { cookies } from "next/headers";

// টোকেন রিফ্রেশ করার হেল্পার ফাংশন
const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/auth/generate-new-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

// মেইন রিইউজেবল ফেচ ফাংশন
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const cookieStore = await cookies();
  
  const accessToken = cookieStore.get("accessToken")?.value || "";
  const refreshToken = cookieStore.get("refreshToken")?.value;

  // হেডার সেট করার হেল্পার
  const getHeaders = (token: string) => {
    return {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  };

  // ১. প্রথম রিকোয়েস্ট
  let response = await fetch(url, {
    ...options,
    headers: getHeaders(accessToken),
  });

  // ২. যদি 401 Unauthorized আসে এবং রিফ্রেশ টোকেন থাকে
  if (response.status === 401 && refreshToken) {
    console.log("⚠️ 401 Detected. Refreshing token...");

    const newTokensData = await refreshAccessToken(refreshToken);

    // আপনার রেসপন্স স্ট্রাকচার অনুযায়ী টোকেন পাথ ঠিক করুন
    // নিচে সেফটি চেকসহ টোকেন বের করা হয়েছে
    const newAccessToken = 
      newTokensData?.data?.accessToken || 
      newTokensData?.data?.data || 
      newTokensData?.accessToken;

    if (newAccessToken) {
      console.log("✅ Token Refreshed. Retrying original request...");

      // কুকিতে নতুন টোকেন সেট করা
      cookieStore.set("accessToken", newAccessToken);

      // ৩. নতুন টোকেন দিয়ে রিকোয়েস্ট রিট্রাই (Retry)
      response = await fetch(url, {
        ...options,
        headers: getHeaders(newAccessToken),
      });
    } else {
      console.error("❌ Failed to refresh token. Session might be expired.");
      // অপশনাল: রিফ্রেশ টোকেনও ডিলিট করে দিতে পারেন
      // cookieStore.delete("refreshToken");
    }
  }

  return response;
};