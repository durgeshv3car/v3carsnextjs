import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { Article } from "@/components/responsive/car-news/CarNewsCard";

interface LatestReviewsResponse {
    success: boolean;
    rows: [];
}

// Define the API
export const expertReviewApi = createApi({
    reducerPath: "expertReviewApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getLatestReviews: builder.query<LatestReviewsResponse, void>({
            query: () => "/content/reviews/latest?excludeToday=0&limit=6",
        }),
        getTrendingReviews: builder.query<LatestReviewsResponse, void>({
            query: () => `/content/reviews/trending?excludeToday=0&limit=6`,
        }),
        getTopReviews: builder.query<LatestReviewsResponse, void>({
            query: () => `/content/reviews/top?excludeToday=0&limit=6`,
        }),
        getPopularReview: builder.query<LatestReviewsResponse, void>({
            query: () => `/content/reviews/popular?limit=10`,
        }),
    }),
});

// Export hooks
export const {
    useGetLatestReviewsQuery,
    useGetTrendingReviewsQuery,
    useGetTopReviewsQuery,
    useGetPopularReviewQuery,
} = expertReviewApi;
