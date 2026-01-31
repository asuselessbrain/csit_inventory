import TaskReviewCard from "@/components/modules/teacher/tasks/TaskReviewCard";
import PaginationComponent from "@/components/shared/PaginationComponent";
import ReusableSearch from "@/components/shared/ReusableSearch";
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
      <div className="mx-auto max-w-360">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Tasks to Review
          </h1>
          <p className="mt-1 text-gray-600">
            Review and manage student task submissions
          </p>
        </div>

        <div className="mb-6">
          <ReusableSearch placeholder="Search tasks to review..." />
        </div>

        <div className="space-y-4">
          {tasks.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {tasks.map((task: ITask) => (
                <TaskReviewCard key={task.id} task={task} />
              ))}
            </div>
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

        <div className="mt-12">
          <PaginationComponent totalPage={res.data.meta.totalPages} />
        </div>
      </div>
    </div>
  );
}
