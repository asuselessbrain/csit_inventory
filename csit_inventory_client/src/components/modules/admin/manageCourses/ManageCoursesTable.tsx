"use client";

import { useState } from "react";
import { Trash2, Eye, Edit, Undo, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ViewCourseDetails from "./ViewCourseDetails";
import {
  courseMoveToTrash,
  courseReActivate,
  getSingleCourse,
} from "@/services/courseService";
import UpdateCourse from "./UpdateCourse";
import PaginationComponent from "@/components/shared/PaginationComponent";
import AssignCourseTeacher from "./AssignCourseTeacher";
import { ICourse, Meta } from "@/types";
import ReusableSearch from "@/components/shared/ReusableSearch";
import { getSemesterFormate } from "@/components/shared/SemesterFormate";

interface ManageCoursesTableProps {
  courses: {
    meta: Meta;
    data: ICourse[];
  };
}

export default function ManageCoursesTable({
  courses,
}: ManageCoursesTableProps) {
  const [singleCourse, setSingleCourse] = useState<ICourse | null>(null);

  const courseDetails = "courseDetails";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100";
      case "ARCHIVED":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  const viewCourseDetails = async (courseId: string) => {
    const course = await getSingleCourse(courseId);
    if (course?.success) {
      setSingleCourse(course?.data);
    }
  };

  const moveToTrash = async (courseId: string) => {
    const course = await courseMoveToTrash(courseId);

    if (course?.success) {
      toast.success(course?.message || "Course moved to trash successfully", {
        id: courseDetails,
      });
    } else {
      toast.error(course?.errorMessage || "Failed to move course to trash", {
        id: courseDetails,
      });
    }
  };

  const reActivate = async (courseId: string) => {
    const res = await courseReActivate(courseId);

    console.log(res);
    if (res?.success) {
      toast.success(res?.message || "Course reactivated successfully", {
        id: courseDetails,
      });
    } else {
      toast.error(res?.errorMessage || "Failed to reactivate course", {
        id: courseDetails,
      });
    }
  };
  return (
    <>
      <div>
        <ReusableSearch placeholder="Search courses..." />
      </div>
      <div className="rounded-lg border bg-white shadow-sm my-8">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-700">
                Course Code
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Course Title
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Credits
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Semester
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Status
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses?.data && courses?.data.length > 0 ? (
              courses?.data.map((course) => (
                <TableRow
                  key={course.id}
                  className="border-b transition-colors hover:bg-gray-50"
                >
                  <TableCell className="font-medium text-gray-900">
                    {course.courseCode}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {course.courseName}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {course.credits}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {getSemesterFormate(course.semester)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getStatusColor(course.status)} border-0 font-medium`}
                    >
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => viewCourseDetails(course.id)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700"
                            title="View course details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <ViewCourseDetails course={singleCourse} />
                      </Dialog>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => viewCourseDetails(course.id)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="Edit course"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <UpdateCourse course={singleCourse} />
                      </Dialog>

                      {course.status === "ACTIVE" ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                          onClick={() => moveToTrash(course.id)}
                          title="Delete course"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                          onClick={() => reActivate(course.id)}
                          title="Reactivate course"
                        >
                          <Undo className="h-4 w-4" />
                        </Button>
                      )}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => viewCourseDetails(course.id)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700"
                            title="Assign Course Teacher"
                          >
                            <UserPlus className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <AssignCourseTeacher course={singleCourse} />
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center">
                  <div className="text-gray-500">
                    <p className="text-lg font-medium">No courses found</p>
                    <p className="text-sm">
                      Create your first course to get started
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div>
        <PaginationComponent totalPage={courses?.meta?.totalPages} />
      </div>
    </>
  );
}
