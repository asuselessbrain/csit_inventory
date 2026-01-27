"use client"

import { useState, useEffect } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IProposal } from "@/types";
import UpdateProposal from "./UpdateProposal";

export function ResubmitProposalDialog({ proposal }: { proposal: IProposal }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // defer to next microtask
        Promise.resolve().then(() => setMounted(true));
    }, []);

    if (!mounted) return null;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="ml-1">
                    Re-submit Proposal
                </Button>
            </DialogTrigger>
            <UpdateProposal proposal={proposal} />
        </Dialog>
    );
}
