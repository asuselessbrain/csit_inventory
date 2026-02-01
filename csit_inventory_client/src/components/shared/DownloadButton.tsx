"use client";

import { myProposalsForStudentReport } from "@/services/reportService";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryParams?: any;
}

const DownloadReportButton = ({ queryParams }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  // Base64 থেকে Blob বানানোর হেল্পার ফাংশন
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

      const base64Data = await myProposalsForStudentReport(queryParams);

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
