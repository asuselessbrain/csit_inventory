"use client"
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/services/authService/auth.client";
import { toast } from "sonner";

export default function Home() {

  const handleLogOut = async () => {
    const res = await logoutUser();

    if (res.success) {
      localStorage.removeItem("accessToken")
      toast.success(res.message || "Logged out successfully!")
    }
    if (!res.success) {
      toast.error(res.errorMessage || "Logout failed!")
    }
  }
  return (
    <Button onClick={async () => handleLogOut()}>Click me</Button>
  );
}
