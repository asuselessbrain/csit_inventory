import ReportWizard from "@/components/modules/student/report-generator/ReportWizard";
import { getSingleStudentProposal } from "@/services/proposalService";

export default async function GenerateReportPage() {
  const res = await getSingleStudentProposal();
  const projectThesis = res?.data?.[0];
  const isValidStatus = projectThesis?.status === 'APPROVED' || projectThesis?.status === 'in_PROGRESS';
  const projectThesisId = isValidStatus ? projectThesis?.id : undefined;

  return (
    <div className="py-8">
      <ReportWizard projectThesisId={projectThesisId} />
    </div>
  );
}
