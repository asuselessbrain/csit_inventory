import { getSingleStudent } from "@/services/stuentService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  GraduationCap,
  School,
  Building2,
  CheckCircle,
  XCircle,
  User,
  CreditCard,
  Clock,
  Layers,
} from "lucide-react";
import Link from "next/link";
import DetailsAction from "@/components/modules/admin/manageStudent/studentDetails/DetailsAction";
import { IStudent } from "@/types";
import { formatDate } from "@/components/shared/ReusableFunction";
import { getSemesterFormate } from "@/components/shared/SemesterFormate";

export default async function StudentDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const res = await getSingleStudent(slug);
  const student: IStudent = res?.data;

  if (!student) {
    return (
      <div className="max-w-360 mx-auto w-full py-6">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Student not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-360 mx-auto w-full py-6 space-y-6">
      {/* Header with Back Button */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Details</h1>
        <p className="text-muted-foreground">
          Complete information about the student
        </p>
      </div>

      {/* Profile Overview Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Photo */}
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32 border-4">
                <AvatarImage src={student.profilePhoto} alt={student.name} />
                <AvatarFallback className="text-3xl">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <div className="flex flex-col gap-2">
                  <Badge
                    variant={
                      student.status === "ACTIVE"
                        ? "default"
                        : student.status === "INACTIVE"
                          ? "secondary"
                          : "destructive"
                    }
                    className="justify-center"
                  >
                    {student.status}
                  </Badge>
                  {student.isApproved ? (
                    <Badge
                      variant="default"
                      className="bg-green-500 justify-center"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Approved
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="justify-center">
                      <XCircle className="mr-1 h-3 w-3" />
                      Pending Approval
                    </Badge>
                  )}
                  {student.isDeleted && (
                    <Badge
                      variant="destructive"
                      className="justify-center text-white"
                    >
                      Account Deleted
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <Separator orientation="vertical" className="hidden md:block" />

            {/* Quick Info */}
            <div className="flex-1 grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Student ID</p>
                    <p className="font-mono font-medium">{student.studentId}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Registration Number
                    </p>
                    <p className="font-mono font-medium">
                      {student.registrationNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{student.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{student.phoneNumber}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Date of Birth
                    </p>
                    <p className="font-medium">
                      {formatDate(student.dateOfBirth)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Session</p>
                    <p className="font-medium">{student.session}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Layers className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Semester</p>
                    <p className="font-medium">{getSemesterFormate(student.semester)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{student.address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Educational Background */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="h-5 w-5" />
            Educational Background
          </CardTitle>
          <CardDescription>
            Previous academic institutions and qualifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <School className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold">School</h3>
              </div>
              <p className="text-muted-foreground pl-6">{student.schoolName}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-semibold">College</h3>
              </div>
              <p className="text-muted-foreground pl-6">
                {student.collageName}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Account Information
          </CardTitle>
          <CardDescription>Registration and update timestamps</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Created At</p>
              <p className="font-medium">{formatDate(student.createdAt)}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(student.createdAt).toLocaleTimeString()}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-medium">{formatDate(student.updatedAt)}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(student.updatedAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <DetailsAction student={student} />
    </div>
  );
}
