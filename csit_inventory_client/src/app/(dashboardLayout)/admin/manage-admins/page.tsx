import { getAllAdmin } from "@/services/adminService";
import ManageAdminsTable from "@/components/modules/admin/manageAdmins/ManageAdminsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Manage Admins
          </h1>
          <p className="mt-1 text-gray-600">
            View and manage all registered administrators
          </p>
        </div>
        <Button className="gap-2 cursor-pointer">
          <Plus className="h-4 w-4 text-white" />
          Create Admin
        </Button>
      </div>
      <ManageAdminsTable admins={res.data} />
    </div>
  );
}
