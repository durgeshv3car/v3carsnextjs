import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Define request and response types
interface LoginRequest {
  email: string;
  password: string;
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

interface IpResponse {
  ip: string;
}

// Define the API
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  >,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/auth/login",
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
export const { useLoginMutation, useFetchUserIpQuery } = authApi;
