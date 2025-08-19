'use client'

function TopBanner() {
    return (
        <>
            <div className='bg-[#E2E2E2] dark:bg-black'>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:max-w-[1600px] mx-auto flex justify-between gap-2">
                        <div className="flex flex-col justify-between gap-4">
                            <div className="pt-10 space-y-4">
                                <h1 className="text-xl lg:text-4xl text-gray-500">
                                    Sell Your
                                    <span className="font-bold text-black dark:text-white"> Used Car </span>
                                    At Best Price
                                </h1>

                                <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:divide-x-[2px] divide-white dark:divide-gray-400">
                                    <img
                                        src={'./sell-used-car/instant.png'}
                                        alt="instant"
                                        className="w-28 lg:w-40 lg:pr-8 dark:invert"
                                    />
                                    <img
                                        src={'./sell-used-car/hassle.png'}
                                        alt="hassle"
                                        className="w-28 lg:w-52 lg:px-8 dark:invert"
                                    />
                                    <img
                                        src={'./sell-used-car/freeRC.png'}
                                        alt="freeRC"
                                        className="w-28 lg:w-40 lg:pl-8 dark:invert"
                                    />
                                </div>
                            </div>

                            <div className="bg-white dark:bg-[#171717] rounded-t-xl py-2 px-6 w-fit text-sm lg:text-2xl text-gray-500">
                                Select Your 
                                <span className="font-extrabold text-black dark:text-white"> Car Brand</span>
                            </div>

                        </div>

                        <div className="flex items-end">
                            <img
                                src={"./sell-used-car/jagdav.png"}
                                alt="jagdav"
                                className="w-72 lg:w-56"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default TopBanner;