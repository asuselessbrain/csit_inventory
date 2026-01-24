"use client"
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { getCurrentUser, logoutUser } from "@/services/authService/auth.client";
import Link from "next/link";
import { toast } from "sonner";

export default function Home() {


  const user = useUser()


  const handleLogOut = async () => {
    const res = await logoutUser();

    if (res.success) {
      localStorage.removeItem("accessToken")
      user?.setUser(null)
      toast.success(res.message || "Logged out successfully!")
    }
    if (!res.success) {
      toast.error(res.errorMessage || "Logout failed!")
    }
  }
  return (
    <>
      {
        !!user?.user ? <Button onClick={async () => handleLogOut()}>Click me</Button> : <Link href="/login"><Button>Login</Button></Link>
      }
    </>

  );
}
