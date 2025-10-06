import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { Article } from "@/components/responsive/car-news/CarNewsCard";

// Correct response interfaces
interface TodayNewsResponse {
    success: boolean;
    data?: Article;
}

interface LatestNewsResponse {
    success: boolean;
    rows: [];
}

// Define the API
export const newsModuleApi = createApi({
    reducerPath: "newsModuleApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getTodayNews: builder.query<TodayNewsResponse, void>({
            query: () => "/news/today",
        }),
        getLatestNews: builder.query<LatestNewsResponse, void>({
            query: () => `/news/latest?limit=6`,
        }),
        getTrendingNews: builder.query<LatestNewsResponse, void>({
            query: () => `/news/trending?limit=6`,
        }),
        getTopNews: builder.query<LatestNewsResponse, void>({
            query: () => `/news/top?limit=6`,
        }),
        getPopularNews: builder.query<LatestNewsResponse, void>({
            query: () => `/news/popular?limit=10`,
        }),
    }),
});

// Export hooks
export const {
    useGetTodayNewsQuery,
    useGetLatestNewsQuery,
    useGetTrendingNewsQuery,
    useGetTopNewsQuery,
    useGetPopularNewsQuery,
} = newsModuleApi;
