import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface UpcomingCarsResponse {
  success: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  rows: any[];
}

interface QuickLookResponse {
  success: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  rows: any[];
}

interface LatestCarNewsResponse {
  success: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  rows: any[];
}

interface CarByBodyTypeResponse {
  success: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  rows: any[];
}

interface CarByPriceResponse {
  success: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  rows: any[];
}

interface BrandsResponse {
  success: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  rows: any[];
}

interface CarReviewsResponse {
  success: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  rows: any[];
}

interface VariantsExplainedResponse {
  success: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  rows: any[];
}

interface LatestVideosResponse {
  success: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  rows: any[];
}

// Define the API
export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  >,
  endpoints: (builder) => ({
    UpcomingCars: builder.query<UpcomingCarsResponse, void>({
      query: () => "/home/upcoming-cars?limit=30&page=1",
    }),
    getQuickLook: builder.query<
      QuickLookResponse,
      { type: string; limit?: number; page?: number }
    >({
      query: ({ type, limit = 10, page = 1 }) =>
        `/home/quick-look?type=${type}&limit=${limit}&page=${page}`,
    }),
    getLatestCarNews: builder.query<LatestCarNewsResponse, void>({
      query: () => `/home/latest-news?limit=20`,
    }),
    getCarByBodyType: builder.query<CarByBodyTypeResponse, { id: number; limit?: number; page?: number }>({
      query: ({ id, limit = 10, page = 1 }) =>
        `/home/search-by-body-type?bodyTypeId=${id}&limit=${limit}&page=${page}`,
    }),
    getCarByPrice: builder.query<CarByPriceResponse, { budget: string; limit?: number; page?: number }>({
      query: ({ budget, limit = 10, page = 1 }) =>
        `/home/search-by-price?bucket=${budget}&limit=8&page=1`,
    }),
    getLatestVideos: builder.query<LatestVideosResponse, void>({
      query: () =>
        `/videos/latest?limit=8`,
    }),
    getVariantsExplained: builder.query<VariantsExplainedResponse, void>({
      query: () =>
        `/content/variant-explained/latest?limit=20`,
    }),
    getExpertCarReviews: builder.query<CarReviewsResponse, void>({
      query: () =>
        `/home/latest-reviews?limit=20`,
    }),
    getAllBrands: builder.query<BrandsResponse, void>({
      query: () => "/cars/brands?limit=69&page=1",
    }),
  }),
});

// Export hooks
export const {
  useUpcomingCarsQuery,
  useGetQuickLookQuery,
  useGetLatestCarNewsQuery,
  useGetCarByBodyTypeQuery,
  useGetCarByPriceQuery,
  useGetLatestVideosQuery,
  useGetVariantsExplainedQuery,
  useGetExpertCarReviewsQuery,
  useGetAllBrandsQuery,
} = homeApi;
