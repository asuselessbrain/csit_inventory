import { Metadata } from "next";
import AddTeacherForm from "@/components/modules/admin/addTeacher/AddTeacherForm";

export const metadata: Metadata = {
  title: "Add Teacher | Admin Dashboard",
  description: "Add a new teacher to the system",
};

export default function AddTeacherPage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-slate-900 to-indigo-600 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent mb-2">
            Add New Teacher
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Register a new faculty member to the system
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          <AddTeacherForm />
        </div>
      </div>
    </div>
  );
}
