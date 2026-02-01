import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../../generated/prisma/client";
// 👇 Import Fix: পুরো লাইব্রেরি ইম্পোর্ট করে destructure করুন
import jwt from "jsonwebtoken";
const { JsonWebTokenError, TokenExpiredError } = jwt; 

class CustomError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
}

// আপনার AppError ক্লাসটি যদি আলাদা ফাইলে থাকে, তবে সেটি ইম্পোর্ট করে নিন।
// অথবা এখানে ইন্টারফেস ব্যবহার করতে পারেন।
interface IAppError extends Error {
    statusCode?: number;
}

export const globalErrorHandler = (
  error: IAppError, // এখানে টাইপটি জেনেরিক বা কাস্টম ইন্টারফেস দিন
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorMessage = error.message;

  // ১. Prisma Error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      statusCode = 409;
      message = "Duplicate Entry";
      // ... (আপনার ফিল্ড এক্সট্রাকশন লজিক)
      errorMessage = `Duplicate entry found.`;
    } else if (error.code === "P2025") {
      statusCode = 404;
      message = "Record not found";
    }
  } 
  // ২. Prisma Validation Error
  else if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = "Validation Error";
  } 
  // ৩. JWT Errors (Import fix এর পর এটি কাজ করবে)
  else if (error instanceof TokenExpiredError) {
    statusCode = 401;
    message = "Unauthorized";
    errorMessage = "Access token expired. Please log in again.";
  } 
  else if (error instanceof JsonWebTokenError) {
    statusCode = 401;
    message = "Unauthorized";
    errorMessage = "Invalid token provided.";
  } 
  // ৪. Custom AppError handling
  else if (error.statusCode) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessage = error.message;
  }

  // Console log for debugging
  console.log("🚨 Error Handler Caught:", error.statusCode, error.message);

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorMessage,
    // error, // প্রোডাকশনে এটি অফ রাখাই ভালো
  });
};