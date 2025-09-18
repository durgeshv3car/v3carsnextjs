import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface ElectricCarResponse {
    success: boolean;
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    rows: any[];
}

interface ElectricCarNewsResponse {
    success: boolean;
    rows: any[];
}

interface ElectricCarReviewsResponse {
    success: boolean;
    rows: any[];
}

interface ElectricCarVideosResponse {
    success: boolean;
    rows: any[];
}

// Define the API
export const electricApi = createApi({
    reducerPath: "electricApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getElectricCar: builder.query<ElectricCarResponse, void>({
            query: () => "/cars/models?isUpcoming=1&futureOnly=1&sortBy=launch_asc&limit=14&page=1&fuelType=Electric",
        }),
        getElectricCarNews: builder.query<ElectricCarNewsResponse, void>({
            query: () => "/news/latest?limit=20&fuelType=Electric",
        }),
        getElectricCarReviews: builder.query<ElectricCarReviewsResponse, void>({
            query: () => "/reviews/latest?limit=20&fuelType=Electric",
        }),
        getElectricCarVideos: builder.query<ElectricCarVideosResponse, void>({
            query: () => "/videos/latest?limit=20&fuelType=Electric",
        }),
    }),
});

// Export hooks
export const {
    useGetElectricCarQuery,
    useGetElectricCarNewsQuery,
    useGetElectricCarReviewsQuery,
    useGetElectricCarVideosQuery,
} = electricApi;
