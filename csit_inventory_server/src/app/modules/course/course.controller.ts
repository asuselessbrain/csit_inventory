import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { CourseService } from "./course.service";
import { sendResponse } from "../../../shared/responser";

const createCourseIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.createCourseIntoDB(req.body);
    sendResponse(res, 201, "Course created successfully", result);
})

const getAllCoursesFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.getAllCoursesFromDB(req.query);
    sendResponse(res, 200, "Courses retrieved successfully", result);
})

const updateCoursesIntoDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseService.updateCoursesIntoDB(id as string, req.body);
    sendResponse(res, 200, "Course updated successfully", result);
})

const courseSetInTrashInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseService.courseSetInTrashInDB(id as string);
    sendResponse(res, 200, "Course archived successfully", result);
})

const reActivateCourseInDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseService.reActivateCourseInDB(id as string);
    sendResponse(res,
        200,
        "Course reactivated successfully",
        result
    );
})

const getSingleCourseFromDB = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CourseService.getSingleCourseFromDB(id as string);
    sendResponse(res,
        200,
        "Course retrieved successfully",
        result
    );
})


export const CourseController = {
    createCourseIntoDB,
    getAllCoursesFromDB,
    updateCoursesIntoDB,
    courseSetInTrashInDB,
    reActivateCourseInDB,
    getSingleCourseFromDB
}