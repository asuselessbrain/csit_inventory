import express from 'express';
import { ProjectThesisController } from './projectThesis.controller';

const router = express.Router();

router.post('/', ProjectThesisController.createProjectThesisIntoDB)
router.get('/', ProjectThesisController.getAllProjectThesesFromDB)

export const ProjectThesisRoutes = router;