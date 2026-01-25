"use server"

import { cookies } from "next/headers";

export const baseApi = async (url: string, options: RequestInit = {}) => {
    try {
        const res = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${((await cookies()).get("accessToken"))?.value}` || "",
                ...options.headers
            }
        })

        if (res.status === 401) {
            const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/auth/generate-new-token`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${((await cookies()).get("refreshToken"))?.value}` || ""
                }
            })

            const refreshData = await refreshRes.json();
            console.log(refreshData)

            if (refreshRes.ok) {
                {
                    const retryRes = await fetch(url, {
                        ...options,
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${refreshData?.data}`,
                            ...options.headers
                        }
                    })
                    return retryRes.json();
                }
            } else {
                window.location.href = "/login";
                return;
            }
        }
        return res.json();
    } catch (error) {
        throw error
    }
}