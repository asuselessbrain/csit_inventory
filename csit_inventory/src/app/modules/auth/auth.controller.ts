import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/responser";
import { AuthService } from "./auth.service";

const login = catchAsync(async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const result = await AuthService.loginUser({email, password});
    sendResponse(res, 200, "Login successful", result);
});



export const AuthController = {
    login,

};