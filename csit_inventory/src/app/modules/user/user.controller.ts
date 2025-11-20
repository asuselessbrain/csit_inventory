import { Request, Response } from "express";
import { UserService } from "./user.service";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/responser";

const createStudentIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createStudentIntoDB(req.body);
    sendResponse(res, 201, "Student created successfully", result)
})

const createAdminIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createAdminIntoDB(req.body);
    sendResponse(res, 201, "Admin created successfully", result)
})

const createTeacherIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createTeacherIntoDB(req.body);
    sendResponse(res, 201, "Teacher created successfully", result)
})


export const UserController = {
    createStudentIntoDB,
    createAdminIntoDB,
    createTeacherIntoDB
}