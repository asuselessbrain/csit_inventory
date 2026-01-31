"use client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  approveStudent,
  deleteStudent,
  reactivateStudent,
} from "@/services/stuentService";
import { CheckCircle, Edit, Eye, RotateCcw, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import UpdateStudent from "./UpdateStudent";
import { IStudent } from "@/types";
import { toastId } from "@/components/shared/toastId";

export const handleApproveStudent = async (studentId: string) => {
  const res = await approveStudent(studentId);

  if (res.success) {
    toast.success(res.message || "Student approved successfully", {
      id: toastId,
    });
  } else {
    toast.error(res.errorMessage || "Failed to approve student", {
      id: toastId,
    });
  }
};

export const handleDeleteStudent = async (studentId: string) => {
  const res = await deleteStudent(studentId);

  if (res.success) {
    toast.success(res.message || "Student deleted successfully", {
      id: toastId,
    });
  } else {
    toast.error(res.errorMessage || "Failed to delete student", {
      id: toastId,
    });
  }
};

export const handleReactivateStudent = async (studentId: string) => {
  const res = await reactivateStudent(studentId);

  if (res.success) {
    toast.success(res.message || "Account reactivation successful", {
      id: toastId,
    });
  } else {
    toast.error(res.errorMessage || "Account reactivation fail", {
      id: toastId,
    });
  }
};

export default function StudentAction({ student }: { student: IStudent }) {
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <Link href={`/admin/manage-students/${student.id}`}>
        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4" /> View details
        </DropdownMenuItem>
      </Link>
      <Dialog>
        <DialogTrigger asChild>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <Edit className="mr-2 h-4 w-4" />
            Edit student
          </DropdownMenuItem>
        </DialogTrigger>
        <UpdateStudent student={student} />
      </Dialog>
      {!student.isApproved && (
        <DropdownMenuItem onClick={() => handleApproveStudent(student.id)}>
          <CheckCircle className="mr-2 h-4 w-4" />
          Approve student
        </DropdownMenuItem>
      )}
      <DropdownMenuSeparator />
      {student.isDeleted ? (
        <DropdownMenuItem
          onClick={() => handleReactivateStudent(student.id)}
          className="text-green-600"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reactivate Account
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem
          onClick={() => handleDeleteStudent(student.id)}
          className="text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Student
        </DropdownMenuItem>
      )}
    </DropdownMenuContent>
  );
}
