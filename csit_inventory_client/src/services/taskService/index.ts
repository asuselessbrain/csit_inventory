"use server";

import { FieldValues } from "react-hook-form";
import { baseApi } from "../baseApi/baseApi";
import { revalidateTag } from "next/cache";

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

export const markAsDone = async (id: string) => {
  try {
    const res = await baseApi(`${baseUrl}/tasks/done/${id}`, {
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

export const getAllTaskForStudent = async () => {
  try {
    const res = await baseApi(`${baseUrl}/tasks/student-tasks`, {
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
