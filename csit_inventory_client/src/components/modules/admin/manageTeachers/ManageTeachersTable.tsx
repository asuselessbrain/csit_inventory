import { Trash2, Eye, Edit, Undo } from "lucide-react";
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
import PaginationComponent from "@/components/shared/PaginationComponent";
import { Meta } from "@/types";
import ReusableSearch from "@/components/shared/ReusableSearch";
import { getDepartmentFormat, getDesignationFormat } from "@/components/shared/formatter";

interface ITeacher {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  designation?: string;
  department?: string;
  status: string;
  isDeleted: boolean;
}

interface ManageTeachersTableProps {
  teachers: {
    meta: Meta;
    data: ITeacher[];
  };
}

export default function ManageTeachersTable({
  teachers,
}: ManageTeachersTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-100";
      case "INACTIVE":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "ARCHIVED":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <>
      <div>
        <ReusableSearch placeholder="Search teachers..." />
      </div>
      <div className="rounded-lg border bg-white shadow-sm my-8">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-700">
                Name
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Email
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Phone
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Designation
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Department
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
            {teachers?.data && teachers?.data.length > 0 ? (
              teachers?.data.map((teacher) => (
                <TableRow
                  key={teacher.id}
                  className="border-b transition-colors hover:bg-gray-50"
                >
                  <TableCell className="font-medium text-gray-900">
                    {teacher.name}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {teacher.email}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {teacher.phoneNumber || "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {getDesignationFormat(teacher.designation as string) ||
                      "N/A"}
                  </TableCell>
                  <TableCell className="text-gray-700">
                    {getDepartmentFormat(teacher.department) || "N/A"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getStatusColor(teacher.status)} border-0 font-medium`}
                    >
                      {teacher.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700"
                        title="View teacher details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        title="Edit teacher"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      {!teacher.isDeleted ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                          title="Delete teacher"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                          title="Reactivate teacher"
                        >
                          <Undo className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center">
                  <div className="text-gray-500">
                    <p className="text-lg font-medium">No teachers found</p>
                    <p className="text-sm">Add teachers to get started</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div>
        <PaginationComponent totalPage={teachers?.meta?.totalPages} />
      </div>
    </>
  );
}
