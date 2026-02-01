"use client";
import { Button } from "@/components/ui/button";
import { Check, CircleSlash, Eye } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TeacherReviewTaskForm from "./TeacherReviewTaskForm";

export default function TaskAction({
  taskId,
  submittedTaskID,
}: {
  taskId: string;
  submittedTaskID: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2 cursor-pointer disabled:cursor-no-drop">
            <Check className="h-4 w-4" />
            Mark as Done
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
            variant="destructive"
            className="flex items-center gap-2 cursor-pointer disabled:cursor-no-drop"
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
          className="flex items-center gap-2 cursor-pointer disabled:cursor-no-drop"
        >
          <Eye className="h-4 w-4" />
          View Submission
        </Button>
      </Link>
    </div>
  );
}
