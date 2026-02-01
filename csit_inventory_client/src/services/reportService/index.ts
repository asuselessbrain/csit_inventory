"use server";

import { QueryParams } from "@/types";
import { fetchWithAuth } from "./fetchWithAuth";

export const myProposalsForStudentReport = async (
  queryParams?: QueryParams,
) => {
  const params = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/project-thesis/proposal-report?${params.toString()}`;

  try {
    const response = await fetchWithAuth(apiUrl, {
      method: "GET",
      cache: "no-store",
    });

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return buffer.toString("base64");
    } else {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

export const myProposalsForTeacherReport = async (
  queryParams?: QueryParams,
) => {
  const params = new URLSearchParams();

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API}/project-thesis/proposal-report-teacher?${params.toString()}`;

  try {
    const response = await fetchWithAuth(apiUrl, {
      method: "GET",
      cache: "no-store",
    });

    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      return buffer.toString("base64");
    } else {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};