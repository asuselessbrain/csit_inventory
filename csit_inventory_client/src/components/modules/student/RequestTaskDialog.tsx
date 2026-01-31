"use client";

import { toastId } from "@/components/shared/toastId";
import { Button } from "@/components/ui/button";
import { requestForTask } from "@/services/proposalService";
import { toast } from "sonner";

export function RequestTaskDialog({ proposalId }: { proposalId: string }) {
  const handleRequest = async () => {
    const request = await requestForTask(proposalId);

    if (request.success) {
      toast.success(
        request.message ||
          "Your request to assign the task has been sent successfully.",
        {
          id: toastId,
        },
      );
    }
    if (!request.success) {
      toast.error(
        request.errorMessage ||
          "Failed to send the task assignment request. Please try again.",
        {
          id: toastId,
        },
      );
    }
  };

  return (
    <Button onClick={handleRequest} size="sm">
      Request Task
    </Button>
  );
}
