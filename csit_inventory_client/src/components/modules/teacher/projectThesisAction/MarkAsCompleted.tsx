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
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { completeProject } from "@/services/proposalService";
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const markSchema = z.object({
  evaluatedMark: z.number().min(0, "Mark must be at least 0"),
});

type MarkFormValues = z.infer<typeof markSchema>;

export default function MarkAsCompleted({
  id,
}: {
  id: string;
}) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<MarkFormValues>({
    resolver: zodResolver(markSchema),
    defaultValues: {
      evaluatedMark: 100,
    },
    mode: "onChange",
  });

  const handleMarkAsComplete: SubmitHandler<MarkFormValues> = async (data) => {
    const res = await completeProject(id, data.evaluatedMark);

    if (res.success) {
      toast.success(res.message || "Project marked as completed successfully.", {
        id: toastId,
      });
      reset();
    } else {
      toast.error(res.errorMessage || "Failed to mark the project as completed.", {
        id: toastId,
      });
      reset();
    }
  };

  if (isSubmitting) {
    toast.loading("Submitting...", { id: toastId });
  }

  return (
    <DialogContent className="w-[95vw] sm:max-w-sm max-h-[90vh] overflow-y-auto rounded-xl p-4 sm:p-6">
      <form onSubmit={handleSubmit(handleMarkAsComplete)}>
        <DialogHeader>
          <DialogTitle>Mark as Completed</DialogTitle>
          <DialogDescription>
            Enter the evaluation marks for this project/thesis. The student's obtained marks will be calculated based on their overall progress.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup className="mt-4">
          <Controller
            name="evaluatedMark"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="evaluatedMark">Evaluation Marks (Total Marks)</FieldLabel>
                <Input
                  type="number"
                  id="evaluatedMark"
                  placeholder="e.g. 100"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 mt-6">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full sm:w-auto">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button disabled={isSubmitting} type="submit" className="w-full sm:w-auto">
              {isSubmitting ? "Submitting..." : "Complete Project"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
