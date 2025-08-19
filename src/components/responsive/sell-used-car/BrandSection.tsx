'use client'

import CustomSelect from "@/components/ui/custom-inputs/CustomSelect";

type Brand = {
    name: string;
    logo: string;
};

const brands: Brand[] = [
    { name: "Honda", logo: "/brands/tata.jpg", },
    { name: "Hyundai", logo: "/brands/tata.jpg", },
    { name: "Tata", logo: "/brands/tata.jpg", },
    { name: "Mahindra", logo: "/brands/tata.jpg", },
    { name: "Toyota", logo: "/brands/tata.jpg", },
    { name: "Kia", logo: "/brands/tata.jpg", },
    { name: "Maruti", logo: "/brands/tata.jpg", },
    { name: "Honda", logo: "/brands/tata.jpg", },
    { name: "Hyundai", logo: "/brands/tata.jpg", },
    { name: "Tata", logo: "/brands/tata.jpg", },
    { name: "Mahindra", logo: "/brands/tata.jpg", },
    { name: "Toyota", logo: "/brands/tata.jpg", },
    { name: "Kia", logo: "/brands/tata.jpg", },
    { name: "Maruti", logo: "/brands/tata.jpg", },
    { name: "Honda", logo: "/brands/tata.jpg", },
    { name: "Hyundai", logo: "/brands/tata.jpg", },
    { name: "Tata", logo: "/brands/tata.jpg", },
    { name: "Mahindra", logo: "/brands/tata.jpg", },
    { name: "Toyota", logo: "/brands/tata.jpg", },
    { name: "Kia", logo: "/brands/tata.jpg", },
    { name: "Maruti", logo: "/brands/tata.jpg", },
];

interface BrandSectionProps {
    openModel: boolean;
    setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

export const BrandSection = ({ openModel, setOpenModel, setSelectedBrand }: BrandSectionProps) => {
    const items = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple'];

    const handleSelection = (value: string) => {
        console.log('Selected:', value);
    };

    return (
        <>
            <div className='bg-[#EEF2FF] dark:bg-[#171717]'>
                <div className='px-4 xl:px-10 py-6'>
                    <div className="w-full lg:max-w-[1600px] mx-auto">
                        <div className='border dark:border-[#2E2E2E] w-full lg:w-72 rounded-full px-2 text-sm'>
                            <CustomSelect options={items} placeholder={"Enter Brand Name"} onSelect={handleSelection} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='px-4 xl:px-10'>
                <div className="w-full lg:max-w-[1600px] mx-auto">
                    <div className="grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-6 border dark:border-[#2E2E2E] border-t-0 px-2 py-6 rounded-b-2xl h-[592px] overflow-y-auto scrollbar-thin-yellow">
                        {brands.map((brand, index) => (
                            <div
                                key={index}
                                className="rounded-lg flex flex-col border dark:border-[#2E2E2E] justify-between gap-2 p-6 cursor-pointer"
                                onClick={() => { 
                                    setSelectedBrand(brand.name);
                                    setOpenModel(true) 
                                }}
                            >
                                <div className="flex justify-center items-center">
                                    <img
                                        src={brand.logo}
                                        alt={brand.name}
                                        className="h-[40px] lg:h-[76px] dark:invert"
                                    />
                                </div>
                                <p className="text-center text-sm lg:text-base">
                                    {brand.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
}
