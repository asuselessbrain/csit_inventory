import { getStudents } from "@/services/stuentService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StudentAction from "@/components/modules/admin/manageStudent/StudentAction";
import { IStudent, SortOption } from "@/types";
import PaginationComponent from "@/components/shared/PaginationComponent";
import ReusableSearch from "@/components/shared/ReusableSearch";
import ReusableSorting from "@/components/shared/ReusableSorting";
import ReusableFilter from "@/components/shared/ReusableFilter";

export default async function ManageUsersPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    sortBy?: string;
    session?: string;
    isApproved?: string;
    sortOrder?: "asc" | "desc";
  }>;
}) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const limit = 10;

  const queryParams = {
    skip: page - 1,
    searchTerm: params.search,
    status: params.status,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    session: params.session,
    isApproved: params.isApproved,
    take: limit,
  };

  const res = await getStudents(queryParams);

  const students: IStudent[] = res?.data?.data || [];

  const sortOptions: SortOption[] = [
    { label: "Name (A → Z)", value: "name-asc" },
    { label: "Name (Z → A)", value: "name-desc" },
    { label: "Oldest first", value: "createdAt-asc" },
    { label: "Newest first", value: "createdAt-desc" },
  ];

  return (
    <div className="max-w-360 w-full mx-auto py-6 space-y-6">
      <CardHeader>
        <CardTitle>Manage Students</CardTitle>
        <CardDescription>
          View and manage all registered students in the system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center justify-between gap-6">
          <ReusableSearch placeholder="Search students..." />
          <ReusableFilter
            options={[
              { id: "2020-21", name: "2020-21" },
              { id: "2021-22", name: "2021-22" },
              { id: "2022-23", name: "2022-23" },
              { id: "2023-24", name: "2023-24" },
            ]}
            queryKey="session"
            placeholder="Filter by session"
          />
          <ReusableFilter
            options={[
              { id: "ACTIVE", name: "Active" },
              { id: "INACTIVE", name: "Inactive" },
              { id: "GRADUATED", name: "Graduated" },
            ]}
            queryKey="status"
            placeholder="Filter by status"
          />
          <ReusableFilter
            options={[
              { id: "true", name: "Approved" },
              { id: "false", name: "Pending" },
            ]}
            queryKey="isApproved"
            placeholder="Filter by approval"
          />
          <ReusableSorting options={sortOptions} />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Student ID</TableHead>
                <TableHead>Registration No.</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Approval</TableHead>
                <TableHead>Account Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No students found
                  </TableCell>
                </TableRow>
              ) : (
                students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={student.profilePhoto}
                            alt={student.name}
                          />
                          <AvatarFallback>
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">
                        {student.studentId}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">
                        {student.registrationNumber}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{student.phoneNumber}</div>
                        <div className="text-xs text-muted-foreground">
                          {student.address}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{student.session}</span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          student.status === "ACTIVE"
                            ? "default"
                            : student.status === "INACTIVE"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {student.isApproved ? (
                        <Badge variant="default" className="bg-green-500">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Approved
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <XCircle className="mr-1 h-3 w-3" />
                          Pending
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {student.isDeleted ? (
                        <Badge variant="destructive" className="text-white">
                          Deleted
                        </Badge>
                      ) : (
                        <Badge variant="default">Active</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <StudentAction student={student} />
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-12">
          <PaginationComponent totalPage={res?.data?.meta?.totalPages} />
        </div>
      </CardContent>
    </div>
  );
}
