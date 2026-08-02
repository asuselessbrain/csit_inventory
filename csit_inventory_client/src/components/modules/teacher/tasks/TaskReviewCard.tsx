import { formatDate } from "@/components/shared/ReusableFunction";
import { ITask } from "@/types";
import TaskAction from "./TaskAction";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function TaskReviewCard({ task }: { task: ITask }) {
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between mb-3">
          <Link
            href={`/teacher/task-to-review/${task.id}`}
            className="group inline-flex items-center gap-1.5 text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mr-2"
          >
            <span>{task.title}</span>
            <ArrowUpRight className="w-4 h-4 text-slate-400 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
          </Link>

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
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-5">
        Submitted: {formatDate(task.updatedAt)}
        <span className="mx-2 text-slate-300 dark:text-slate-600">•</span>
        Due: {formatDate(task.dueDate)}
      </p>
      </div>

      {/* Action */}
      <div className="flex justify-start pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <TaskAction taskId={task.id} submittedTaskID={task.projectThesisUpdateLogs?.[task.projectThesisUpdateLogs.length - 1]?.id || ""} status={task.status} />
      </div>
    </div>
  );
}
