import { toastId } from "@/components/shared/toastId";
import {
  allowStudentResubmit,
  markAsDone,
  rejectTasks,
} from "@/services/taskService";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const completeTask = async (taskId: string, data: FieldValues) => {
  const res = await markAsDone(taskId, data);

  if (res.success) {
    toast.success(res.message || "Task marked as done", {
      id: toastId,
    });
  } else {
    toast.error(res.errorMessage || "Failed to mark task as done", {
      id: toastId,
    });
  }
};

export const rejectTask = async (taskId: string, data: FieldValues) => {
  const res = await rejectTasks(taskId, data);

  if (res.success) {
    toast.success(res.message || "Task rejected successfully", {
      id: toastId,
    });
  } else {
    toast.error(res.errorMessage || "Failed to reject task", {
      id: toastId,
    });
  }
};

export const allowResubmission = async (taskId: string, data: FieldValues) => {
  const res = await allowStudentResubmit(taskId, data);

  if (res.success) {
    toast.success(
      res.message || "Student is now allowed to resubmit this task.",
      {
        id: toastId,
      },
    );
  } else {
    toast.error(
      res.errorMessage || "Unable to allow resubmission. Please try again.",
      {
        id: toastId,
      },
    );
  }
};
