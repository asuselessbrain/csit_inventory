"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const baseApi = async (url: string, options: RequestInit = {}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  /* ------------------ 1st request ------------------ */
  let res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...options.headers,
    },
    cache: "no-store",
  });

  /* ------------------ SUCCESS ------------------ */
  if (res.ok) return res.json();

  /* ------------------ REFRESH TOKEN VIA ROUTE HANDLER ------------------ */
  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const host = headersList.get("x-forwarded-host") || headersList.get("host") || "localhost:3000";
  
  const refreshToken = cookieStore.get("refreshToken")?.value;
  if (!refreshToken) {
    console.error("No refresh token available");
    redirect("/login");
  }
  
  const refreshRes = await fetch(
    `${protocol}://${host}/api/auth/refresh-token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    }
  );

  if (!refreshRes.ok) {
    console.error("Refresh token request failed:", refreshRes.status);
    redirect("/login");
  }

  const refreshData = await refreshRes.json();
  const newAccessToken: string | undefined = refreshData?.data?.accessToken;

  if (!newAccessToken) redirect("/login");

  /* ------------------ RETRY ORIGINAL REQUEST ------------------ */
  res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${newAccessToken}`,
      ...options.headers,
    },
    cache: "no-store",
  });

  return res.json();
};
