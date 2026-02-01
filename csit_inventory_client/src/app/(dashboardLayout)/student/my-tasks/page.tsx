import { getAllTaskForStudent } from "@/services/taskService";
import TaskCard from "@/components/modules/student/task/TaskCard";
import { ICourse, ITask, SortOption } from "@/types";
import PaginationComponent from "@/components/shared/PaginationComponent";
import ReusableSearch from "@/components/shared/ReusableSearch";
import ReusableSorting from "@/components/shared/ReusableSorting";
import ReusableFilter from "@/components/shared/ReusableFilter";
import { getCourseForProjectThesis } from "@/services/courseService";

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
  const activeCourses = await getCourseForProjectThesis();

  const sortOptions: SortOption[] = [
    { label: "Name (A → Z)", value: "title-asc" },
    { label: "Name (Z → A)", value: "title-desc" },
    { label: "Oldest first", value: "createdAt-asc" },
    { label: "Newest first", value: "createdAt-desc" },
    { label: "Due Soon", value: "dueDate-asc" },
    { label: "Due Later", value: "dueDate-desc" },
  ];

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

        <div className="mb-6 flex items-center justify-between gap-6">
          <ReusableSearch placeholder="Search tasks..." />
          <ReusableFilter
            options={
              activeCourses.data?.map((course: ICourse) => ({
                id: course.id,
                name: `${course.courseCode}-${course.courseName}`,
              })) || []
            }
            queryKey="courseId"
            placeholder="Filter by course"
          />
          <ReusableFilter
            options={[
              { id: "TODO", name: "To Do" },
              { id: "IN_PROGRESS", name: "In Progress" },
              { id: "REVIEW", name: "Review" },
              { id: "DONE", name: "Completed" },
              { id: "FAILED", name: "Failed" },
            ]}
            queryKey="status"
            placeholder="Filter by status"
          />
          <ReusableFilter
            options={[
              { id: "PROJECT", name: "Project" },
              { id: "THESIS", name: "Thesis" },
            ]}
            queryKey="type"
            placeholder="Filter by type"
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
