import express from "express";
import { CourseTeacherController } from "./courseTeacher.controller";

const router = express.Router();

router.post("/", CourseTeacherController.createCourseTeacherIntoDB);
router.get("/", CourseTeacherController.getAllCourseTeachersFromDB);

export const CourseTeacherRoutes = router;