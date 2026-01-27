import { getSingleTeacherProposal } from "@/services/proposalService"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Eye } from "lucide-react"
import { IProposal } from "@/types"
import Link from "next/link"

const getStatusColor = (status?: string) => {
    switch (status) {
        case "APPROVED":
            return "bg-green-50"
        case "REJECTED":
            return "bg-red-50"
        case "PENDING":
        default:
            return "bg-yellow-50"
    }
}

const getStatusBadge = (status?: string) => {
    switch (status) {
        case "APPROVED":
            return "default"
        case "REJECTED":
            return "destructive"
        case "PENDING":
        default:
            return "secondary"
    }
}

export default async function ProposalsPage() {
    const response = await getSingleTeacherProposal()
    const proposals = response?.data?.data || []

    const totalProposals = proposals.length
    const pendingProposals = proposals.filter((p: IProposal) => p.status === "PENDING").length

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-360 mx-auto px-6 space-y-8">

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="bg-white">
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Courses</p>
                                <p className="text-2xl font-bold">3</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white">
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Students</p>
                                <p className="text-2xl font-bold">{totalProposals}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white">
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Pending Proposals</p>
                                <p className="text-2xl font-bold">{pendingProposals}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white">
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">Tasks to Review</p>
                                <p className="text-2xl font-bold">7</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Proposals Section */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Student Proposals</h2>

                    {proposals.length === 0 ? (
                        <Card>
                            <CardContent className="pt-6 text-center text-muted-foreground">
                                No proposals to review
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {proposals.map((proposal: IProposal) => (
                                <Card key={proposal.id} className={`border ${getStatusColor(proposal.status)} bg-green`}>
                                    <CardContent className="pt-6 space-y-4">

                                        {/* Title and Status */}
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="font-semibold text-base flex-1">{proposal.projectTitle}</h3>
                                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                            <Badge variant={getStatusBadge(proposal.status) as any}>
                                                {proposal.status || "PENDING"}
                                            </Badge>
                                        </div>

                                        {/* Student and ID Info */}
                                        <div className="text-sm text-muted-foreground space-y-1">
                                            <div className="flex items-center gap-1">
                                                <p>Student: {proposal.student.name || "Not assigned"}</p>
                                                <p>({proposal.student.studentId})</p>
                                            </div>
                                            {proposal.createdAt && (
                                                <p>Submitted: {new Date(proposal.createdAt).toLocaleDateString()}</p>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 flex-wrap">
                                            <Button
                                                size="sm"
                                                className="gap-2"
                                            >
                                                <CheckCircle2 className="h-4 w-4" />
                                                Approve & Assign Tasks
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                className="gap-2"
                                            >
                                                <XCircle className="h-4 w-4" />
                                                Reject
                                            </Button>
                                            <Link href={`/teacher/proposals/${proposal?.id}`}>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="gap-2"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                    View Details
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
