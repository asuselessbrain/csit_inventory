"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { generateDocx, ReportData } from "@/utils/docxGenerator";
import { toast } from "sonner";
import { saveAs } from "file-saver";

const subTopicSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

const chapterSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  imageFile: z.any().optional(),
  subTopics: z.array(subTopicSchema).optional(),
});

const boardMemberSchema = z.object({
  roleLabel: z.string().min(1, "Role is required"),
  name: z.string().min(1, "Name is required"),
  department: z.string().optional(),
  faculty: z.string().optional(),
});

const reportSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  studentName: z.string().min(1, "Student name is required"),
  studentId: z.string().min(1, "Student ID is required"),
  studentRegNo: z.string().min(1, "Registration No is required"),
  session: z.string().min(1, "Session is required"),
  submissionDate: z.string().min(1, "Date is required"),
  supervisorName: z.string().min(1, "Supervisor name is required"),
  supervisorDesignation: z.string().min(1, "Designation is required"),
  supervisorDept: z.string().min(1, "Department is required"),
  supervisorFaculty: z.string().min(1, "Faculty is required"),
  abstract: z.string().min(1, "Abstract is required"),
  acknowledgments: z.string().min(1, "Acknowledgments are required"),
  logoFile: z.any().optional(),
  boardMembers: z.array(boardMemberSchema),
  chapters: z.array(chapterSchema),
});

type ReportFormValues = z.infer<typeof reportSchema>;

interface ReportWizardProps {
  projectThesisId?: string;
}

function ChapterSubTopics({ control, chapterIndex }: { control: any; chapterIndex: number }) {
  const { fields, append, remove } = useFieldArray({
    name: `chapters.${chapterIndex}.subTopics`,
    control
  });

  return (
    <div className="space-y-4 mt-4 border-l-2 border-slate-200 pl-4">
      <h5 className="font-semibold text-sm text-slate-600">Sub-Topics (e.g. 1.1, 1.2)</h5>
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border border-slate-100 rounded-md bg-slate-50 relative space-y-3">
          <div className="flex justify-between items-center">
            <h6 className="font-medium text-sm">Sub-Topic {chapterIndex + 1}.{index + 1}</h6>
            <Button type="button" size="sm" variant="ghost" className="text-red-500 h-6 px-2" onClick={() => remove(index)}>Remove</Button>
          </div>
          <FormField control={control} name={`chapters.${chapterIndex}.subTopics.${index}.title`} render={({ field }) => (
            <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
          )} />
          <FormField control={control} name={`chapters.${chapterIndex}.subTopics.${index}.content`} render={({ field }) => (
            <FormItem><FormLabel>Content</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>
          )} />
        </div>
      ))}
      <Button type="button" size="sm" variant="outline" onClick={() => append({ title: "", content: "" })}>
        + Add Sub-Topic
      </Button>
    </div>
  );
}

