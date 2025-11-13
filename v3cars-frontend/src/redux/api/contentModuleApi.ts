import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface Response {
    success: boolean;
    rows: [];
}

interface AutoExpoResponse {
    success: boolean;
    data: null;
}

// Define the API
export const contentModuleApi = createApi({
    reducerPath: "contentModuleApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getLatestReviews: builder.query<Response, void>({
            query: () => "/content/reviews/latest?excludeToday=0&limit=6",
        }),
        getTrendingReviews: builder.query<Response, void>({
            query: () => `/content/reviews/trending?excludeToday=0&limit=6`,
        }),
        getTopReviews: builder.query<Response, void>({
            query: () => `/content/reviews/top?excludeToday=0&limit=6`,
        }),
        getPopularReview: builder.query<Response, void>({
            query: () => `/content/reviews/popular?limit=10`,
        }),
        getTodayAutoExpo: builder.query<AutoExpoResponse, void>({
            query: () => "/content/auto-expo/today",
        }),
        getLatestAutoExpo: builder.query<Response, void>({
            query: () => `/content/auto-expo/latest?excludeToday=0&limit=6`,
        }),
        getTrendingAutoExpo: builder.query<Response, void>({
            query: () => `/content/auto-expo/trending?limit=6`,
        }),
        getTopAutoExpo: builder.query<Response, void>({
            query: () => `/content/auto-expo/top?limit=6`,
        }),
        getPopularAutoExpo: builder.query<Response, void>({
            query: () => `/content/auto-expo/popular?limit=10`,
        }),
        getLatestCarGuide: builder.query<Response, void>({
            query: () => "/content/car-guide/latest?limit=9&excludeToday=0",
        }),
        getTrendingCarGuide: builder.query<Response, void>({
            query: () => `/content/car-guide/trending?excludeToday=0&limit=6`,
        }),
        getTopCarGuide: builder.query<Response, void>({
            query: () => `/content/car-guide/top?excludeToday=0&limit=6`,
        }),
        getPopularCarGuide: builder.query<Response, void>({
            query: () => `/content/car-guide/popular?limit=10`,
        }),
        getLatestComparisonReviews: builder.query<Response, void>({
            query: () => "/content/comparison/latest?limit=6&excludeToday=0",
        }),
        getTrendingComparisonReviews: builder.query<Response, void>({
            query: () => `/content/comparison/trending?limit=6&excludeToday=0`,
        }),
        getTopComparisonReviews: builder.query<Response, void>({
            query: () => `/content/comparison/top?limit=6&excludeToday=0`,
        }),
        getPopularReviews: builder.query<Response, void>({
            query: () => `/content/comparison/popular?limit=10`,
        }),
        getElectricCarNews: builder.query<Response, void>({
            query: () => "/content/news/latest?excludeToday=0&limit=20&fuelType=Electric",
        }),
        getElectricCarReviews: builder.query<Response, void>({
            query: () => "/content/reviews/latest?excludeToday=0&limit=20&fuelType=Electric",
        }),
        getLatestFeaturesExplained: builder.query<Response, void>({
            query: () => "/content/features-explained/latest?limit=9&excludeToday=0",
        }),
        getTrendingFeaturesExplained: builder.query<Response, void>({
            query: () => `/content/features-explained/trending?limit=6&excludeToday=0`,
        }),
        getTopFeaturesExplained: builder.query<Response, void>({
            query: () => `/content/features-explained/top?limit=6&excludeToday=0`,
        }),
        getPopularFeaturesExplained: builder.query<Response, void>({
            query: () => `/content/features-explained/popular?limit=10`,
        }),
        getVariantsExplained: builder.query<Response, void>({
            query: () => `/content/variant-explained/latest?limit=20`,
        }),
        getLatestVariantExplained: builder.query<Response, void>({
            query: () => "/content/variant-explained/latest?excludeToday=0&limit=6",
        }),
        getTrendingVariantExplained: builder.query<Response, void>({
            query: () => `/content/variant-explained/trending?excludeToday=0&limit=6`,
        }),
        getTopVariantExplained: builder.query<Response, void>({
            query: () => `/content/variant-explained/top?excludeToday=0&limit=6`,
        }),
        getPopularVariantExplained: builder.query<Response, void>({
            query: () => `/content/variant-explained/popular?limit=10`,
        }),
        getPopularComparisons: builder.query<Response, void>({
            query: () => `/comparisons/popular?limit=15`,
        }),
    }),
});

// Export hooks
export const {
    useGetLatestReviewsQuery,
    useGetTrendingReviewsQuery,
    useGetTopReviewsQuery,
    useGetPopularReviewQuery,
    useGetTodayAutoExpoQuery,
    useGetLatestAutoExpoQuery,
    useGetTrendingAutoExpoQuery,
    useGetTopAutoExpoQuery,
    useGetPopularAutoExpoQuery,
    useGetLatestCarGuideQuery,
    useGetTrendingCarGuideQuery,
    useGetTopCarGuideQuery,
    useGetPopularCarGuideQuery,
    useGetLatestComparisonReviewsQuery,
    useGetTrendingComparisonReviewsQuery,
    useGetTopComparisonReviewsQuery,
    useGetPopularReviewsQuery,
    useGetElectricCarNewsQuery,
    useGetElectricCarReviewsQuery,
    useGetLatestFeaturesExplainedQuery,
    useGetTrendingFeaturesExplainedQuery,
    useGetTopFeaturesExplainedQuery,
    useGetPopularFeaturesExplainedQuery,
    useGetVariantsExplainedQuery,
    useGetLatestVariantExplainedQuery,
    useGetTrendingVariantExplainedQuery,
    useGetTopVariantExplainedQuery,
    useGetPopularVariantExplainedQuery,
    useGetPopularComparisonsQuery,
} = contentModuleApi;
