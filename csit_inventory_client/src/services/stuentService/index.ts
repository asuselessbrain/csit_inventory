import { QueryParams } from "@/types"
import { baseApi } from "../baseApi/baseApi"

export const getStudents = async (queryParams?: QueryParams) => {

    const params = new URLSearchParams()
    if (queryParams) {
        Object.entries(queryParams).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                params.append(key, String(value))
            }
        })
    }

    try {
        const res = await baseApi(`${process.env.NEXT_PUBLIC_BASE_API}/students?${params.toString()}`, {
            next: {
                tags: ['students']
            }

        })
        return res
    } catch (error) {
        throw error
    }
}