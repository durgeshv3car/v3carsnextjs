'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer
} from 'recharts';

const data = [

    {
        name: 'r1',
        b1: 1,
        b2: 2,
        b3: 3,
    },

    {
        name: 'r2',
        b1: 3,
        b2: 4,
        b3: 5,
    },

    {
        name: 'r3',
        b1: 5,
        b2: 6,
        b3: 7,
    },

];

export default function FuelCostBarGraph() {
    return (

        <div className="bg-[#F6F6F6] p-4 rounded-xl  mt-6">

            <div className='max-w-[1600px] mx-auto'>

                <h3 className="text-[24px] font-semibold text-gray-800 mb-2">Fuel Cost Graph</h3>

                <div className="h-[300px] md:h-[600px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="name"
                                label={{
                                    value: 'Regions by feature property value',
                                    position: 'bottom',
                                    offset: 10,
                                    fontWeight: 600,
                                }}
                            />
                            <YAxis
                                label={{
                                    value: 'Series reduction value',
                                    angle: -90,
                                    position: 'insideLeft',
                                    fontWeight: 600,
                                }}
                            />
                            <Tooltip />
                            <Legend verticalAlign="top" align="right" wrapperStyle={{ paddingBottom: 10 }} />
                            <Bar dataKey="b1" fill="#1f77b4" />
                            <Bar dataKey="b2" fill="#d62728" />
                            <Bar dataKey="b3" fill="#f1b600" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>


            </div>

        </div>
    );
}


