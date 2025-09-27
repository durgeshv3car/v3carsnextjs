import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface LatestCarVideosResponse {
    success: boolean;
    rows: [];
}

// Define the API
export const compareVideosApi = createApi({
    reducerPath: "compareVideosApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getLatestCompareVideos: builder.query<LatestCarVideosResponse, void>({
            query: () => "/videos/compare/latest?limit=9&excludeToday=0",
        }),
        getTrendingCompareVideos: builder.query<LatestCarVideosResponse, void>({
            query: () => "/videos/compare/trending?limit=9&excludeToday=0",
        }),
        getTopCompareVideos: builder.query<LatestCarVideosResponse, void>({
            query: () => "/videos/compare/top?limit=9&excludeToday=0",
        }),
    }),
});

// Export hooks
export const {
    useGetLatestCompareVideosQuery,
    useGetTrendingCompareVideosQuery,
    useGetTopCompareVideosQuery,
} = compareVideosApi;
