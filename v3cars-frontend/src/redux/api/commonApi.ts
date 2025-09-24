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

interface BrandsResponse {
  success: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  rows: any[];
}

interface PopularCitiesResponse {
  success: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  rows: any[];
}

interface GetModelsArgs {
  brandId: number
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
    getBrands: builder.query<BrandsResponse, void>({
      query: () => "/cars/brands?limit=69&page=1",
    }),
    getModels: builder.query<BrandsResponse, GetModelsArgs>({
      query: ({ brandId }) => `/cars/models?brandId=${brandId}&isUpcoming=0`,
    }),
    getPopularCities: builder.query<PopularCitiesResponse, void>({
      query: () => `/locations/cities?isPopular=1&limit=24&sortBy=name_asc`,
    }),
    getAllCities: builder.query<PopularCitiesResponse, { page: number; limit: number }>({
      query: ({ page, limit }) => `/locations/cities?limit=50&page=${page}&sortBy=name_asc`,
    }),
    getSearchCity: builder.query<PopularCitiesResponse, { query: string }>({
      query: ({ query }) => `/locations/cities?q=${query}&limit=1&sortBy=name_asc`,
    }),
  }),
});

// Export hook
export const {
  useSendOtpMutation,
  useGetBrandsQuery,
  useGetModelsQuery,
  useGetPopularCitiesQuery,
  useGetAllCitiesQuery,
  useGetSearchCityQuery,
} = commonApi;
