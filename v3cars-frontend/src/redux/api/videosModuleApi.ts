import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface Response {
    success: boolean;
    rows: [];
}

// Define the API
export const videosModuleApi = createApi({
    reducerPath: "videosModuleApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getLatestAutoExpoVideos: builder.query<Response, void>({
            query: () => "/videos/auto-expo/latest?limit=9&excludeToday=0",
        }),
        getTrendingAutoExpoVideos: builder.query<Response, void>({
            query: () => "/videos/auto-expo/trending?limit=9&excludeToday=0",
        }),
        getTopAutoExpoVideos: builder.query<Response, void>({
            query: () => "/videos/auto-expo/top?limit=9&excludeToday=0",
        }),
        getLatestCarVideos: builder.query<Response, void>({
            query: () => "/videos/reviews/latest?limit=9&excludeToday=0",
        }),
        getPopularCarVideos: builder.query<Response, void>({
            query: () => "/videos/popular?limit=8",
        }),
        getVideosByAuthor: builder.query<Response, { authorId: number }>({
            query: ({ authorId }) => `/videos/popular?limit=10&authorId=${authorId}`,
        }),
        getLatestCompareVideos: builder.query<Response, void>({
            query: () => "/videos/compare/latest?limit=9&excludeToday=0",
        }),
        getTrendingCompareVideos: builder.query<Response, void>({
            query: () => "/videos/compare/trending?limit=9&excludeToday=0",
        }),
        getTopCompareVideos: builder.query<Response, void>({
            query: () => "/videos/compare/top?limit=9&excludeToday=0",
        }),
        getElectricCarVideos: builder.query<Response, void>({
            query: () => "/videos/latest?excludeToday=0&limit=20&fuelType=Electric",
        }),
        getLatestVideos: builder.query<Response, void>({
            query: () =>
                `/videos/latest?limit=8`,
        }),
        getLatestReviewsVideos: builder.query<Response, void>({
            query: () => "/videos/more/latest?limit=9&excludeToday=0",
        }),
        getTrendingReviewsVideos: builder.query<Response, void>({
            query: () => "/videos/more/trending?limit=9&excludeToday=0",
        }),
        getTopReviewsVideos: builder.query<Response, void>({
            query: () => "/videos/more/top?limit=9&excludeToday=0",
        }),
        getLatestVariantExplainedVideos: builder.query<Response, void>({
            query: () => "/videos/variant-explained/latest?limit=9&excludeToday=0",
        }),
        getTrendingVariantExplainedVideos: builder.query<Response, void>({
            query: () => "/videos/variant-explained/trending?limit=9&excludeToday=0",
        }),
        getTopVariantExplainedVideos: builder.query<Response, void>({
            query: () => "/videos/variant-explained/top?limit=9&excludeToday=0",
        }),
    }),
});

// Export hooks
export const {
    useGetLatestAutoExpoVideosQuery,
    useGetTrendingAutoExpoVideosQuery,
    useGetTopAutoExpoVideosQuery,
    useGetLatestCarVideosQuery,
    useGetPopularCarVideosQuery,
    useGetVideosByAuthorQuery,
    useGetLatestCompareVideosQuery,
    useGetTrendingCompareVideosQuery,
    useGetTopCompareVideosQuery,
    useGetElectricCarVideosQuery,
    useGetLatestVideosQuery,
    useGetLatestReviewsVideosQuery,
    useGetTrendingReviewsVideosQuery,
    useGetTopReviewsVideosQuery,
    useGetLatestVariantExplainedVideosQuery,
    useGetTrendingVariantExplainedVideosQuery,
    useGetTopVariantExplainedVideosQuery,
} = videosModuleApi;
