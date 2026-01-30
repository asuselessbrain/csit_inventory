import {
  allowStudentResubmit,
  markAsDone,
  rejectTasks,
} from "@/services/taskService";
import { toast } from "sonner";

export const completeTask = async (taskId: string) => {
  const res = await markAsDone(taskId);

  if (res.success) {
    toast.success(res.message || "Task marked as done");
  } else {
    toast.error(res.errorMessage || "Failed to mark task as done");
  }
};

export const rejectTask = async (taskId: string) => {
  const res = await rejectTasks(taskId);

  if (res.success) {
    toast.success(res.message || "Task rejected successfully");
  } else {
    toast.error(res.errorMessage || "Failed to reject task");
  }
};

export const allowResubmission = async (taskId: string) => {
  const res = await allowStudentResubmit(taskId);

  if (res.success) {
    toast.success(
      res.message || "Student is now allowed to resubmit this task.",
    );
  } else {
    toast.error(
      res.errorMessage || "Unable to allow resubmission. Please try again.",
    );
  }
};
