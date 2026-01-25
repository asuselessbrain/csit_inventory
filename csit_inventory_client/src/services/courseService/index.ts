"use server"

import { FieldValues } from "react-hook-form"
import { baseApi } from "../baseApi/baseApi"
import { revalidateTag } from "next/cache"

export const createCourse = async (courseData: FieldValues) => {
    try {
        const res = await baseApi(`${process.env.NEXT_PUBLIC_BASE_API}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseData)
        })
        revalidateTag("courses", "max");
        return res
    } catch (error) {
        throw error
    }
}

export const getCourses = async () => {
    try {
        const res = await baseApi(`${process.env.NEXT_PUBLIC_BASE_API}/courses`, {
            next: {
                tags: ['courses']
            }

        })
        return res
    } catch (error) {
        throw error
    }
}

export const getSingleCourse = async (courseId: string) => {
    try {
        const res = await baseApi(`${process.env.NEXT_PUBLIC_BASE_API}/courses/${courseId}`, {
            next: {
                tags: ['courses']
            }
        })
        return res
    } catch (error) {
        throw error
    }
}