import { studentDashboardData } from '@/services/dashboardService';
import StudentDashboardOverview from '@/components/modules/student/student-dashboard-overview';

export default async function StudentDashboardPage() {
  const res = await studentDashboardData();
  const hasProject = res?.data?.hasProject ?? false;
  const overview = res?.data?.overview ?? {};
  const supervisor = res?.data?.supervisor ?? {};
  const recentTasks = res?.data?.recentTasks ?? [];

  return (
    <div className="space-y-6 max-w-360 mx-auto py-6 w-full">
      <StudentDashboardOverview
        hasProject={hasProject}
        overview={overview}
        supervisor={supervisor}
        recentTasks={recentTasks}
      />
    </div>
  );
}
