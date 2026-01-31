"use server";

import { FieldValues } from "react-hook-form";
import { baseApi } from "../baseApi/baseApi";
import { QueryParams } from "@/types";
import { revalidateTag } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

export const addTeacher = async (teacherData: FieldValues) => {
  try {
    const res = await baseApi(`${baseUrl}/users/create-teacher`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teacherData),
    });
    revalidateTag("teachers", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllTeacherForCourseAssign = async () => {
  try {
    const res = await baseApi(`${baseUrl}/teachers/teacher-list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["teachers"],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const allTeachers = async (queryParams?: QueryParams) => {
  const query = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, String(value));
      }
    });
  }

  try {
    const res = await baseApi(`${baseUrl}/teachers?${query.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["teachers"],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getSingleTeacher = async (teacherId: string) => {
  try {
    const res = await baseApi(`${baseUrl}/teachers/${teacherId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["teachers"],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateTeacher = async (
  teacherId: string,
  teacherData: FieldValues,
) => {
  try {
    const res = await baseApi(`${baseUrl}/teachers/${teacherId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teacherData),
    });
    revalidateTag("teachers", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteTeacher = async (teacherId: string) => {
  try {
    const res = await baseApi(
      `${baseUrl}/teachers/delete-teacher/${teacherId}`,
      {
        method: "PATCH",
        next: {
          tags: ["teachers"],
        },
      },
    );
    revalidateTag("teachers", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const reactivateTeacher = async (teacherId: string) => {
  try {
    const res = await baseApi(
      `${baseUrl}/teachers/re-activate-teacher/${teacherId}`,
      {
        method: "PATCH",
        next: {
          tags: ["teachers"],
        },
      },
    );
    revalidateTag("teachers", "max");
    return res;
  } catch (error) {
    throw error;
  }
};
