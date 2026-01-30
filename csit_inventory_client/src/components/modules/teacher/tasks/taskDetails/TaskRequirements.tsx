import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function TaskRequirements({
  requirements,
}: {
  requirements: string[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {requirements.map((req: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm text-muted-foreground">{req}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
