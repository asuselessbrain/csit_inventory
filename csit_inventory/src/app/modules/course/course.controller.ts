import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { CourseService } from "./course.service";

const createCourseIntoDB = catchAsync(async(req: Request, res: Response) => {
    const result = await CourseService.createCourseIntoDB(req.body);
    res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: result
    });
})

export const CourseController = {
    createCourseIntoDB
}