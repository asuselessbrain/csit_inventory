import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get refresh token from request body (passed from baseApi)
    const body = await request.json();
    const refreshToken = body?.refreshToken;

    if (!refreshToken) {
      return NextResponse.json(
        { error: "No refresh token provided" },
        { status: 401 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
    if (!baseUrl) {
      return NextResponse.json(
        { error: "Missing API base URL" },
        { status: 500 }
      );
    }

    const refreshRes = await fetch(
      `${baseUrl}/auth/generate-new-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
        cache: "no-store",
      }
    );

    if (!refreshRes.ok) {
      console.error("Backend token refresh failed:", refreshRes.status);
      return NextResponse.json(
        { error: "Token refresh failed" },
        { status: 401 }
      );
    }

    const refreshData = await refreshRes.json();
    const newAccessToken: string | undefined = refreshData?.data?.data;

    if (!newAccessToken) {
      console.error("No access token in backend response:", refreshData);
      return NextResponse.json(
        { error: "No access token in response" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ 
      success: true,
      data: { accessToken: newAccessToken } 
    });
    
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    });

    return response;
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json(
      { error: "Token refresh error", details: String(error) },
      { status: 500 }
    );
  }
}

