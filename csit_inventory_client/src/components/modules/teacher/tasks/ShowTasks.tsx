"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IProposal, ITask } from "@/types";
import { Calendar, FileText, CheckCircle2, Clock, AlertCircle, Download, Check, X, Edit, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskUpdateLogs } from "@/components/modules/student/task/TaskUpdateLogs";
import { TaskSubmissionModal } from "./TaskSubmissionModal";
import { allowStudentResubmit, markAsDone, rejectTasks } from "@/services/taskService";
import { toast } from "sonner";

export default function ShowTasks({ proposal }: { proposal: IProposal }) {
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
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const formatDate = (date: string | Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const isOverdue = (dueDate: string | Date) => {
        return new Date(dueDate) < new Date();
    };


    const completeTask = async (taskId: string) => {
        const res = await markAsDone(taskId)

        if (res.success) {
            toast.success(res.message || "Task marked as done")
        } else {
            toast.error(res.errorMessage || "Failed to mark task as done")
        }
    }

    const rejectTask = async (taskId: string) => {
        const res = await rejectTasks(taskId)

        if (res.success) {
            toast.success(res.message || "Task rejected successfully")
        } else {
            toast.error(res.errorMessage || "Failed to mark task as done")
        }
    }

    const allowResubmission = async (taskId: string) => {
        const res = await allowStudentResubmit(taskId)

        if (res.success) {
            toast.success(res.message || "Student is now allowed to resubmit this task.");
        } else {
            toast.error(res.errorMessage || "Unable to allow resubmission. Please try again.");
        }
    }
    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Tasks</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {tasks.length} {tasks.length === 1 ? "task" : "tasks"} assigned
                    </p>
                </div>
            </div>

            {tasks.length > 0 ? (
                <div className="grid gap-4">
                    {tasks.map((task: ITask) => (
                        <Card key={task.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">{task.title}</CardTitle>
                                        <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                                    </div>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                                        {getStatusIcon(task.status)}
                                        {task.status.replace("_", " ")}
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Due Date */}
                                <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">Due:</span>
                                    <span className={`font-medium ${isOverdue(task.dueDate) ? "text-red-600 dark:text-red-400" : "text-gray-900 dark:text-white"}`}>
                                        {formatDate(task.dueDate)}
                                    </span>
                                    {isOverdue(task.dueDate) && task.status !== "DONE" && (
                                        <Badge variant="destructive" className="ml-2">Overdue</Badge>
                                    )}
                                </div>

                                {/* Requirements */}
                                {task.requirements && task.requirements.length > 0 && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <FileText className="w-4 h-4 text-muted-foreground" />
                                            Requirements
                                        </div>
                                        <ul className="space-y-1 ml-6">
                                            {task.requirements.map((req, idx) => (
                                                <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                                    <span className="text-muted-foreground mt-1">•</span>
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Reference Materials */}
                                {task.referenceMaterials && task.referenceMaterials.length > 0 && (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <Download className="w-4 h-4 text-muted-foreground" />
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
                                                    <a href={url} target="_blank" rel="noopener noreferrer">
                                                        <Download className="w-3 h-3 mr-1" />
                                                        Material {idx + 1}
                                                    </a>
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Update Logs */}
                                {task.projectThesisUpdateLogs && task.projectThesisUpdateLogs.length > 0 && (
                                    <TaskUpdateLogs logs={task.projectThesisUpdateLogs} taskId={task.id} />
                                )}

                                {/* Review Actions */}
                                {task.status === "REVIEW" && (
                                    <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            Review submission from student
                                        </p>
                                        <div className="flex gap-2">
                                            {/* Approve the task */}
                                            <Button
                                                onClick={() => completeTask(task.id)}
                                                className="flex-1"
                                            >
                                                <Check className="w-4 h-4 mr-2" />
                                                Mark as Done
                                            </Button>

                                            {/* Reject the task */}
                                            <Button
                                                onClick={() => rejectTask(task.id)}
                                                variant="outline"
                                                className="flex-1"
                                            >
                                                <X className="w-4 h-4 mr-2" />
                                                Mark as Failed
                                            </Button>

                                            {/* Allow resubmission */}
                                            <Button
                                                onClick={() => allowResubmission(task.id)}
                                                variant="outline"
                                                className="flex-1"
                                            >
                                                <RefreshCcw className="w-4 h-4 mr-2" />
                                                Allow Resubmission
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* Task Update Button */}
                                {
                                    task.status === "TODO" || task.status === "IN_PROGRESS" && (<div className="pt-4 border-t border-slate-200 dark:border-slate-700">
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
                                    </div>)
                                }

                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <FileText className="w-12 h-12 text-muted-foreground/30 mb-3" />
                        <p className="text-muted-foreground font-medium">No tasks assigned yet</p>
                        <p className="text-sm text-muted-foreground mt-1">Tasks will appear here once assigned</p>
                    </CardContent>
                </Card>
            )}

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
        </section>
    );
}
