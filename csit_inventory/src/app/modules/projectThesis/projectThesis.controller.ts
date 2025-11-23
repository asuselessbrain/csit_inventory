import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/responser";
import { ProjectThesisService } from "./projectThesis.service";

const createProjectThesisIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ProjectThesisService.createProjectThesisIntoDB(req.body);
    sendResponse(res, 201, "Project or Thesis created successfully", result)
})

const getAllProjectThesesFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await ProjectThesisService.getAllProjectThesesFromDB(req.query);
    sendResponse(res, 200, "Project and Thesis fetched successfully", result)
})

const getSingleProjectThesisFromDB = catchAsync(async(req: Request, res: Response) => {
    const {id} = req.params;
    const result = await ProjectThesisService.getSingleProjectThesisFromDB(id as string);
    sendResponse(res, 200, "Project or Thesis fetched successfully", result)
})

const updateProjectThesisInDB = catchAsync(async(req: Request, res: Response) => {
    const {id} = req.params;
    const result = await ProjectThesisService.updateProjectThesisInDB(id as string, req.body);
    sendResponse(res, 200, "Project or Thesis updated successfully", result)
})

const approveProjectThesis = catchAsync(async(req: Request, res: Response) => {
    const {id} = req.params;
    const result = await ProjectThesisService.approveProjectThesisInDB(id as string);
    sendResponse(res, 200, "Project or Thesis approved successfully", result)
})

const rejectProjectThesis = catchAsync(async(req: Request, res: Response) => {
    const {id} = req.params;
    const result = await ProjectThesisService.rejectProjectThesisInDB(id as string);
    sendResponse(res, 200, "Project or Thesis rejected successfully", result)
})

const startProjectThesisInDB = catchAsync(async(req: Request, res: Response) => {
    const {id} = req.params;
    const result = await ProjectThesisService.startProjectThesisInDB(id as string);
    sendResponse(res, 200, "Project or Thesis started successfully", result)
})

const completeProjectThesisInDB = catchAsync(async(req: Request, res: Response) => {
    const {id} = req.params;
    const result = await ProjectThesisService.completeProjectThesisInDB(id as string);
    sendResponse(res, 200, "Project or Thesis completed successfully", result)
})

export const ProjectThesisController = {
    createProjectThesisIntoDB,
    getAllProjectThesesFromDB,
    getSingleProjectThesisFromDB,
    updateProjectThesisInDB,
    approveProjectThesis,
    rejectProjectThesis,
    startProjectThesisInDB,
    completeProjectThesisInDB
}