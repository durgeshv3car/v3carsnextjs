import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { Article } from "@/components/responsive/car-news/CarNewsCard";

interface LatestComparisonReviewsResponse {
    success: boolean;
    rows: [];
}

// Define the API
export const comparisonApi = createApi({
    reducerPath: "comparisonApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getLatestComparisonReviews: builder.query<LatestComparisonReviewsResponse, void>({
            query: () => "/content/comparison/latest?limit=6&excludeToday=0",
        }),
        getTrendingComparisonReviews: builder.query<LatestComparisonReviewsResponse, void>({
            query: () => `/content/comparison/trending?limit=6&excludeToday=0`,
        }),
        getTopComparisonReviews: builder.query<LatestComparisonReviewsResponse, void>({
            query: () => `/content/comparison/top?limit=6&excludeToday=0`,
        }),
        getPopularReviews: builder.query<LatestComparisonReviewsResponse, void>({
            query: () => `/content/comparison/popular?limit=10`,
        }),
    }),
});

// Export hooks
export const {
    useGetLatestComparisonReviewsQuery,
    useGetTrendingComparisonReviewsQuery,
    useGetTopComparisonReviewsQuery,
    useGetPopularReviewsQuery,
} = comparisonApi;
