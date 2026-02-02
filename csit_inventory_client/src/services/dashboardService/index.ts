import { baseApi } from "../baseApi/baseApi";

export const adminDashboardData = async () => {
  try {
    const res = await baseApi(
      `${process.env.NEXT_PUBLIC_BASE_API}/dashboard/admin`,
      {
        method: "GET",
        next: {
          tags: ["dashboard"],
        },
      },
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const teacherDashboardData = async () => {
  try {
    const res = await baseApi(
      `${process.env.NEXT_PUBLIC_BASE_API}/dashboard/teacher`,
      {
        method: "GET",
        next: {
          tags: ["dashboard"],
        },
      },
    );
    return res;
  } catch (error) {
    throw error;
  }
};

export const studentDashboardData = async () => {
  try {
    const res = await baseApi(
      `${process.env.NEXT_PUBLIC_BASE_API}/dashboard/student`,
      {
        method: "GET",
        next: {
          tags: ["dashboard"],
        },
      },
    );
    return res;
  } catch (error) {
    throw error;
  }
};
