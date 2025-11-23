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

export const TaskController = {
    createTaskIntoDB,
    updateTaskInDB
}