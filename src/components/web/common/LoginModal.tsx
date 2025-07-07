"use client";
import { FiMail } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LoginModalProps {
    onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 10); // for transition
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 ">
            <div
                className={`relative p-24 w-[900px] bg-white rounded-2xl shadow-xl p-6 overflow-hidden transform transition-all duration-300 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                    }`}
            >

                <div className="w-[60%] mx-auto">

                    {/* Background pattern */}
                    <Image
                        src="/common/v3.png"
                        alt="bg"
                        fill
                        className="object-cover opacity-10 z-0"
                    />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-black z-10"
                    >
                        <IoCloseOutline size={22} />
                    </button>

                    {/* Content */}
                    <div className="relative z-10">

                        {/* Title */}
                        <h2 className="text-2xl font-semibold text-center mb-2">
                            Login to <span className="font-bold text-black">V3Cars</span>
                        </h2>
                        <p className="text-sm text-center text-gray-600 mb-6">
                            This is necessary to personalise results for you
                        </p>

                        {/* Email Input */}
                        <div className="flex items-center gap-2  border border-gray-200 bg-gray-200 rounded-md px-4 py-3 mb-4">
                            <FiMail size={16} className="text-gray-500" />
                            <input
                                type="email"
                                placeholder="Enter your email id"
                                className="w-full text-sm outline-none "
                            />
                        </div>

                        {/* OTP Button */}
                        <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-md text-sm mb-5">
                            Login with OTP
                        </button>

                        {/* Divider */}
                        <div className="flex items-center gap-2 mb-5">
                            <hr className="flex-1 border-gray-300" />
                            <span className="text-md text-gray-400">or</span>
                            <hr className="flex-1 border-gray-300" />
                        </div>

                        {/* Social Buttons */}
                        <div className="flex gap-3 justify-center mb-5">
                            <button className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 text-sm bg-white">
                                <Image
                                    src="/common/google.svg"
                                    alt="Google"
                                    width={16}
                                    height={16}
                                />
                                Continue with Google
                            </button>
                            <button className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 text-sm bg-white">
                                <Image
                                    src="/common/facebook.svg"
                                    alt="Facebook"
                                    width={16}
                                    height={16}
                                />
                                Continue with Facebook
                            </button>
                        </div>

                        {/* Sign Up */}
                        <p className="text-center text-xs text-gray-700">
                            Don&apos;t have an account?{" "}
                            <span className="text-yellow-600 cursor-pointer font-medium">
                                Sign Up
                            </span>
                        </p>


                    </div>
                </div>

            </div>
        </div>
    );
};

export default LoginModal;
