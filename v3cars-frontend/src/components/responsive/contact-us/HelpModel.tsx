"use client";

import { IoCloseOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import FormOne from "./CommonOption/form1";
import FormSecond from "./CommonOption/form2";
import FormThree from "./CommonOption/form3";
import FormFour from "./CommonOption/form4";

interface HelpModelProps {
    showHelpModel: number | null
    onClose: () => void;
}

const HelpModel = ({ showHelpModel, onClose }: HelpModelProps) => {
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState<"suggestion" | "otp" | "details">(
        "suggestion"
    );
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timer, setTimer] = useState(16);

    const [formData, setFormData] = useState({
        fullName: "",
        lastName: "",
        email: "",
        phone: "",
    });

    const [formData1, setFormData1] = useState({
        budget: "",
        usage: "",
        fuel: "",
        transmission: "",
        notes: "",
    });

    const [formData2, setFormData2] = useState({
        contentTypes: "",
        otherContent: "",
        platforms: "",
        whyContent: "",
        links: "",
    });

    const [formData3, setFormData3] = useState({
        carModel: "",
        queryDetail: "",
    });

    const [formData4, setFormData4] = useState({
        issueType: "",
        otherIssue: "",
        pageAffected: "",
        issueDetail: "",
        screenshot: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // if (!formData.usage || !formData.fullName || !formData.email) {
        //     alert("Please fill all required fields!");
        //     return;
        // }
        // console.log("Final Form Data => ", formData);
        // alert(`Selected Usage: ${formData.usage}`);
    };

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

    const handleOtpKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
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
                <div className="w-[80%] mx-auto min-h-[600px] flex justify-center items-center py-10">
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

                    <div className="relative z-10 flex flex-col justify-between gap-4 w-full">
                        {/* Step 1 - Suggestion */}
                        {step === "suggestion" && (
                            <>
                                <h2 className="text-4xl font-semibold text-center">
                                    Ask for Our Suggestion
                                </h2>
                                <p className="text-center text-gray-500">
                                    Get unbiased guidance on which car suits your needs best
                                </p>

                                {
                                    showHelpModel === 1 && (
                                        <FormOne formData={formData1} setFormData={setFormData1} onClose={() => setStep("details")} />
                                    )
                                }

                                {
                                    showHelpModel === 2 && (
                                        <FormSecond formData={formData2} setFormData={setFormData2} onClose={() => setStep("details")} />
                                    )
                                }

                                {
                                    showHelpModel === 3 && (
                                        <FormThree formData={formData3} setFormData={setFormData3} onClose={() => setStep("details")} />
                                    )
                                }

                                {
                                    showHelpModel === 4 && (
                                        <FormFour formData={formData4} setFormData={setFormData4} onClose={() => setStep("details")} />
                                    )
                                }
                            </>
                        )}

                        {/* Step 2 - OTP */}
                        {step === "otp" && (
                            <>
                                <h2 className="text-4xl font-semibold text-center">
                                    OTP Verification
                                </h2>
                                <p className="text-center text-gray-500 flex items-center justify-center gap-2">
                                    <span>OTP has been sent to</span>
                                    <span className="text-yellow-600 font-semibold">
                                        {formData.email}
                                    </span>
                                    <TbEdit
                                        size={16}
                                        className="cursor-pointer text-gray-600"
                                        onClick={() => setStep("details")}
                                    />
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
                                        onClick={() => setStep("details")}
                                    >
                                        Verify
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Step 3 - Details */}
                        {step === "details" && (
                            <form
                                onSubmit={handleSubmit}
                                className="min-h-[500px] flex flex-col justify-between"
                            >
                                <div className="space-y-4">
                                    <h2 className="text-4xl font-semibold text-center">Ask for Our Suggestion</h2>
                                    <p className="text-center text-gray-500"> Get unbiased guidance on which car suits your needs best </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            placeholder="Full Name*"
                                            // value={formData.fullName}
                                            // onChange={(e) =>
                                            //     handleChange("fullName", e.target.value)
                                            // }
                                            className="w-full text-sm outline-none bg-transparent border border-gray-800 rounded-lg px-4 py-3"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last Name"
                                            // value={formData.lastName}
                                            // onChange={(e) =>
                                            //     handleChange("lastName", e.target.value)
                                            // }
                                            className="w-full text-sm outline-none bg-transparent border border-gray-800 rounded-lg px-4 py-3"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email Address*"
                                            // value={formData.email}
                                            // onChange={(e) =>
                                            //     handleChange("email", e.target.value)
                                            // }
                                            className="w-full text-sm outline-none bg-transparent border border-gray-800 rounded-lg px-4 py-3"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Phone Number*"
                                            // value={formData.phone}
                                            // onChange={(e) =>
                                            //     handleChange("phone", e.target.value)
                                            // }
                                            className="w-full text-sm outline-none bg-transparent border border-gray-800 rounded-lg px-4 py-3"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-center items-center">
                                        <button
                                            className="w-[50%] bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-md text-sm"
                                            onClick={() => setStep("otp")}
                                        >
                                            Verify Your Number
                                        </button>
                                    </div>

                                    <p className="text-center">
                                        By proceeding ahead you agree to{" "}
                                        <Link href={'/'} className="text-blue-500 underline"> V3Cars terms and conditions. </Link>
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpModel;