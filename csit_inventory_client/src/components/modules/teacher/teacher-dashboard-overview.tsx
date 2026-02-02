"use client";

import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

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
import {
  BookCheck,
  ClipboardList,
  FolderCheck,
  User,
} from "lucide-react";

const PIE_COLORS = ["#f59e0b", "#2563eb", "#8b5cf6", "#16a34a"];

type Counts = {
  totalActiveProjects?: number;
  pendingRequests?: number;
  completedProjects?: number;
};

type PieDatum = {
  name: string;
  value: number;
};

type RecentProposal = {
  id: string;
  title: string;
  date: string;
  studentName: string;
};

type TeacherDashboardOverviewProps = {
  counts?: Counts;
  pieChartData?: PieDatum[];
  recentProposals?: RecentProposal[];
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

export default function TeacherDashboardOverview({
  counts,
  pieChartData,
  recentProposals,
}: TeacherDashboardOverviewProps) {
  const stats = [
    {
      title: "Active Projects",
      value: counts?.totalActiveProjects ?? 0,
      description: "Currently supervising",
      icon: <FolderCheck className="h-5 w-5" />,
    },
    {
      title: "Pending Requests",
      value: counts?.pendingRequests ?? 0,
      description: "Awaiting your review",
      icon: <ClipboardList className="h-5 w-5" />,
    },
    {
      title: "Completed Projects",
      value: counts?.completedProjects ?? 0,
      description: "Successfully finished",
      icon: <BookCheck className="h-5 w-5" />,
    },
  ];

  const pieData = pieChartData ?? [];
  const hasPieData = pieData.length > 0;
  const proposals = recentProposals ?? [];

  const pieTooltipFormatter = (
    value: number | string | undefined,
    name?: string
  ) => [value ?? 0, name ?? ""] as [number | string, string];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Teacher Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">
          Manage student proposals, track project progress, and review submissions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Proposal Status</CardTitle>
            <CardDescription>
              Distribution of proposal statuses across your projects.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72 min-h-[280px] w-full min-w-0">
            {hasPieData ? (
              <ResponsiveContainer width="100%" height="100%" minHeight={260}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={4}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`${entry.name}-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={pieTooltipFormatter}
                    contentStyle={{
                      background: "#0f172a",
                      borderRadius: 8,
                      border: "none",
                      color: "#f8fafc",
                    }}
                  />
                  <Legend verticalAlign="bottom" height={24} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No proposal data available.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Proposals</CardTitle>
            <CardDescription>
              Latest submissions from your students.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {proposals.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {proposals.map((proposal) => (
                      <TableRow key={proposal.id}>
                        <TableCell className="max-w-[200px] truncate font-medium">
                          {proposal.title}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{proposal.studentName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-sm text-muted-foreground">
                          {formatDate(proposal.date)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
                No recent proposals.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
