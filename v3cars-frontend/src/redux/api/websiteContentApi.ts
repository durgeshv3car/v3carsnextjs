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
export const websiteContentApi = createApi({
    reducerPath: "websiteContentApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError
    >,
    endpoints: (builder) => ({
        getAboutDetails: builder.query<Response, void>({
            query: () => "/website-content?moduleId=7",
        }),
        getAuthors: builder.query<Response, void>({
            query: () => "/website-content?moduleId=6&id_asc",
        }),
        getAuthorDetails: builder.query<Response, { authorId: number }>({
            query: ({ authorId }) => `/website-content?moduleId=6&authorId=${authorId}`,
        }),
        getTermsOfUses: builder.query<Response, void>({
            query: () => "/website-content?moduleId=9",
        }),
        getPrivacyPolicy: builder.query<Response, void>({
            query: () => "/website-content?moduleId=8",
        }),
        getCarInsuranceIndia: builder.query<Response, void>({
            query: () => "/website-content?moduleId=3",
        }),
        getApplyCarLoanIndia: builder.query<Response, void>({
            query: () => "/website-content?moduleId=10",
        }),
        getMileageCalculator: builder.query<Response, void>({
            query: () => "/website-content?moduleId=11",
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
    useGetCarInsuranceIndiaQuery,
    useGetApplyCarLoanIndiaQuery,
    useGetMileageCalculatorQuery,
} = websiteContentApi;
