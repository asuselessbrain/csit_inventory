"use client"
import { Button } from "@/components/ui/button";
import { makeTaskInProgress } from "@/services/taskService";
import { useState } from "react";
import { toast } from "sonner";

export default function TaskAction({ id }: { id: string }) {
    const [loading, setLoading] = useState(false)

    const handleAcceptTask = async () => {
        setLoading(true);

        const res = await makeTaskInProgress(id);

        if (res.success) {
            toast.success(res.message || "Task accepted successfully");
        } else {
            toast.error(res.errorMessage || "Failed to accept the task");
        }

        setLoading(false);
    };
    return (
        <>
            <Button disabled={loading} onClick={handleAcceptTask} className="w-full cursor-pointer disabled:cursor-no-drop">
                {loading ? "Accepting..." : "Accept Task"}
            </Button>
        </>
    )
}
