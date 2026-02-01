"use server";

import { FieldValues } from "react-hook-form";
import { baseApi } from "../baseApi/baseApi";
import { revalidateTag } from "next/cache";
import { QueryParams } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

export const createTask = async (taskData: FieldValues) => {
  try {
    const res = await baseApi(`${baseUrl}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });
    revalidateTag("project", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const makeTaskInProgress = async (id: string) => {
  try {
    const res = await baseApi(`${baseUrl}/tasks/in-progress/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("project", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const submitTask = async (id: string, submissionData: FieldValues) => {
  try {
    const res = await baseApi(`${baseUrl}/tasks/submit-task/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    });
    revalidateTag("project", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const markAsDone = async (id: string, data: FieldValues) => {
  try {
    const res = await baseApi(`${baseUrl}/tasks/done/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    revalidateTag("project", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const rejectTasks = async (id: string) => {
  try {
    const res = await baseApi(`${baseUrl}/tasks/reject/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("project", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const allowStudentResubmit = async (id: string) => {
  try {
    const res = await baseApi(`${baseUrl}/tasks/resubmit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidateTag("project", "max");
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllTaskForStudent = async (queryParams: QueryParams) => {
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
      `${baseUrl}/tasks/student-tasks?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["project"],
        },
      },
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllTaskForTeacherReview = async (queryParams: QueryParams) => {
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
      `${baseUrl}/tasks/teacher-review-tasks?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["project"],
        },
      },
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const getSingleTask = async (id: string) => {
  try {
    const res = await baseApi(`${baseUrl}/tasks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["project"],
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};
