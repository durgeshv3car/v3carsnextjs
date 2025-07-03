import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commonApi = createApi({
  reducerPath: "commonApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    sendOtp: builder.mutation({
      query: ({ mobileNumber, otp, otp_options }) => ({
        url: "/common/send-otp",
        method: "POST",
        body: { mobileNumber, otp, otp_options },
      }),
    }),


  }),
});

export const {
  useSendOtpMutation,

} = commonApi;
