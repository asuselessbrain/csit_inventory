"use client"
import { Button } from "@/components/ui/button";
import { Check, CircleSlash, Eye } from "lucide-react";
import Link from "next/link";
import { completeTask, rejectTask } from "./TaskAcceptRejectResubmit";

export default function TaskAction({ taskId }: { taskId: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onClick={() => completeTask(taskId)}
        className="flex items-center gap-2 cursor-pointer disabled:cursor-no-drop"
      >
        <Check className="h-4 w-4" />
        Mark as Done
      </Button>

      <Button
        onClick={() => rejectTask(taskId)}
        variant="destructive"
        className="flex items-center gap-2 cursor-pointer disabled:cursor-no-drop"
      >
        <CircleSlash className="h-4 w-4" />
        Reject & Add Note
      </Button>

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
