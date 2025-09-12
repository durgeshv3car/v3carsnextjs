"use client";
import { FiMail, FiUser, FiPhone } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import Image from "next/image";
import { useEffect, useState } from "react";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<"login" | "otp" | "signup">("login");
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
        className={`relative w-[900px] bg-white dark:bg-black rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >

        <div className="w-[60%] mx-auto min-h-[600px] flex justify-center items-center">

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

          <div className="relative z-10 flex flex-col justify-between gap-6">

            {step === "login" && (

              <>
                <h2 className="text-4xl font-semibold text-center">
                  Login to <span className="font-bold">V3Cars</span>
                </h2>
                <p className="text-center text-gray-500">
                  This is necessary to personalise results for you
                </p>

                <div className="flex items-center gap-2 border border-gray-200 bg-gray-200 dark:bg-[#171717] dark:border-[#2E2E2E] rounded-md px-4 py-3">
                  <FiMail size={16} className="text-gray-500" />
                  <input
                    type="email"
                    placeholder="Enter your email id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm outline-none bg-transparent"
                  />
                </div>

                <button
                  disabled={!email}
                  onClick={() => {
                    setStep("otp");
                    setTimer(16);
                  }}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-md text-sm disabled:opacity-50"
                >
                  Login with OTP
                </button>

                <div className="flex items-center">
                  <hr className="flex-1 border-gray-300 dark:border-[#2E2E2E]" />
                  <div className="w-12 h-12 rounded-full flex justify-center items-center border dark:border-[#2E2E2E]">
                  <span className="text-md text-gray-400">or</span>
                  </div>
                  <hr className="flex-1 border-gray-300 dark:border-[#2E2E2E]" />
                </div>

                <div className="flex gap-3 justify-center">
                  <button className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 text-sm bg-white dark:bg-[#171717] dark:border-[#2E2E2E]">
                    <Image src="/common/google.svg" alt="Google" width={16} height={16} />
                    Continue with Google
                  </button>
                  <button className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 text-sm bg-white dark:bg-[#171717] dark:border-[#2E2E2E]">
                    <Image src="/common/facebook.svg" alt="Facebook" width={16} height={16} />
                    Continue with Facebook
                  </button>
                </div>

                <p className="text-center text-xs text-gray-500">
                  Don&apos;t have an account?{" "}
                  <span
                    onClick={() => setStep("signup")}
                    className="text-yellow-600 cursor-pointer font-medium"
                  >
                    Sign Up
                  </span>
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
                    onClick={() => setStep("login")}
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

                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-md text-sm">
                  Login
                </button>

                <p className="text-center text-xs text-gray-500">
                  Don&apos;t have an account?{" "}
                  <span
                    onClick={() => setStep("signup")}
                    className="text-yellow-600 cursor-pointer font-medium"
                  >
                    Sign Up
                  </span>
                </p>

              </>
            )}

            {step === "signup" && (
              <>
                <h2 className="text-4xl font-semibold text-center">Sign Up</h2>
                <p className="text-sm text-center text-gray-500">
                  This is necessary to personalise results for you
                </p>

                <div className="flex items-center gap-2 border border-gray-200 dark:border-[#2E2E2E] bg-gray-200 dark:bg-[#171717] rounded-md px-4 py-3">
                  <FiUser size={16} className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full text-sm outline-none bg-transparent"
                  />
                </div>

                <div className="flex items-center gap-2 border border-gray-200 dark:border-[#2E2E2E] bg-gray-200 dark:bg-[#171717] rounded-md px-4 py-3">
                  <FiMail size={16} className="text-gray-500" />
                  <input
                    type="email"
                    placeholder="Enter your email id"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-sm outline-none bg-transparent"
                  />
                </div>

                <div className="flex items-center gap-2 border border-gray-200 dark:border-[#2E2E2E] bg-gray-200 dark:bg-[#171717] rounded-md px-4 py-3">
                  <FiPhone size={16} className="text-gray-500" />
                  <input
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full text-sm outline-none bg-transparent"
                  />
                </div>

                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-md text-sm">
                  Sign Up
                </button>

                <div className="flex items-center gap-2">
                  <hr className="flex-1 border-gray-300" />
                  <span className="text-md text-gray-400">or</span>
                  <hr className="flex-1 border-gray-300" />
                </div>

                <div className="flex gap-3 justify-center">
                  <button className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 text-sm bg-white dark:border-[#2E2E2E] dark:bg-[#171717]">
                    <Image src="/common/google.svg" alt="Google" width={16} height={16} />
                    Continue with Google
                  </button>
                  <button className="flex items-center gap-2 border border-gray-200 rounded px-4 py-2 text-sm bg-white dark:border-[#2E2E2E] dark:bg-[#171717]">
                    <Image src="/common/facebook.svg" alt="Facebook" width={16} height={16} />
                    Continue with Facebook
                  </button>
                </div>

                <p className="text-center text-xs text-gray-500">
                  Already have an account?{" "}
                  <span
                    className="text-yellow-600 font-medium cursor-pointer"
                    onClick={() => setStep("login")}
                  >
                    Login
                  </span>
                </p>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
