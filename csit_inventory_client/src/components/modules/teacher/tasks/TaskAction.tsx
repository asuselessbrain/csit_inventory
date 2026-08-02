"use client";
import { Button } from "@/components/ui/button";
import { Check, CircleSlash, Eye } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TeacherReviewTaskForm from "./TeacherReviewTaskForm";

export default function TaskAction({
  taskId,
  submittedTaskID,
  status,
}: {
  taskId: string;
  submittedTaskID: string;
  status?: string;
}) {
  const isDone = status === "DONE";

  return (
    <div className="flex flex-wrap gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={isDone} className="flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed">
            <Check className="h-4 w-4" />
            {isDone ? "Task Completed" : "Mark as Done"}
          </Button>
        </DialogTrigger>
        <TeacherReviewTaskForm
          id={taskId}
          submissionTask={submittedTaskID}
          for="done"
        />
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            disabled={isDone}
            variant="destructive"
            className="flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            <CircleSlash className="h-4 w-4" />
            Reject & Add Note
          </Button>
        </DialogTrigger>
        <TeacherReviewTaskForm
          id={taskId}
          submissionTask={submittedTaskID}
          for="reject"
        />
      </Dialog>

      <Link href={`/teacher/task-to-review/${taskId}`}>
        <Button
          variant="outline"
          className="flex items-center gap-2 cursor-pointer font-semibold border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-blue-600 dark:text-blue-400 disabled:cursor-no-drop"
        >
          <Eye className="h-4 w-4" />
          View Task Details
        </Button>
      </Link>
    </div>
  );
}
