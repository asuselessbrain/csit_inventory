import { Request, Response } from "express";
import { UserService } from "./user.service";

const createStudentIntoDB = async(req: Request, res: Response) => {
    const studentData = req.body;
    const result = await UserService.createStudentIntoDB(studentData);
    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: result
    });
}

export const UserController = {
    createStudentIntoDB
}