import { RequestTaskDialog } from "@/components/modules/student/RequestTaskDialog";
import { ResubmitProposalDialog } from "@/components/modules/student/updateProposal/ResubmitProposalDialog";
import { SubmitTaskDialog } from "@/components/modules/student/task/SubmitTaskDialog";
import { TaskUpdateLogs } from "@/components/modules/student/task/TaskUpdateLogs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getSingleProposal } from "@/services/proposalService";
import {
  Calendar,
  FileText,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";
import { ITask } from "@/types";
import TaskAction from "@/components/modules/student/task/TaskAction";

const parseBold = (text: string) => {
  return parse(
    text
      .replace(/\[bold\](.*?)\[\/bold\]/g, "<strong>$1</strong>")
      .replace(/\\n/g, "\n")
      .replace(/\n/g, "<br/>"),
  );
};

export default async function ProposalDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const proposal = await getSingleProposal(slug);

  console.log(proposal.data);

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {proposal.data.course.courseName}
          </h1>
          <p className="text-sm text-slate-500">
            Course Code: {proposal.data.course.courseCode}
          </p>
          <p className="text-sm text-slate-500">
            Semester: {proposal.data.semester}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-2">
          {/* Status Badge */}
          <Badge
            variant={
              proposal.data.status === "PENDING"
                ? "destructive"
                : proposal.data.status === "APPROVED"
                  ? "default"
                  : "secondary"
            }
            className="uppercase text-xs"
          >
            {proposal.data.status}
          </Badge>

          {/* Type Badge */}
          <Badge variant="secondary" className="text-xs">
            {proposal.data.type}
          </Badge>

          {/* Actions */}
          {proposal.data.status === "APPROVED" && (
            <RequestTaskDialog proposalId={proposal.data.id} />
          )}

          {proposal.data.status === "REJECTED" && (
            <ResubmitProposalDialog proposal={proposal.data} />
          )}
        </div>
      </div>

      {/* Project Title */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Project Title</h2>
        <p>{proposal.data.projectTitle}</p>
      </section>

      {/* Abstract */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Abstract</h2>
        <div className="prose max-w-none">
          {parseBold(proposal.data.abstract)}
        </div>
      </section>

      {/* Project Objectives */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Project Objectives</h2>
        <ul className="list-disc list-inside space-y-1">
          {proposal.data.projectObjectives
            .split("\n\n")
            .map((obj: string, idx: number) => (
              <li key={idx}>{obj}</li>
            ))}
        </ul>
      </section>

      {/* Methodology */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Methodology</h2>
        <ul className="list-disc list-inside space-y-1">
          {proposal.data.methodology
            .split("\n\n")
            .map((m: string, idx: number) => (
              <li key={idx}>{m}</li>
            ))}
        </ul>
      </section>

      {/* Expected Outcomes */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Expected Outcomes</h2>
        <ul className="list-disc list-inside space-y-1">
          {proposal.data.expectedOutcomes
            .split("\n\n")
            .map((eo: string, idx: number) => (
              <li key={idx}>{eo}</li>
            ))}
        </ul>
      </section>

      {/* Technologies & Tools */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Technologies & Tools</h2>
        <div className="flex flex-wrap gap-2">
          {proposal.data.technologiesTools.map((tech: string, idx: number) => (
            <Badge key={idx} variant="secondary">
              {tech.trim()}
            </Badge>
          ))}
        </div>
      </section>

      {/* Estimated Timeline */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Estimated Timeline</h2>
        <p>{proposal.data.estimatedTimeline}</p>
      </section>

      {/* Student & Supervisor */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Student</h2>
          <p>Name: {proposal.data.student.name}</p>
          <p>Email: {proposal.data.student.email}</p>
          <p>Phone: {proposal.data.student.phoneNumber}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Supervisor</h2>
          <p>Name: {proposal.data.supervisor.name}</p>
          <p>Email: {proposal.data.supervisor.email}</p>
          <p>Phone: {proposal.data.supervisor.phoneNumber}</p>
        </div>
      </section>

      {/* Attachments */}
      {proposal.data.attachments.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Attachments</h2>
          <div className="flex flex-col gap-2">
            {proposal.data.attachments.map((att: string, idx: number) => (
              <a
                key={idx}
                href={att}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {att.split("/").pop()}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Tasks Section */}
      {proposal.data.tasks && proposal.data.tasks.length > 0 && (
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold">Assigned Tasks</h2>
            <p className="text-sm text-slate-500 mt-1">
              {proposal.data.tasks.length}{" "}
              {proposal.data.tasks.length === 1 ? "task" : "tasks"} assigned to
              this proposal
            </p>
          </div>

          {/* Progress Overview Card */}
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <CardTitle className="text-lg">Overall Progress</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {proposal.data.taskCompleted} of {proposal.data.totalTasks}{" "}
                    tasks completed
                  </span>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {proposal.data.overallProgress}%
                  </span>
                </div>
                <Progress
                  value={proposal.data.overallProgress}
                  className="h-3"
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {proposal.data.tasks.map((task: ITask, idx: number) => {
              const isOverdue =
                new Date(task.dueDate) < new Date() && task.status !== "DONE";
              const getStatusColor = (status: string) => {
                switch (status) {
                  case "TODO":
                    return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
                  case "IN_PROGRESS":
                    return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
                  case "DONE":
                    return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
                  default:
                    return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
                }
              };

              const getStatusIcon = (status: string) => {
                switch (status) {
                  case "TODO":
                    return <AlertCircle className="w-4 h-4" />;
                  case "IN_PROGRESS":
                    return <Clock className="w-4 h-4" />;
                  case "DONE":
                    return <CheckCircle2 className="w-4 h-4" />;
                  default:
                    return null;
                }
              };

              return (
                <Card
                  key={idx}
                  className="hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-700"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-gray-900 dark:text-white">
                          {task.title}
                        </CardTitle>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                          {task.description}
                        </p>
                      </div>
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getStatusColor(task.status)}`}
                      >
                        {getStatusIcon(task.status)}
                        {task.status.replace("_", " ")}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Due Date */}
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-slate-400" />
                      <div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          Due Date:
                        </span>
                        <span
                          className={`ml-2 font-medium ${isOverdue ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white"}`}
                        >
                          {new Date(task.dueDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        {isOverdue && (
                          <Badge variant="destructive" className="ml-2">
                            Overdue
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Requirements */}
                    {task.requirements && task.requirements.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-slate-400" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            Requirements
                          </span>
                        </div>
                        <ul className="space-y-1 ml-7">
                          {task.requirements.map(
                            (req: string, ridx: number) => (
                              <li
                                key={ridx}
                                className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2"
                              >
                                <span className="text-slate-400 mt-0.5">•</span>
                                <span>{req}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Reference Materials */}
                    {task.referenceMaterials &&
                      task.referenceMaterials.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Download className="w-5 h-5 text-slate-400" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              Reference Materials
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 ml-7">
                            {task.referenceMaterials.map(
                              (url: string, midx: number) => (
                                <Button
                                  key={midx}
                                  asChild
                                  variant="outline"
                                  size="sm"
                                  className="text-xs"
                                >
                                  <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Download className="w-3 h-3 mr-1" />
                                    Material {midx + 1}
                                  </a>
                                </Button>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                    {task.feedback && (
                      <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                        <p className="text-sm font-semibold text-amber-900 dark:text-amber-400 mb-1">
                          Task Feedback
                        </p>
                        <p className="text-sm text-amber-800 dark:text-amber-300">
                          {task.feedback}
                        </p>
                      </div>
                    )}

                    {/* Task Actions */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                      {task.status === "TODO" && <TaskAction id={task.id} />}

                      {task.status === "IN_PROGRESS" && (
                        <SubmitTaskDialog taskId={task.id} />
                      )}

                      {task.status === "REVIEW" && (
                        <div className="w-full p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-center">
                          <p className="text-sm font-medium text-amber-800 dark:text-amber-400">
                            ⏳ Waiting for supervisor review
                          </p>
                        </div>
                      )}

                      {task.status === "DONE" && (
                        <div className="w-full p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                          <p className="text-sm font-medium text-green-800 dark:text-green-400 flex items-center justify-center gap-2">
                            <CheckCircle2 className="w-5 h-5" />
                            Task Completed
                          </p>
                        </div>
                      )}

                      {task.status === "FAILED" && (
                        <div className="w-full p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-center">
                          <p className="text-sm font-medium text-red-800 dark:text-red-400">
                            Task Failed
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Update Logs */}
                    {task.projectThesisUpdateLogs &&
                      task.projectThesisUpdateLogs.length > 0 && (
                        <TaskUpdateLogs
                          logs={task.projectThesisUpdateLogs}
                          taskId={task.id}
                        />
                      )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500">
        Created At: {new Date(proposal.data.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}
