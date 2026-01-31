"use server";
import { QueryParams } from "@/types";
import { baseApi } from "../baseApi/baseApi";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

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

export const getSingleStudent = async (studentId: string) => {
  try {
    const res = await baseApi(
      `${process.env.NEXT_PUBLIC_BASE_API}/students/${studentId}`,
      {
        method: "GET",
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

export const updateStudentDetails = async(studentId: string, data: FieldValues) => {
    try{
        const res = await baseApi(
            `${process.env.NEXT_PUBLIC_BASE_API}/students/${studentId}`,
            {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
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
} 