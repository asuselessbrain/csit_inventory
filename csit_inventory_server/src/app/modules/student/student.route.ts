import express from "express";
import { StudentController } from "./student.controller";
import { UserRole } from "../../../../generated/prisma/enums";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.TEACHER, UserRole.ADMIN),
  StudentController.getAllStudentFromDB,
);
router.get("/:id", StudentController.getSingleStudentFromDB);
router.patch("/:id", StudentController.updateStudentIntoDB);
router.patch("/delete-student/:id", StudentController.deleteStudentFromDB);

export const StudentRoutes = router;
