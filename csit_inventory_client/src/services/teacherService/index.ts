"use server"

import { FieldValues } from "react-hook-form";
import { baseApi } from "../baseApi/baseApi";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

console.log(baseUrl)

export const addTeacher = async (teacherData: FieldValues) => {
    try {
        const res = await baseApi(`${baseUrl}/users/create-teacher`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(teacherData)
        })
        return res
    } catch (error) {
        throw error
    }
}