"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  CheckCircle2,
  CircleDashed,
  Mail,
  User,
  GraduationCap,
  ListTodo,
} from "lucide-react";

type Overview = {
  projectTitle?: string;
  status?: string;
  progress?: number;
  totalTasks?: number;
  completedTasks?: number;
  pendingTasksCount?: number;
};

type Supervisor = {
  name?: string;
  email?: string;
  designation?: string;
};

type RecentTask = {
  id: string;
  title: string;
  status: string;
  dueDate: string;
};

type StudentDashboardOverviewProps = {
  hasProject?: boolean;
  overview?: Overview;
  supervisor?: Supervisor;
  recentTasks?: RecentTask[];
};

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="text-3xl font-semibold text-foreground">
            {value}
          </div>
        </div>
        <div className="rounded-xl bg-muted p-2 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

const getStatusBadge = (status?: string) => {
  const statusLower = status?.toLowerCase() || "";
  if (statusLower === "approved") {
    return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>;
  } else if (statusLower === "pending") {
    return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
  } else if (statusLower.includes("progress")) {
    return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>;
  } else if (statusLower === "completed") {
    return <Badge className="bg-green-600 hover:bg-green-700">Completed</Badge>;
  }
  return <Badge variant="outline">{status}</Badge>;
};

const formatDesignation = (designation?: string) => {
  if (!designation) return "";
  return designation
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function StudentDashboardOverview({
  hasProject,
  overview,
  supervisor,
  recentTasks = [],
}: StudentDashboardOverviewProps) {
  if (!hasProject) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold">Student Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Your project overview and tasks.
          </p>
        </div>
        <Card className="flex min-h-[400px] items-center justify-center">
          <CardContent className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-muted p-6">
              <BookOpen className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">No Project Assigned</h2>
              <p className="text-sm text-muted-foreground max-w-md">
                You don&apos;t have any project assigned yet. Please contact your
                coordinator or submit a proposal to get started.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Tasks",
      value: overview?.totalTasks ?? 0,
      description: "Tasks assigned to you",
      icon: <ListTodo className="h-5 w-5" />,
    },
    {
      title: "Completed Tasks",
      value: overview?.completedTasks ?? 0,
      description: "Successfully finished",
      icon: <CheckCircle2 className="h-5 w-5" />,
    },
    {
      title: "Pending Tasks",
      value: overview?.pendingTasksCount ?? 0,
      description: "Awaiting completion",
      icon: <CircleDashed className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Student Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Track your project progress, tasks, and supervisor information.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl">
                {overview?.projectTitle || "Untitled Project"}
              </CardTitle>
              <CardDescription>Your current project</CardDescription>
            </div>
            {getStatusBadge(overview?.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{overview?.progress ?? 0}%</span>
            </div>
            <Progress value={overview?.progress ?? 0} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Supervisor Information</CardTitle>
            <CardDescription>Your assigned project supervisor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {supervisor?.name ? (
              <>
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Name</p>
                    <p className="text-sm text-muted-foreground">
                      {supervisor.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Email</p>
                    <p className="text-sm text-muted-foreground">
                      {supervisor.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-muted p-2">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Designation</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDesignation(supervisor.designation)}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                No supervisor assigned yet.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Your latest assigned tasks</CardDescription>
          </CardHeader>
          <CardContent>
            {recentTasks.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Due Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTasks.map((task) => (
                      <TableRow key={task.id}>
                        <TableCell className="max-w-[200px] truncate font-medium">
                          {task.title}
                        </TableCell>
                        <TableCell>{getStatusBadge(task.status)}</TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          {formatDate(task.dueDate)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                No recent tasks available.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
