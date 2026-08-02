"use client";

import * as React from "react";
import {
  Book,
  BookOpen,
  FileText,
  GraduationCap,
  LayoutDashboard,
  ListChecks,
  NotebookText,
  PlusSquare,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";

const data = {
  teams: {
    name: "PSTU",
    logo: "https://res.cloudinary.com/dwduymu1l/image/upload/v1769187917/Patuakhali_Science_and_Technology_University_logo_rv2zwu.png",
    plan: "Department of CSIT",
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useUser();

  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (user.isLoading) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <div className="p-4 flex items-center justify-center h-full text-sm text-muted-foreground">
            Loading...
          </div>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    );
  }

  const navStudent = [
    {
      title: "Overview",
      url: "/student",
      icon: LayoutDashboard,
    },
    {
      title: "Submit Proposal",
      url: "/student/submit-proposal",
      icon: PlusSquare,
    },
    {
      title: "My Tasks",
      url: "/student/my-tasks",
      icon: ListChecks,
    },
    {
      title: "My Proposals",
      url: "/student/my-proposals",
      icon: NotebookText,
    },
    {
      title: "Generate Report",
      url: "/student/generate-report",
      icon: FileText,
    },
  ];

  const navAdmin = [
    {
      title: "Overview",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Project/Thesis Collections",
      url: "/admin/project-thesis-collections",
      icon: Book,
    },
    {
      title: "Add Course",
      url: "/admin/add-course",
      icon: PlusSquare,
    },
    {
      title: "Manage Courses",
      url: "/admin/manage-courses",
      icon: ListChecks,
    },
    {
      title: "Add Teacher",
      url: "/admin/add-teacher",
      icon: UserPlus,
    },
    {
      title: "Manage Teachers",
      url: "/admin/manage-teachers",
      icon: UserCog,
    },
    {
      title: "Manage Students",
      url: "/admin/manage-students",
      icon: GraduationCap,
    },
    {
      title: "Manage Admins",
      url: "/admin/manage-admins",
      icon: UserCog,
    },
  ];

  const navTeacher = [
    {
      title: "Overview",
      url: "/teacher",
      icon: LayoutDashboard,
    },
    {
      title: "Proposals",
      url: "/teacher/proposals",
      icon: FileText,
    },
    {
      title: "Task To Review",
      url: "/teacher/task-to-review",
      icon: ListChecks,
    },
    {
      title: "My Assign Course",
      url: "/teacher/my-assign-course",
      icon: BookOpen,
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={
            user?.user?.role === "ADMIN"
              ? navAdmin
              : user?.user?.role === "TEACHER"
                ? navTeacher
                : navStudent
          }
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.user?.email
              ? user.user.email
                .split("@")[0]
                .replace(/[\._-]/g, " ")
                .trim()
                .split(" ")
                .filter(Boolean)
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ") || "User"
              : user?.user?.role || "User Profile",
            email: user?.user?.email || "Active Session",
            role: user?.user?.role || "",
            profilePhoto: "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
