// 'use client'

// import { useGetModelComparisonSimilarQuery } from "@/redux/api/carModuleApi";
// import { IMAGE_URL } from "@/utils/constant";
// import React from "react";

// interface ModelComparisonSimilarCarsProps {
//     model: string;
//     slug: string;
// }

// export interface CarImage {
//     name: string;
//     alt: string;
//     url: string;
// }

// export interface PriceRange {
//     min: number;
//     max: number;
// }

// export interface StandardWarranty {
//     years: string;
//     km: string;
// }

// export interface CarSpecs {
//     length: number;
//     width: number;
//     height: number;
//     wheelbase: number;
//     groundClearance: number;
//     safetyRating: string;
//     standardWarranty: StandardWarranty;
// }

// export interface CarModelDetails {
//     modelId: number;
//     name: string;
//     slug: string;
//     image: CarImage;
//     priceRange: PriceRange;
//     specs: CarSpecs;
// }

// function convertToLakhFormat(range: string) {
//   const [minStr, maxStr] = range.replace(/₹/g, "").split(" - ");

//   const min = parseInt(minStr.replace(/,/g, ""));
//   const max = parseInt(maxStr.replace(/,/g, ""));

//   const minLakh = (min / 100000).toFixed(2);
//   const maxLakh = (max / 100000).toFixed(2);

//   return `Rs.${minLakh} - ${maxLakh} Lakh*`;
// }

// export default function ModelComparisonSimilarCars({ model, slug }: ModelComparisonSimilarCarsProps) {

//     const { data: modelComparisonSimilarData } =
//         useGetModelComparisonSimilarQuery({ model_slug: slug });

//     const similarCars: CarModelDetails[] = modelComparisonSimilarData?.items ?? [];

//     if (!similarCars.length) return <p>No Data</p>;

//     // Cars for UI
//     const cars = similarCars.map(car => ({
//         name: car.name,
//         price: `₹${car.priceRange.min.toLocaleString()} - ₹${car.priceRange.max.toLocaleString()}`,
//         image: car.image.url,
//         specs: car.specs
//     }));

//     const specsList: { label: string; key: keyof CarSpecs }[] = [
//         { label: "Length", key: "length" },
//         { label: "Width", key: "width" },
//         { label: "Height", key: "height" },
//         { label: "Wheelbase", key: "wheelbase" },
//         { label: "Ground Clearance", key: "groundClearance" },
//         { label: "Safety Rating", key: "safetyRating" },
//         { label: "Standard Warranty", key: "standardWarranty" }
//     ];

//     const specs = specsList.map(spec => ({
//         label: spec.label,
//         values: cars.map(car => {
//             const s = car.specs;

//             if (spec.key === "standardWarranty") {
//                 return `${s.standardWarranty.years} yr / ${s.standardWarranty.km} km`;
//             }

//             return s[spec.key];
//         })
//     }));

//     return (
//         <div>
//             <h2 className="text-xl mb-4">
//                 {model} <span className="font-semibold">Comparison With Similar Cars</span>
//             </h2>

//             <div className="flex w-full bg-white rounded-xl overflow-hidden">
//                 {/* FIXED COLUMN */}
//                 <div className="sticky left-0 z-20 bg-white shadow-md pb-4">
//                     <div className="w-56 flex flex-col p-2">
//                         <img src={`${IMAGE_URL}/media/model-imgs/${cars[0].image}`} className="object-cover rounded-xl" />
//                         <p className="text-sm mt-4">{cars[0].name}</p>
//                         <p className="font-semibold text-md">{convertToLakhFormat(cars[0].price)}</p>
//                     </div>

//                     {specs.map((row, i) => (
//                         <div key={i} className="pt-4 w-56 bg-white">
//                             <p className="text-xs h-6 bg-[#F7F7F7] flex items-center pl-3">{row.label}</p>
//                             <p className="text-gray-700 text-sm mt-4 pl-3">{row.values[0]}</p>
//                         </div>
//                     ))}
//                 </div>

//                 {/* SCROLLABLE OTHER COLUMNS */}
//                 <div className="overflow-x-auto flex scrollbar-hide pb-4">
//                     {cars.slice(1).map((car, index) => (
//                         <div key={index} className="w-56">
//                             <div className="w-56 flex flex-col p-2">
//                                 <img src={`${IMAGE_URL}/media/model-imgs/${car.image}`} className="object-cover rounded-xl" />
//                                 <p className="text-sm mt-4">{car.name}</p>
//                                 <p className="font-semibold text-md">{convertToLakhFormat(cars[0].price)}</p>
//                             </div>

//                             {specs.map((row, i) => (
//                                 <div key={i} className="pt-4 w-56 text-center">
//                                     <p className="text-xs h-6 bg-[#F7F7F7] flex items-center"></p>
//                                     <p className="text-gray-700 text-sm mt-4">{row.values[index + 1]}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }


function ModelComparisonSimilarCars() {
    return ( 
        <h3>ModelComparisonSimilarCars</h3>
     );
}

export default ModelComparisonSimilarCars;