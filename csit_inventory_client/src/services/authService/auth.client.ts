import { IUser } from "@/types";
import { jwtDecode } from "jwt-decode";

export const verifyOtp = async (data: { email: string, otp: string }) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/verify-otp`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data)
        })
        const result = await res.json()
        return result
    } catch (error) {
        throw error
    }
}

export const logoutUser = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/logout`, {
            method: "GET",
            credentials: "include",
        })

        const result = await res.json()
        return result
    } catch (error) {
        throw error
    }
}

export const getCurrentUser = () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return null;

    return jwtDecode<IUser>(accessToken);
  } catch {
    return null;
  }
};