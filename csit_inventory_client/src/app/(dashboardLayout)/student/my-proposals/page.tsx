import { getSingleStudentProposal } from "@/services/proposalService";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { ICourse, IProposal, SortOption } from "@/types";
import PaginationComponent from "@/components/shared/PaginationComponent";
import ReusableSearch from "@/components/shared/ReusableSearch";
import ReusableSorting from "@/components/shared/ReusableSorting";
import UnifiedFilter from "@/components/shared/UnifiedFilter";
import DownloadReportButton from "@/components/shared/DownloadButton";

export default async function MyProposalsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    status?: string;
    sortBy?: string;
    type?: string;
    courseId?: string;
    sortOrder?: "asc" | "desc";
  }>;
}) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const limit = 9;

  const queryParams = {
    skip: page - 1,
    searchTerm: params.search,
    status: params.status,
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    type: params.type,
    courseId: params.courseId,
    take: limit,
  };

  const response = await getSingleStudentProposal(queryParams);
  const proposals = response?.data?.data || [];

  const sortOptions: SortOption[] = [
    { label: "Name (A → Z)", value: "projectTitle-asc" },
    { label: "Name (Z → A)", value: "projectTitle-desc" },
    { label: "Oldest first", value: "createdAt-asc" },
    { label: "Newest first", value: "createdAt-desc" },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-360 mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">My Proposals</h1>
          <div className="w-full sm:w-auto">
            <DownloadReportButton forWho="student" queryParams={queryParams} />
          </div>
        </div>

        <>
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-start gap-3 sm:gap-4">
            <ReusableSearch placeholder="Search proposals..." />
            <UnifiedFilter
              filters={[
                {
                  title: "Type",
                  queryKey: "type",
                  options: [
                    { id: "PROJECT", name: "Project" },
                    { id: "THESIS", name: "Thesis" },
                  ],
                },
                {
                  title: "Status",
                  queryKey: "status",
                  options: [
                    { id: "PENDING", name: "Pending" },
                    { id: "APPROVED", name: "Approved" },
                    { id: "REJECTED", name: "Rejected" },
                    { id: "in_PROGRESS", name: "In Progress" },
                    { id: "COMPLETED", name: "Completed" },
                  ],
                },
              ]}
            />
            <ReusableSorting options={sortOptions} />
          </div>
          {/* Proposals List */}
          {proposals.length === 0 ? (
            <div className="min-h-screen bg-muted/40">
              <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="space-y-4">
                  <h1 className="text-2xl font-semibold">My Proposals</h1>
                  <Alert variant="default">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      No proposals found.{" "}
                      <Link href="/student/submit-proposal">
                        <Button variant="link" className="px-0">
                          Submit your first proposal
                        </Button>
                      </Link>
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6">
              {proposals.map((proposal: IProposal) => (
                <Card key={proposal.id} className="border flex flex-col justify-between">
                  <CardContent className="pt-5 flex-1">
                    <div className="space-y-3">
                      {/* Title with Badge */}
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="text-base sm:text-lg font-semibold leading-snug flex-1 break-words min-w-0">
                          {proposal.projectTitle}
                        </h2>
                        <Badge
                          variant="secondary"
                          className="whitespace-nowrap shrink-0"
                        >
                          {proposal.type || "PROJECT"}
                        </Badge>
                      </div>

                      {/* Info Lines */}
                      <div className="space-y-1 text-sm text-muted-foreground">
                        {proposal.courseId && (
                          <>
                            <p>
                              <span className="font-medium text-foreground">
                                Course Code:
                              </span>{" "}
                              {proposal.course.courseCode}
                            </p>
                            <p>
                              <span className="font-medium text-foreground">
                                Course Title:
                              </span>{" "}
                              {proposal.course.courseName}
                            </p>
                          </>
                        )}
                        {proposal.supervisorId && (
                          <p>
                            <span className="font-medium text-foreground">
                              Supervisor:
                            </span>{" "}
                            {proposal.supervisor.name}
                          </p>
                        )}
                        {proposal.createdAt && (
                          <p>
                            <span className="font-medium text-foreground">
                              Submitted:
                            </span>{" "}
                            {new Date(proposal.createdAt).toLocaleDateString()}
                          </p>
                        )}
                        {proposal.updatedAt && (
                          <p>
                            <span className="font-medium text-foreground">
                              Updated:
                            </span>{" "}
                            {new Date(proposal.updatedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  {/* Action Buttons */}
                  <CardFooter className="flex flex-col sm:flex-row flex-wrap gap-2 pt-4 border-t border-gray-100">
                    <Link href={`/student/my-proposals/${proposal?.id}`} className="w-full sm:flex-1">
                      <Button size="sm" className="w-full justify-center">View Full Details</Button>
                    </Link>
                    <Button size="sm" variant="outline" className="w-full sm:w-auto justify-center">
                      Download Proposal
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          <div>
            <PaginationComponent totalPage={response?.data?.meta?.totalPages} />
          </div>
        </>
      </div>
    </div>
  );
}
