"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import {
  LogIn,
  LayoutDashboard,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

export default function Home() {
  const { user, isLoading } = useUser();

  const getDashboardUrl = (role?: string) => {
    const r = role?.toUpperCase();
    if (r === "ADMIN") return "/admin";
    if (r === "TEACHER") return "/teacher";
    if (r === "STUDENT") return "/student";
    return "/";
  };

  const formatRole = (role?: string) => {
    if (!role) return "User";
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden bg-slate-950 text-slate-100">
      {/* Background Wallpaper with PSTU Academic Building & Clean Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-1000 ease-out opacity-40"
          style={{
            backgroundImage: `url('https://commons.wikimedia.org/wiki/Special:FilePath/Administrative%20building%20pstu.jpg')`,
          }}
        />
        {/* Sleek dark gradient overlay to make centered content shine */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/75 to-slate-950/90" />
        <div className="absolute inset-0 bg-radial at-c from-indigo-500/10 via-transparent to-slate-950 pointer-events-none" />
      </div>

      {/* Main Minimalist Center Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 flex-1 flex flex-col items-center justify-center text-center">

        {/* Department Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs sm:text-sm font-semibold mb-8 backdrop-blur-md shadow-lg">
          <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>Department of Computer Science & Information Technology (CSIT)</span>
        </div>

        {/* Logo */}
        <div className="relative p-3">
          <Image
            width={80}
            height={80}
            src="https://res.cloudinary.com/dwduymu1l/image/upload/v1769187917/Patuakhali_Science_and_Technology_University_logo_rv2zwu.png"
            alt="PSTU Official Logo"
            unoptimized
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md"
          />
        </div>

        {/* Titles & Simple Overview */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-3">
          <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            Patuakhali Science & Technology University
          </span>
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-400 tracking-wide mb-6">
          Project & Thesis Automation System
        </h2>

        <p className="max-w-2xl text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-10">
          A centralized digital workspace for managing project proposals, tracking thesis milestones, and archiving academic research.
        </p>

        {/* Dynamic Interactive Action Buttons */}
        <div className="w-full flex flex-col items-center justify-center min-h-20">
          {isLoading ? (
            <div className="w-56 h-14 rounded-xl bg-white/10 border border-white/15 animate-pulse backdrop-blur-md" />
          ) : user ? (
            <div className="flex flex-col items-center gap-4 w-full max-w-sm animate-in fade-in zoom-in-95 duration-300">
              <Link href={getDashboardUrl(user.role)} className="w-full">
                <Button
                  size="lg"
                  className="w-full py-6 text-base font-bold bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-2xl shadow-emerald-500/25 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 hover:scale-105 cursor-pointer border border-emerald-400/30"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Go to {formatRole(user.role)} Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs animate-in fade-in zoom-in-95 duration-300">
              <Link href="/login" className="w-full">
                <Button
                  size="lg"
                  className="w-full py-6 px-8 text-base font-bold bg-gradient-to-r from-indigo-500 via-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-2xl shadow-blue-500/30 rounded-xl flex items-center justify-center gap-2.5 transition-all duration-200 hover:scale-105 cursor-pointer border border-indigo-400/30"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Login to Portal</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Minimalist Footer Bar */}
      <div className="relative z-10 w-full py-4 px-6 border-t border-slate-800/60 bg-slate-950/60 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Patuakhali Science and Technology University (PSTU) — Department of CSIT.</p>
      </div>
    </div>
  );
}
