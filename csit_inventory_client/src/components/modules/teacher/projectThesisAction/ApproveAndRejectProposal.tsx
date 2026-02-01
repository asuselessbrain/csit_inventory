import { toastId } from "@/components/shared/toastId";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { approveProposal, rejectProposal } from "@/services/proposalService";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ApproveAndRejectProposal({
  approve,
  reject,
  id,
}: {
  approve?: string;
  reject?: string;
  id: string;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      rating: 0,
      note: "",
    },
    mode: "onChange",
  });

  const handleApproveRejectProposal = async (data: FieldValues) => {
    if (approve) {
      const res = await approveProposal(id, data);

      if (res.success) {
        toast.success(res.message || "Proposal approved successfully.", {
          id: toastId,
        });
        reset();
      } else {
        toast.error(res.errorMessage || "Failed to approve the proposal.", {
          id: toastId,
        });
        reset();
      }
    }

    if (reject) {
      const res = await rejectProposal(id, data);

      if (res.success) {
        toast.success(res.message || "Proposal rejected successfully.", {
          id: toastId,
        });
        reset();
      } else {
        toast.error(res.errorMessage || "Failed to reject the proposal.", {
          id: toastId,
        });
        reset();
      }
    }
  };

  if (isSubmitting) {
    toast.loading("Submitting...", { id: toastId });
  }

  return (
    <DialogContent className="sm:max-w-sm">
      <form onSubmit={handleSubmit(handleApproveRejectProposal)}>
        <DialogHeader>
          <DialogTitle>
            {approve ? "Approve Proposal" : "Reject Proposal"}
          </DialogTitle>
          <DialogDescription>
            {approve
              ? "Are you sure you want to approve this proposal?"
              : "Are you sure you want to reject this proposal?"}
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <div>
                <label
                  htmlFor="note"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Your Note
                </label>
                <Textarea
                  id="note"
                  placeholder={
                    approve
                      ? "Write your note for approving this proposal..."
                      : "Write your reason for rejecting this proposal..."
                  }
                  {...field}
                  rows={5}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-2">
                  {field.value.length} characters
                </p>
                {errors.note && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.note.message}
                  </p>
                )}
              </div>
            )}
          />
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Submitting..." : approve ? "Approve" : "Reject"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
