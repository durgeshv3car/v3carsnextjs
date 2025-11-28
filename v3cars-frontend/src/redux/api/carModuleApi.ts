import { ModelDimensionsResponse } from "@/components/responsive/brand/model/dimensions/DimensionsPage";
import { ProsConsResponse } from "@/components/responsive/brand/model/overview/ModelProsCons";
import { CarData } from "@/components/responsive/brand/model/overview/Overview";
import { HeaderInfo, SpecSection } from "@/components/responsive/brand/model/overview/SpecsListTable";
import { PriceListDetailsResponse } from "@/components/responsive/brand/model/price/OnRoadPriceTable";
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

interface BrandByIdResponse {
    success: boolean;
    data: CarBrandDetail | null;
}

interface CarModelResponse {
    success: boolean;
    data: CarData | null;
}

interface GetModelsArgs {
    brandId: number
}

interface GetVariantArgs {
    modelId: number
}

interface ModelCompetitorsQueryResponse {
    success: boolean;
    items: [];
}

export interface MileageSpecsFeaturesResponse {
    success: boolean;
    options: [];
    selectedPowertrainId: number;
    header: HeaderInfo;
    sections: SpecSection[];
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
        getAdvanceSearchData: builder.query<
            Response,
            {
                page?: number;
                limit?: number;
                sortBy?: string;
                priceBucket?: string;
                brandIds?: number[];
                bodyTypeIds?: number[];
                cylindersList?: number[];
                seatingList?: number[];
                mileage?: string;
                transmissionType?: string;
                fuelType?: string;
                engineDisplacement?: string[];
                isUpcoming?: number;
            }
        >({
            query: ({
                page,
                limit,
                sortBy = "popular",
                priceBucket,
                brandIds,
                bodyTypeIds,
                cylindersList,
                seatingList,
                mileage,
                transmissionType,
                fuelType,
                engineDisplacement,
                isUpcoming = 0,
            }) => {
                const params = new URLSearchParams();

                params.append("page", String(page));
                params.append("limit", String(limit));
                params.append("sortBy", sortBy);
                params.append("isUpcoming", String(isUpcoming));

                // Add filters only if present
                if (priceBucket) params.append("priceBucket", priceBucket);
                if (brandIds?.length) params.append("brandIds", brandIds.join(","));
                if (bodyTypeIds?.length) params.append("bodyTypeIds", bodyTypeIds.join(","));
                if (cylindersList?.length) params.append("cylindersList", cylindersList.join(","));
                if (seatingList?.length) params.append("seatingList", seatingList.join(","));
                if (mileage) params.append("mileage", mileage);
                if (transmissionType) params.append("transmissionType", transmissionType);
                if (fuelType) params.append("fuelType", fuelType);
                if (engineDisplacement?.length)
                    params.append("engineDisplacement", engineDisplacement.join(","));

                return `/cars/models?${params.toString()}`;
            },
        }),
        getDiscontinuedModel: builder.query<Response, { brandId: number }>({
            query: ({ brandId }) => `/cars/brands/${brandId}/discontinued-models`,
        }),
        getBrandsById: builder.query<BrandByIdResponse, { brandId: number }>({
            query: ({ brandId }) => `/cars/brands/${brandId}`,
        }),


        // Models Query

        getModelDetails: builder.query<CarModelResponse, { model_slug: string }>({
            query: ({ model_slug }) => `/cars/models/${model_slug}`,
        }),
        getModelDetailByFuelType: builder.query<Response, { model_slug: string, cityId: number, fuelType?: string, transmissionType?: string }>({
            query: ({ model_slug, cityId, fuelType, transmissionType }: { model_slug: string; cityId: number; fuelType?: string, transmissionType?: string }) => {
                const url = `/cars/models/${model_slug}/price-list?cityId=${cityId}&fuelType=${fuelType}`;
                return fuelType && transmissionType
                    ? `${url}&transmissionType=${transmissionType}`
                    : url;
            }
        }),

        getBestVariantToBuy: builder.query<Response, { model_slug: string, fuelType?: string, transmissionType?: string }>({
            query: ({ model_slug, fuelType, transmissionType }: { model_slug: string; fuelType?: string, transmissionType?: string }) => {
                const url = `/cars/models/${model_slug}/best-variant-to-buy`;

                const params: string[] = [];

                if (fuelType !== undefined && fuelType !== null && fuelType !== "") {
                    params.push(`fuelType=${fuelType}`);
                }

                if (transmissionType !== undefined && transmissionType !== null && transmissionType !== "") {
                    params.push(`transmissionType=${transmissionType}`);
                }

                return params.length ? `${url}?${params.join("&")}` : url;
            }
        }),

        getDimensionsCapacity: builder.query<ModelDimensionsResponse, { model_slug: string; fuelType?: string; transmissionType?: string }>({
            query: ({ model_slug, fuelType, transmissionType }) => {
                const url = `/cars/models/${model_slug}/dimensions-capacity`;

                const params: string[] = [];

                if (fuelType) params.push(`fuelType=${fuelType}`);
                if (transmissionType) params.push(`transmissionType=${transmissionType}`);

                if (params.length > 0) {
                    params.push("detailed=1");
                    return `${url}?${params.join("&")}`;
                }

                return url;
            }
        }),

