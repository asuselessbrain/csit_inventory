import { Request, Response } from "express";
import { StudentService } from "./student.service";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/responser";
import { generatePdf } from "../../../shared/pdfService";

const getAllStudentFromDB = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await StudentService.getAllStudentFromDB(query);
  sendResponse(res, 200, "Students retrieved successfully", result);
});

const getSingleStudentFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id!;
    const result = await StudentService.getSingleStudentFromDB(id as string);
    sendResponse(res, 200, "Student retrieved successfully", result);
  },
);

const updateStudentIntoDB = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.params.id!;
  const updateData = req.body;
  const result = await StudentService.updateStudentIntoDB(
    studentId as string,
    updateData,
  );
  sendResponse(res, 200, "Student updated successfully", result);
});

const deleteStudentFromDB = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.params.id!;
  const result = await StudentService.deleteStudentFromDB(studentId as string);
  sendResponse(res, 200, "Student deleted successfully", result);
});

const approveStudentInDB = catchAsync(async (req: Request, res: Response) => {
  const studentId = req.params.id;
  const result = await StudentService.approveStudentInDB(studentId as string);
  sendResponse(res, 200, "Student approved successfully", result);
});

const reActivateStudentInDB = catchAsync(
  async (req: Request, res: Response) => {
    const studentId = req.params.id;
    const result = await StudentService.reActivateStudentInDB(
      studentId as string,
    );
    sendResponse(res, 200, "Student re-activated successfully", result);
  },
);

const generateReportForStudent = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Fetch data from Student Service
    const result = await StudentService.generateReportForStudent(req.query);

    // 2. Prepare context for HBS
    const pdfContext = {
      generatedDate: new Date().toLocaleDateString(),
      students: result.data,
      meta: result.meta,
    };

    // 3. Generate PDF Buffer
    const pdfBuffer = await generatePdf(
      "all-students-report.hbs",
      pdfContext,
    );

    // 4. Send Response
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="all-students-report.pdf"`,
      "Content-Length": pdfBuffer.length,
      "Cache-Control": "no-cache",
    });

    res.end(pdfBuffer);
  }
);

export const StudentController = {
  getAllStudentFromDB,
  updateStudentIntoDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  approveStudentInDB,
  reActivateStudentInDB,
  generateReportForStudent,
};
