import express from 'express';
import { CourseController } from './course.controller';

const router = express.Router()

router.post("/", CourseController.createCourseIntoDB);
router.get("/", CourseController.getAllCoursesFromDB);
router.patch("/:id", CourseController.updateCoursesIntoDB);

export const CourseRoutes = router;