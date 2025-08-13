'use client'

import CustomSelect from "@/components/ui/custom-inputs/CustomSelect";


function SearchSection() {

    const items = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple'];

    const handleSelection = (value: string) => {
        console.log('Selected:', value);
    };

    return (
        <>
            <div className="lg:bg-[url('/figma-banner.png')] lg:h-[217px] flex items-center justify-center bg-center bg-cover px-4 xl:px-10">
                <div className="w-full lg:max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
                    <div className="border rounded-lg">
                        <CustomSelect options={items} placeholder={"Select Fuel Type"} onSelect={handleSelection} />
                    </div>

                    <div className="border rounded-lg">
                        <CustomSelect options={items} placeholder={"Select State"} onSelect={handleSelection} />
                    </div>

                    <div className="border rounded-lg">
                        <CustomSelect options={items} placeholder={"Select City"} onSelect={handleSelection} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchSection;