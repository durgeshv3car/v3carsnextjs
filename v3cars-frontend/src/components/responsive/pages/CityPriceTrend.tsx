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
    Dot
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
            <h2 className="text-lg mb-4 text-gray-800 capitalize">
                {city} {type} Prices: 10-Day Trend
            </h2>

            {/* Subheading */}
            <p className="text-md font-semibold text-gray-700 text-center mb-4 capitalize">
                {type} Price In {city}
            </p>

            {/* Chart */}
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
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
    );
};

export default CityPriceTrend;
