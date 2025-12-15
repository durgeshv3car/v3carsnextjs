'use client'

import CommonModelCard from '@/components/common/CommonCards/CommonModelCard';
import { useGetPopularCarQuery, useGetTopSellingCarQuery } from '@/redux/api/carModuleApi'

const CarInIndia: React.FC = () => {
    const { data: topSellingCarData } = useGetTopSellingCarQuery({ limit: 30 });

    const topSellingCar = topSellingCarData?.rows ?? [];

    return (
        <>
            <section className='space-y-4'>
                <h2 className="text-2xl font-semibold">Top {topSellingCarData?.total} Cars in India</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <CommonModelCard data={topSellingCar} />
                </div>
            </section>
        </>
    )
}

export default CarInIndia;