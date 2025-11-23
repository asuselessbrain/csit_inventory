import express from 'express';
import { TaskController } from './task.controller';

const router = express.Router();

router.post('/', TaskController.createTaskIntoDB)
router.patch('/:id', TaskController.updateTaskInDB)
export const TaskRoutes = router;