import { QueryParams } from "@/types";
import { baseApi } from "../baseApi/baseApi";

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