        getMileageSpecsFeatures: builder.query<MileageSpecsFeaturesResponse, { model_slug: string, powertrainId?: number }>({
            query: ({ model_slug, powertrainId }: { model_slug: string; powertrainId?: number }) => {
                const url = `/cars/models/${model_slug}/mileage-specs-features`;
                return powertrainId
                    ? `${url}?powertrainId=${powertrainId}`
                    : url;
            }
        }),

        getModelProsCons: builder.query<ProsConsResponse, { model_slug: string, }>({
            query: ({ model_slug }) => `/cars/models/${model_slug}/pros-cons`,
        }),

        getModelCompetitors: builder.query<ModelCompetitorsQueryResponse, { model_slug: string, }>({
            query: ({ model_slug }) => `/cars/models/${model_slug}/competitors`,
        }),

        getPriceListDetails: builder.query<PriceListDetailsResponse, { model_slug: string, cityId: number, fuelType?: string, variantId?: number, transmissionType?: string }>({
            query: ({
                model_slug,
                cityId,
                fuelType,
                variantId,
                transmissionType
            }: {
                model_slug: string,
                cityId: number,
                fuelType?: string,
                variantId?: number,
                transmissionType?: string
            }) => {
                const url = `/cars/models/${model_slug}/price-list?cityId=${cityId}`;

                const params: string[] = [];

                if (fuelType !== undefined && fuelType !== null && fuelType !== "") {
                    params.push(`fuelType=${fuelType}`);
                }

                if (variantId !== undefined && variantId !== null) {
                    params.push(`expandVariantId=${variantId}`);
                }

                if (transmissionType !== undefined && transmissionType !== null && transmissionType !== "") {
                    params.push(`transmissionType=${transmissionType}`);
                }

                return params.length ? `${url}&${params.join("&")}` : url;
            }
        }),

        getModelFuelEfficiency: builder.query<Response, { model_slug: string, fuelType?: string, transmissionType?: string }>({
            query: ({ model_slug, fuelType, transmissionType }) => `/cars/models/${model_slug}/fuel-efficiency?fuelType=${fuelType}&transmissionType=${transmissionType}`,
        }),

        getModelOfferDiscount: builder.query<Response, { model_slug: string, expandQID?: number }>({
            query: ({
                model_slug,
                expandQID
            }: {
                model_slug: string,
                expandQID: number,
            }) => {
                const url = `/cars/models/${model_slug}/offers-discounts?months=13`;

                const params: string[] = [];

                if (expandQID !== undefined && expandQID !== null) {
                    params.push(`expandQID=${expandQID}`);
                }

                return params.length ? `${url}&${params.join("&")}` : url;
            }
        }),

        getModelUpcomingCars: builder.query<Response, { model_slug: string }>({
            query: ({ model_slug }) => `/cars/models/${model_slug}/upcoming-cars?limit=5`,
        }),
        getModelOthersCars: builder.query<ModelCompetitorsQueryResponse, { model_slug: string }>({
            query: ({ model_slug }) => `/cars/models/${model_slug}/others-cars?limit=5`,
        }),
        getModelMonthlySales: builder.query<Response, { model_slug: string }>({
            query: ({ model_slug }) => `/cars/models/${model_slug}/monthly-sales?month=6`,
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
    useGetAdvanceSearchDataQuery,
    useGetDiscontinuedModelQuery,
    useGetBrandsByIdQuery,
    useGetModelDetailsQuery,
    useGetModelDetailByFuelTypeQuery,
    useGetBestVariantToBuyQuery,
    useGetDimensionsCapacityQuery,
    useGetMileageSpecsFeaturesQuery,
    useGetModelProsConsQuery,
    useGetModelCompetitorsQuery,
    useGetPriceListDetailsQuery,
    useGetModelFuelEfficiencyQuery,
    useGetModelOfferDiscountQuery,
    useGetModelUpcomingCarsQuery,
    useGetModelOthersCarsQuery,
    useGetModelMonthlySalesQuery,
} = carModuleApi;



interface CarBrandDetail {
    brandId: number;
    brandName: string;
    logoPath: string;
    unquieViews: number | null;
    popularity: string;
    brandSlug: string;
    brandDescription: string;
    bannerImage: string;
    bannerImageAltTag: string;
    isFasttag: number;
    brandType: number;
    displayName: string;
    roadsideAssistance: number;
    emailAddress: string;
    stateId: number;
    cityId: number;
    parentOrganization: string;
    products: string;
    founderName: string;
    customerService: string;
    serviceNetwork: boolean;
    websiteUrl: string;
    brandKeyPeople: string;
    introContent: string; // HTML content
    brandOrganizationName: string;
    websiteName: string;
    brandTitle: string;
    iconPath: string;
    brandStatus: number;
    similarBrand: string;
}