import { BASE_URL } from "@/utils/constant";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type SearchItem =
  | { type: "brand"; label: string; href: string; id: number | null }
  | { type: "model"; label: string; href: string; id: number | null; brandId: number | null }
  | {
      type: "model_page";
      subType: string;
      label: string;
      href: string;
      modelId: number | null;
      brandId: number | null;
    };

export interface UniversalSearchResponse {
  success: boolean;
  query: string;
  rows: SearchItem[];
}

export const searchModuleApi = createApi({
  reducerPath: "searchModuleApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  >,
  endpoints: (builder) => ({
    universalSearch: builder.query<
      UniversalSearchResponse,
      { q: string; citySlug?: string; cityName?: string; limit?: number }
    >({
      query: ({ q, citySlug, cityName, limit = 12 }) => {
        const params = new URLSearchParams({ q });
        if (citySlug) params.append("citySlug", citySlug);
        if (cityName) params.append("cityName", cityName);
        if (limit) params.append("limit", String(limit));
        return `/search/universal?${params.toString()}`;
      },
    }),
  }),
});

export const { useUniversalSearchQuery } = searchModuleApi;

