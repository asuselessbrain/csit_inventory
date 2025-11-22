import express from 'express';
import { TaskController } from './task.controller';

const router = express.Router();

router.post('/', TaskController.createTaskIntoDB)
export const TaskRoutes = router;