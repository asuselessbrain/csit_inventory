import express, {Application, Response, Request} from 'express';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();


app.use(express.json());

app.use('/api/v1', StudentRoutes);
app.use('/api/v1', UserRoutes);


app.get("/", (req :Request, res: Response)=> {
    res.send("Hello, World!");
})


export default app;