function BoardMembers({ control }: { control: any }) {
  const { fields, append, remove, move } = useFieldArray({
    name: "boardMembers",
    control
  });

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="p-4 border rounded-md relative space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Board Member {index + 1}</h4>
            <div className="flex gap-2">
              <Button type="button" size="sm" variant="outline" onClick={() => move(index, index - 1)} disabled={index === 0}>Up</Button>
              <Button type="button" size="sm" variant="outline" onClick={() => move(index, index + 1)} disabled={index === fields.length - 1}>Down</Button>
              <Button type="button" size="sm" variant="destructive" onClick={() => remove(index)}>Remove</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField control={control} name={`boardMembers.${index}.roleLabel`} render={({ field }) => (
              <FormItem><FormLabel>Role Label (e.g. Name of Internal Member)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={control} name={`boardMembers.${index}.name`} render={({ field }) => (
              <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={control} name={`boardMembers.${index}.department`} render={({ field }) => (
              <FormItem><FormLabel>Department Name (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={control} name={`boardMembers.${index}.faculty`} render={({ field }) => (
              <FormItem><FormLabel>Faculty Name (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
            )} />
          </div>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => append({ roleLabel: "Name of Internal Member", name: "", department: "Dept. of Computer Science and Information Technology", faculty: "Faculty of Computer Science and Engineering" })}>
        Add Board Member
      </Button>
    </div>
  );
}

function ReportPreview({ data }: { data: any }) {
  return (
    <div className="border p-8 bg-gray-50 rounded h-[600px] overflow-y-auto font-serif text-sm text-black">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold uppercase">{data.title || "Untitled Project"}</h1>
        {data.subtitle && <h2 className="text-xl">{data.subtitle}</h2>}
        <p className="mt-8">by</p>
        <p className="font-semibold">{data.studentName || "Student Name"}</p>
        <p>ID: {data.studentId}</p>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-center underline mb-6">Board of Examinee</h2>
        <div className="space-y-8 flex flex-col items-center">
          {data.boardMembers?.map((member: any, i: number) => (
            <div key={i} className="w-[600px] flex flex-col text-left space-y-2">
              <div className="flex">
                <span className="w-64 font-semibold shrink-0">Signature</span>
                <span className="w-4">:</span>
                <span className="flex-1 border-b border-black"></span>
              </div>
              <div className="flex">
                <span className="w-64 font-semibold shrink-0">{member.roleLabel}</span>
                <span className="w-4">:</span>
                <span className="flex-1">{member.name}</span>
              </div>
              {member.department && (
                <div className="flex">
                  <span className="w-64 shrink-0">Dept. Name</span>
                  <span className="w-4">:</span>
                  <span className="flex-1">{member.department}</span>
                </div>
              )}
              {member.faculty && (
                <div className="flex">
                  <span className="w-64 shrink-0">Faculty Name</span>
                  <span className="w-4">:</span>
                  <span className="flex-1">{member.faculty}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold uppercase mb-4">Abstract</h2>
        <p className="whitespace-pre-wrap">{data.abstract}</p>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold uppercase mb-4">Chapters Overview</h2>
        {data.chapters?.map((chapter: any, i: number) => (
          <div key={i} className="mt-6 border-l-4 pl-4 border-slate-300">
            <h3 className="text-lg font-bold">Chapter {i + 1}: {chapter.title}</h3>
            <p className="whitespace-pre-wrap mt-2">{chapter.content ? chapter.content.substring(0, 200) + '...' : ''}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ReportWizard({ projectThesisId }: ReportWizardProps) {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [submitToPlatform, setSubmitToPlatform] = useState(!!projectThesisId);

  const form = useForm<ReportFormValues>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      chapters: [
        { title: "INTRODUCTION", content: "" },
        { title: "LITERATURE REVIEW", content: "" },
        { title: "METHODOLOGY", content: "" },
      ],
      boardMembers: [
        { roleLabel: "Supervisor & Chairman of the ECC", name: "", department: "Dept. of Computer Science and Information Technology", faculty: "Faculty of Computer Science and Engineering" },
        { roleLabel: "Name of Internal Member", name: "Professor Mohammad Jamal Hossain", department: "Dept. of Computer Science and Information Technology", faculty: "Faculty of Computer Science and Engineering" },
        { roleLabel: "Name of Internal Member", name: "Professor Dr. Abdul Masud", department: "Dept. of Computer Science and Information Technology", faculty: "Faculty of Computer Science and Engineering" },
        { roleLabel: "Name of Internal Member", name: "Assistant Professor Md. Mahbubur Rahman", department: "Dept. of Computer Science and Information Technology", faculty: "Faculty of Computer Science and Engineering" },
        { roleLabel: "Name of External Member", name: "Muhtasim", department: "Dept. of Computer Science and Information Technology", faculty: "Faculty of Computer Science and Engineering" },
        { roleLabel: "Dean Faculty of CSE", name: "Professor Dr. Khokon Hossen", department: "", faculty: "" },
      ],
    },
  });

  const { fields, append, insert, remove, move } = useFieldArray({
    name: "chapters",
    control: form.control,
  });

  const fileToArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const onSubmit = async (data: ReportFormValues) => {
    setIsGenerating(true);
    try {
      let logoBuffer;
      if (data.logoFile && data.logoFile[0]) {
        logoBuffer = await fileToArrayBuffer(data.logoFile[0]);
      }

      const chaptersData = await Promise.all(
        data.chapters.map(async (chap) => {
          let imageBuffer;
          if (chap.imageFile && chap.imageFile[0]) {
            imageBuffer = await fileToArrayBuffer(chap.imageFile[0]);
          }
          return {
            title: chap.title,
            content: chap.content,
            imageBuffer,
            subTopics: chap.subTopics || [],
          };
        })
      );

      const reportData: ReportData = {
        ...data,
        chapters: chaptersData,
        logoBuffer,
      };

      const blob = await generateDocx(reportData);
      
      if (submitToPlatform && projectThesisId) {
        const file = new File([blob], "Project_Report.docx", { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my_preset");
        formData.append("resource_type", "auto");

        const uploadRes = await fetch(
          "https://api.cloudinary.com/v1_1/dwduymu1l/auto/upload",
          { method: "POST", body: formData },
        );

        if (!uploadRes.ok) {
          throw new Error("Failed to upload file to Cloudinary");
        }

        const uploadData = await uploadRes.json();
        const finalReportUrl = uploadData.secure_url;

        const { submitFinalReport } = await import("@/services/proposalService");
        await submitFinalReport(projectThesisId, finalReportUrl);
        toast.success("Report generated and submitted to your profile successfully!");
      } else {
        toast.success("Report generated successfully!");
      }
      
      // Also download locally for convenience
      saveAs(blob, "Project_Report.docx");

    } catch (error) {
      console.error(error);
      toast.error("Failed to generate report");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Auto-Generate Project Report</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Step 1: Basic Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem><FormLabel>Project Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="subtitle" render={({ field }) => (
                  <FormItem><FormLabel>Subtitle (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="studentName" render={({ field }) => (
                  <FormItem><FormLabel>Student Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="studentId" render={({ field }) => (
                  <FormItem><FormLabel>Student ID</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="studentRegNo" render={({ field }) => (
                  <FormItem><FormLabel>Registration No</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="session" render={({ field }) => (
                  <FormItem><FormLabel>Session</FormLabel><FormControl><Input {...field} placeholder="2020-21" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="submissionDate" render={({ field }) => (
                  <FormItem><FormLabel>Submission Date</FormLabel><FormControl><Input {...field} placeholder="2th February, 2026" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="logoFile" render={({ field: { onChange, value, ...rest } }) => (
                  <FormItem><FormLabel>University Logo</FormLabel><FormControl><Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files)} {...rest} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <h3 className="text-lg font-semibold mt-6">Supervisor Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="supervisorName" render={({ field }) => (
                  <FormItem><FormLabel>Supervisor Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="supervisorDesignation" render={({ field }) => (
                  <FormItem><FormLabel>Designation</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="supervisorDept" render={({ field }) => (
                  <FormItem><FormLabel>Department</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="supervisorFaculty" render={({ field }) => (
                  <FormItem><FormLabel>Faculty</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <Button type="button" onClick={() => setStep(2)}>Next</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Step 2: Board of Examinee</h2>
              <BoardMembers control={form.control} />
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>Previous</Button>
                <Button type="button" onClick={() => setStep(3)}>Next</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Step 3: Preliminary Pages</h2>
              <FormField control={form.control} name="abstract" render={({ field }) => (
                <FormItem><FormLabel>Abstract</FormLabel><FormControl><Textarea rows={6} {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="acknowledgments" render={({ field }) => (
                <FormItem><FormLabel>Acknowledgments</FormLabel><FormControl><Textarea rows={6} {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>Previous</Button>
                <Button type="button" onClick={() => setStep(4)}>Next</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Step 4: Chapters</h2>
              {fields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-md relative space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Chapter {index + 1}</h4>
                    <div className="flex gap-2">
                      <Button type="button" size="sm" variant="outline" onClick={() => move(index, index - 1)} disabled={index === 0}>Up</Button>
                      <Button type="button" size="sm" variant="outline" onClick={() => move(index, index + 1)} disabled={index === fields.length - 1}>Down</Button>
                      <Button type="button" size="sm" variant="destructive" onClick={() => remove(index)}>Remove</Button>
                    </div>
                  </div>
                  <FormField control={form.control} name={`chapters.${index}.title`} render={({ field }) => (
                    <FormItem><FormLabel>Chapter Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name={`chapters.${index}.content`} render={({ field }) => (
                    <FormItem><FormLabel>Content</FormLabel><FormControl><Textarea rows={6} {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name={`chapters.${index}.imageFile`} render={({ field: { onChange, value, ...rest } }) => (
                    <FormItem><FormLabel>Upload Image for this Chapter (Optional)</FormLabel><FormControl><Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files)} {...rest} /></FormControl><FormMessage /></FormItem>
                  )} />
                  
                  <ChapterSubTopics control={form.control} chapterIndex={index} />
                  <Button type="button" size="sm" variant="secondary" onClick={() => insert(index + 1, { title: "", content: "" })}>
                    Add Chapter After This
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => append({ title: "", content: "" })}>
                Add Chapter at End
              </Button>
              <div className="flex gap-4 pt-6">
                <Button type="button" variant="outline" onClick={() => setStep(3)}>Previous</Button>
                <div className="flex-1 flex items-center justify-end gap-4">
                  <Button type="button" onClick={() => setStep(5)}>
                    Next (Preview)
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Step 5: Preview & Generate</h2>
              <ReportPreview data={form.getValues()} />
              <div className="flex gap-4 pt-6">
                <Button type="button" variant="outline" onClick={() => setStep(4)}>Previous</Button>
                <div className="flex-1 flex items-center justify-end gap-4">
                  {projectThesisId && (
                    <label className="flex items-center gap-2 cursor-pointer border p-2 rounded-md hover:bg-slate-50">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 cursor-pointer"
                        checked={submitToPlatform}
                        onChange={(e) => setSubmitToPlatform(e.target.checked)}
                      />
                      <span className="text-sm font-medium">Save to my platform profile</span>
                    </label>
                  )}
                  <Button type="submit" disabled={isGenerating}>
                    {isGenerating ? "Generating..." : (submitToPlatform && projectThesisId ? "Generate & Submit" : "Generate Report")}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
