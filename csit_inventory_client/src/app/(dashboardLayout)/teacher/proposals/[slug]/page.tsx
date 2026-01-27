import ProjectThesisAction from "@/components/modules/teacher/projectThesisAction/ProjectThesisAction";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { approveProposal, getSingleProposal } from "@/services/proposalService"
import { CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

const formatEnum = (value?: string) => {
    if (!value) return "";
    return value
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase());
};


export default async function ViewDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    const { data: proposal } = await getSingleProposal(slug)
    const formattedAbstract = proposal.abstract
        .replace(/\[bold\]/g, "<strong>")
        .replace(/\[\/bold\]/g, "</strong>")
        .replace(/\\n/g, "\n")
        .replace(/\n/g, "<br/>");

    return (
        <div className="w-full max-w-screen-2xl mx-auto min-h-screen grid grid-cols-1 lg:grid-cols-3">

            {/* MAIN CONTENT */}
            <div className="space-y-6 p-8 lg:col-span-2">

                {/* Header */}
                <div className="border rounded-md p-4 space-y-2">
                    <h1 className="text-2xl font-semibold">
                        {proposal.projectTitle}
                    </h1>

                    <Badge
                        variant={
                            proposal.status === "PENDING"
                                ? "destructive"
                                : proposal.status === "APPROVED"
                                    ? "default"
                                    : "secondary"
                        }
                    >
                        {proposal.status}
                    </Badge>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span>
                            {proposal.course.courseCode} • {proposal.type}
                        </span>
                        <span>Semester: {proposal.semester}</span>
                        <span>Submitted: {new Date(proposal.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                {/* Abstract */}
                <section className="border rounded-md p-4 space-y-2">
                    <h2 className="text-lg font-medium">Abstract</h2>
                    <p
                        className="text-sm whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: formattedAbstract }}
                    />
                </section>

                {/* Objectives */}
                <section className="border rounded-lg p-6 space-y-4 bg-white">
                    <h2 className="text-lg font-semibold">Objectives</h2>
                    <ul className="space-y-3">
                        {proposal.projectObjectives
                            .split("\n\n")
                            .map((obj: string, idx: number) => (
                                <li key={idx} className="flex gap-3">
                                    <span className="font-bold">•</span>
                                    <span className="text-sm">{obj.trim()}</span>
                                </li>
                            ))}
                    </ul>
                </section>

                {/* Methodology */}
                <section className="border rounded-lg p-6 space-y-4 bg-white">
                    <h2 className="text-lg font-semibold">Methodology</h2>
                    <ul className="space-y-3">
                        {proposal.methodology
                            .split("\n\n")
                            .map((m: string, idx: number) => (
                                <li key={idx} className="flex gap-3">
                                    <span className="font-bold">•</span>
                                    <span className="text-sm">{m.trim()}</span>
                                </li>
                            ))}
                    </ul>
                </section>

                {/* Expected Outcomes */}
                <section className="border rounded-md p-4 space-y-2">
                    <h2 className="text-lg font-medium">Expected Outcomes</h2>
                    <div className="flex flex-wrap gap-2">
                        {proposal.expectedOutcomes
                            .split("\n\n")
                            .map((item: string, idx: number) => (
                                <Badge key={idx} variant="outline">
                                    {item.trim()}
                                </Badge>
                            ))}
                    </div>
                </section>

                {/* Technologies */}
                <section className="border rounded-md p-4 space-y-2">
                    <h2 className="text-lg font-medium">
                        Technologies & Tools
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {proposal.technologiesTools.map((tech: string, idx: number) => (
                            <Badge key={idx} variant="secondary">
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </section>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-6 p-8">

                {/* People */}
                <section className="border rounded-md p-4 space-y-4">
                    <h2 className="text-lg font-medium">People Involved</h2>
                    <div>
                        <p className="text-sm text-muted-foreground">Student</p>
                        <p className="font-medium">{proposal.student.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {proposal.student.studentId}</p>
                        <p className="text-sm text-muted-foreground">{proposal.student.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Supervisor</p>
                        <p className="font-medium">{proposal.supervisor.name}</p>
                        <p className="text-sm text-muted-foreground">{formatEnum(proposal.supervisor.designation)}</p>
                        <p className="text-sm text-muted-foreground">{proposal.supervisor.email}</p>
                        <p className="text-sm text-muted-foreground">{formatEnum(proposal.supervisor.department)}</p>
                    </div>
                </section>

                {/* Timeline */}
                <section className="border rounded-md p-4 space-y-2">
                    <h2 className="text-lg font-medium">Project Timeline</h2>
                    <p className="text-sm">
                        {proposal.estimatedTimeline}
                    </p>
                </section>

                {/* Actions */}
                <ProjectThesisAction proposal={proposal} />
            </div>
        </div>

    )
}
