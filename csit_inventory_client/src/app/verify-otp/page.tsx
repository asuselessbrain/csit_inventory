import VerifyOtp from "@/components/modules/verifyOtp/VerifyOtp";
import { Suspense } from "react";

export default async function VerifyOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtp email={email} />
    </Suspense>
  );
}
