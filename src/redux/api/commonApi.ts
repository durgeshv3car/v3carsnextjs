import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Request payload type
interface SendOtpRequest {
  mobileNumber: string;
  otp?: string;
  otp_options?: {
    type?: string;
    purpose?: string;
    [key: string]: any; // optional for any additional fields
  };
}

// Response type
interface SendOtpResponse {
  success: boolean;
  message: string;
  data?: any;
}

// API definition
export const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    sendOtp: builder.mutation<SendOtpResponse, SendOtpRequest>({
      query: ({ mobileNumber, otp, otp_options }) => ({
        url: "/common/send-otp",
        method: "POST",
        body: { mobileNumber, otp, otp_options },
      }),
    }),
  }),
});

// Export hook
export const { useSendOtpMutation } = commonApi;
