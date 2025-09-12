import Image from "next/image";

interface SimilarBrand {
    name: string;
    logo: string;
    bg?: string; // optional background like red for Eicher
}

interface SimilarBrandsProps {
    brands: SimilarBrand[];
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

                {brands.map((brand, i) => (

                    <div
                        key={i}
                        className={`bg-white flex items-center justify-center aspect-[3/2] p-2 rounded-xl `}
                    >

                        <Image
                            src={brand.logo}
                            alt={brand.name}
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


