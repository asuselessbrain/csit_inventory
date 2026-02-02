import express from "express";
import { DashboardDataController } from "./dashboardData.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../generated/prisma/enums";

const router = express.Router();

router.get(
  "/admin",
  auth(UserRole.ADMIN),
  DashboardDataController.getAdminDashboardData,
);
router.get(
  "/teacher",
  auth(UserRole.TEACHER),
  DashboardDataController.getTeacherDashboardData,
);

router.get(
  "/student",
//   auth(UserRole.STUDENT),
  DashboardDataController.getStudentDashboardData,
);
export const DashboardDataRoutes = router;
