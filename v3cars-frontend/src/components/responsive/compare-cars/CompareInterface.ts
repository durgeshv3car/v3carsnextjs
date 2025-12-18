export interface CompareVariant {
    variantId: number;
    variantName: string;
    modelId: number;
    modelName: string;

    image: Image;
    imageUrl: string;

    price: Price;
    enginePerformance: EnginePerformance;
    dimensionsSpace: DimensionsSpace;

    features: null;

    colours: Colours;
    ownership: Ownership;
    prosCons: ProsCons;
}

export interface Image {
    name: string;
    alt: string;
    url: string;
}

export interface Price {
    exShowroomMin: number;
    exShowroomMax: number;
    csdPriceRaw: string;
    estimatedEmi: number;
    insuranceFirstYear: number;
    onRoadPrice: number;
    summary: string;
}

export interface EnginePerformance {
    powertrainId: number;
    engineFuelType: string;
    fuelType: string;
    fuelTypeSubCategory: string;
    transmissionType: string;

    engineDisplacement: number;
    cubicCapacity: number;
    cylinders: number;

    powerPS: number;
    powerMinRPM: number;
    powerMaxRPM: number;

    torqueNM: number;
    torqueMinRPM: number;
    torqueMaxRPM: number;

    kerbWeight: number;
    powerToWeight: number;
    torqueToWeight: number;

    claimedFE: number;
    claimedRange: number | null;

    topSpeed: number | null;
    zeroToHundred: number | null;

    summary: string;
}

export interface DimensionsSpace {
    length: number;
    width: number;
    height: number;
    wheelbase: number;
    groundClearance: number;
    bootSpace: number;
    tyreSize: string;
    fuelTankCapacity: number;
    summary: string;
}

export interface Colours {
    options: ColourOption[];
    summary: string;
}

export interface ColourOption {
    colorId: number;
    name: string;
    code: string;
    imageFileName: string;
}

export interface Ownership {
    claimedMileage: number;
    realWorldMileage: number;
    fuelPricePerUnit: number | null;
    runningCost: number | null;
    serviceAndMaintenanceCost: number | null;
    serviceInterval: number | null;
    serviceNetwork: number | null;

    standardWarrantyKm: string;
    standardWarrantyYear: string;

    carOwnershipCost: number | null;
    summary: string;
}

export interface ProsCons {
    pros: ProsConsItem[];
    cons?: ProsConsItem[];
}

export interface ProsConsItem {
    heading: string; // HTML string
    desc: string;    // HTML string
}


export interface CarModel {
    modelId: number
    modelName: string
    modelSlug: string
    brandId: number
    modelBodyTypeId: number
    isUpcoming: boolean
    launchDate: string // ISO date string
    totalViews: number
    expectedBasePrice: number
    expectedTopPrice: number
    brand: {
        id: number
        name: string
        slug: string
        logo: string
    }
    priceMin: number
    priceMax: number
    powerPS: number
    torqueNM: number
    mileageKMPL: number
    image: CarImage
    imageUrl: string
    transmissionType: string
    powerTrain: string
}

interface CarImage {
    name: string
    alt: string
    url: string
}

export interface Powertrain {
    id: number;
    fuelType: string;
    transmissionType: string;
    label: string;
}

export interface Variant {
    variantId: number;
    variantName: string;
    modelId: number;
    modelPowertrainId: number;
    variantPrice: string;
    csdPrice: string;
    vfmValue: string;
    vfmRank: number;
    variantRecommendation: string;
    updatedDate: string; // ISO date string
    priceMin: number;
    priceMax: number;
    powertrain: Powertrain;
}

export interface CarBrand {
    brandId: number
    brandName: string
    brandSlug: string
    logoPath: string
    popularity: string
    unquieViews: number | null
    brandStatus: number
    serviceNetwork: boolean
    brandType: number
}