import { verifyEmail } from "@/services/authService";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; email?: string }>;
}) {
  const params = await searchParams;

  const res = await verifyEmail({
    token: params.token || "",
    email: params.email || "",
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
        {res.success ? (
          <>
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Email Verified 🎉
            </h1>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified.  
              You can now log in to your account.
            </p>

            <Link
              href="/login"
              className="inline-block w-full rounded-xl bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition"
            >
              Go to Login
            </Link>
          </>
        ) : (
          <>
            <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Verification Failed 😕
            </h1>
            <p className="text-gray-600 mb-6">
              The verification link is invalid or has expired.
              Please try again or request a new verification email.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/resend-verification"
                className="w-full rounded-xl bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700 transition"
              >
                Resend Verification Email
              </Link>

              <Link
                href="/"
                className="w-full rounded-xl border border-gray-300 px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Go to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
