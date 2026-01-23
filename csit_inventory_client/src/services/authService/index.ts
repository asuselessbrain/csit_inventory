"use server"

import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"

export const loginUser = async (data: FieldValues) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const result = await res.json()

        return result
    } catch (error) {
        throw error
    }
}

export const verifyOtp = async (data: { email: string, otp: string }) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/verify-otp`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await res.json()

        if (result.data.refreshToken) {
            (await cookies()).set("refreshToken", result?.data?.refreshToken)
        }
        return result
    } catch (error) {
        throw error
    }
}