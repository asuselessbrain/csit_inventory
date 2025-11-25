import express from 'express';
import { CourseController } from './course.controller';

const router = express.Router()

router.post("/", CourseController.createCourseIntoDB);
router.get("/", CourseController.getAllCoursesFromDB);
router.patch("/:id", CourseController.updateCoursesIntoDB);
router.patch("/trash/:id", CourseController.courseSetInTrashInDB);
router.patch("/reactivate/:id", CourseController.reActivateCourseInDB);
router.get("/:id", CourseController.getSingleCourseFromDB);

export const CourseRoutes = router;