"use server"

import { FieldValues } from "react-hook-form"
import { baseApi } from "../baseApi/baseApi"

export const createCourse = async (courseData: FieldValues) => {
    try {
        const res = await baseApi(courseData.accessToken, `${process.env.NEXT_PUBLIC_BASE_API}/courses`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(courseData)
        })
        return res
    } catch (error) {
        throw error
    }
}