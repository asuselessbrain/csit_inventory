import express, {Application, Response, Request} from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();


app.use(express.json());

app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', UserRoutes);


app.get("/", (req :Request, res: Response)=> {
    res.status(200).json({
        message: "CSIT Inventory Server is Running",
        DevelopBy: "Arfan Ahmed",
        version: "1.0.0",
    });
})


export default app;