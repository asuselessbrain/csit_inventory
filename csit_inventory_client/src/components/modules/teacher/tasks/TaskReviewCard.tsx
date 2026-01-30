import { formatDate } from "@/components/shared/ReusableFunction";
import { Button } from "@/components/ui/button";
import { ITask } from "@/types";
import { Check, CircleSlash, Eye } from "lucide-react";
import TaskAction from "./TaskAction";

export default function TaskReviewCard({ task }: { task: ITask }) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
          {task.status}
        </span>
      </div>

      <p className="text-sm text-gray-700 mb-1">
        Student:{" "}
        <span className="font-medium">
          {task.projectThesis?.student?.name} (
          {task.projectThesis?.student?.studentId})
        </span>
      </p>

      <p className="text-sm text-gray-700 mb-2">
        Project:{" "}
        <span className="font-medium">{task.projectThesis?.projectTitle}</span>
      </p>

      <p className="text-sm text-gray-600 mb-4">
        Submitted: {formatDate(task.updatedAt)} • Due:{" "}
        {formatDate(task.dueDate)}
      </p>

      <TaskAction taskId={task.id} />
    </div>
  );
}
