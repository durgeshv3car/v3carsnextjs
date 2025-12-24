import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface Response {
    success: boolean;
    query: string;
    rows: [];
}


// Define the API
export const searchModuleApi = createApi({
    reducerPath: "searchModuleApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,

    endpoints: (builder) => ({
        getUniversalSearch: builder.query<Response, { query: string, citySlug?: string }>({
            query: ({ query, citySlug }) => `/search/universal?q=${query}&citySlug=${citySlug}&limit=20`,
        }),
    }),

});



// Export hooks
export const {
    useGetUniversalSearchQuery,
} = searchModuleApi;


