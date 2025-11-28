import express from 'express';
import { ProjectThesisController } from './projectThesis.controller';

const router = express.Router();

router.post('/', ProjectThesisController.createProjectThesisIntoDB)
router.get('/', ProjectThesisController.getAllProjectThesesFromDB)
router.get('/:id', ProjectThesisController.getSingleProjectThesisFromDB)
router.get('/student/:studentId', ProjectThesisController.getSingleStudentProjectThesisFromDB)
router.get('/supervisor/:supervisorId', ProjectThesisController.getSingleSupervisorProjectThesisFromDB)
router.patch('/:id', ProjectThesisController.updateProjectThesisInDB)
router.patch('/approve-project-thesis/:id', ProjectThesisController.approveProjectThesis)
router.patch('/reject-project-thesis/:id', ProjectThesisController.rejectProjectThesis)
router.patch('/start-project-thesis/:id', ProjectThesisController.startProjectThesisInDB)
router.patch('/complete-project-thesis/:id', ProjectThesisController.completeProjectThesisInDB)


export const ProjectThesisRoutes = router;