import express from 'express';
import { ProjectThesisController } from './projectThesis.controller';

const router = express.Router();

router.post('/', ProjectThesisController.createProjectThesisIntoDB)
router.get('/', ProjectThesisController.getAllProjectThesesFromDB)
router.get('/:id', ProjectThesisController.getSingleProjectThesisFromDB)

export const ProjectThesisRoutes = router;