"use client";
import { FiMail, FiUser, FiPhone } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UserData, useRegisterMutation, useSendOTPMutation, useVerifyOTPMutation } from "@/redux/api/authModuleApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import { setLogin } from "@/redux/slices/authSlice";

interface LoginModalProps {
  onClose: () => void;
}

export interface VerifyOtpRequest {
  emailAddress: string;
  otpvalue: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  data: UserData;
}

export interface ApiErrorData {
  message: string;
  success: boolean;
}

export interface ApiErrorResponse {
  data: ApiErrorData;
  status: number;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<"login" | "otp" | "signup">("login");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(16);
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    mobile?: string;
    error?: string;
    otp?: string;
  }>({});

  const [register, { isLoading }] = useRegisterMutation();
  const [verifyOTP, { isLoading: verifyOTPLoading }] = useVerifyOTPMutation();
  const [sendOTP, { isLoading: sendOTPLoading }] = useSendOTPMutation();
  const dispatch = useDispatch()

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

  const resendOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    // 2️⃣ Email Valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.error = "Email is required";
      setErrors(newErrors);
      return;
    }

    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const res = await sendOTP({
        emailAddress: email,
      }).unwrap();

      if (res.success) {
        if (step === "login") {
          alert("OTP send successfully.");
          setStep("otp");
          setTimer(16);
        } else {
          alert("OTP resend successfully.");
          setTimer(16);
        }
      }
    } catch (err) {
      const error = err as FetchBaseQueryError;

      newErrors.error =
        (error.data as { message?: string })?.message ||
        "OTP send failed";

      setErrors(newErrors);
    }
  }

  const handleOtpVerifaction = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    const otpValue = otp.join("");

    if (!otpValue) {
      newErrors.otp = "OTP is required";
      setErrors(newErrors);
      return;
    }

    if (!/^\d+$/.test(otpValue)) {
      newErrors.otp = "OTP must contain only numbers";
      setErrors(newErrors);
      return;
    }

    if (otpValue.length !== 6) {
      newErrors.otp = "OTP must be 6 digits";
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const res = await verifyOTP({
        emailAddress: email,
        otpvalue: otpValue,
      }).unwrap();

      if (res.success) {
        alert("OTP verified successfully");
        dispatch(setLogin({
          userId: res.data.userId,
          username: res.data.username,
          displayName: res.data.displayName,
          mobilenumber: res.data.mobilenumber,
          emailAddress: res.data.emailAddress,
          status: res.data.status,
        }));
        onClose()
      }
    } catch (err) {
      const error = err as FetchBaseQueryError;

      newErrors.error =
        (error.data as { message?: string })?.message ||
        "OTP verification failed";

      setErrors(newErrors);
    }
  };


  const handleSignUp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    // 1️⃣ Username Valid
    if (!fullName.trim()) {
      newErrors.fullName = "Fullname is required";
      setErrors(newErrors);
      return;
    }

    if (fullName.length < 3) {
      newErrors.fullName = "Fullname must be at least 3 characters";
      setErrors(newErrors);
      return;
    }

    // 2️⃣ Email Valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      setErrors(newErrors);
      return;
    }

    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
      setErrors(newErrors);
      return;
    }

    // 3️⃣ Mobile Valid
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      setErrors(newErrors);
      return;
    }

    if (!mobileRegex.test(mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      const response = await register({
        username: fullName,
        displayName: fullName,
        mobilenumber: mobile,
        emailAddress: email,
      }).unwrap();

      if (response.success === true) {
        alert("Your Account Is Successfully Create.")
        setStep("otp");
        setTimer(16);
      }
    } catch (err) {
      const error = err as FetchBaseQueryError;

      newErrors.error =
        (error.data as { message?: string })?.message ||
        "Registration failed";

      setErrors(newErrors);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40">

      <div
        className={`relative w-[900px] bg-white dark:bg-black rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
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

          <div className="relative z-10 flex flex-col justify-between gap-4">

            {step === "login" && (

              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl text-center">
                    Login to <span className="font-bold">V3Cars</span>
                  </h2>
                  <div>
                    <p className="text-center text-gray-500">
                      This is necessary to personalise results for you
                    </p>
                    {errors.error && <p className="error text-xs mt-1 text-red-500 text-center">{errors.error}</p>}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
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
                    {errors.email && <p className="error text-xs mt-1 text-red-500 text-center">{errors.email}</p>}
                  </div>

                  <button
                    disabled={!email || sendOTPLoading}
                    onClick={resendOtp}
                    className="w-full bg-primary hover:bg-primary-hover text-black font-medium py-3 rounded-md text-sm disabled:opacity-50"
                  >
                    Login with OTP
                  </button>
                </div>

                <div className="flex items-center">
                  <hr className="flex-1 border-gray-300 dark:border-[#2E2E2E]" />
                  <div className="w-12 h-12 rounded-full flex justify-center items-center border dark:border-[#2E2E2E]">
                    <span className="text-md text-gray-600">or</span>
                  </div>
                  <hr className="flex-1 border-gray-300 dark:border-[#2E2E2E]" />
                </div>

                <div className="space-y-4">
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
                      className="text-primary cursor-pointer font-medium"
                    >
                      Sign Up
                    </span>
                  </p>
                </div>
              </div>
            )}

            {step === "otp" && (
              <>
                <h2 className="text-4xl font-semibold text-center">
                  OTP Verification
                </h2>

                <p className="text-center text-gray-500 flex items-center justify-center gap-2">
                  <span>OTP has been sent to</span>
                  <span className="text-primary font-semibold">{email}</span>
                  <TbEdit
                    size={16}
                    className="cursor-pointer text-gray-600"
                    onClick={() => setStep("login")}
                  />
                </p>

                <p className="text-md font-semibold text-center">
                  Enter <span className="font-bold">OTP</span>
                </p>

                <div>
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
                  {errors.otp || errors.error && <p className="error text-xs mt-1 text-red-500 text-center">{errors.otp || errors.error}</p>}
                </div>

                <p className="text-center text-xs text-gray-500">
                  {timer > 0 ? (
                    <>Resend OTP in {timer} sec</>
                  ) : (
                    <button
                      type="button"
                      disabled={sendOTPLoading}
                      onClick={resendOtp}
                      className="text-primary font-medium"
                    >
                      Resend OTP
                    </button>
                  )}
                </p>

                <button
                  type="button"
                  onClick={handleOtpVerifaction}
                  disabled={verifyOTPLoading}
                  className="w-full bg-primary hover:bg-primary-hover text-black font-medium py-3 rounded-md text-sm"
                >
                  Verify
                </button>

                <p className="text-center text-xs text-gray-500">
                  Don&apos;t have an account?{" "}
                  <span
                    onClick={() => setStep("signup")}
                    className="text-primary cursor-pointer font-medium"
                  >
                    Sign Up
                  </span>
                </p>

              </>
            )}

            {step === "signup" && (
              <>
                <h2 className="text-4xl font-semibold text-center">Sign Up</h2>
                <div>
                  <p className="text-sm text-center text-gray-500">
                    This is necessary to personalise results for you
                  </p>
                  {errors.error && <p className="error text-xs mt-1 text-red-500 text-center">{errors.error}</p>}
                </div>

                <div>
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
                  {errors.fullName && <p className="error text-xs mt-1 text-red-500">{errors.fullName}</p>}
                </div>

                <div>
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
                  {errors.email && <p className="error text-xs mt-1 text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <div className="flex items-center gap-2 border border-gray-200 dark:border-[#2E2E2E] bg-gray-200 dark:bg-[#171717] rounded-md px-4 py-3">
                    <FiPhone size={16} className="text-gray-500" />
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      maxLength={10}
                      className="w-full text-sm outline-none bg-transparent"
                    />
                  </div>
                  {errors.mobile && <p className="error text-xs mt-1 text-red-500">{errors.mobile}</p>}
                </div>

                <button
                  type="button"
                  onClick={handleSignUp}
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary-hover text-black font-medium py-3 rounded-md text-sm"
                >
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
                    className="text-primary font-medium cursor-pointer"
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
