"use server"

import { FieldValues } from "react-hook-form";
import { baseApi } from "../baseApi/baseApi";
import { revalidateTag } from "next/cache";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

export const createTask = async (taskData: FieldValues) => {
    try {
        const res = await baseApi(`${baseUrl}/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
        });
        revalidateTag("task", "max");
        return res
    } catch (error) {
        throw error
    }
}