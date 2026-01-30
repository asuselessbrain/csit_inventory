import TaskReviewCard from "@/components/modules/teacher/tasks/TaskReviewCard";
import { getAllTaskForTeacherReview } from "@/services/taskService";
import { ITask } from "@/types";

export default async function TaskToReviewPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }>;
}) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const limit = 10;

  const queryParams = {
    skip: page - 1,
    searchTerm: params.search,
    status: params.status,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    take: limit,
  };

  const res = await getAllTaskForTeacherReview(queryParams);
  const tasks = res?.data?.data || [];

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Tasks to Review
          </h1>
          <p className="mt-1 text-gray-600">
            Review and manage student task submissions
          </p>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task: ITask) => (
              <TaskReviewCard key={task.id} task={task} />
            ))
          ) : (
            <div className="rounded-lg border bg-white p-12 text-center shadow-sm">
              <p className="text-lg font-medium text-gray-900">
                No tasks found
              </p>
              <p className="text-sm text-gray-600">
                There are no tasks available for review
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
