import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { AdminService } from "./admin.service";
import { sendResponse } from "../../../shared/responser";

const createAdminIntoDB = catchAsync(async (req: Request, res: Response) => {
    const result = await AdminService.createAdminIntoDB(req.body);
    sendResponse(res, 201, "Admin created successfully", result)
})

export const AdminController = {
    createAdminIntoDB
}