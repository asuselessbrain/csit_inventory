"use server";

import { FieldValues } from "react-hook-form";
import { baseApi } from "../baseApi/baseApi";
import { QueryParams } from "@/types";

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
