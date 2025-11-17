import { NextFunction, Request, Response } from "express";
import { StudentService } from "./student.service";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/responser";

const getAllStudentFromDB = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await StudentService.getAllStudentFromDB(query);
    sendResponse(res, 200, result);
})

export const StudentController = {
    getAllStudentFromDB
}