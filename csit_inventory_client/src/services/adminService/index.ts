"use server"
import { QueryParams } from "@/types";
import { baseApi } from "../baseApi/baseApi";
import { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";

export const getAllAdmin = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });

    try {
      const res = await baseApi(
        `${process.env.NEXT_PUBLIC_BASE_API}/admins?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          next: {
            tags: ["admins"],
          },
        },
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
};

export const updateAdmin = async (adminId: string, data: FieldValues) => {
  try {
    const res = await baseApi(
      `${process.env.NEXT_PUBLIC_BASE_API}/admins/${adminId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    revalidateTag("admins", "max");
    return res;
  } catch (error) {
    throw error;
  }
};
