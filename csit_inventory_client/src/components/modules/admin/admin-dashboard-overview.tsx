"use client";

import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  Users,
  UserSquare2,
} from "lucide-react";

const PIE_COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444", "#8b5cf6"];

type Counts = {
  totalCourses?: number;
  totalStudents?: number;
  totalTeachers?: number;
  totalProjectTheses?: number;
  pendingProposals?: number;
};

type BarDatum = {
  department: string;
  count: number;
};

type PieDatum = {
  name: string;
  value: number;
};

type AdminDashboardOverviewProps = {
  counts?: Counts;
  barChartData?: BarDatum[];
  pieChartData?: PieDatum[];
};

function StatCard({
  title,
  value,
  description,
  icon,
  badge,
}: {
  title: string;
  value: number;
  description: string;
  icon: React.ReactNode;
  badge?: string;
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
      <CardContent className="flex items-center justify-between gap-2 pt-0">
        <CardDescription>{description}</CardDescription>
        {badge ? <Badge variant="secondary">{badge}</Badge> : null}
      </CardContent>
    </Card>
  );
}

export default function AdminDashboardOverview({
  counts,
  barChartData,
  pieChartData,
}: AdminDashboardOverviewProps) {
  const stats = [
    {
      title: "Total Courses",
      value: counts?.totalCourses ?? 0,
      description: "Active courses in catalog",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Total Students",
      value: counts?.totalStudents ?? 0,
      description: "Registered students",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Total Teachers",
      value: counts?.totalTeachers ?? 0,
      description: "Faculty members",
      icon: <UserSquare2 className="h-5 w-5" />,
    },
    {
      title: "Project Theses",
      value: counts?.totalProjectTheses ?? 0,
      description: "Final year submissions",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      title: "Pending Proposals",
      value: counts?.pendingProposals ?? 0,
      description: "Awaiting approval",
      icon: <ClipboardList className="h-5 w-5" />,
      badge: "Needs review",
    },
  ];

  const areaData = barChartData ?? [];
  const pieData = pieChartData ?? [];
  const hasAreaData = areaData.length > 0;
  const hasPieData = pieData.length > 0;
  const pieTooltipFormatter = (
    value: number | string | undefined,
    name?: string
  ) => [value ?? 0, name ?? ""] as [number | string, string];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold">Admin Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">
          Track department activity, proposal status, and enrollment growth.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Department Submissions</CardTitle>
            <CardDescription>
              Area chart of project submissions by department.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-72 min-h-[280px] w-full min-w-0">
            {hasAreaData ? (
              <ResponsiveContainer width="100%" height="100%" minHeight={260}>
                <AreaChart data={areaData} margin={{ left: 8, right: 16 }}>
                  <defs>
                    <linearGradient id="departmentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="department" stroke="#94a3b8" />
                  <YAxis allowDecimals={false} stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      borderRadius: 8,
                      border: "none",
                      color: "#f8fafc",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#2563eb"
                    fill="url(#departmentGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No department data available.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Proposal Status</CardTitle>
            <CardDescription>Pie chart of proposal pipeline.</CardDescription>
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
      </div>
    </div>
  );
}
