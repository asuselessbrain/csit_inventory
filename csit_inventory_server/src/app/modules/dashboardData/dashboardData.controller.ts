import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { DashboardService } from "./dashboardData.service";
import { sendResponse } from "../../../shared/responser";

const getAdminDashboardData = catchAsync(
  async (req: Request, res: Response) => {
    const result = await DashboardService.getAdminDashboardData();
    sendResponse(res, 200, "Dashboard data retrieved successfully", result);
  },
);

const getTeacherDashboardData = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await DashboardService.teacherDashboardData(
      user.email as string,
    );
    sendResponse(res, 200, "Dashboard data retrieved successfully", result);
  },
);

const getStudentDashboardData = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await DashboardService.studentDashboardData(
      "anomious31@gmail.com" as string,
    );
    sendResponse(res, 200, "Dashboard data retrieved successfully", result);
  },
);

export const DashboardDataController = {
  getAdminDashboardData,
  getTeacherDashboardData,
  getStudentDashboardData,
};
