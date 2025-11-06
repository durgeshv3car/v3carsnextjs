'use client'

import CurrentOffersCard from '@/components/common/CommonCards/CurrentOffersCard'
import { useGetPopularCarQuery } from '@/redux/api/carModuleApi'

const CarInIndia: React.FC = () => {
    const { data: popularCarData } = useGetPopularCarQuery();

    const popularCar = popularCarData?.rows ?? [];

    return (
        <>
            <section className='space-y-4'>
                <h2 className="text-2xl font-semibold">Popular Cars In India</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <CurrentOffersCard data={popularCar} />
                </div>
            </section>
        </>
    )
}

export default CarInIndia;