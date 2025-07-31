function BottomAd() {
    return (

        <div className='h-[331px] md:h-[407px] bg-[#B3B3B3] dark:bg-[#262626] p-4 flex justify-center items-center mb-6'>

            <div className="hidden sm:block w-full lg:max-w-[1600px] lg:h-[346px] sm:h-[200px] mx-auto">
                <img
                    src={'/ads/ad1.png'}
                    alt='ad1'
                    className='h-full w-full'
                />
            </div>

            <div className='block sm:hidden w-[336px] h-[280px] bg-gray-300 rounded-xl'>

            </div>
        </div>
    );
}

export default BottomAd;