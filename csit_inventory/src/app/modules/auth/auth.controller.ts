import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/responser";
import { AuthService } from "./auth.service";

const login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await AuthService.loginUser({ email, password });
    sendResponse(res, 200, "Login successful", result);
});

const verifyOtp = catchAsync(async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    const result = await AuthService.verifyOtp(email, otp);
    const { refreshToken, token } = result;

    res.cookie("refreshToken", refreshToken, {
        secure: false,
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    sendResponse(res, 200, "OTP verified successfully", { token });
});

export const AuthController = {
    login,
    verifyOtp
};