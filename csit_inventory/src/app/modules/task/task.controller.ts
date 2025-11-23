import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/responser";
import { TaskService } from "./task.service";

const createTaskIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await TaskService.createTaskIntoDB(req.body);
    sendResponse(res, 201, "Task created successfully", result)
})

const updateTaskInDB = catchAsync(async (req: Request, res: Response) => {
    const result = await TaskService.updateTaskInDB(req.params.id as string, req.body);
    sendResponse(res, 200, "Task updated successfully", result)
})

const updateStatusToInProgressInDB = catchAsync(async (req: Request, res: Response) => {
    const result = await TaskService.updateStatusToInProgressInDB(req.params.id as string);
    sendResponse(res, 200, "Task status updated to in progress successfully", result)
})

const updateStatusToReviewInDB = catchAsync(async (req: Request, res: Response) => {
    const result = await TaskService.updateStatusToReviewInDB(req.params.id as string);
    sendResponse(res, 200, "Task status updated to review successfully", result)
})

const updateStatusToDoneInDB = catchAsync(async (req: Request, res: Response) => {
    const result = await TaskService.updateStatusToDoneInDB(req.params.id as string);
    sendResponse(res, 200, "Task status updated to done successfully", result)
})

const updateStatusToRejectedInDB = catchAsync(async (req: Request, res: Response) => {
    const result = await TaskService.updateStatusToRejectedInDB(req.params.id as string, req.body);
    sendResponse(res, 200, "Task status updated to rejected successfully", result)
})

export const TaskController = {
    createTaskIntoDB,
    updateTaskInDB,
    updateStatusToInProgressInDB,
    updateStatusToReviewInDB,
    updateStatusToDoneInDB,
    updateStatusToRejectedInDB
}