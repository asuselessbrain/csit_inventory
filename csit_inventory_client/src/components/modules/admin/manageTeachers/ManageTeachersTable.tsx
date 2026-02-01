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
import { ITeacher, Meta, SortOption } from "@/types";
import ReusableSearch from "@/components/shared/ReusableSearch";
import {
  getDepartmentFormat,
  getDesignationFormat,
} from "@/components/shared/formatter";
import ManageTeacherAction from "./ManageTeacherAction";
import ReusableSorting from "@/components/shared/ReusableSorting";
import ReusableFilter from "@/components/shared/ReusableFilter";

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

  const sortOptions: SortOption[] = [
    { label: "Name (A → Z)", value: "name-asc" },
    { label: "Name (Z → A)", value: "name-desc" },
    { label: "Oldest first", value: "createdAt-asc" },
    { label: "Newest first", value: "createdAt-desc" },
  ];

  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <ReusableSearch placeholder="Search teachers..." />
        <ReusableFilter options={[{_id: "LECTURER", name: "Lecturer"}, {_id: "ASSISTANT_PROFESSOR", name: "Assistant Professor"}, {_id: "ASSOCIATE_PROFESSOR", name: "Associate Professor"}, {_id: "PROFESSOR", name: "Professor"}]} queryKey="designation" placeholder="Filter by designation" />
        <ReusableFilter options={[{_id: "Computer_Science_And_Information_Technology", name: "Computer Science And Information Technology"}, {_id: "Computer_science_And_Communication_Engineering", name: "Computer Science And Communication Engineering"}, {_id: "Electrical_And_Electronic_Engineering", name: "Electrical And Electronic Engineering"}, {_id: "Physics_And_Mechanical_Engineering", name: "Physics and Mechanical Engineering"}, {_id: "Mathematics", name: "Mathematics"}]} queryKey="department" placeholder="Filter by department" />
        <ReusableFilter options={[{_id: "ACTIVE", name: "Active"}, {_id: "STUDY_LEAVE", name: "Study Leave"}, {_id: "RETIRED", name: "Retired"}]} queryKey="status" placeholder="Filter by status" />
        <ReusableSorting options={sortOptions} />
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
                    <ManageTeacherAction teacher={teacher} />
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
