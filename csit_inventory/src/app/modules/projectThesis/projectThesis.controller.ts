import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/responser";
import { ProjectThesisService } from "./projectThesis.service";

const createProjectThesisIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ProjectThesisService.createProjectThesisIntoDB(req.body);
    sendResponse(res, 201, "Project or Thesis created successfully", result)
})

const getAllProjectThesesFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ProjectThesisService.getAllProjectThesesFromDB();
    sendResponse(res, 200, "Project and Thesis fetched successfully", result)
})

export const ProjectThesisController = {
    createProjectThesisIntoDB,
    getAllProjectThesesFromDB
}