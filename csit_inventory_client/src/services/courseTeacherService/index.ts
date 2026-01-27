"use server"

import { revalidateTag } from "next/cache";
import { baseApi } from "../baseApi/baseApi";

const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

interface Data {
    courseId: string;
    teacherId: string;
}

export const createCourseTeacher = async (data: Data) => {
    try {
        const res = await baseApi(`${baseUrl}/course-teachers`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        revalidateTag("courseTeacher", "max")
        return res
    } catch (error) {
        throw error
    }
}

export const getAssignedCourseTeacher = async (courseId: string) => {
    try {
        const res = await baseApi(`${baseUrl}/course-teachers/${courseId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            next: {
                tags: ['courseTeacher']
            }
        })
        return res
    } catch (error) {
        throw error
    }
}