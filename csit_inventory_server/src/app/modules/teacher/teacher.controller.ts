import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/responser";
import { TeacherService } from "./teacher.service";

const getAllTeacherFromDB = catchAsync(async (req: Request, res: Response) => {
    const query = req.query;
    const result = await TeacherService.getAllTeacherFromDB(query);
    sendResponse(res, 200, "Teachers retrieved successfully", result);
})

const getSingleTeacherFromDB = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id!;
    const result = await TeacherService.getSingleTeacherFromDB(id);
    sendResponse(res, 200, "Teacher retrieved successfully", result);
})

const updateTeacherIntoDB = catchAsync(async (req: Request, res: Response) => {
    const teacherId = req.params.id!;
    const updateData = req.body;
    const result = await TeacherService.updateTeacherIntoDB(teacherId, updateData);
    sendResponse(res, 200, "Teacher updated successfully", result);
})

const deleteTeacherFromDB = catchAsync(async (req: Request, res: Response) => {
    const teacherId = req.params.id!;
    const result = await TeacherService.deleteTeacherFromDB(teacherId);
    sendResponse(res, 200, "Teacher deleted successfully", result);
})

export const TeacherController = {
    getAllTeacherFromDB,
    updateTeacherIntoDB,
    getSingleTeacherFromDB,
    deleteTeacherFromDB
}