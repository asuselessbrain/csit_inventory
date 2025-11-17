import { Response } from "express";

export const sendResponse = <T>(res: Response, statusCode: number, result: T) => {
    return res.status(statusCode).json({
        success: true,
        message: "Student retrieved successfully",
        data: result
    });
}