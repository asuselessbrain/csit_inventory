'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface OtpFormData {
    otp: string;
}

export default function VerifyOtpPage() {
    const { watch, setValue } = useForm<OtpFormData>({
        defaultValues: { otp: '' },
    });
    const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otpDigits];
        newOtp[index] = value;
        setOtpDigits(newOtp);
        setValue('otp', newOtp.join(''));

        // Auto-focus to next field
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const otpCode = otpDigits.join('');
        if (otpCode.length !== 6) return;

        setIsLoading(true);
        // Simulate API call
        console.log(otpCode)
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    };

    const handleResendOtp = () => {
        setResendTimer(60);
        setOtpDigits(['', '', '', '', '', '']);
        setValue('otp', '');
        const interval = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const isOtpComplete = otpDigits.every((digit) => digit !== '');

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 transition-colors flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-linear-to-r from-indigo-400 to-blue-400 dark:from-indigo-600 dark:to-blue-600 rounded-full blur-lg opacity-30"></div>
                            <Image
                                width={80}
                                height={80}
                                src="https://res.cloudinary.com/dwduymu1l/image/upload/v1769187917/Patuakhali_Science_and_Technology_University_logo_rv2zwu.png"
                                alt="Patuakhali_Science_and_Technology_University"
                                className="relative mx-auto h-20 w-20"
                            />
                        </div>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-slate-900 to-indigo-600 dark:from-white dark:to-indigo-400 bg-clip-text text-transparent mb-2">
                        Verify Your Identity
                    </h1>
                    <p className="text-base text-slate-600 dark:text-slate-300">
                        Enter the 6-digit code sent to your email
                    </p>
                </div>

                {/* OTP Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
                        {/* OTP Input Fields */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-6 text-center">
                                Enter 6-digit Code
                            </label>
                            <div className="flex justify-center gap-3 sm:gap-4">
                                {otpDigits.map((digit, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        className="h-14 sm:h-16 w-12 sm:w-14 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-center text-2xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:focus:ring-indigo-400 hover:border-slate-400 dark:hover:border-slate-500"
                                        placeholder="•"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Verify Button */}
                        <Button
                            type="submit"
                            disabled={!isOtpComplete || isLoading}
                            className='w-full cursor-pointer disabled:cursor-no-drop'
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </span>
                            ) : (
                                'Verify Code'
                            )}
                        </Button>

                        {/* Resend OTP */}
                        <div className="text-center">
                            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                                Didn&apos;t receive the code?
                            </p>
                            <Button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={resendTimer > 0}
                                variant="ghost"
                                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors disabled:text-slate-400 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                            >
                                {resendTimer > 0 ? (
                                    <span>Resend OTP in {resendTimer}s</span>
                                ) : (
                                    <span>Resend OTP</span>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
