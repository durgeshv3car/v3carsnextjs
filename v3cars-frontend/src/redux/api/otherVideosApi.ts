import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface LatestCarVideosResponse {
    success: boolean;
    rows: [];
}

// Define the API
export const otherVideosApi = createApi({
    reducerPath: "otherVideosApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getLatestReviewsVideos: builder.query<LatestCarVideosResponse, void>({
            query: () => "/videos/other/latest?limit=9&excludeToday=0",
        }),
        getTrendingReviewsVideos: builder.query<LatestCarVideosResponse, void>({
            query: () => "/videos/other/trending?limit=9&excludeToday=0",
        }),
        getTopReviewsVideos: builder.query<LatestCarVideosResponse, void>({
            query: () => "/videos/other/top?limit=9&excludeToday=0",
        }),
    }),
});

// Export hooks
export const {
    useGetLatestReviewsVideosQuery,
    useGetTrendingReviewsVideosQuery,
    useGetTopReviewsVideosQuery,
} = otherVideosApi;
