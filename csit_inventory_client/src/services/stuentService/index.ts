"use server";
import { QueryParams } from "@/types";
import { baseApi } from "../baseApi/baseApi";
import { revalidateTag } from "next/cache";

export const getStudents = async (queryParams?: QueryParams) => {
  const params = new URLSearchParams();
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
  }

  try {
    const res = await baseApi(
      `${process.env.NEXT_PUBLIC_BASE_API}/students?${params.toString()}`,
      {
        next: {
          tags: ["students"],
        },
      },
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const approveStudent = async (studentId: string) => {
  try {
    const res = await baseApi(
      `${process.env.NEXT_PUBLIC_BASE_API}/students/approve-student/${studentId}`,
      {
        method: "PATCH",
        next: {
          tags: ["students"],
        },
      },
    );
    revalidateTag("students", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteStudent = async (studentId: string) => {
  try {
    const res = await baseApi(
      `${process.env.NEXT_PUBLIC_BASE_API}/students/delete-student/${studentId}`,
      {
        method: "PATCH",
        next: {
          tags: ["students"],
        },
      },
    );
    revalidateTag("students", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const reactivateStudent = async (studentId: string) => {
  try {
    const res = await baseApi(
      `${process.env.NEXT_PUBLIC_BASE_API}/students/re-activate-student/${studentId}`,
      {
        method: "PATCH",
        next: {
          tags: ["students"],
        },
      },
    );
    revalidateTag("students", "max");
    return res;
  } catch (error) {
    throw error;
  }
};
