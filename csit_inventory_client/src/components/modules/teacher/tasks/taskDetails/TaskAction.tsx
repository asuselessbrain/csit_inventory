"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Check,
  CircleSlash,
  RefreshCcw,
} from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TeacherReviewTaskForm from "../TeacherReviewTaskForm";

export default function TaskAction({
  id,
  submittedTaskID,
}: {
  id: string;
  submittedTaskID: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 cursor-pointer disabled:cursor-no-drop w-full">
              <Check className="h-4 w-4" />
              Mark as Done
            </Button>
          </DialogTrigger>
          <TeacherReviewTaskForm
            id={id}
            submissionTask={submittedTaskID}
            for="done"
          />
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className="flex items-center gap-2 cursor-pointer disabled:cursor-no-drop w-full"
            >
              <CircleSlash className="h-4 w-4" />
              Mark as Failed & Add Note
            </Button>
          </DialogTrigger>
          <TeacherReviewTaskForm
            id={id}
            submissionTask={submittedTaskID}
            for="reject"
          />
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 cursor-pointer disabled:cursor-no-drop w-full"
            >
              <RefreshCcw className="h-4 w-4" />
              Allow Resubmit
            </Button>
          </DialogTrigger>
          <TeacherReviewTaskForm
            id={id}
            submissionTask={submittedTaskID}
            for="resubmit"
          />
        </Dialog>
      </CardContent>
    </Card>
  );
}
