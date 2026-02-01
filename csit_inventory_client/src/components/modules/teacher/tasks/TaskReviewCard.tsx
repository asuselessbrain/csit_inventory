import { formatDate } from "@/components/shared/ReusableFunction";
import { ITask } from "@/types";
import TaskAction from "./TaskAction";

export default function TaskReviewCard({ task }: { task: ITask }) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white p-4 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-3">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          {task.title}
        </h3>

        <span className="w-fit inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-700">
          {task.status}
        </span>
      </div>

      {/* Student */}
      <p className="text-sm text-gray-700 mb-1">
        Student:{" "}
        <span className="font-medium wrap-break-words">
          {task.projectThesis?.student?.name}{" "}
          {task.projectThesis?.student?.studentId && (
            <span className="text-gray-500">
              ({task.projectThesis.student.studentId})
            </span>
          )}
        </span>
      </p>

      {/* Project */}
      <p className="text-sm text-gray-700 mb-2">
        Project:{" "}
        <span className="font-medium wrap-break-words">
          {task.projectThesis?.projectTitle}
        </span>
      </p>

      {/* Dates */}
      <p className="text-xs sm:text-sm text-gray-600 mb-4">
        Submitted: {formatDate(task.updatedAt)}
        <span className="mx-1">•</span>
        Due: {formatDate(task.dueDate)}
      </p>

      {/* Action */}
      <div className="flex justify-start">
        <TaskAction taskId={task.id} submittedTaskID={task.projectThesisUpdateLogs?.[task.projectThesisUpdateLogs.length - 1]?.id || ""} />
      </div>
    </div>
  );
}
