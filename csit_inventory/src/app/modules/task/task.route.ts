import express from 'express';
import { TaskController } from './task.controller';

const router = express.Router();

router.post('/', TaskController.createTaskIntoDB)
router.patch('/:id', TaskController.updateTaskInDB)
router.patch('/in-progress/:id', TaskController.updateStatusToInProgressInDB)
router.patch('/review/:id', TaskController.updateStatusToReviewInDB)
router.patch('/done/:id', TaskController.updateStatusToDoneInDB)
export const TaskRoutes = router;