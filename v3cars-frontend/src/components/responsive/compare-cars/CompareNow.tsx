'use client'

import { MdCompareArrows } from "react-icons/md";
// import CustomSelect from "../../ui/custom-inputs/CustomSelect";

export default function CompareNow() {
    const boxes = Array(4).fill(0);
    // const items = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple'];
    // const items2 = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple'];
    // const items3 = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple'];

    // const handleBrand = (value: string) => {
    //     console.log('Selected:', value);
    // };

    // const handleType = (value: string) => {
    //     console.log('Selected:', value);
    // };

    // const handleVariant = (value: string) => {
    //     console.log('Selected:', value);
    // };

    return (

        <div className="w-full">
            <div className="flex gap-2 overflow-x-auto scroll-smooth scrollbar-hide">
                <div className="lg:hidden min-w-[142px] h-[252px] bg-slate-100 dark:bg-[#262626] rounded-xl">

                </div>
                {boxes.map((_, i) => (
                    <div
                        key={i}
                        className="min-w-[255px] lg:min-w-[388px] h-[252px] lg:h-auto rounded-lg shadow-sm p-2 flex flex-col items-center gap-3 border dark:border-[#2E2E2E]"
                    >
                        {/* Placeholder Image Area */}
                        <div className="w-full h-auto lg:min-h-[230px] bg-gray-100 dark:bg-[#262626] rounded flex items-center justify-center">
                            <img
                                src={"/compare-car/plus.png"}
                                alt="Plus Icon"
                                className="w-16 lg:w-[159px] h-16 lg:h-auto object-cover"
                            />
                        </div>

                        {/* Dropdowns */}
                        <div className='w-full border dark:border-[#2E2E2E] rounded-lg text-sm'>
                            {/* <CustomSelect options={items} placeholder={"Select Brands"} onSelect={handleBrand} /> */}
                        </div>

                        <div className='w-full border dark:border-[#2E2E2E] rounded-lg text-sm'>
                            {/* <CustomSelect options={items2} placeholder={"Select Type"} onSelect={handleType} /> */}
                        </div>

                        <div className='w-full border dark:border-[#2E2E2E] rounded-lg text-sm'>
                            {/* <CustomSelect options={items3} placeholder={"Select Variant"} onSelect={handleVariant} /> */}
                        </div>
                    </div>
                ))}
            </div>

            {/* Compare Button */}
            <div className="mt-6 flex justify-center">
                <button className="bg-yellow-400 hover:bg-yellow-500 transition text-black px-8 py-3 rounded-full flex items-center gap-2 shadow-md">
                    Compare Now
                    <MdCompareArrows size={24} />
                </button>
            </div>
        </div>

    );
}
