import SubmitProposalForm from '@/components/modules/student/submitProposal/SubmitProposalForm';
import { AlertCircle } from 'lucide-react';

export default function SubmitProposalPage() {
  

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-linear-to-r from-slate-900 to-indigo-600 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent mb-2">
            Submit Proposal
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Fill in the details below to submit your project proposal for review
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
          <SubmitProposalForm />
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>
            Need help? Contact your{' '}
            <a href="#" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
              supervisor
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
