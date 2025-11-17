import { Request, Response } from "express";
import { StudentService } from "./student.service";

const createStudentIntoDB = async(req: Request, res: Response) => {
    const studentData = req.body;
    const result = await StudentService.createStudentIntoDB(studentData);
    res.status(201).json({
        success: true,
        message: "Student created successfully",
        data: result
    });
}

export const StudentController = {
    createStudentIntoDB
}