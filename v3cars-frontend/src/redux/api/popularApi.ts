import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface PopularCarApiResponse {
  success: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  rows: any[];
}

// Define the API
export const popularCarApi = createApi({
  reducerPath: "popularCarApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  >,
  endpoints: (builder) => ({
    getPopularCar: builder.query<PopularCarApiResponse, void>({
      query: () => "/cars/models?isUpcoming=0&sortBy=popular&limit=30&page=1",
    }),
    // getLatestCars: builder.query<UpcomingCarsResponse, void>({
    //   query: () => "/cars/models?isUpcoming=0&sortBy=latest&limit=9&page=1",
    // }),
  }),
});

// Export hooks
export const {
  useGetPopularCarQuery,
//   useGetLatestCarsQuery,
} = popularCarApi;
