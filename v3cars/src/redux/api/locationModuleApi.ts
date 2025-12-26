import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Response {
  success: boolean;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  rows: [];
}

// API definition
export const locationModuleApi = createApi({
  reducerPath: "locationModuleApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getPopularCities: builder.query<Response, void>({
      query: () => `/locations/cities?isPopular=1&sortBy=name_asc`,
    }),
    getTopCities: builder.query<Response, void>({
      query: () => `/locations/cities?isTop=1`,
    }),
    getAllCities: builder.query<Response, { page: number; limit: number }>({
      query: ({ page, limit }) => `/locations/cities?limit=${limit}&page=${page}&sortBy=name_asc`,
    }),
    getSearchCity: builder.query<Response, { query: string }>({
      query: ({ query }) => `/locations/cities?q=${query}&limit=1&sortBy=name_asc`,
    }),
    getCountries: builder.query<Response, { query: string }>({
      query: ({ query }) => `/locations/countries?q=${query}`,
    }),
    getStates: builder.query<Response, void>({
      query: () => `/locations/states?limit=50&page=1&sortBy=name_asc`,
    }),
    getCityByStatesId: builder.query<Response, { stateId: number }>({
      query: ({ stateId }) => `/locations/cities?stateId=${stateId}&sortBy=name_asc&limit=100`,
    }),
    getCities: builder.query<Response, { query: string }>({
      query: ({ query }) => `/locations/cities?q=${query}`,
    }),
    getDistrictsByStateId: builder.query<Response, { stateId: number }>({
      query: ({ stateId }) => `/locations/districts?stateId=${stateId}&limit=100`,
    }),
  }),
});

// Export hook
export const {
  useGetPopularCitiesQuery,
  useGetTopCitiesQuery,
  useGetAllCitiesQuery,
  useGetSearchCityQuery,
  useGetCountriesQuery,
  useGetStatesQuery,
  useGetCityByStatesIdQuery,
  useGetCitiesQuery,
  useGetDistrictsByStateIdQuery,
} = locationModuleApi;
