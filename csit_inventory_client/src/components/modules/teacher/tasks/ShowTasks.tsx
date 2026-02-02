"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IProposal, ITask, IUser } from "@/types";
import {
  Calendar,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Check,
  X,
  Edit,
  RefreshCcw,
  BookOpen,
  User,
  Target,
  TrendingUp,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskUpdateLogs } from "@/components/modules/student/task/TaskUpdateLogs";
import { TaskSubmissionModal } from "./TaskSubmissionModal";
import { formatDate } from "@/components/shared/ReusableFunction";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import TeacherReviewTaskForm from "./TeacherReviewTaskForm";

export default function ShowTasks({
  proposal,
  user,
}: {
  proposal: IProposal;
  user?: IUser | null;
}) {
  const tasks: ITask[] = proposal.tasks || [];
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "TODO":
        return <AlertCircle className="w-4 h-4" />;
      case "IN_PROGRESS":
        return <Clock className="w-4 h-4" />;
      case "DONE":
        return <CheckCircle2 className="w-4 h-4" />;
      case "REVIEW":
        return <Clock className="w-4 h-4" />;
      case "FAILED":
        return <X className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "TODO":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "IN_PROGRESS":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "DONE":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "REVIEW":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "FAILED":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const isOverdue = (dueDate: string | Date) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Tasks Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Project Tasks
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"} assigned to
              this project
            </p>
          </div>
        </div>

        {tasks.length > 0 ? (
          <div className="grid gap-4">
            {tasks.map((task: ITask, index: number) => {
              return (
                <Card key={task.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            variant="outline"
                            className="font-mono text-xs"
                          >
                            Task #{index + 1}
                          </Badge>
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}
                          >
                            {getStatusIcon(task.status)}
                            {task.status.replace("_", " ")}
                          </div>
                        </div>
                        <CardTitle className="text-xl mb-2">
                          {task.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Task Metadata */}
                    <div className="flex items-center gap-10 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Due Date
                          </p>
                          <p
                            className={`font-medium ${isOverdue(task.dueDate) && task.status !== "DONE" ? "text-red-600 dark:text-red-400" : ""}`}
                          >
                            {formatDate(task.dueDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Rating
                          </p>
                          <p className="font-medium">{task.ratting || 0}/5</p>
                        </div>
                      </div>
                    </div>

                    {isOverdue(task.dueDate) && task.status !== "DONE" && (
                      <Badge variant="destructive" className="w-fit">
                        ⚠️ Overdue
                      </Badge>
                    )}

                    {/* Requirements */}
                    {task.requirements && task.requirements.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                          <FileText className="w-4 h-4 text-blue-600" />
                          Requirements
                        </div>
                        <ul className="space-y-2 ml-6">
                          {task.requirements.map((req, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Reference Materials */}
                    {task.referenceMaterials &&
                      task.referenceMaterials.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                            <Download className="w-4 h-4 text-purple-600" />
                            Reference Materials
                          </div>
                          <div className="flex flex-wrap gap-2 ml-6">
                            {task.referenceMaterials.map((url, idx) => (
                              <Button
                                key={idx}
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
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  Material {idx + 1}
                                </a>
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                    {user?.role === "TEACHER" && (
                      <>
                        {/* Task Feedback */}
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
                        {/* Update Logs */}
                        {task.projectThesisUpdateLogs &&
                          task.projectThesisUpdateLogs.length > 0 && (
                            <TaskUpdateLogs
                              logs={task.projectThesisUpdateLogs}
                              taskId={task.id}
                            />
                          )}

                        {/* Review Actions */}
                        {task.status === "REVIEW" && (
                          <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                              <Clock className="w-4 h-4 text-blue-600" />
                              Review submission from student
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button className="w-full bg-green-600 hover:bg-green-700">
                                    <Check className="w-4 h-4 mr-2" />
                                    Mark as Done
                                  </Button>
                                </DialogTrigger>
                                <TeacherReviewTaskForm
                                  id={task.id}
                                  submissionTask={
                                    task?.projectThesisUpdateLogs?.[
                                      task.projectThesisUpdateLogs.length - 1
                                    ]?.id || ""
                                  }
                                  for="done"
                                />
                              </Dialog>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full border-red-300 text-red-600 hover:bg-red-50"
                                  >
                                    <X className="w-4 h-4 mr-2" />
                                    Mark as Failed
                                  </Button>
                                </DialogTrigger>
                                <TeacherReviewTaskForm
                                  id={task.id}
                                  submissionTask={
                                    task?.projectThesisUpdateLogs?.[
                                      task.projectThesisUpdateLogs.length - 1
                                    ]?.id || ""
                                  }
                                  for="reject"
                                />
                              </Dialog>

                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
                                  >
                                    <RefreshCcw className="w-4 h-4 mr-2" />
                                    Allow Resubmission
                                  </Button>
                                </DialogTrigger>
                                <TeacherReviewTaskForm
                                  id={task.id}
                                  submissionTask={
                                    task?.projectThesisUpdateLogs?.[
                                      task.projectThesisUpdateLogs.length - 1
                                    ]?.id || ""
                                  }
                                  for="resubmit"
                                />
                              </Dialog>
                            </div>
                          </div>
                        )}

                        {/* Edit Task Button */}
                        {(task.status === "TODO" ||
                          task.status === "IN_PROGRESS") && (
                          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                            <Button
                              onClick={() => {
                                setSelectedTask(task);
                                setIsModalOpen(true);
                              }}
                              variant="outline"
                              className="w-full"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Task
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border-dashed border-2">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-lg font-semibold text-muted-foreground mb-1">
                No tasks assigned yet
              </p>
              <p className="text-sm text-muted-foreground text-center max-w-sm">
                Tasks will appear here once you assign them to the student for
                this project
              </p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Task Submission Modal */}
      {selectedTask && (
        <TaskSubmissionModal
          task={selectedTask}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
}
