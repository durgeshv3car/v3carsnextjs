import { IMAGE_URL } from "@/utils/constant";
import Image from "next/image";

interface CarBrand {
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

interface SimilarBrandsProps {
    brands: CarBrand[];
}


export default function SimilarBrands({ brands }: SimilarBrandsProps) {
    return (

        <div className=" rounded-xl overflow-hidden">

            {/* Header */}
            <div className="text-white text-[18px] font-semibold px-2 py-3">
                Similar Brands
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-2 ">

                {brands.slice(0,10).map((brand, i) => (

                    <div
                        key={i}
                        className={`bg-white flex items-center justify-center aspect-[3/2] p-2 rounded-xl cursor-pointer `}
                    >
                        <Image
                            src={`${IMAGE_URL}/media/brand-imgs/${brand.logoPath}`}
                            alt={brand.brandName}
                            width={500}
                            height={500}
                            className="object-contain w-full"
                        />

                    </div>

                ))}
            </div>
        </div>

    );
}


