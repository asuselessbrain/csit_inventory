"use client"

import * as React from "react"
import {
  LayoutDashboard,
  ListChecks,
  NotebookText,
  PlusSquare
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useUser } from "@/context/UserContext"
import { useEffect, useState } from "react"

// This is sample data.
const data = {
  user: {
    name: "Arfan Ahmed",
    email: "arfan@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams:
  {
    name: "PSTU",
    logo: "https://res.cloudinary.com/dwduymu1l/image/upload/v1769187917/Patuakhali_Science_and_Technology_University_logo_rv2zwu.png",
    plan: "Dapartment of CSIT",
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const user = useUser()
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer)
  }, []);

  if (!mounted) {
    return null;
  }

  if (!user?.user) {
    return null;
  }

  const navStudent = [
    {
      title: "Overview",
      url: "/student",
      icon: LayoutDashboard
    },
    {
      title: "Submit Proposal",
      url: "/student/submit-proposal",
      icon: PlusSquare
    },
    {
      title: "My Tasks",
      url: "/student/my-tasks",
      icon: ListChecks
    },
    {
      title: "My Proposals",
      url: "/student/my-proposals",
      icon: NotebookText
    },
  ]

  const navAdmin = [
    {
      title: "Overview",
      url: "/admin",
      icon: LayoutDashboard
    },
    {
      title: "Add Course",
      url: "/admin/add-course",
      icon: PlusSquare
    }
  ]
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={user?.user?.role === "ADMIN" ? navAdmin : navStudent} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
