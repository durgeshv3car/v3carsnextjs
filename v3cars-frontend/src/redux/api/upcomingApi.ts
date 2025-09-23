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

interface MonthsResponse {
  success: boolean;
  rows: any[];
}

// Define the API
export const upcomingApi = createApi({
  reducerPath: "upcomingApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  >,
  endpoints: (builder) => ({
    getUpcomingCars: builder.query<UpcomingCarsResponse, void>({
      query: () => "/cars/models?isUpcoming=1&futureOnly=1&sortBy=launch_asc&limit=9&page=1",
    }),
    getLatestCars: builder.query<UpcomingCarsResponse, { launchMonth: string }>({
      query: ({ launchMonth }) => `/cars/models?isUpcoming=1&launchMonth=${launchMonth}&sortBy=launch_asc&limit=9&page=1`,
    }),
    getMonth: builder.query<MonthsResponse, void>({
      query: () => `/cars/models/upcoming-monthly-count?months=11`,
    }),
  }),
});

// Export hooks
export const {
  useGetUpcomingCarsQuery,
  useGetLatestCarsQuery,
  useGetMonthQuery,
} = upcomingApi;
