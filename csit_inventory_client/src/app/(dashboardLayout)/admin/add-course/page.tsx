import CreateCourseForm from '@/components/modules/admin/createCourse/CreateCourseForm';

export default function AddCoursePage() {
    return (
        <div className="min-h-[calc(100vh-80px)] py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-linear-to-r from-slate-900 to-indigo-600 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent mb-2">
                        Add New Course
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-300">
                        Create a new course in the system
                    </p>
                </div>

                {/* Form Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                    <CreateCourseForm />
                </div>
            </div>
        </div>
    );
}
