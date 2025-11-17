import { NextFunction, Request, Response } from "express";
import { StudentService } from "./student.service";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/responser";

const getAllStudentFromDB = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await StudentService.getAllStudentFromDB(query);
    sendResponse(res, 200, result);
})

const updateStudentIntoDB = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const studentId = req.params.id!;
    const updateData = req.body;
    const result = await StudentService.updateStudentIntoDB(studentId, updateData);
    sendResponse(res, 200, result);
})

export const StudentController = {
    getAllStudentFromDB,
    updateStudentIntoDB
}