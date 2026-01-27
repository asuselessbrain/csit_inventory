"use client"

import { Button } from "@/components/ui/button";
import { approveProposal, rejectProposal } from "@/services/proposalService";
import { IProposal } from "@/types";
import { CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function ProjectThesisAction({ proposal }: { proposal: IProposal }) {
    const approve = async () => {
        const approve = await approveProposal(proposal.id)

        if (approve.success) {
            toast.success(approve.message || "Course Approved")
        }
        if (!approve.success) {
            toast.success(approve.errorMessage || "Course Approved Failed")
        }
    }

    const reject = async () => {
        const reject = await rejectProposal(proposal.id)

        if (reject.success) {
            toast.success(reject.message || "Course Rejected")
        }
        if (!reject.success) {
            toast.success(reject.errorMessage || "Course Rejection Failed")
        }
    }
    return (
        <section className="border rounded-md p-4 space-y-2">
            <h2 className="text-lg font-medium">Actions</h2>
            {
                proposal.status === "PENDING" ? <div className="flex items-center gap-4">
                    <Button
                        onClick={approve}
                        size="sm"
                        className="gap-2"
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        Approve & Assign Tasks
                    </Button>
                    <Button
                        onClick={reject}
                        size="sm"
                        variant="destructive"
                        className="gap-2"
                    >
                        <XCircle className="h-4 w-4" />
                        Reject
                    </Button></div> :
                    <></>
            }
        </section>
    )
}
