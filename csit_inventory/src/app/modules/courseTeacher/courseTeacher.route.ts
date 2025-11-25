import express from "express";
import { CourseTeacherController } from "./courseTeacher.controller";

const router = express.Router();

router.post("/", CourseTeacherController.createCourseTeacherIntoDB);
router.get("/", CourseTeacherController.getAllCourseTeachersFromDB);
router.patch("/:id", CourseTeacherController.updateCourseTeacherIntoDB);

export const CourseTeacherRoutes = router;