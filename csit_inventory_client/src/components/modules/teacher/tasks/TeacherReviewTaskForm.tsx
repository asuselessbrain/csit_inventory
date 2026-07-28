"use client";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Controller, FieldValues, useForm } from "react-hook-form";
import {
  allowResubmission,
  completeTask,
  rejectTask,
} from "./TaskAcceptRejectResubmit";
import { toast } from "sonner";
import { toastId } from "@/components/shared/toastId";
import { CheckCircle2, AlertCircle, RefreshCcw, Sparkles } from "lucide-react";

export default function TeacherReviewTaskForm({
  id,
  submissionTask: reviewForId,
  for: reviewFor,
}: {
  id: string;
  submissionTask?: string;
  for: string;
}) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      rating: reviewFor === "done" ? 100 : 0,
      note: "",
    },
    mode: "onChange",
  });

  const handleSubmitReview = async (data: FieldValues) => {
    data.updateLogId = reviewForId;
    data.rating = Number(data.rating ?? 0);
    console.log(data);
    if (reviewFor === "done") {
      await completeTask(id, data);
    }
    if (reviewFor === "resubmit") {
      await allowResubmission(id, data);
    }
    if (reviewFor === "reject") {
      await rejectTask(id, data);
    }
    reset();
  };

  if (isSubmitting) {
    toast.loading("Submitting review...", { id: toastId });
  }

  const getHeaderIcon = () => {
    if (reviewFor === "done")
      return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    if (reviewFor === "reject")
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    return <RefreshCcw className="w-5 h-5 text-blue-500" />;
  };

  return (
    <DialogContent className="w-[95vw] sm:max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
      <form onSubmit={handleSubmit(handleSubmitReview)} className="space-y-6">
        <DialogHeader className="space-y-1.5">
          <div className="flex items-center gap-2">
            {getHeaderIcon()}
            <DialogTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
              {reviewFor === "done"
                ? "Mark Task as Completed"
                : reviewFor === "reject"
                ? "Reject Task Submission"
                : "Allow Task Resubmission"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-slate-600 dark:text-slate-400">
            {reviewFor === "done"
              ? "Grade this submission and provide helpful feedback for the student."
              : "Explain why this submission needs improvement or re-submission."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          {reviewFor === "done" && (
            <Controller
              name="rating"
              control={control}
              rules={{
                required: "Percentage score is required",
                min: { value: 0, message: "Minimum mark is 0%" },
                max: { value: 100, message: "Maximum mark is 100%" },
              }}
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-slate-100">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    Task Score / Percentage (0 - 100%)
                  </label>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Assign a completion quality mark. This influences overall project progress.
                  </p>
                  
                  <div className="flex items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 overflow-hidden transition-all duration-200 shadow-inner max-w-xs">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const val = e.target.value === "" ? 0 : Number(e.target.value);
                        field.onChange(val);
                      }}
                      className="w-full bg-transparent px-4 py-2.5 text-lg font-bold text-slate-900 dark:text-emerald-400 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      placeholder="e.g. 85"
                    />
                    <div className="bg-slate-200 dark:bg-slate-700/80 px-4 py-2.5 border-l border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-base select-none">
                      %
                    </div>
                  </div>

                  <div className="pt-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-2">
                      Quick Select:
                    </span>
                    <div className="inline-flex flex-wrap gap-1.5 mt-1">
                      {[100, 90, 80, 75, 60, 50, 0].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => field.onChange(preset)}
                          className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                            field.value === preset
                              ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20 scale-105"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                          }`}
                        >
                          {preset}%
                        </button>
                      ))}
                    </div>
                  </div>

                  {errors.rating && (
                    <p className="text-xs text-red-500 dark:text-red-400 font-medium pt-1">
                      {String(errors.rating.message)}
                    </p>
                  )}
                </div>
              )}
            />
          )}

          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="note"
                    className="text-sm font-bold text-slate-900 dark:text-slate-100"
                  >
                    Your Review / Feedback
                  </label>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {field.value?.length || 0} chars
                  </span>
                </div>
                <Textarea
                  id="note"
                  placeholder="Write detailed review or remarks here for the student..."
                  {...field}
                  rows={4}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 p-3.5 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none shadow-inner"
                />
                {errors.note && (
                  <p className="text-xs text-red-500 dark:text-red-400 font-medium">
                    {String(errors.note.message)}
                  </p>
                )}
              </div>
            )}
          />
        </div>

        <DialogFooter className="flex flex-col sm:flex-row items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <DialogClose asChild>
            <Button
              variant="outline"
              type="button"
              className="w-full sm:w-auto border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer"
            >
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              disabled={isSubmitting}
              type="submit"
              className={`w-full sm:w-auto cursor-pointer font-semibold shadow-md transition-all ${
                reviewFor === "done"
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20"
                  : reviewFor === "reject"
                  ? "bg-red-600 hover:bg-red-700 text-white shadow-red-600/20"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20"
              }`}
            >
              {isSubmitting
                ? "Processing..."
                : reviewFor === "done"
                ? "Mark as Done"
                : reviewFor === "resubmit"
                ? "Allow Resubmission"
                : "Mark as Failed"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
