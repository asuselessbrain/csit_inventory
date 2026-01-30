import { getSingleTask } from "@/services/taskService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Upload } from "lucide-react";
import TaskProjectCourseCard from "@/components/modules/teacher/tasks/taskDetails/TaskProjectCourseCard";
import TaskRequirements from "@/components/modules/teacher/tasks/taskDetails/TaskRequirements";
import ReferenceMaterialAndAttachment from "@/components/modules/teacher/tasks/taskDetails/ReferenceMaterialAndAttachment";
import ProjectThesisMemberCard from "@/components/modules/teacher/tasks/taskDetails/ProjectThesisMemberCard";
import DateStatusIndicator from "@/components/modules/teacher/tasks/taskDetails/DateStatusIndicator";
import TaskAction from "@/components/modules/teacher/tasks/taskDetails/TaskAction";
import { IProjectThesisUpdateLog } from "@/types";

export default async function TaskToReviewDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const response = await getSingleTask(slug);
  const task = response?.data;

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground">Task not found</p>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      TODO: { label: "To Do", variant: "secondary" as const },
      IN_PROGRESS: { label: "In Progress", variant: "default" as const },
      REVIEW: { label: "Under Review", variant: "outline" as const },
      DONE: { label: "Completed", variant: "default" as const },
      FAILED: { label: "Failed", variant: "destructive" as const },
    };
    return (
      statusConfig[status as keyof typeof statusConfig] || statusConfig.TODO
    );
  };

  const getPriorityBadge = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const daysUntilDue = Math.ceil(
      (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (daysUntilDue < 0) {
      return { label: "Overdue", variant: "destructive" as const };
    } else if (daysUntilDue <= 3) {
      return { label: "High Priority", variant: "destructive" as const };
    } else if (daysUntilDue <= 7) {
      return { label: "Medium Priority", variant: "default" as const };
    }
    return null;
  };

  const statusBadge = getStatusBadge(task.status);
  const priorityBadge = getPriorityBadge(task.dueDate);

  console.log(task);

  return (
    <div className="container mx-auto py-6 space-y-6 max-w-7xl">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{task.title}</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant={statusBadge.variant}
                className="flex items-center gap-1"
              >
                <Clock className="h-3 w-3" />
                {statusBadge.label}
              </Badge>
              {priorityBadge && (
                <Badge variant={priorityBadge.variant}>
                  {priorityBadge.label}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {task.description}
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <TaskProjectCourseCard
            type={task.type}
            projectTitle={task.projectThesis?.projectTitle}
          />
          <TaskProjectCourseCard
            courseCode={task.projectThesis?.course.courseCode}
            courseTitle={task.projectThesis?.course.courseName}
            courseHeader="Course"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {task.requirements && task.requirements.length > 0 && (
            <TaskRequirements requirements={task.requirements} />
          )}

          {task.referenceMaterials && task.referenceMaterials.length > 0 && (
            <ReferenceMaterialAndAttachment
              referenceMaterials={task.referenceMaterials}
            />
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <DateStatusIndicator
                  label="Task Assigned"
                  date={task.createdAt}
                  Icon={Calendar}
                  divClassName="bg-blue-100 dark:bg-blue-900/30"
                  iconClassName="text-blue-600 dark:text-blue-400"
                  dateClassName="text-muted-foreground"
                />

                {task.projectThesisUpdateLogs &&
                  task.projectThesisUpdateLogs.length > 0 && (
                    <>
                      <DateStatusIndicator
                        label="Task Submitted"
                        date={
                          task.projectThesisUpdateLogs[
                            task.projectThesisUpdateLogs.length - 1
                          ].updatedAt
                        }
                        Icon={Upload}
                        divClassName="bg-amber-100 dark:bg-amber-900/30"
                        iconClassName="text-amber-600 dark:text-amber-400"
                        dateClassName="text-muted-foreground"
                      />
                    </>
                  )}

                <DateStatusIndicator
                  label="Due Date"
                  date={task.dueDate}
                  Icon={Clock}
                />
              </div>
            </CardContent>
          </Card>

          {task.projectThesisUpdateLogs &&
            task.projectThesisUpdateLogs.length > 0 && (
              <ReferenceMaterialAndAttachment
                referenceMaterials={task.projectThesisUpdateLogs.map(
                  (log: IProjectThesisUpdateLog) => log.fileUrl,
                )}
              />
            )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">People Involved</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProjectThesisMemberCard
                label="Student"
                name={task.projectThesis?.student?.name || "N/A"}
                stdId={task.projectThesis?.student?.studentId}
              />

              <ProjectThesisMemberCard
                label="Supervisor"
                name={task.projectThesis?.supervisor?.name || "N/A"}
                email={task.projectThesis?.supervisor?.email}
              />
            </CardContent>
          </Card>

          <TaskAction id={task.id} />
        </div>
      </div>
    </div>
  );
}
