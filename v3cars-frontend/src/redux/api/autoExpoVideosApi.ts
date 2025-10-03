import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface LatestCarVideosResponse {
    success: boolean;
    rows: [];
}

// Define the API
export const autoExpoVideosApi = createApi({
    reducerPath: "autoExpoVideosApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getLatestAutoExpoVideos: builder.query<LatestCarVideosResponse, void>({
            query: () => "/videos/auto-expo/latest?limit=9&excludeToday=0",
        }),
        getTrendingAutoExpoVideos: builder.query<LatestCarVideosResponse, void>({
            query: () => "/videos/auto-expo/trending?limit=9&excludeToday=0",
        }),
        getTopAutoExpoVideos: builder.query<LatestCarVideosResponse, void>({
            query: () => "/videos/auto-expo/top?limit=9&excludeToday=0",
        }),
    }),
});

// Export hooks
export const {
    useGetLatestAutoExpoVideosQuery,
    useGetTrendingAutoExpoVideosQuery,
    useGetTopAutoExpoVideosQuery,
} = autoExpoVideosApi;
