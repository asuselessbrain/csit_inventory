import express from 'express'
import { TeacherController } from './teacher.controller'

const router = express.Router()

router.get('/', TeacherController.getAllTeacherFromDB)
router.get('/teacher-list', TeacherController.getAllTeacherForCourseAssign)
router.get('/:id', TeacherController.getSingleTeacherFromDB)
router.patch('/:id', TeacherController.updateTeacherIntoDB)
router.patch('/delete-teacher/:id', TeacherController.deleteTeacherFromDB)

export const teacherRouter = router;