"use client";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { approveStudent } from "@/services/stuentService";
import { CheckCircle, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function StudentAction({
  isApproved,
  studentId,
}: {
  isApproved: boolean;
  studentId: string;
}) {
  const handleApproveStudent = async (studentId: string) => {
    const res = await approveStudent(studentId);

    if (res.success) {
      toast.success(res.message || "");
    } else {
      toast.error(res.errorMessage || "Failed to approve student");
    }
  };
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem>View details</DropdownMenuItem>
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
      <DropdownMenuItem className="text-destructive">
        <Trash2 className="mr-2 h-4 w-4" />
        Delete student
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
