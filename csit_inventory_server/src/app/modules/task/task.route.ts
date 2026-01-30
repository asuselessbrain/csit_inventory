import express from 'express';
import { TaskController } from './task.controller';

const router = express.Router();

router.post('/', TaskController.createTaskIntoDB)
router.patch('/in-progress/:id', TaskController.updateStatusToInProgressInDB)
router.patch('/submit-task/:id', TaskController.updateStatusToReviewInDB)
router.patch('/done/:id', TaskController.updateStatusToDoneInDB)
router.patch('/resubmit/:id', TaskController.updateStatusToRejectedInDB)
router.patch('/reject/:id', TaskController.rejectTask)
router.patch('/:id', TaskController.updateTaskInDB)

export const TaskRoutes = router;