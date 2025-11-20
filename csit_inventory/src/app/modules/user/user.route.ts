import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/create-student', UserController.createStudentIntoDB)
router.post('/create-admin', UserController.createAdminIntoDB)
router.post('/create-teacher', UserController.createTeacherIntoDB)

export const UserRoutes = router;