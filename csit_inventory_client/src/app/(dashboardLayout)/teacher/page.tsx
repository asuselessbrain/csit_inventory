import { teacherDashboardData } from "@/services/dashboardService";
import TeacherDashboardOverview from "@/components/modules/teacher/teacher-dashboard-overview";

export default async function TeacherDashboardPage() {
  const response = await teacherDashboardData();
  const counts = response?.data?.counts ?? {};
  const pieChartData = response?.data?.charts?.pieChartData ?? [];
  const recentProposals = response?.data?.tables?.recentProposals ?? [];

  return (
    <div className="space-y-6 max-w-360 mx-auto py-6 w-full">
      <TeacherDashboardOverview
        counts={counts}
        pieChartData={pieChartData}
        recentProposals={recentProposals}
      />
    </div>
  );
}
