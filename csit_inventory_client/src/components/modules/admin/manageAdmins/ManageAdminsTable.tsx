import { Trash2, Edit, Undo } from "lucide-react";
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
import { IAdmin, Meta, SortOption } from "@/types";
import ReusableSearch from "@/components/shared/ReusableSearch";
import Image from "next/image";
import { formatDate } from "@/components/shared/ReusableFunction";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AdminModal from "./CreateUpdateAdmin";
import ReusableSorting from "@/components/shared/ReusableSorting";

interface ManageAdminsTableProps {
  admins: {
    meta: Meta;
    data: IAdmin[];
  };
}

export default function ManageAdminsTable({ admins }: ManageAdminsTableProps) {
  const getStatusColor = (isDeleted: boolean) => {
    return isDeleted
      ? "bg-red-100 text-red-800 hover:bg-red-100"
      : "bg-emerald-100 text-emerald-800 hover:bg-emerald-100";
  };
  const sortOptions: SortOption[] = [
    { label: "Name (A → Z)", value: "name-asc" },
    { label: "Name (Z → A)", value: "name-desc" },
    { label: "Oldest first", value: "createdAt-asc" },
    { label: "Newest first", value: "createdAt-desc" },
  ];

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <ReusableSearch placeholder="Search admins..." />
        <ReusableSorting options={sortOptions} />
      </div>
      <div className="rounded-lg border bg-white shadow-sm my-8">
        <Table>
          <TableHeader>
            <TableRow className="border-b bg-gray-50 hover:bg-gray-50">
              <TableHead className="font-semibold text-gray-700">
                Admin
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Email
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Phone
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Status
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Created
              </TableHead>
              <TableHead className="text-right font-semibold text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {admins?.data && admins?.data.length > 0 ? (
              admins?.data.map((admin) => (
                <TableRow
                  key={admin.id}
                  className="border-b transition-colors hover:bg-gray-50"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {admin.photoUrl ? (
                        <Image
                          src={admin.photoUrl}
                          alt={admin.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {admin.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {admin.name}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-700">{admin.email}</TableCell>
                  <TableCell className="text-gray-700">
                    {admin.phoneNumber}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getStatusColor(admin.isDeleted)} border-0 font-medium`}
                    >
                      {admin.isDeleted ? "Deleted" : "Active"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700 text-sm">
                    {formatDate(admin.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title="Edit admin"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <AdminModal admin={admin} />
                      </Dialog>

                      {!admin.isDeleted ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                          title="Delete admin"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                          title="Restore admin"
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
                <TableCell colSpan={6} className="py-8 text-center">
                  <div className="text-gray-500">
                    <p className="text-lg font-medium">No admins found</p>
                    <p className="text-sm">
                      Create your first admin to get started
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div>
        <PaginationComponent totalPage={admins?.meta?.totalPages} />
      </div>
    </>
  );
}
