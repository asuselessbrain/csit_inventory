import { RequestTaskDialog } from "@/components/modules/student/RequestTaskDialog";
import { ResubmitProposalDialog } from "@/components/modules/student/updateProposal/ResubmitProposalDialog";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { getSingleProposal } from "@/services/proposalService";
import parse from "html-react-parser";

const parseBold = (text: string) => {
    return parse(
        text.replace(/\[bold\](.*?)\[\/bold\]/g, "<strong>$1</strong>").replace(/\\n/g, "\n")
            .replace(/\n/g, "<br/>")
    );
};

export default async function ProposalDetails({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const proposal = await getSingleProposal(slug)

    return (
        <div className="max-w-7xl mx-auto p-6 sm:p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                    <h1 className="text-3xl font-bold">{proposal.data.course.courseName}</h1>
                    <p className="text-sm text-slate-500">Course Code: {proposal.data.course.courseCode}</p>
                    <p className="text-sm text-slate-500">Semester: {proposal.data.semester}</p>
                </div>
                <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-2">
                    {/* Status Badge */}
                    <Badge
                        variant={
                            proposal.data.status === "PENDING"
                                ? "destructive"
                                : proposal.data.status === "APPROVED"
                                    ? "default"
                                    : "secondary"
                        }
                        className="uppercase text-xs"
                    >
                        {proposal.data.status}
                    </Badge>

                    {/* Type Badge */}
                    <Badge variant="secondary" className="text-xs">
                        {proposal.data.type}
                    </Badge>

                    {/* Actions */}
                    {proposal.data.status === "APPROVED" && (
                        <RequestTaskDialog proposalId={proposal.data.id} />
                    )}

                    {proposal.data.status === "REJECTED" && (
                        <ResubmitProposalDialog proposal={proposal.data} />
                    )}
                </div>
            </div>

            {/* Project Title */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Project Title</h2>
                <p>{proposal.data.projectTitle}</p>
            </section>

            {/* Abstract */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Abstract</h2>
                <div className="prose max-w-none">
                    {parseBold(proposal.data.abstract)}
                </div>
            </section>

            {/* Project Objectives */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Project Objectives</h2>
                <ul className="list-disc list-inside space-y-1">
                    {proposal.data.projectObjectives.split("\n\n").map((obj: string, idx: number) => (
                        <li key={idx}>{obj}</li>
                    ))}
                </ul>
            </section>

            {/* Methodology */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Methodology</h2>
                <ul className="list-disc list-inside space-y-1">
                    {proposal.data.methodology.split("\n\n").map((m: string, idx: number) => (
                        <li key={idx}>{m}</li>
                    ))}
                </ul>
            </section>

            {/* Expected Outcomes */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Expected Outcomes</h2>
                <ul className="list-disc list-inside space-y-1">
                    {proposal.data.expectedOutcomes.split("\n\n").map((eo: string, idx: number) => (
                        <li key={idx}>{eo}</li>
                    ))}
                </ul>
            </section>

            {/* Technologies & Tools */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Technologies & Tools</h2>
                <div className="flex flex-wrap gap-2">
                    {proposal.data.technologiesTools.map((tech: string, idx: number) => (
                        <Badge key={idx} variant="secondary">
                            {tech.trim()}
                        </Badge>
                    ))}
                </div>
            </section>

            {/* Estimated Timeline */}
            <section>
                <h2 className="text-xl font-semibold mb-2">Estimated Timeline</h2>
                <p>{proposal.data.estimatedTimeline}</p>
            </section>

            {/* Student & Supervisor */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Student</h2>
                    <p>Name: {proposal.data.student.name}</p>
                    <p>Email: {proposal.data.student.email}</p>
                    <p>Phone: {proposal.data.student.phoneNumber}</p>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Supervisor</h2>
                    <p>Name: {proposal.data.supervisor.name}</p>
                    <p>Email: {proposal.data.supervisor.email}</p>
                    <p>Phone: {proposal.data.supervisor.phoneNumber}</p>
                </div>
            </section>

            {/* Attachments */}
            {proposal.data.attachments.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold mb-2">Attachments</h2>
                    <div className="flex flex-col gap-2">
                        {proposal.data.attachments.map((att: string, idx: number) => (
                            <a
                                key={idx}
                                href={att}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {att.split("/").pop()}
                            </a>
                        ))}
                    </div>
                </section>
            )}

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-500">
                Created At: {new Date(proposal.data.createdAt).toLocaleDateString()}
            </div>
        </div>
    )
}
