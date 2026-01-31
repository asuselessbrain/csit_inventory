"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ITeacher } from "@/types";
import { Edit, Eye, Trash2, Undo } from "lucide-react";
import Link from "next/link";
import UpdateTeacher from "./UpdateTeacher";
import { deleteTeacher, reactivateTeacher } from "@/services/teacherService";
import { toast } from "sonner";
import { toastId } from "@/components/shared/toastId";

export default function ManageTeacherAction({
  teacher,
}: {
  teacher: ITeacher;
}) {
  const handleDeleteTeacher = async (teacherId: string) => {
    const res = await deleteTeacher(teacherId);

    if (res.success) {
      toast.success(res.message || "Teacher deleted successfully", {
        id: toastId,
      });
    } else {
      toast.error(res.errorMessage || "Failed to delete teacher", {
        id: toastId,
      });
    }
  };

  const handleReactivateTeacher = async (teacherId: string) => {
    const res = await reactivateTeacher(teacherId);

    if (res.success) {
      toast.success(res.message || "Teacher reactivated successfully", {
        id: toastId,
      });
    } else {
      toast.error(res.errorMessage || "Failed to reactivate teacher", {
        id: toastId,
      });
    }
  };
  return (
    <div className="flex justify-end gap-2">
      <Link href={`/admin/manage-teachers/${teacher.id}`}>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-green-600 hover:bg-green-50 hover:text-green-700"
          title="View teacher details"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Edit teacher"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <UpdateTeacher teacher={teacher} />
      </Dialog>

      {!teacher.isDeleted ? (
        <Button
          onClick={() => handleDeleteTeacher(teacher.id)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
          title="Delete teacher"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          onClick={() => handleReactivateTeacher(teacher.id)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          title="Reactivate teacher"
        >
          <Undo className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
