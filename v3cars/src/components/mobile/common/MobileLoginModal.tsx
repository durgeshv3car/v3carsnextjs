"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiMail, FiUser, FiPhone } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";

interface MobileLoginModalProps {
    onClose: () => void;
}

const MobileLoginModal = ({ onClose }: MobileLoginModalProps) => {

    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState<"login" | "signup" | "otp">("login");
    const [email, setEmail] = useState("");
    const [fullName, setFullName] = useState("");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timer, setTimer] = useState(16);

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

    const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && otp[index] === "" && index > 0) {
            const prev = document.getElementById(`otp-${index - 1}`);
            if (prev) (prev as HTMLInputElement).focus();

            const updated = [...otp];
            updated[index - 1] = "";
            setOtp(updated);
        }
    };

    const resendOtp = () => {
        setTimer(16);
    };

    return (
        <div className="fixed inset-0 z-[999] bg-white dark:bg-[#171717] flex flex-col transition-all duration-300 ease-in-out">

            {/* Header */}
            <div className="flex items-start justify-between px-4 py-4">
                <Image src="/logo/header/v3logo.png" alt="V3 Logo" width={100} height={40} className="block dark:hidden" />
                <Image src="/logo/header/v3-white2.png" alt="Logo" width={90} height={40} className="hidden dark:block" />
                <button onClick={onClose}>
                    <IoCloseOutline size={24} />
                </button>
            </div>

            {/* Content */}
            <div className={`px-4 py-10 h-full flex flex-col justify-between overflow-auto transition-all duration-300 ease-in-out ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                {step === "otp" ? (
                    <>
                        <div className="flex flex-col justify-between gap-2 h-full">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-center">OTP Verification</h2>

                                <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-1">
                                    OTP has been sent to <span className="text-primary font-medium">{email}</span>
                                    <TbEdit onClick={() => setStep("login")} size={16} className="cursor-pointer" />
                                </p>
                            </div>

                            <div className="w-full flex justify-center mb-6">
                                <Image src="/common/mobile-removebg.png" alt="Mobile" width={224} height={224} />
                            </div>

                            <div className="space-y-6">
                                <p className="text-md text-center text-gray-500 text-2xl">Enter <span className="font-bold">OTP</span></p>

                                <div className="flex justify-center gap-2">
                                    {otp.map((digit, i) => (
                                        <input
                                            key={i}
                                            id={`otp-${i}`}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleOtpChange(e.target.value, i)}
                                            onKeyDown={(e) => handleBackspace(e, i)}
                                            className="w-10 h-12 text-center rounded bg-transparent border dark:border-[#2E2E2E] text-lg outline-none"
                                        />
                                    ))}
                                </div>

                                <p className="text-center text-xs text-gray-600">
                                    {timer > 0 ? `Resend OTP in ${timer} sec` : (
                                        <button onClick={resendOtp} className="text-primary font-medium">Resend OTP</button>
                                    )}
                                </p>

                                <button className="w-full bg-primary hover:bg-primary-hover transition text-black font-medium py-3 rounded-md text-sm">
                                    Login
                                </button>

                                <p className="text-center text-xs text-gray-500">
                                    Don&apos;t have an account? <span className="text-primary font-medium cursor-pointer" onClick={() => setStep("signup")}>Sign Up</span>
                                </p>
                            </div>
                        </div>

                    </>

                ) : (
                    <>
                        <div>
                            <h2 className="text-xl font-semibold text-center mb-1">
                                {step === "login" ? <>Login to <span className="font-bold">V3Cars</span></> : <>Sign Up</>}
                            </h2>

                            <p className="text-sm text-gray-500 text-center mb-6">
                                This is necessary to personalise results for you
                            </p>

                            {/* Social Login Buttons */}
                            <button className="w-full flex items-center gap-2 border border-gray-300 dark:border-[#2E2E2E] rounded px-4 py-3 text-sm justify-center mb-3">
                                <Image src="/common/google.svg" alt="Google" width={18} height={18} />
                                Continue with Google
                            </button>

                            <button className="w-full flex items-center gap-2 border border-gray-300 dark:border-[#2E2E2E] rounded px-4 py-3 text-sm justify-center mb-5">
                                <Image src="/common/facebook.svg" alt="Facebook" width={18} height={18} />
                                Continue with Facebook
                            </button>


                        </div>

                        {/* Divider */}
                        <div className="flex items-center ">
                            <hr className="flex-1 border-gray-300 dark:border-[#2E2E2E]" />
                            <span className="text-sm dark:border-[#2E2E2E] rounded-full border p-2 w-10 h-10 flex items-center justify-center">or</span>
                            <hr className="flex-1 border-gray-300 dark:border-[#2E2E2E]" />
                        </div>
                    </>
                )}


                {/* Bottom Section */}
                {step !== "otp" && (
                    <div>
                        {step === "login" ? (
                            <div>
                                <div className="w-full border dark:border-[#2E2E2E] rounded-md px-4 py-3 mb-3 flex items-center gap-2">
                                    <FiMail size={16} className="text-gray-500" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email id"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-transparent outline-none text-sm"
                                    />
                                </div>

                                <button
                                    className="w-full bg-primary hover:bg-primary-hover transition text-black font-medium py-3 rounded-md text-sm mb-3"
                                    onClick={() => setStep("otp")}
                                >
                                    Login with OTP
                                </button>

                                <p className="text-center text-xs text-gray-500">
                                    Don&apos;t have an account?{" "}
                                    <span className="text-primary font-medium cursor-pointer" onClick={() => setStep("signup")}>
                                        Sign Up
                                    </span>
                                </p>

                            </div>
                        ) : (
                            <>
                                <div className="w-full border dark:border-[#2E2E2E] rounded-md px-4 py-3 mb-3 flex items-center gap-2">
                                    <FiUser size={16} className="text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="w-full bg-transparent outline-none text-sm"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                    />
                                </div>

                                <div className="w-full border dark:border-[#2E2E2E] rounded-md px-4 py-3 mb-3 flex items-center gap-2">
                                    <FiMail size={16} className="text-gray-500" />
                                    <input
                                        type="email"
                                        placeholder="Enter your email id"
                                        className="w-full bg-transparent outline-none text-sm"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="w-full border dark:border-[#2E2E2E] rounded-md px-4 py-3 mb-3 flex items-center gap-2">
                                    <FiPhone size={16} className="text-gray-500" />
                                    <input
                                        type="tel"
                                        placeholder="Enter your mobile number"
                                        className="w-full bg-transparent outline-none text-sm"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                    />
                                </div>

                                <button className="w-full bg-primary hover:bg-primary-hover transition text-black font-medium py-3 rounded-md text-sm mb-3">
                                    Sign Up
                                </button>

                                <p className="text-center text-xs text-gray-500">
                                    Already have an account?{" "}
                                    <span className="text-primary font-medium cursor-pointer" onClick={() => setStep("login")}>
                                        Login
                                    </span>
                                </p>

                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

};

export default MobileLoginModal;
