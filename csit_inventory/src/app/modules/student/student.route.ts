import express from 'express';
import { StudentController } from './student.controller';

const router = express.Router();

router.get('/', StudentController.getAllStudentFromDB)
router.get('/:id', StudentController.getSingleStudentFromDB)
router.patch('/:id', StudentController.updateStudentIntoDB)

export const StudentRoutes = router;