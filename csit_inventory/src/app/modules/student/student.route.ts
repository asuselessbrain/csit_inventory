import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/', StudentController.getAllStudentFromDB)
router.patch('/:id', StudentController.updateStudentIntoDB)

export const StudentRoutes = router;