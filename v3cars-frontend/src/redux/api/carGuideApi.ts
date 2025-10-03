import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface LatestReviewsResponse {
    success: boolean;
    rows: [];
}

// Define the API
export const carGuideApi = createApi({
    reducerPath: "carGuideApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getLatestCarGuide: builder.query<LatestReviewsResponse, void>({
            query: () => "/content/car-guide/latest?limit=9&excludeToday=0",
        }),
        getTrendingCarGuide: builder.query<LatestReviewsResponse, void>({
            query: () => `/content/car-guide/trending?excludeToday=0&limit=6`,
        }),
        getTopCarGuide: builder.query<LatestReviewsResponse, void>({
            query: () => `/content/car-guide/top?excludeToday=0&limit=6`,
        }),
        getPopularCarGuide: builder.query<LatestReviewsResponse, void>({
            query: () => `/content/car-guide/popular?limit=10`,
        }),
    }),
});

// Export hooks
export const {
    useGetLatestCarGuideQuery,
    useGetTrendingCarGuideQuery,
    useGetTopCarGuideQuery,
    useGetPopularCarGuideQuery,
} = carGuideApi;
