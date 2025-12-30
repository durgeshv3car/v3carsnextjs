import { VerifyOtpRequest, VerifyOtpResponse } from "@/components/web/common/LoginModal";
import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define request and response types
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  displayName: string;
  mobilenumber: string;
  emailAddress: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    // add more fields if needed
  };
}

export interface UserData {
  userId: number;
  username: string;
  displayName: string;
  mobilenumber: string;
  emailAddress: string;
  status: number;
}

interface RegisterResponse {
  success: boolean;
  data: UserData;
}

interface IpResponse {
  ip: string;
}

// Define the API
export const authModuleApi = createApi({
  reducerPath: "authModuleApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),
    VerifyOTP: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (body) => ({
        url: "/auth/verify-login",
        method: "POST",
        body,
      }),
    }),
    sendOTP: builder.mutation<{ success: true }, { emailAddress: string }>({
      query: (body) => ({
        url: "/auth/send-otp-for-login",
        method: "POST",
        body,
      }),
    }),
    fetchUserIp: builder.query<IpResponse, void>({
      query: () => "/auth/get-ip",
    }),
  }),
});

// Export hooks
export const {
  useLoginMutation,
  useFetchUserIpQuery,
  useRegisterMutation,
  useVerifyOTPMutation,
  useSendOTPMutation,
} = authModuleApi;
