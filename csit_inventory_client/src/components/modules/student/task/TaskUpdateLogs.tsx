"use client";

import { IProjectThesisUpdateLog } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FileText, Download, Link as LinkIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TaskUpdateLogsProps {
  logs?: IProjectThesisUpdateLog[];
  taskId: string;
}

export const TaskUpdateLogs = ({ logs, taskId }: TaskUpdateLogsProps) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/30 rounded-lg border border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
          No submissions yet
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Submissions & Updates
      </h3>

      <div className="space-y-3">
        {logs.map((log: IProjectThesisUpdateLog, idx: number) => (
          <Card
            key={log.id || idx}
            className="border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-gray-900 dark:text-white">
                        Submission {idx + 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mt-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(log.updatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            {log.supervisorFeedback && (
              <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-lg mx-6">
                <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-400 mb-1">
                  Supervisor Feedback
                </p>
                <p className="text-sm text-indigo-800 dark:text-indigo-300">
                  {log.supervisorFeedback}
                </p>
              </div>
            )}

            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-3">
                {/* File URL */}
                {log.fileUrl && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    <a
                      href={log.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="w-3 h-3 mr-2" />
                      Download File
                    </a>
                  </Button>
                )}

                {/* Live Link */}
                {log.liveLink && (
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="text-xs"
                  >
                    <a
                      href={log.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkIcon className="w-3 h-3 mr-2" />
                      Visit Live Link
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
