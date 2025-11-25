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

const getAllCoursesFromDB = catchAsync(async(req: Request, res: Response) => {
    const result = await CourseService.getAllCoursesFromDB(req.query);
    res.status(200).json({
        success: true,
        message: "Courses retrieved successfully",
        data: result
    });
})

const updateCoursesIntoDB = catchAsync(async(req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseService.updateCoursesIntoDB(id as string, req.body);
    res.status(200).json({
        success: true,
        message: "Course updated successfully",
        data: result
    });
})

const courseSetInTrashInDB = catchAsync(async(req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseService.courseSetInTrashInDB(id as string);
    res.status(200).json({
        success: true,
        message: "Course archived successfully",
        data: result
    });
})

const reActivateCourseInDB = catchAsync(async(req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseService.reActivateCourseInDB(id as string);
    res.status(200).json({
        success: true,
        message: "Course reactivated successfully",
        data: result
    });
})

export const CourseController = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    updateCoursesIntoDB,
    courseSetInTrashInDB,
    reActivateCourseInDB
}