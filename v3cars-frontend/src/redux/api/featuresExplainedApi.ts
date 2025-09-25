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
export const featuresExplainedApi = createApi({
    reducerPath: "featuresExplainedApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getLatestFeaturesExplained: builder.query<LatestComparisonReviewsResponse, void>({
            query: () => "/content/features-explained/latest?limit=9&excludeToday=0",
        }),
        getTrendingFeaturesExplained: builder.query<LatestComparisonReviewsResponse, void>({
            query: () => `/content/features-explained/trending?limit=6&excludeToday=0`,
        }),
        getTopFeaturesExplained: builder.query<LatestComparisonReviewsResponse, void>({
            query: () => `/content/features-explained/top?limit=6&excludeToday=0`,
        }),
        getPopularFeaturesExplained: builder.query<LatestComparisonReviewsResponse, void>({
            query: () => `/content/features-explained/popular?limit=10`,
        }),
    }),
});

// Export hooks
export const {
    useGetLatestFeaturesExplainedQuery,
    useGetTrendingFeaturesExplainedQuery,
    useGetTopFeaturesExplainedQuery,
    useGetPopularFeaturesExplainedQuery,
} = featuresExplainedApi;
