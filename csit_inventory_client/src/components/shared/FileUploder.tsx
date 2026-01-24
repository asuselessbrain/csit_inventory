import { AlertCircle, CheckCircle, Upload, X } from "lucide-react";
import { Input } from "../ui/input";

const FileUploader = ({ uploadedFiles, setUploadedFiles, uploadError, setUploadError }: { uploadedFiles: File[] | [], setUploadedFiles: React.Dispatch<React.SetStateAction<File[]>>, uploadError: string | null, setUploadError: React.Dispatch<React.SetStateAction<string | null>> }) => {
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        setUploadError(null);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setUploadError(`${file.name} exceeds 5MB limit`);
                continue;
            }

            // Validate file type
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
            if (!allowedTypes.includes(file.type)) {
                setUploadError(`${file.name} has unsupported file type`);
                continue;
            }

            setUploadedFiles((prev) => [...prev, file]);
        }
    };

    const removeFile = (index: number) => {
        setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">
                Attachments
            </label>
            <label htmlFor="file-upload">
                <div className="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 p-8 text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <Upload className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-500 mb-3" />
                    <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">
                        Upload supporting documents
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                        Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB each)
                    </p>
                    <Input
                        type="file"

                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="inline-flex items-center px-4 py-2 border rounded-md">
                            <Upload className="w-4 h-4 mr-2" />
                            Choose Files
                        </div>
                    </label>
                </div>
            </label>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                <div className="text-left">
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">{file.name}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="p-1 hover:bg-green-200 dark:hover:bg-green-800 rounded transition-colors"
                            >
                                <X className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Upload Error */}
            {uploadError && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-300">{uploadError}</p>
                </div>
            )}
        </div>

    );
};

export default FileUploader;