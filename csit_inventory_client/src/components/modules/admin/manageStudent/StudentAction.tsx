"use client";
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
import { CheckCircle, Edit, RotateCcw, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export const handleApproveStudent = async (studentId: string) => {
  const res = await approveStudent(studentId);

  if (res.success) {
    toast.success(res.message || "Student approved successfully");
  } else {
    toast.error(res.errorMessage || "Failed to approve student");
  }
};

export const handleDeleteStudent = async (studentId: string) => {
  const res = await deleteStudent(studentId);

  if (res.success) {
    toast.success(res.message || "Student deleted successfully");
  } else {
    toast.error(res.errorMessage || "Failed to delete student");
  }
};

export const handleReactivateStudent = async (studentId: string) => {
  const res = await reactivateStudent(studentId);

  if (res.success) {
    toast.success(res.message || "Account reactivation successful");
  } else {
    toast.error(res.errorMessage || "Account reactivation fail");
  }
};

export default function StudentAction({
  isApproved,
  studentId,
  isDeleted,
}: {
  isApproved: boolean;
  studentId: string;
  isDeleted: boolean;
}) {
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <Link href={`/admin/manage-students/${studentId}`}>
        <DropdownMenuItem>View details</DropdownMenuItem>
      </Link>
      <DropdownMenuItem>
        <Edit className="mr-2 h-4 w-4" />
        Edit student
      </DropdownMenuItem>
      {!isApproved && (
        <DropdownMenuItem onClick={() => handleApproveStudent(studentId)}>
          <CheckCircle className="mr-2 h-4 w-4" />
          Approve student
        </DropdownMenuItem>
      )}
      <DropdownMenuSeparator />
      {isDeleted ? (
        <DropdownMenuItem
          onClick={() => handleReactivateStudent(studentId)}
          className="text-green-600"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reactivate Account
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem
          onClick={() => handleDeleteStudent(studentId)}
          className="text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Student
        </DropdownMenuItem>
      )}
    </DropdownMenuContent>
  );
}
