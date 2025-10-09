import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Request payload type
interface SendOtpRequest {
  mobileNumber: string;
  otp?: string;
  otp_options?: {
    type?: string;
    purpose?: string;
    [key: string]: unknown; // ✅ safer than "any"
  };
}

// Response type
interface SendOtpResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>; // ✅ avoids "any"
}

interface PopularCitiesResponse {
  success: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  rows: [];
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
    getFAQByModule: builder.query<PopularCitiesResponse, { moduleId: number }>({
      query: ({ moduleId }) => `/faqs?moduleId=${moduleId}&limit=50&page=1&sortBy=sequence_asc`,
    }),
  }),
});

// Export hook
export const {
  useSendOtpMutation,
  useGetFAQByModuleQuery,
} = commonApi;
