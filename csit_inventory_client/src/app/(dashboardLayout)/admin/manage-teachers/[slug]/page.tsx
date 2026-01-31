import { getSingleTeacher } from "@/services/teacherService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { ITeacher } from "@/types";
import {
  getDepartmentFormat,
  getDesignationFormat,
} from "@/components/shared/formatter";
import Image from "next/image";
import { formatDate } from "@/components/shared/ReusableFunction";

const getStatusColor = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-emerald-100 text-emerald-800";
    case "INACTIVE":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default async function TeacherDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await getSingleTeacher(slug);
  const teacher: ITeacher = res.data;

  if (!teacher) {
    return (
      <div className="container mx-auto py-6">
        <p className="text-gray-500 text-center">Teacher not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Card className="mb-8 overflow-hidden">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            {/* Teacher Image */}
            <div className="shrink-0">
              {teacher.photoUrl ? (
                <Image
                  src={teacher.photoUrl}
                  alt={teacher.name}
                  width={200}
                  height={200}
                  className="w-48 h-48 rounded-lg object-cover shadow-lg border-4 border-gray-100"
                />
              ) : (
                <div className="w-48 h-48 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg border-4 border-gray-100">
                  <span className="text-6xl font-bold text-white">
                    {teacher.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Header Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    {teacher.name}
                  </h1>
                  <p className="text-xl text-gray-600 mt-1">
                    {getDesignationFormat(teacher.designation)}
                  </p>
                  <p className="text-gray-500 mt-1">
                    {getDepartmentFormat(teacher.department)}
                  </p>
                </div>
                <Badge
                  className={`${getStatusColor(teacher.status)} border-0 text-base px-4 py-2`}
                >
                  {teacher.status}
                </Badge>
              </div>

              {/* Quick Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-600">Email</p>
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {teacher.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-600 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-600">Phone</p>
                    <p className="text-sm font-medium text-gray-900">
                      {teacher.phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-green-600 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-600">Joined</p>
                    <p className="text-sm font-medium text-gray-900">
                      {formatDate(teacher.joinedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Detailed Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Contact & Address Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-lg">{teacher.address}</p>
            </CardContent>
          </Card>

          {/* Professional Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Professional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase">
                    Faculty
                  </p>
                  <p className="text-gray-900 font-semibold mt-2">
                    {teacher.faculty}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase">
                    Department
                  </p>
                  <p className="text-gray-900 font-semibold mt-2">
                    {getDepartmentFormat(teacher.department)}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 font-medium uppercase">
                    Chairman Status
                  </span>
                  <Badge
                    className={
                      teacher.isChairman
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-200 text-gray-700"
                    }
                  >
                    {teacher.isChairman ? "Chairman" : "Faculty Member"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700 font-medium uppercase">
                  Projects/Theses
                </p>
                <p className="text-4xl font-bold text-blue-900 mt-2">
                  {teacher.projectTheses?.length || 0}
                </p>
                <p className="text-xs text-blue-600 mt-3">
                  {teacher.projectTheses?.length === 1
                    ? "project supervised"
                    : "projects supervised"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
