import TaskReviewCard from "@/components/modules/teacher/tasks/TaskReviewCard";
import PaginationComponent from "@/components/shared/PaginationComponent";
import ReusableFilter from "@/components/shared/ReusableFilter";
import ReusableSearch from "@/components/shared/ReusableSearch";
import ReusableSorting from "@/components/shared/ReusableSorting";
import { getCourseForProjectThesis } from "@/services/courseService";
import { getAllTaskForTeacherReview } from "@/services/taskService";
import { ICourse, ITask, SortOption } from "@/types";

export default async function TaskToReviewPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    sortBy?: string;
    courseId?: string;
    session?: string;
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
    "projectThesis.student.session": params.session,
    "projectThesis.type": params.type,
    take: limit,
  };

  const res = await getAllTaskForTeacherReview(queryParams);
  const tasks = res?.data?.data || [];
  const activeCourses = await getCourseForProjectThesis();

  const sortOptions: SortOption[] = [
    { label: "Name (A → Z)", value: "title-asc" },
    { label: "Name (Z → A)", value: "title-desc" },
    { label: "Oldest first", value: "updatedAt-asc" },
    { label: "Newest first", value: "updatedAt-desc" },
  ];

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

        <div className="mb-6 flex items-center justify-between gap-6">
          <ReusableSearch placeholder="Search tasks to review..." />
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
              { id: "2020-21", name: "2020-21" },
              { id: "2021-22", name: "2021-22" },
              { id: "2022-23", name: "2022-23" },
              { id: "2023-24", name: "2023-24" },
            ]}
            queryKey="session"
            placeholder="Filter by session"
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
