import { getAllTaskForStudent } from "@/services/taskService";
import TaskCard from "@/components/modules/student/task/TaskCard";
import { ITask } from "@/types";
import PaginationComponent from "@/components/shared/PaginationComponent";
import ReusableSearch from "@/components/shared/ReusableSearch";

export default async function MyTasksPage({
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
  const res = await getAllTaskForStudent(queryParams);
  const tasks = res?.data?.data || [];

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            My Tasks
          </h1>
          <p className="mt-1 text-gray-600">
            View and manage your assigned tasks
          </p>
        </div>

        <div className="mb-6">
          <ReusableSearch placeholder="Search tasks..." />
        </div>
        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.length > 0 ? (
            tasks.map((task: ITask) => <TaskCard key={task.id} task={task} />)
          ) : (
            <div className="rounded-lg border bg-white p-12 text-center shadow-sm">
              <div className="text-gray-500">
                <p className="text-lg font-medium">No tasks found</p>
                <p className="text-sm">
                  You don&rsquo;t have any tasks assigned yet
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12">
          <PaginationComponent totalPage={res?.data?.meta?.totalPages} />
        </div>
      </div>
    </div>
  );
}
