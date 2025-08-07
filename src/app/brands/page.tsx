import Image from "next/image";

const brands = [
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
    "/brands/tata.jpg",
 
]


export default function AllBrandsGrid() {
    return (

        <>
            <div className="bg-white px-5">

                <div className="max-w-[1600px] mx-auto px-4 py-5">
                    {/* Heading */}
                    <div className="mb-6">
                        <h2 className="text-[20px] md:text-[24px] font-semibold text-gray-900">All Brands</h2>
                        <p className="text-lg text-gray-600 mt-2 ">
                            Regardless of whether you are salaried or self-employed, you can purchase your dream car
                            without the need to be wealthy or save up a significant amount of money, unlike a few
                            decades ago. Simply apply for a new car loan and drive your dream car sooner.
                        </p>
                    </div>

                </div>

            </div>

            <div className="bg-gray-50 p-5">

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 max-w-[1600px] mx-auto ">
                    {brands.map((src, index) => (
                        <div
                            key={index}
                            className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center border"
                        >
                            <Image
                                src={src}
                                alt={`Brand ${index + 1}`}
                                width={50}
                                height={500}
                                className="object-contain w-full max-h-[100px]"
                            />
                        </div>
                    ))}
                </div>

            </div>

        </>

    );
}
