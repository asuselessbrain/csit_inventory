"use client";

import {
  courseReportForAdmin,
  myProposalsForStudentReport,
  myProposalsForTeacherReport,
  projectThesisReportForAdmin,
  studentReportForAdmin,
  teacherReportForAdmin,
} from "@/services/reportService";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface Props {
  forWho: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryParams?: any;
}

const DownloadReportButton = ({ forWho, queryParams }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const base64ToBlob = (base64: string, type = "application/pdf") => {
    const binStr = atob(base64);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }
    return new Blob([arr], { type: type });
  };

  const handleDownload = async () => {
    try {
      setIsLoading(true);

      let base64Data;
      if (forWho === "student") {
        base64Data = await myProposalsForStudentReport(queryParams);
      }

      if (forWho === "teacher") {
        base64Data = await myProposalsForTeacherReport(queryParams);
      }

      if (forWho === "admin-course") {
        base64Data = await courseReportForAdmin(queryParams);
      }

      if (forWho === "admin-teacher") {
        base64Data = await teacherReportForAdmin(queryParams);
      }

      if (forWho === "admin-student") {
        base64Data = await studentReportForAdmin(queryParams);
      }

      if(forWho === "admin-proposals"){
        base64Data = await projectThesisReportForAdmin(queryParams);
      }

      if (!base64Data) {
        throw new Error("No data received");
      }

      const blob = base64ToBlob(base64Data);

      const fileName = `Proposal_Report.pdf`;

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();

      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download PDF. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={isLoading}
      className="disabled:cursor-no-drop cursor-pointer"
    >
      {isLoading ? "Generating PDF..." : "Download Report"}
    </Button>
  );
};

export default DownloadReportButton;
