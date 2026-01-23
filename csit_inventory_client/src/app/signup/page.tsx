import RegistrationForm from "@/components/modules/auth/registration/RegistrationForm";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 transition-colors p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-4xl">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-linear-to-r from-indigo-400 to-blue-400 dark:from-indigo-600 dark:to-blue-600 rounded-full blur-lg opacity-30"></div>
                            <Image
                                width={80}
                                height={80}
                                src="https://res.cloudinary.com/dwduymu1l/image/upload/v1769187917/Patuakhali_Science_and_Technology_University_logo_rv2zwu.png"
                                alt="Patuakhali_Science_and_Technology_University"
                                className="relative mx-auto h-20 w-20"
                            />
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-slate-900 to-indigo-600 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent mb-2">
                        Create Account
                    </h1>
                    <p className="text-base text-slate-600 dark:text-slate-300">
                        Join our inventory management system in just a few steps
                    </p>
                </div>

                {/* Form Container */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 p-6 sm:p-8">

                    <RegistrationForm />
                    <p className="text-center text-slate-700 dark:text-slate-300 mt-6">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}