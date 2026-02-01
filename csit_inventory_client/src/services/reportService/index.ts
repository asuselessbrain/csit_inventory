"use server";

import { QueryParams } from "@/types";
import { cookies } from "next/headers";

export const myProposalsForStudentReport = async (
  queryParams?: QueryParams,
) => {
  const cookieStore = await cookies();
  const params = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/project-thesis/proposal-report?${params.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: cookieStore.get("accessToken")?.value || "",
        },
      },
    );

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();

      const buffer = Buffer.from(arrayBuffer);

      return buffer.toString("base64");
    }
  } catch (error) {
    throw error;
  }
};
