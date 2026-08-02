import ProjectThesisAction from "@/components/modules/teacher/projectThesisAction/ProjectThesisAction";
import DownloadReportButton from "@/components/shared/DownloadButton";
import UnifiedFilter from "@/components/shared/UnifiedFilter";
import ReusableSearch from "@/components/shared/ReusableSearch";
import ReusableSorting from "@/components/shared/ReusableSorting";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getSingleTeacherProposal } from "@/services/proposalService";
import { ICourse, IProposal, SortOption } from "@/types";
import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";
import { getStatusBadge } from "../../teacher/proposals/page";
import PaginationComponent from "@/components/shared/PaginationComponent";

export default async function TeacherProjectThesisCollectionPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sortBy?: string;
    type?: string;
    courseId?: string;
    session?: string;
    sortOrder?: "asc" | "desc";
  }>;
}) {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const limit = 10;

  const queryParams = {
    skip: page - 1,
    searchTerm: params.search,
    status: "COMPLETED",
    sortBy: params.sortBy,
    sortOrder: params.sortOrder,
    "student.session": params.session,
    courseId: params.courseId,
    type: params.type,
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
    <div className="min-h-screen py-6 sm:py-8">
      <div className="max-w-360 mx-auto px-3 sm:px-6 space-y-6 sm:space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
              Project/Thesis Collections
            </h1>
            <p className="mt-1 text-sm sm:text-base text-gray-600">
              View your completed projects and theses
            </p>
          </div>
          <div className="w-full md:w-auto">
            <DownloadReportButton
              forWho="teacher"
              queryParams={queryParams}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-start gap-3 sm:gap-4">
          <ReusableSearch placeholder="Search completed projects..." />
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
                title: "Session",
                queryKey: "session",
                options: [
                  { id: "2020-21", name: "2020-21" },
                  { id: "2021-22", name: "2021-22" },
                  { id: "2022-23", name: "2022-23" },
                  { id: "2023-24", name: "2023-24" },
                ],
              },
            ]}
          />
          <ReusableSorting options={sortOptions} />
        </div>
        {/* Proposals Section */}
        <div className="space-y-4">
          {proposals.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                No completed projects found
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {proposals.map((proposal: IProposal) => (
                <Card
                  key={proposal.id}
                  className={`border transition hover:shadow-sm`}
                >
                  <CardContent className="pt-5 space-y-4">
                    {/* Title & Status */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <h3 className="font-semibold text-base sm:text-lg leading-snug break-words flex-1 min-w-0">
                        {proposal.projectTitle}
                      </h3>

                      <Badge
                        variant={getStatusBadge(proposal.status)}
                        className="w-fit whitespace-nowrap"
                      >
                        {proposal.status || "COMPLETED"}
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

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">
                          Progress ({proposal.overallProgress}%)
                        </span>
                      </div>
                      <Progress
                        value={proposal.overallProgress}
                        className="h-2"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 pt-2 border-t border-gray-100">
                      <Link
                        href={`/teacher/proposals/${proposal?.id}`}
                        className="w-full sm:w-auto sm:ml-auto"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full sm:w-auto gap-2 justify-center"
                        >
                          <Eye className="h-4 w-4 shrink-0" />
                          <span>View Details</span>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        <PaginationComponent totalPage={response?.data?.meta?.totalPages || 0} />
      </div>
    </div>
  );
}
