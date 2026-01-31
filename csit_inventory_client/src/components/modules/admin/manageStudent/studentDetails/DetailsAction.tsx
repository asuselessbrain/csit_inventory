"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IStudent } from "@/types";
import { CheckCircle, XCircle } from "lucide-react";
import {
  handleApproveStudent,
  handleDeleteStudent,
  handleReactivateStudent,
} from "../StudentAction";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpdateStudent from "../UpdateStudent";

export default function DetailsAction({ student }: { student: IStudent }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-3">
          {!student.isApproved && !student.isDeleted && (
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleApproveStudent(student.id)}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve Student
            </Button>
          )}
          {student.isDeleted ? (
            <Button
              variant="default"
              onClick={() => handleReactivateStudent(student.id)}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Reactivate Account
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={() => handleDeleteStudent(student.id)}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit Details</Button>
            </DialogTrigger>
            <UpdateStudent student={student} />
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
}
