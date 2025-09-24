import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { Article } from "@/components/responsive/car-news/CarNewsCard";

// Correct response interfaces
interface TodayAutoExpoResponse {
    success: boolean;
    data?: Article;
}

interface LatestAutoExpoResponse {
    success: boolean;
    rows: [];
}

// Define the API
export const autoExpoApi = createApi({
    reducerPath: "autoExpoApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getTodayAutoExpo: builder.query<TodayAutoExpoResponse, void>({
            query: () => "/content/auto-expo/today",
        }),
        getLatestAutoExpo: builder.query<LatestAutoExpoResponse, void>({
            query: () => `/content/auto-expo/latest?excludeToday=0&limit=6`,
        }),
        getTrendingAutoExpo: builder.query<LatestAutoExpoResponse, void>({
            query: () => `/content/auto-expo/trending?limit=6`,
        }),
        getTopAutoExpo: builder.query<LatestAutoExpoResponse, void>({
            query: () => `/content/auto-expo/top?limit=6`,
        }),
    }),
});

// Export hooks
export const {
    useGetTodayAutoExpoQuery,
    useGetLatestAutoExpoQuery,
    useGetTrendingAutoExpoQuery,
    useGetTopAutoExpoQuery,
} = autoExpoApi;
