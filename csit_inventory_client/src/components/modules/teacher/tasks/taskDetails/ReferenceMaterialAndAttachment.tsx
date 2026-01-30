import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";

export default function ReferenceMaterialAndAttachment({
  referenceMaterials,
}: {
  referenceMaterials: string[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Reference Materials</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {referenceMaterials.map((ref, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 transition"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-gray-500 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-800 break-all">{ref}</span>
                  {/* {ref.size && ref.uploaded && (
                    <span className="text-xs text-gray-500">
                      {ref.size} • {ref.uploaded}
                    </span>
                  )} */}
                </div>
              </div>
              <a
                href={ref}
                target="_blank"
                download
                className="p-2 rounded hover:bg-gray-200 transition"
              >
                <Download className="h-4 w-4 text-gray-600" />
              </a>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
