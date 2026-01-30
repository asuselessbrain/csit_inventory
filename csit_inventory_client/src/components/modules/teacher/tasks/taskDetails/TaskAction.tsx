"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, RefreshCcw, XCircle } from "lucide-react";
import {
  allowResubmission,
  completeTask,
  rejectTask,
} from "../TaskAcceptRejectResubmit";

export default function TaskAction({ id }: { id: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button
          onClick={() => completeTask(id)}
          className="flex items-center gap-2 cursor-pointer disabled:cursor-no-drop w-full"
        >
          <CheckCircle className="h-4 w-4" />
          Mark as Done
        </Button>

        <Button
          onClick={() => rejectTask(id)}
          variant="destructive"
          className="flex items-center gap-2 cursor-pointer disabled:cursor-no-drop w-full"
        >
          <XCircle className="h-4 w-4" />
          Mark as Failed
        </Button>
        <Button
          variant="outline"
          onClick={() => allowResubmission(id)}
          className="flex items-center gap-2 cursor-pointer disabled:cursor-no-drop w-full"
        >
          <RefreshCcw className="h-4 w-4" />
          Allow Resubmit
        </Button>
      </CardContent>
    </Card>
  );
}
