import { adminDashboardData } from '@/services/dashboardService';
import AdminDashboardOverview from '@/components/modules/admin/admin-dashboard-overview';
import React from 'react'

export default async function AdminDashboardPage() {
  const response = await adminDashboardData();
  const counts = response?.data?.counts ?? {};
  const barChartData = response?.data?.charts?.barChartData ?? [];
  const pieChartData = response?.data?.charts?.pieChartData ?? [];

  return (
    <div className="space-y-6 max-w-360 mx-auto py-6 w-full">
      <AdminDashboardOverview
        counts={counts}
        barChartData={barChartData}
        pieChartData={pieChartData}
      />
    </div>
  )
}
