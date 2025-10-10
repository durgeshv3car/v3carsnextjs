import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Response {
    success: boolean;
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    rows: any[];
}

interface GetModelsArgs {
    brandId: number
}

interface GetVariantArgs {
    modelId: number
}

// API definition
export const carModuleApi = createApi({
    reducerPath: "carModuleApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getBrands: builder.query<Response, void>({
            query: () => "/cars/brands?limit=69&page=1",
        }),
        getModels: builder.query<Response, GetModelsArgs>({
            query: ({ brandId }) => `/cars/models?brandId=${brandId}&isUpcoming=0`,
        }),
        getVariants: builder.query<Response, GetVariantArgs>({
            query: ({ modelId }) => `/cars/variants?modelId=${modelId}`,
        }),
        getElectricCar: builder.query<Response, void>({
            query: () => "/cars/models?isUpcoming=1&futureOnly=1&sortBy=launch_asc&limit=14&page=1&fuelType=Electric",
        }),
        getAllBrands: builder.query<Response, void>({
            query: () => "/cars/brands?sortBy=popular&limit=69&page=1",
        }),
        getLatestLaunchedCars: builder.query<Response, void>({
            query: () => "/cars/models?isUpcoming=0&sortBy=latest&limit=44&page=1",
        }),
        getPopularCar: builder.query<Response, void>({
            query: () => "/cars/models?isUpcoming=0&sortBy=popular&limit=30&page=1",
        }),
        getTopSellingCar: builder.query<Response, void>({
            query: () => "/cars/models/top-selling-month?year=2025&month=8&limit=25",
        }),
        getUpcomingCars: builder.query<Response, void>({
            query: () => "/cars/models?isUpcoming=1&futureOnly=1&sortBy=launch_asc&limit=9&page=1",
        }),
        getLatestCars: builder.query<Response, { launchMonth: string }>({
            query: ({ launchMonth }) => `/cars/models?isUpcoming=1&launchMonth=${launchMonth}&sortBy=launch_asc&limit=9&page=1`,
        }),
        getMonth: builder.query<Response, void>({
            query: () => `/cars/models/upcoming-monthly-count?months=11`,
        }),
    }),
});

// Export hook
export const {
    useGetBrandsQuery,
    useGetModelsQuery,
    useGetVariantsQuery,
    useGetElectricCarQuery,
    useGetAllBrandsQuery,
    useGetLatestLaunchedCarsQuery,
    useGetPopularCarQuery,
    useGetTopSellingCarQuery,
    useGetUpcomingCarsQuery,
    useGetLatestCarsQuery,
    useGetMonthQuery,
} = carModuleApi;
