import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/', StudentController.getAllStudentFromDB)
router.patch('/', StudentController.getAllStudentFromDB)

export const StudentRoutes = router;