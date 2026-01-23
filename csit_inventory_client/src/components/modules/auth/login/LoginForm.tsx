"use client"

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/authService";
import { useRouter } from "next/navigation";
import { Controller, FieldValues, useForm } from "react-hook-form"
import { toast } from "sonner";

export default function LoginForm() {
    const form = useForm();
    const router = useRouter()

    const { formState: { isSubmitting } } = form;

    const toastId = "login-toast";

    const handleLogin = async (data: FieldValues) => {
        const res = await loginUser(data);
        if (isSubmitting) {
            toast.loading("Signing In...", { id: toastId });
        }

        if (res.success) {
            toast.success(res.data.message, { id: toastId });
            router.push(`/verify-otp?email=${data.email}`)
        }

        if (!res.success) {
            toast.error(res.errorMessage || "Login Failed Due to Unknown Error", { id: toastId })
        }
    }
    return (
        <form className="space-y-5" onSubmit={form.handleSubmit(handleLogin)}>
            {/* Email Field */}
            <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="you@example.com"
                            autoComplete="off"
                            type="email"
                            value={field.value || ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {/* Password Field */}
            <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="••••••••"
                            autoComplete="off"
                            type="password"
                            value={field.value || ""}
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            <p className="font-semibold underline text-blue-500 flex items-center justify-end">Forget Password</p>

            {/* Sign In Button */}
            <Button type="submit" disabled={isSubmitting} className="w-full cursor-pointer disabled:cursor-no-drop">{isSubmitting ? "Signing In..." : "Sign In"}</Button>
        </form>
    )
}
