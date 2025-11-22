import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/responser";
import { TaskService } from "./task.service";

const createTaskIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await TaskService.createTaskIntoDB(req.body);
    sendResponse(res, 201, "Task created successfully", result)
})

export const TaskController = {
    createTaskIntoDB
}