import { getAllTaskForStudent } from "@/services/taskService";
import TaskCard from "@/components/modules/student/task/TaskCard";
import { ICourse, ITask, SortOption } from "@/types";
import PaginationComponent from "@/components/shared/PaginationComponent";
import ReusableSearch from "@/components/shared/ReusableSearch";
import ReusableSorting from "@/components/shared/ReusableSorting";
import UnifiedFilter from "@/components/shared/UnifiedFilter";
export default async function MyTasksPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    sortBy?: string;
    courseId?: string;
    type?: string;
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
    "projectThesis.courseId": params.courseId,
    "projectThesis.type": params.type,
    take: limit,
  };
  const res = await getAllTaskForStudent(queryParams);
  const tasks = res?.data?.data || [];

  const sortOptions: SortOption[] = [
    { label: "Name (A → Z)", value: "title-asc" },
    { label: "Name (Z → A)", value: "title-desc" },
    { label: "Oldest first", value: "createdAt-asc" },
    { label: "Newest first", value: "createdAt-desc" },
    { label: "Due Soon", value: "dueDate-asc" },
    { label: "Due Later", value: "dueDate-desc" },
  ];

  return (
    <div className="min-h-screen p-3 sm:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            My Tasks
          </h1>
          <p className="mt-1 text-sm sm:text-base text-gray-600">
            View and manage your assigned tasks
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-start gap-3 sm:gap-4">
          <ReusableSearch placeholder="Search tasks..." />

          <UnifiedFilter
            filters={[
              {
                title: "Status",
                queryKey: "status",
                options: [
                  { id: "TODO", name: "To Do" },
                  { id: "IN_PROGRESS", name: "In Progress" },
                  { id: "REVIEW", name: "Review" },
                  { id: "DONE", name: "Completed" },
                  { id: "FAILED", name: "Failed" },
                ],
              },
              {
                title: "Type",
                queryKey: "type",
                options: [
                  { id: "PROJECT", name: "Project" },
                  { id: "THESIS", name: "Thesis" },
                ],
              },
            ]}
          />
          <ReusableSorting options={sortOptions} />
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
