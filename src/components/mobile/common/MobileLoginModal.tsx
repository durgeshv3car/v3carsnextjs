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
        <div className="fixed inset-0 z-[999] bg-white flex flex-col transition-all duration-300 ease-in-out">

            {/* Header */}
            <div className="flex items-start justify-between px-4 py-4">
                <Image src="/logo/header/v3logo.png" alt="V3 Logo" width={100} height={40} />
                <button onClick={onClose}>
                    <IoCloseOutline size={24} />
                </button>
            </div>

            {/* Content */}
            <div className={`px-4 flex-1 overflow-auto transition-all duration-300 ease-in-out ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                {step === "otp" ? (
                    <>

                        <h2 className="text-xl font-semibold text-center mb-1">OTP Verification</h2>

                        <p className="text-sm text-gray-700 text-center mb-4 flex items-center justify-center gap-1">
                            OTP has been sent to <span className="text-yellow-600 font-medium">{email}</span>
                            <TbEdit onClick={() => setStep("login")} size={16} className="cursor-pointer" />
                        </p>

                        <div className="w-full flex justify-center mb-6">
                            <Image src="/common/mobile.png" alt="Mobile" width={224} height={224} />
                        </div>

                        <p className="text-md text-center text-gray-800 font-semibold mb-3">Enter <span className="font-bold">OTP</span></p>

                        <div className="flex justify-center gap-2 mb-3">
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    id={`otp-${i}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(e.target.value, i)}
                                    onKeyDown={(e) => handleBackspace(e, i)}
                                    className="w-10 h-12 text-center rounded bg-gray-200 text-lg outline-none"
                                />
                            ))}
                        </div>

                        <p className="text-center text-xs text-gray-600 mb-4">
                            {timer > 0 ? `Resend OTP in ${timer} sec` : (
                                <button onClick={resendOtp} className="text-yellow-600 font-medium">Resend OTP</button>
                            )}
                        </p>

                        <button className="w-full bg-yellow-400 hover:bg-yellow-500 transition text-black font-medium py-3 rounded-md text-sm mb-3">
                            Login
                        </button>

                        <p className="text-center text-xs text-gray-700 mb-6">
                            Don&apos;t have an account? <span className="text-yellow-600 font-medium cursor-pointer" onClick={() => setStep("signup")}>Sign Up</span>
                        </p>

                    </>

                ) : (

                    <>
                        <h2 className="text-xl font-semibold text-center mb-1">
                            {step === "login" ? <>Login to <span className="font-bold text-black">V3Cars</span></> : <>Sign Up</>}
                        </h2>

                        <p className="text-sm text-gray-600 text-center mb-6">
                            This is necessary to personalise results for you
                        </p>

                        {/* Social Login Buttons */}
                        <button className="w-full flex items-center gap-2 border border-gray-300 rounded px-4 py-3 text-sm justify-center mb-3">
                            <Image src="/common/google.svg" alt="Google" width={18} height={18} />
                            Continue with Google
                        </button>

                        <button className="w-full flex items-center gap-2 border border-gray-300 rounded px-4 py-3 text-sm justify-center mb-5">
                            <Image src="/common/facebook.svg" alt="Facebook" width={18} height={18} />
                            Continue with Facebook
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-2 px-4 mb-4">
                            <hr className="flex-1 border-gray-300" />
                            <span className="text-xs text-gray-400 rounded-full border p-1 w-8 h-8 flex items-center justify-center">or</span>
                            <hr className="flex-1 border-gray-300" />
                        </div>


                    </>

                )}
            </div>

            {/* Bottom Section */}
            {step !== "otp" && (
                <div className="px-4 pb-5">
                    {step === "login" ? (
                        <>

                            <div className="w-full bg-gray-100 rounded-md px-4 py-3 mb-3 flex items-center gap-2">
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
                                className="w-full bg-yellow-400 hover:bg-yellow-500 transition text-black font-medium py-3 rounded-md text-sm mb-3"
                                onClick={() => setStep("otp")}
                            >
                                Login with OTP
                            </button>

                            <p className="text-center text-xs text-gray-700">
                                Don&apos;t have an account?{" "}
                                <span className="text-yellow-600 font-medium cursor-pointer" onClick={() => setStep("signup")}>
                                    Sign Up
                                </span>
                            </p>

                        </>
                    ) : (
                        <>

                            <div className="w-full bg-gray-100 rounded-md px-4 py-3 mb-3 flex items-center gap-2">
                                <FiUser size={16} className="text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="w-full bg-transparent outline-none text-sm"
                                />
                            </div>

                            <div className="w-full bg-gray-100 rounded-md px-4 py-3 mb-3 flex items-center gap-2">
                                <FiMail size={16} className="text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="Enter your email id"
                                    className="w-full bg-transparent outline-none text-sm"
                                />
                            </div>

                            <div className="w-full bg-gray-100 rounded-md px-4 py-3 mb-3 flex items-center gap-2">
                                <FiPhone size={16} className="text-gray-500" />
                                <input
                                    type="tel"
                                    placeholder="Enter your mobile number"
                                    className="w-full bg-transparent outline-none text-sm"
                                />
                            </div>

                            <button className="w-full bg-yellow-400 hover:bg-yellow-500 transition text-black font-medium py-3 rounded-md text-sm mb-3">
                                Sign Up
                            </button>

                            <p className="text-center text-xs text-gray-700">
                                Already have an account?{" "}
                                <span className="text-yellow-600 font-medium cursor-pointer" onClick={() => setStep("login")}>
                                    Login
                                </span>
                            </p>

                        </>
                    )}
                </div>
            )}
        </div>
    );

};

export default MobileLoginModal;
