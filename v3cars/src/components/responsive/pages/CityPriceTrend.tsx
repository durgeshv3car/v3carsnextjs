'use client';

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface PriceTrendData {
    day: string;
    price: number;
}

interface CityPriceTrendProps {
    city: string;
    type: string;
    data: PriceTrendData[];
}

const CityPriceTrend: React.FC<CityPriceTrendProps> = ({ city, type, data }) => {
    return (
        <div className="">
            {/* Heading */}
            <h2 className="text-lg mb-4 capitalize">
                {city} {type} Prices: 10-Day Trend
            </h2>

            {/* Subheading */}
            <div className='border rounded-xl overflow-hidden dark:border-[#2e2e2e]'>
                <p className="text-lg bg-slate-100 dark:bg-[#232323] py-4 text-center capitalize border-b dark:border-[#2e2e2e]">
                    {type} Price In {city}
                </p>

                {/* Chart */}
                <div className="h-[300px] sm:h-[500px]">
                    <ResponsiveContainer width="100%" height="100%" className={"pr-10 py-6"}>
                        <LineChart
                            data={data}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                            <XAxis dataKey="day" />
                            <YAxis domain={['auto', 'auto']} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                }}
                                formatter={(value: number) => [`₹${value}`, 'Price']}
                            />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#0099a8"
                                strokeWidth={2}
                                dot={{ r: 4, strokeWidth: 2, fill: '#0099a8' }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default CityPriceTrend;
