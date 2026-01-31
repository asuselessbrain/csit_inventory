import { getSingleTeacherProposal } from "@/services/proposalService";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { IProposal, SortOption } from "@/types";
import Link from "next/link";
import ProjectThesisAction from "@/components/modules/teacher/projectThesisAction/ProjectThesisAction";
import ReusableSearch from "@/components/shared/ReusableSearch";
import PaginationComponent from "@/components/shared/PaginationComponent";
import ReusableSorting from "@/components/shared/ReusableSorting";

const getStatusColor = (status?: string) => {
  switch (status) {
    case "APPROVED":
      return "bg-green-50";
    case "REJECTED":
      return "bg-red-50";
    case "PENDING":
    default:
      return "bg-yellow-50";
  }
};

const getStatusBadge = (status?: string) => {
  switch (status) {
    case "APPROVED":
      return "default";
    case "REJECTED":
      return "destructive";
    case "PENDING":
    default:
      return "secondary";
  }
};

export default async function ProposalsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }>;
}) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const limit = 10;

  const queryParams = {
    skip: page - 1,
    searchTerm: params.search,
    status: params.status,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    take: limit,
  };

  const response = await getSingleTeacherProposal(queryParams);
  const proposals = response?.data?.data || [];

  const sortOptions: SortOption[] = [
      { label: "Name (A → Z)", value: "projectTitle-asc" },
      { label: "Name (Z → A)", value: "projectTitle-desc" },
      { label: "Oldest first", value: "createdAt-asc" },
      { label: "Newest first", value: "createdAt-desc" },
    ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-360 mx-auto px-6 space-y-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Submitted Proposals
          </h1>
          <p className="mt-1 text-gray-600">
            View, review, and manage proposals submitted by students under your
            supervision
          </p>
        </div>

        <div className="flex items-center justify-between gap-6">
          <ReusableSearch placeholder="Search proposals..." />
          <ReusableSorting options={sortOptions} />
        </div>
        {/* Proposals Section */}
        <div className="space-y-4">
          {proposals.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No proposals to review
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {proposals.map((proposal: IProposal) => (
                <Card
                  key={proposal.id}
                  className={`border transition hover:shadow-sm`}
                >
                  <CardContent className="pt-5 space-y-4">
                    {/* Title & Status */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <h3 className="font-semibold text-base leading-snug">
                        {proposal.projectTitle}
                      </h3>

                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <Badge
                        variant={getStatusBadge(proposal.status)}
                        className="w-fit"
                      >
                        {proposal.status || "PENDING"}
                      </Badge>
                    </div>

                    {/* Student Info */}
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5">
                        <span className="font-medium text-foreground">
                          {proposal.student?.name || "Not assigned"}
                        </span>
                        {proposal.student?.studentId && (
                          <span>({proposal.student.studentId})</span>
                        )}
                      </div>

                      {proposal.createdAt && (
                        <p>
                          Submitted on{" "}
                          <span className="font-medium text-foreground">
                            {new Date(proposal.createdAt).toLocaleDateString()}
                          </span>
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col xl:flex-row gap-2">
                      <ProjectThesisAction proposal={proposal} />

                      <Link
                        href={`/teacher/proposals/${proposal?.id}`}
                        className="w-full sm:w-auto"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full sm:w-auto gap-2"
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
        <PaginationComponent totalPage={response.data.meta.totalPages} />
      </div>
    </div>
  );
}
