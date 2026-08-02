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
import MarkAsCompleted from "./MarkAsCompleted";

export default function ProjectThesisAction({
  proposal,
}: {
  proposal: IProposal;
}) {

  return (
    <>
      {proposal.status === "PENDING" ? (
        <div className="flex flex-wrap items-center gap-4 w-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2 flex-1 min-w-[160px] justify-center cursor-pointer">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Approve & Assign Tasks</span>
              </Button>
            </DialogTrigger>
            <ApproveAndRejectProposal approve="approve" id={proposal.id} />
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="destructive" className="gap-2 flex-1 min-w-[120px] justify-center cursor-pointer">
                <XCircle className="h-4 w-4 shrink-0" />
                <span>Reject</span>
              </Button>
            </DialogTrigger>
            <ApproveAndRejectProposal reject="reject" id={proposal.id} />
          </Dialog>
        </div>
      ) : proposal.status === "APPROVED" ? (
        <div className="flex items-start gap-2 rounded-md border bg-muted px-3 py-2 text-xs sm:text-sm text-muted-foreground w-full">
          <Clock className="h-4 w-4 shrink-0 mt-0.5" />
          <span>
            Proposal approved. Waiting for the student to request task
            assignment.
          </span>
        </div>
      ) : proposal.status === "REJECTED" ? (
        <div className="flex items-start gap-2 rounded-md border bg-destructive/10 px-3 py-2 text-xs sm:text-sm text-destructive w-full">
          <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>This proposal has been rejected.</span>
        </div>
      ) : proposal.status === "in_PROGRESS" ? (
        <div className="flex flex-wrap items-center gap-4 w-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-2 flex-1 min-w-[130px] justify-center cursor-pointer">
                <ClipboardList className="h-4 w-4 shrink-0" />
                <span>Assign Task</span>
              </Button>
            </DialogTrigger>
            <AssignTask proposal={proposal} />
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="gap-2 flex-1 min-w-[140px] justify-center cursor-pointer"
              >
                <CheckCheck className="h-4 w-4 shrink-0" />
                <span>Mark as Completed</span>
              </Button>
            </DialogTrigger>
            <MarkAsCompleted id={proposal.id} />
          </Dialog>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-green-700 font-medium text-sm sm:text-base w-full">
          <CheckCheck className="h-4 w-4 shrink-0" />
          <span>Project Completed</span>
        </div>
      )}
    </>
  );
}
