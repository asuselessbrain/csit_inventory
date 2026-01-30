import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function TaskProjectCourseCard({
  type,
  projectTitle,
  courseCode,
  courseTitle,
  courseHeader,
}: {
  type?: string;
  projectTitle?: string;
  courseCode?: string;
  courseTitle?: string;
  courseHeader?: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {type &&
                type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
              {courseHeader ? courseHeader : "Course"}
            </p>
            <p className="font-medium">
              {projectTitle && `${projectTitle}`}
              {courseCode && `${courseCode} - ${courseTitle}`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
