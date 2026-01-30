import { ITask } from "@/types/task.type";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Eye, Loader2, XCircle } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

interface TaskCardProps {
  task: ITask;
}

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "TODO":
      return <Clock className="mt-1 h-5 w-5 text-gray-400" />;

    case "IN_PROGRESS":
      return <Loader2 className="mt-1 h-5 w-5 text-yellow-500 animate-spin" />;

    case "REVIEW":
      return <Eye className="mt-1 h-5 w-5 text-blue-500" />;

    case "DONE":
      return <CheckCircle className="mt-1 h-5 w-5 text-emerald-500" />;

    case "FAILED":
      return <XCircle className="mt-1 h-5 w-5 text-red-500" />;

    default:
      return <Clock className="mt-1 h-5 w-5 text-gray-300" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "TODO":
      return "bg-gray-100 text-gray-800";
    case "IN_PROGRESS":
      return "bg-yellow-100 text-yellow-800";
    case "REVIEW":
      return "bg-blue-100 text-blue-800";
    case "DONE":
      return "bg-emerald-100 text-emerald-800";
    case "FAILED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "TODO":
      return "To Do";
    case "IN_PROGRESS":
      return "In Progress";
    case "REVIEW":
      return "Under Review";
    case "DONE":
      return "Completed";
    case "FAILED":
      return "Failed";
    default:
      return status;
  }
};

const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), "yyyy-MM-dd");
  } catch {
    return dateString;
  }
};

export default function TaskCard({ task }: TaskCardProps) {
  console.log(task);
  return (
    <div className="w-full rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <StatusIcon status={task.status} />

          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {task.title}
            </h3>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2 max-w-4xl">
              {task.description}
            </p>
          </div>
        </div>

        <Badge className={getStatusColor(task.status)}>
          {getStatusText(task.status)}
        </Badge>
      </div>

      {/* Meta Info */}
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500 ml-8">
        <div className="flex gap-4">
          <span>
            <strong>Due Date:</strong> {formatDate(task.dueDate)}
          </span>
          <span>
            <strong>Submitted:</strong> {formatDate(task.updatedAt)}
          </span>
        </div>
      </div>
      <Link href={`/student/my-proposals/${task?.projectThesis?.id}`}>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 mt-4 ml-8"
        >
          <Eye className="h-4 w-4" />
          View Details
        </Button>
      </Link>
    </div>
  );
}
