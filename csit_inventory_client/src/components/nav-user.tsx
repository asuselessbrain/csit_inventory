"use client";

import {
  ChevronsUpDown,
  LogOut,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";
import { logoutUser } from "@/services/authService/auth.client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    role?: string;
    profilePhoto?: string;
  };
}) {
  const { isMobile } = useSidebar();
  const userContext = useUser();
  const router = useRouter();

  const handleLogOut = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      const res = await logoutUser();
      if (res.success) {
        localStorage.removeItem("accessToken");
        userContext?.setUser(null);
        toast.success(res.message || "Logged out successfully!", { id: toastId });
        router.push("/login");
      } else {
        toast.error(res.errorMessage || "Logout failed!", { id: toastId });
      }
    } catch (error) {
      localStorage.removeItem("accessToken");
      userContext?.setUser(null);
      toast.success("Logged out successfully!", { id: toastId });
      router.push("/login");
    }
  };

  const initials = user.name
    ? user.name
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
    : "US";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
            >
              <Avatar className="h-8 w-8 rounded-full border border-slate-700/30">
                <AvatarImage src={user.profilePhoto || ""} alt={user.name} />
                <AvatarFallback className="rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium capitalize">{user.name}</span>
                <span className="truncate text-xs text-slate-400">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full border border-slate-700/30">
                  <AvatarImage src={user.profilePhoto || ""} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium capitalize">{user.name}</span>
                  <span className="truncate text-xs text-slate-400">{user.email}</span>
                  {user.role && (
                    <span className="inline-block mt-0.5 text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 w-max">
                      {user.role}
                    </span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogOut}
              className="bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white font-medium transition-all duration-200 cursor-pointer shadow-sm"
            >
              <LogOut className="mr-2 h-4 w-4 text-white" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
