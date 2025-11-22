import express, {Application, Response, Request} from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import { adminRouter } from './app/modules/admin/admin.route';
import { teacherRouter } from './app/modules/teacher/teacher.route';
import { ProjectThesisRoutes } from './app/modules/projectThesis/projectThesis.route';
import { TaskRoutes } from './app/modules/task/task.route';

const app: Application = express();


app.use(express.json());

app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/teachers', teacherRouter);
app.use('/api/v1/project-thesis', ProjectThesisRoutes);
app.use('/api/v1/tasks', TaskRoutes);


app.get("/", (req :Request, res: Response)=> {
    res.status(200).json({
        message: "CSIT Inventory Server is Running",
        DevelopBy: "Arfan Ahmed",
        version: "1.0.0",
    });
})


export default app;