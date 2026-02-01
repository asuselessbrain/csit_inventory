"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  approveProposal,
  completeProject,
  rejectProposal,
} from "@/services/proposalService";
import { IProposal } from "@/types";
import {
  CheckCheck,
  CheckCircle2,
  ClipboardList,
  Clock,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import AssignTask from "../tasks/AssignTask";
import { toastId } from "@/components/shared/toastId";
import ApproveAndRejectProposal from "./ApproveAndRejectProposal";

export default function ProjectThesisAction({
  proposal,
}: {
  proposal: IProposal;
}) {
  const markAsComplete = async () => {
    const res = await completeProject(proposal.id);

    if (res.success) {
      toast.success(
        res.message || "Project marked as completed successfully.",
        {
          id: toastId,
        },
      );
    } else {
      toast.error(
        res.errorMessage || "Failed to mark the project as completed.",
        {
          id: toastId,
        },
      );
    }
  };

  return (
    <>
      {proposal.status === "PENDING" ? (
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Approve & Assign Tasks
              </Button>
            </DialogTrigger>
            <ApproveAndRejectProposal approve="approve" id={proposal.id} />
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="destructive" className="gap-2">
                <XCircle className="h-4 w-4" />
                Reject
              </Button>
            </DialogTrigger>
            <ApproveAndRejectProposal reject="reject" id={proposal.id} />
          </Dialog>
        </div>
      ) : proposal.status === "APPROVED" ? (
        <div className="flex items-center gap-2 rounded-md border bg-muted px-3 py-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>
            Proposal approved. Waiting for the student to request task
            assignment.
          </span>
        </div>
      ) : proposal.status === "REJECTED" ? (
        <div className="flex items-center gap-2 rounded-md border bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <XCircle className="h-4 w-4" />
          <span>This proposal has been rejected.</span>
        </div>
      ) : proposal.status === "in_PROGRESS" ? (
        <div className="flex items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2">
                <ClipboardList className="h-4 w-4" />
                Assign Task
              </Button>
            </DialogTrigger>
            <AssignTask proposal={proposal} />
          </Dialog>

          <Button
            onClick={markAsComplete}
            size="sm"
            variant="outline"
            className="gap-2"
          >
            <CheckCheck className="h-4 w-4" />
            Mark as Completed
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-green-700 font-medium">
          <CheckCheck className="h-4 w-4" />
          Project Completed
        </div>
      )}
    </>
  );
}
