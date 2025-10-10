import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface GetAuthorsResponse {
    success: boolean;
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    rows: any[];
}

// Define the API
export const websiteContentApi = createApi({
    reducerPath: "websiteContentApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getAboutDetails: builder.query<GetAuthorsResponse, void>({
            query: () => "/website-content?moduleId=7",
        }),
        getAuthors: builder.query<GetAuthorsResponse, void>({
            query: () => "/website-content?moduleId=6&id_asc",
        }),
        getAuthorDetails: builder.query<GetAuthorsResponse, { authorId: number }>({
            query: ({ authorId }) => `/website-content?moduleId=6&authorId=${authorId}`,
        }),
        getTermsOfUses: builder.query<GetAuthorsResponse, void>({
            query: () => "/website-content?moduleId=9",
        }),
        getPrivacyPolicy: builder.query<GetAuthorsResponse, void>({
            query: () => "/website-content?moduleId=8",
        }),
    }),
});

// Export hooks
export const {
    useGetAboutDetailsQuery,
    useGetAuthorsQuery,
    useGetAuthorDetailsQuery,
    useGetTermsOfUsesQuery,
    useGetPrivacyPolicyQuery,
} = websiteContentApi;
