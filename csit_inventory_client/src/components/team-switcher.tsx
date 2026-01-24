"use client"
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: string
    plan: string

  }
}) {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <Link href="/">
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-400 to-blue-400 dark:from-indigo-600 dark:to-blue-600 rounded-full blur-lg opacity-30"></div>
                  <Image
                    width={40}
                    height={40}
                    src="https://res.cloudinary.com/dwduymu1l/image/upload/v1769187917/Patuakhali_Science_and_Technology_University_logo_rv2zwu.png"
                    alt="Patuakhali_Science_and_Technology_University"
                    className="relative mx-auto h-12 w-12"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{teams.name}</span>
                  <span className="truncate text-xs">{teams.plan}</span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
          </Link>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
