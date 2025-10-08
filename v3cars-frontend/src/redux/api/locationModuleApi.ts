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

// API definition
export const locationModuleApi = createApi({
  reducerPath: "locationModuleApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPopularCities: builder.query<Response, void>({
      query: () => `/locations/cities?isPopular=1&limit=24&sortBy=name_asc`,
    }),
    getAllCities: builder.query<Response, { page: number; limit: number }>({
      query: ({ page, limit }) => `/locations/cities?limit=50&page=${page}&sortBy=name_asc`,
    }),
    getSearchCity: builder.query<Response, { query: string }>({
      query: ({ query }) => `/locations/cities?q=${query}&limit=1&sortBy=name_asc`,
    }),
    getCountries: builder.query<Response, { query: string }>({
      query: ({ query }) => `/locations/countries?q=${query}`,
    }),
  }),
});

// Export hook
export const {
  useGetPopularCitiesQuery,
  useGetAllCitiesQuery,
  useGetSearchCityQuery,
  useGetCountriesQuery,
} = locationModuleApi;
