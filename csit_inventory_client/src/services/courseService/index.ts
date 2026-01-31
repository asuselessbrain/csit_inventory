"use server";

import { FieldValues } from "react-hook-form";
import { baseApi } from "../baseApi/baseApi";
import { revalidateTag } from "next/cache";
import { QueryParams } from "@/types";

export const createCourse = async (courseData: FieldValues) => {
  try {
    const res = await baseApi(`${process.env.NEXT_PUBLIC_BASE_API}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });
    revalidateTag("courses", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getCourses = async (queryParams?: QueryParams) => {
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
      `${process.env.NEXT_PUBLIC_BASE_API}/courses?${params.toString()}`,
      {
        next: {
          tags: ["courses"],
        },
      },
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getSingleCourse = async (courseId: string) => {
  try {
    const res = await baseApi(
      `${process.env.NEXT_PUBLIC_BASE_API}/courses/${courseId}`,
      {
        next: {
          tags: ["courses"],
        },
      },
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateCourse = async (
  courseId: string,
  courseData: FieldValues,
) => {
  try {
    const res = await baseApi(
      `${process.env.NEXT_PUBLIC_BASE_API}/courses/${courseId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      },
    );
    revalidateTag("courses", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const courseMoveToTrash = async (courseId: string) => {
  try {
    const res = await baseApi(
      `${process.env.NEXT_PUBLIC_BASE_API}/courses/trash/${courseId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    revalidateTag("courses", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const courseReActivate = async (courseId: string) => {
  try {
    const res = await baseApi(
      `${process.env.NEXT_PUBLIC_BASE_API}/courses/reactivate/${courseId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    revalidateTag("courses", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getCourseForProjectThesis = async () => {
  try {
    const res = await baseApi(
      `${process.env.NEXT_PUBLIC_BASE_API}/courses/active-courses`,
      {
        next: {
          tags: ["courses"],
        },
      },
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getMyAssignCourses = async (queryParams?: QueryParams) => {
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
      `${process.env.NEXT_PUBLIC_BASE_API}/courses/my-courses?${params.toString()}`,
      {
        next: {
          tags: ["courses"],
        },
      },
    );
    return res;
  } catch (error) {
    throw error;
  }
};
