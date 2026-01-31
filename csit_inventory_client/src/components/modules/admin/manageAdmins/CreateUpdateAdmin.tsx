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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { IAdmin } from "@/types";
import { Controller, FieldValues, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useMemo } from "react";
import Image from "next/image";
import { updateAdmin } from "@/services/adminService";
import { toastId } from "@/components/shared/toastId";

interface AdminModalProps {
  admin?: IAdmin;
}

export default function AdminModal({ admin }: AdminModalProps) {
  const isUpdate = !!admin;

  const form = useForm({
    defaultValues: {
      name: admin?.name || "",
      email: admin?.email || "",
      password: "",
      confirmPassword: "",
      phoneNumber: admin?.phoneNumber || "",
      photoUrl: undefined as File | undefined,
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const photoFile = useWatch({ control, name: "photoUrl" });

  const preview = useMemo(() => {
    if (photoFile instanceof File) {
      return URL.createObjectURL(photoFile);
    } else if (isUpdate && admin?.photoUrl) {
      return admin.photoUrl;
    }
    return null;
  }, [photoFile, isUpdate, admin?.photoUrl]);

  const handleSaveAdmin = async (data: FieldValues) => {
    const image = data.photoUrl;
    if (data.photoUrl) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "my_preset");
      formData.append("resource_type", "auto");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwduymu1l/auto/upload",
        { method: "POST", body: formData },
      );

      const imageData = await res.json();

      data.photoUrl = imageData.secure_url;
    }

    if (isUpdate) {
      const payload = {
        name: data.name,
        phoneNumber: data.phoneNumber,
        photoUrl: data.photoUrl,
      };
      const res = await updateAdmin(admin.id, payload);

      if (res.success) {
        toast.success(res.message || "Admin updated successfully", {
          id: toastId,
        });
      } else {
        toast.error(res.errorMessage || "Failed to update admin", {
          id: toastId,
        });
      }
    }
  };

  return (
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-gray-900">
          {isUpdate ? "Update Admin" : "Create Admin"}
        </DialogTitle>
        <DialogDescription className="text-gray-600">
          {isUpdate
            ? "Modify admin details and click save to update"
            : "Fill in the details and click save to create a new admin"}
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleSaveAdmin)} className="space-y-6 py-4">
        {/* Full Name */}
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="e.g., Mahbubur Rahman"
                value={field.value || ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="email"
                placeholder="e.g., admin@example.com"
                value={field.value || ""}
                disabled={isUpdate}
                className={isUpdate ? "bg-gray-50" : ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Password fields (only for create) */}
        {!isUpdate && (
          <>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id={field.name}
                    placeholder="Enter a strong password"
                    value={field.value || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id={field.name}
                    placeholder="Re-enter the password"
                    value={field.value || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </>
        )}

        {/* Phone Number */}
        <Controller
          name="phoneNumber"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
              <Input
                {...field}
                id={field.name}
                placeholder="e.g., +8801711223344"
                value={field.value || ""}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Photo Upload */}
        <Controller
          name="photoUrl"
          control={control}
          render={({ field: { onChange, value, ...field }, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="photoUrl">
                Upload Photo (optional)
              </FieldLabel>
              <Input
                {...field}
                type="file"
                id="photoUrl"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onChange(file);
                  }
                }}
                value={undefined}
              />
              {preview && (
                <div className="mt-2">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={128}
                    height={128}
                    className="w-32 h-32 object-cover rounded border"
                  />
                </div>
              )}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Footer Buttons */}
        <DialogFooter className="flex gap-3">
          <DialogClose asChild>
            <Button variant="outline" disabled={isSubmitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="disabled:cursor-no-drop"
          >
            {isSubmitting
              ? "Saving..."
              : isUpdate
                ? "Save Changes"
                : "Create Admin"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
