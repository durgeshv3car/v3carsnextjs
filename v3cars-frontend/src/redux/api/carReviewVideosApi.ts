import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface LatestCarVideosResponse {
    success: boolean;
    rows: [];
}

// Define the API
export const carReviewVideoApi = createApi({
    reducerPath: "carReviewVideoApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getLatestCarVideos: builder.query<LatestCarVideosResponse, void>({
            query: () => "/videos/reviews/latest?limit=9&excludeToday=0",
        }),
    }),
});

// Export hooks
export const {
    useGetLatestCarVideosQuery,
} = carReviewVideoApi;
