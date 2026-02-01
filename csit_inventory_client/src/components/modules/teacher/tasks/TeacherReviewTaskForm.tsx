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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { completeTask } from "./TaskAcceptRejectResubmit";
import { toast } from "sonner";
import { toastId } from "@/components/shared/toastId";

export default function TeacherReviewTaskForm(task: { id: string }) {
  const [hoverRating, setHoverRating] = useState(0);

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

  const handleSubmitReview = async (data: FieldValues) => {
    await completeTask(task.id, data);
    reset();
  };

  if (isSubmitting) {
    toast.loading("Submitting review...", { id: toastId });
  }

  return (
    <DialogContent className="sm:max-w-lg">
      <form onSubmit={handleSubmit(handleSubmitReview)}>
        <DialogHeader>
          <DialogTitle>Review Task</DialogTitle>
          <DialogDescription>
            Provide your review for the task. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Controller
            name="rating"
            control={control}
            rules={{
              required: "Rating is required",
              min: { value: 1, message: "Please select at least 1 star" },
            }}
            render={({ field }) => (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => field.onChange(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoverRating || field.value)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {field.value > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    {
                      ["Poor", "Fair", "Good", "Very Good", "Excellent"][
                        field.value - 1
                      ]
                    }
                  </p>
                )}
                {errors.rating && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.rating.message}
                  </p>
                )}
              </div>
            )}
          />
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <div>
                <label
                  htmlFor="note"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Your Review
                </label>
                <Textarea
                  id="note"
                  placeholder="Write your review here..."
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
              {isSubmitting ? "Saving..." : "Mark as Done"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
