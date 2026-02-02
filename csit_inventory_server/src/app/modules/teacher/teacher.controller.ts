import { Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/responser";
import { TeacherService } from "./teacher.service";
import { generatePdf } from "../../../shared/pdfService";

const getAllTeacherFromDB = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await TeacherService.getAllTeacherFromDB(query);
  sendResponse(res, 200, "Teachers retrieved successfully", result);
});

const getAllTeacherForCourseAssign = catchAsync(
  async (req: Request, res: Response) => {
    const result = await TeacherService.getAllTeacherForAssignCourse();
    sendResponse(res, 200, "Teachers retrieved successfully", result);
  },
);

const getSingleTeacherFromDB = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id!;
    const result = await TeacherService.getSingleTeacherFromDB(id as string);
    sendResponse(res, 200, "Teacher retrieved successfully", result);
  },
);

const updateTeacherIntoDB = catchAsync(async (req: Request, res: Response) => {
  const teacherId = req.params.id!;
  const updateData = req.body;
  const result = await TeacherService.updateTeacherIntoDB(
    teacherId as string,
    updateData,
  );
  sendResponse(res, 200, "Teacher updated successfully", result);
});

const deleteTeacherFromDB = catchAsync(async (req: Request, res: Response) => {
  const teacherId = req.params.id!;
  const result = await TeacherService.deleteTeacherFromDB(teacherId as string);
  sendResponse(res, 200, "Teacher deleted successfully", result);
});

const reActivateTeacherInDB = catchAsync(
  async (req: Request, res: Response) => {
    const teacherId = req.params.id;
    const result = await TeacherService.reActivateTeacherInDB(
      teacherId as string,
    );
    sendResponse(res, 200, "Teacher re-activated successfully", result);
  },
);

const generateAllTeachersReport = catchAsync(
  async (req: Request, res: Response) => {
    // 1. Fetch data from the service (Pass query params for filtering/pagination)
    // Note: Ensure TeacherService.getAllTeachers returns { data: [], meta: {} }
    const result = await TeacherService.generateReportForTeacher(req.query);

    // 2. Prepare context for the Handlebars template
    const pdfContext = {
      generatedDate: new Date().toLocaleDateString(),
      teachers: result.data,
      meta: result.meta,
    };

    // 3. Generate PDF Buffer using the new template
    const pdfBuffer = await generatePdf(
      "all-teachers-report.hbs",
      pdfContext,
    );

    // 4. Send the PDF file to the client
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="all-teachers-report.pdf"`,
      "Content-Length": pdfBuffer.length,
      "Cache-Control": "no-cache",
    });

    res.end(pdfBuffer);
  }
);

export const TeacherController = {
  getAllTeacherFromDB,
  updateTeacherIntoDB,
  getSingleTeacherFromDB,
  deleteTeacherFromDB,
  getAllTeacherForCourseAssign,
  reActivateTeacherInDB,
  generateAllTeachersReport
};
