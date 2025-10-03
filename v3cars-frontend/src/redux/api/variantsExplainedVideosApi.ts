import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface LatestCarVideosResponse {
    success: boolean;
    rows: [];
}

// Define the API
export const variantsExplainedVideosApi = createApi({
    reducerPath: "variantsExplainedVideosApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getLatestVariantExplainedVideos: builder.query<LatestCarVideosResponse, void>({
            query: () => "/videos/variant-explained/latest?limit=9&excludeToday=0",
        }),
        getTrendingVariantExplainedVideos: builder.query<LatestCarVideosResponse, void>({
            query: () => "/videos/variant-explained/trending?limit=9&excludeToday=0",
        }),
        getTopVariantExplainedVideos: builder.query<LatestCarVideosResponse, void>({
            query: () => "/videos/variant-explained/top?limit=9&excludeToday=0",
        }),
    }),
});

// Export hooks
export const {
    useGetLatestVariantExplainedVideosQuery,
    useGetTrendingVariantExplainedVideosQuery,
    useGetTopVariantExplainedVideosQuery,
} = variantsExplainedVideosApi;
