import { getAllAdmin } from "@/services/adminService";
import ManageAdminsTable from "@/components/modules/admin/manageAdmins/ManageAdminsTable";

export default async function MangeAdminPage({
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

  const res = await getAllAdmin(queryParams);

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Admins</h1>
        <p className="text-gray-600 mt-2">
          View and manage all registered administrators
        </p>
      </div>
      <ManageAdminsTable admins={res.data} />
    </div>
  );
}
