import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Award } from "lucide-react";
import { getMyAssignCourses } from "@/services/courseService";
import { ICourse, SortOption } from "@/types";
import PaginationComponent from "@/components/shared/PaginationComponent";
import ReusableSearch from "@/components/shared/ReusableSearch";
import { getSemesterFormate } from "@/components/shared/formatter";
import ReusableSorting from "@/components/shared/ReusableSorting";
import ReusableFilter from "@/components/shared/ReusableFilter";
import { semesterOptions } from "@/components/modules/admin/manageCourses/ManageCoursesTable";

export default async function MyAssignCoursePage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    sortBy?: string;
    department?: string;
    semester?: string;
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
    semester: params.semester,
    take: limit,
  };

  const res = await getMyAssignCourses(queryParams);

  const courses = res?.data?.data || [];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      ACTIVE: {
        label: "Active",
        color:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      },
      ARCHIVED: {
        label: "Archived",
        color:
          "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
      },
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.ACTIVE
    );
  };

  const sortOptions: SortOption[] = [
    { label: "Name (A → Z)", value: "courseName-asc" },
    { label: "Name (Z → A)", value: "courseName-desc" },
    { label: "Oldest first", value: "createdAt-asc" },
    { label: "Newest first", value: "createdAt-desc" },
    { label: "Credits (Low → High)", value: "credits-asc" },
    { label: "Credits (High → Low)", value: "credits-desc" },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-360">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            My Assigned Courses
          </h1>
          <Badge variant="outline" className="text-sm">
            {courses.length} Total Courses
          </Badge>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between gap-6">
        <ReusableSearch placeholder="Search assigned courses courseCode or title..." />
        <div className="flex items-center gap-6">
          <ReusableFilter
            options={semesterOptions}
            queryKey="semester"
            placeholder="Filter by semester"
          />
          <ReusableSorting options={sortOptions} />
        </div>
      </div>

      {/* Courses List */}
      <div className="grid lg:grid-cols-2 gap-4">
        {courses.length === 0 ? (
          <Card className="lg:col-span-2">
            <CardContent className="py-12">
              <div className="text-center">
                <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No courses found</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          courses.map((course: ICourse) => {
            const statusBadge = getStatusBadge(course.status);
            return (
              <Card
                key={course.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">
                        {course.courseName}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {course.courseCode}
                      </p>
                    </div>
                    <Badge className={statusBadge.color}>
                      {statusBadge.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Semester
                        </p>
                        <p className="font-medium text-sm">
                          {getSemesterFormate(course.semester)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Credits</p>
                        <p className="font-medium text-sm">
                          {course.credits} credits
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <div>
        <PaginationComponent totalPage={res.data.meta.totalPages} />
      </div>
    </div>
  );
}
