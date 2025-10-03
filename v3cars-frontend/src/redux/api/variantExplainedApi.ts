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
export const variantExplainedApi = createApi({
    reducerPath: "variantExplainedApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getLatestVariantExplained: builder.query<LatestReviewsResponse, void>({
            query: () => "/content/variant-explained/latest?excludeToday=0&limit=6",
        }),
        getTrendingVariantExplained: builder.query<LatestReviewsResponse, void>({
            query: () => `/content/variant-explained/trending?excludeToday=0&limit=6`,
        }),
        getTopVariantExplained: builder.query<LatestReviewsResponse, void>({
            query: () => `/content/variant-explained/top?excludeToday=0&limit=6`,
        }),
        getPopularVariantExplained: builder.query<LatestReviewsResponse, void>({
            query: () => `/content/variant-explained/popular?limit=10`,
        }),
    }),
});

// Export hooks
export const {
    useGetLatestVariantExplainedQuery,
    useGetTrendingVariantExplainedQuery,
    useGetTopVariantExplainedQuery,
    useGetPopularVariantExplainedQuery,
} = variantExplainedApi;
