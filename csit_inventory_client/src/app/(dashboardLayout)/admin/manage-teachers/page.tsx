import { allTeachers } from "@/services/teacherService";
import ManageTeachersTable from "@/components/modules/admin/manageTeachers/ManageTeachersTable";

export default async function ManageTeachersPage({
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

  const res = await allTeachers(queryParams);

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Teachers</h1>
        <p className="text-gray-600 mt-2">
          View and manage all registered teachers
        </p>
      </div>
      <ManageTeachersTable teachers={res.data} />
    </div>
  );
}
