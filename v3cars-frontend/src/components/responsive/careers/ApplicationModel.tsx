"use client";
import { FiMail, FiUser, FiPhone } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlineMyLocation } from "react-icons/md";
import Link from "next/link";
import CustomSelect from "@/components/ui/custom-inputs/CustomSelect";

interface ApplicationModelProps {
    onClose: () => void;
}

const ApplicationModel = ({ onClose }: ApplicationModelProps) => {
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState<"role" | "otp" | "job">("role");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timer, setTimer] = useState(16);
    const [fullName, setFullName] = useState("");
    const [mobile, setMobile] = useState("");

    useEffect(() => {
        const timerId = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timerId);
    }, []);

    useEffect(() => {
        if (step === "otp" && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [step, timer]);

    const handleOtpChange = (value: string, index: number) => {

        if (!/^\d?$/.test(value)) return;
        const updated = [...otp];
        updated[index] = value;
        setOtp(updated);
        if (value && index < otp.length - 1) {
            const next = document.getElementById(`otp-${index + 1}`);
            if (next) (next as HTMLInputElement).focus();
        }

    };

    const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {

        if (e.key === "Backspace") {
            e.preventDefault();
            const updated = [...otp];
            if (otp[index]) {
                updated[index] = "";
            } else if (index > 0) {
                updated[index - 1] = "";
                const prev = document.getElementById(`otp-${index - 1}`);
                if (prev) (prev as HTMLInputElement).focus();
            }
            setOtp(updated);
        }

    };

    const resendOtp = () => setTimer(16);

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">

            <div
                className={`relative w-[900px] bg-white dark:bg-black rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
            >

                <div className="w-[80%] mx-auto min-h-[600px] flex justify-center items-center">

                    <Image
                        src="/common/v3.png"
                        alt="bg"
                        fill
                        className="object-cover opacity-10 z-0"
                    />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10"
                    >
                        <IoCloseOutline size={22} />
                    </button>

                    <div className="relative z-10 flex flex-col justify-between gap-6 w-full">

                        {step === "role" && (

                            <>
                                <h2 className="text-4xl font-semibold text-center">
                                    Your Next Role at V3Cars
                                </h2>
                                <p className="text-center text-gray-500">
                                    Tell us about yourself and why you’re the right fit
                                </p>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex items-center gap-2 border border-gray-800 dark:bg-[#171717] dark:border-[#2E2E2E] rounded-md px-4 py-3">
                                        <input
                                            type="email"
                                            placeholder="Location / City*"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full text-sm outline-none bg-transparent"
                                        />
                                        <MdOutlineMyLocation size={18} />
                                    </div>

                                    <div className="flex items-center gap-2 border border-gray-800 dark:bg-[#171717] dark:border-[#2E2E2E] rounded-md px-4 py-3">
                                        <input
                                            type="email"
                                            placeholder="Upload File"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full text-sm outline-none bg-transparent"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 border border-gray-800 dark:bg-[#171717] dark:border-[#2E2E2E] rounded-md px-4 py-3">
                                        <input
                                            type="email"
                                            placeholder="LinkedIn Profile / Portfolio"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full text-sm outline-none bg-transparent"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 border border-gray-800 dark:bg-[#171717] dark:border-[#2E2E2E] rounded-md px-4 py-3">
                                        <input
                                            type="email"
                                            placeholder="Personal Website / Blog"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full text-sm outline-none bg-transparent"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 border border-gray-800 dark:bg-[#171717] dark:border-[#2E2E2E] rounded-md px-4 py-3">
                                        <input
                                            type="email"
                                            placeholder="Full Name*"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full text-sm outline-none bg-transparent"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 border border-gray-800 dark:bg-[#171717] dark:border-[#2E2E2E] rounded-md px-4 py-3">
                                        <input
                                            type="email"
                                            placeholder="Last Name"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full text-sm outline-none bg-transparent"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 border border-gray-800 dark:bg-[#171717] dark:border-[#2E2E2E] rounded-md px-4 py-3">
                                        <input
                                            type="email"
                                            placeholder="Email Address*"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full text-sm outline-none bg-transparent"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 border border-gray-800 dark:bg-[#171717] dark:border-[#2E2E2E] rounded-md px-4 py-3">
                                        <input
                                            type="email"
                                            placeholder="Phone Number*"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full text-sm outline-none bg-transparent"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-center items-center">
                                    <button
                                        onClick={() => {
                                            setStep("otp");
                                            setTimer(16);
                                        }}
                                        className="w-[50%] bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-md text-sm disabled:opacity-50"
                                    >
                                        Verify Your Number
                                    </button>
                                </div>

                                <p className="text-center">
                                    By proceeding ahead you agree to{" "}
                                    <Link href={'/'} className="text-blue-500 underline">
                                        V3Cars terms and conditions.
                                    </Link>
                                </p>
                            </>
                        )}

                        {step === "otp" && (
                            <>
                                <h2 className="text-4xl font-semibold text-center">
                                    OTP Verification
                                </h2>

                                <p className="text-center text-gray-500 flex items-center justify-center gap-2">
                                    <span>OTP has been sent to</span>
                                    <span className="text-yellow-600 font-semibold">{email}</span>
                                    <TbEdit
                                        size={16}
                                        className="cursor-pointer text-gray-600"
                                        onClick={() => setStep("role")}
                                    />
                                </p>

                                <p className="text-md font-semibold text-center">
                                    Enter <span className="font-bold">OTP</span>
                                </p>

                                <div className="flex justify-center gap-2">
                                    {otp.map((digit, i) => (
                                        <input
                                            key={i}
                                            id={`otp-${i}`}
                                            type="text"
                                            value={digit}
                                            maxLength={1}
                                            onChange={(e) => handleOtpChange(e.target.value, i)}
                                            onKeyDown={(e) => handleOtpKeyDown(e, i)}
                                            className="w-10 h-12 text-center rounded bg-gray-200 dark:bg-[#171717] text-lg outline-none"
                                        />
                                    ))}
                                </div>

                                <p className="text-center text-xs text-gray-500">
                                    {timer > 0 ? (
                                        <>Resend OTP in {timer} sec</>
                                    ) : (
                                        <button
                                            onClick={resendOtp}
                                            className="text-yellow-600 font-medium"
                                        >
                                            Resend OTP
                                        </button>
                                    )}
                                </p>

                                <div className="flex justify-center items-center">
                                    <button
                                        className="w-[50%] bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-md text-sm"
                                        onClick={() => setStep("job")}
                                    >
                                        Verify
                                    </button>
                                </div>
                            </>
                        )}

                        {step === "job" && (
                            <>
                                <h2 className="text-4xl font-semibold text-center">Job Application</h2>
                                <p className="text-center text-gray-500">
                                    Tell us about yourself and why you’re the right fit
                                </p>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-sm">Position Applied For</label>
                                        <div className="flex items-center gap-2 border border-gray-800 dark:border-[#2E2E2E] dark:bg-[#171717] rounded-lg px-4 py-3">
                                            <input
                                                type="text"
                                                placeholder="UI/UX Developer "
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="w-full text-sm outline-none bg-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-sm">Availability to Join*</label>
                                        <div className="flex items-center gap-2 border border-gray-800 dark:border-[#2E2E2E] dark:bg-[#171717] rounded-lg py-1 text-sm">
                                            <CustomSelect
                                                options={budgetOptions}
                                                placeholder="Select Budget"
                                                labelKey="label"
                                                valueKey="value"
                                            // value={budget}
                                            // onSelect={(budget) => {
                                            //     setBudget(budget.value)
                                            // }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-sm">Why Do You Want to Work at V3Cars?*</label>
                                    <div className="flex items-center gap-2 border border-gray-800 dark:border-[#2E2E2E] dark:bg-[#171717] rounded-lg px-4 py-3">
                                        <textarea
                                            placeholder="Tell Us About Yourself"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            className="w-full text-sm outline-none bg-transparent"
                                            rows={10}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-center items-center">
                                    <button className="w-[50%] bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-md text-sm">
                                        Submit
                                    </button>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationModel;


const budgetOptions = [
  { id: 1, label: 'Below ₹5 Lakh', value: 'UNDER_5L' },
  { id: 2, label: '₹5 Lakh - ₹10 Lakh', value: 'BETWEEN_5_10L' },
  { id: 3, label: '₹10 Lakh - ₹20 Lakh', value: 'BETWEEN_10_20L' },
  { id: 4, label: '₹20 Lakh - ₹40 Lakh', value: 'BETWEEN_20_40L' },
  { id: 5, label: 'Above ₹40 Lakh', value: 'ABOVE_40L' },
]