import { NextFunction, Request, Response } from "express";

class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name; // Set the error name to the class name
    }
}

export const globalErrorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    res.status(error.statusCode || 500).json({
        success: false,
        statusCode: error.statusCode || 500,
        message: 'An error occurred',
        errorMessage: error.message,
        error: error,
    })
}