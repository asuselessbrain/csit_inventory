import { Request, Response } from "express";
import { StudentService } from "./student.service";

const getAllStudentFromDB = async(req: Request, res: Response) => {
    const query  =req.query;
    const result = await StudentService.getAllStudentFromDB(query);
    res.status(200).json({
        success: true,
        message: "Student retrieved successfully",
        data: result
    });
}

export const StudentController = {
    getAllStudentFromDB
}