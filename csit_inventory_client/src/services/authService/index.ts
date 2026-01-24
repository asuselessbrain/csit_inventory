"use server"
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

export const resendOtp = async (email: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/resend-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })

        const result = await res.json()

        return result
    } catch (error) {
        throw error
    }
}