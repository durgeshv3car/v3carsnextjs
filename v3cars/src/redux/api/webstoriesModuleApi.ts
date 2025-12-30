import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface Response {
    success: boolean;
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    rows: [];
}


// Define the API
export const webstoriesModuleApi = createApi({
    reducerPath: "webstoriesModuleApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,

    endpoints: (builder) => ({
        getWebstories: builder.query<Response, void>({
            query: () => "/webstories?page=1&limit=50",
        }),
    }),

});



// Export hooks
export const {
    useGetWebstoriesQuery,
} = webstoriesModuleApi;


