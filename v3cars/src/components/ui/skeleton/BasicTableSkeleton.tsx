'use client'

export default function BasicTableSkeleton() {
    return (
        <div className="w-full overflow-hidden bg-white animate-pulse">

            {/* Table Header */}
            <div className="grid grid-cols-4 bg-gray-100 p-5 text-sm font-semibold">
                <div className="h-4 w-24 bg-gray-300 rounded" />
                <div className="h-4 w-16 bg-gray-300 rounded" />
                <div className="h-4 w-16 bg-gray-300 rounded" />
                <div className="h-4 w-16 bg-gray-300 rounded" />
            </div>

            {/* Rows */}
            {[...Array(9)].map((_, i) => (
                <div
                    key={i}
                    className={`grid grid-cols-4 p-5 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                >
                    {/* State */}
                    <div className="h-4 w-48 bg-gray-200 rounded" />

                    {/* Petrol */}
                    <div className="h-4 w-20 bg-gray-200 rounded" />

                    {/* Diesel */}
                    <div className="h-4 w-20 bg-gray-200 rounded" />

                    {/* CNG */}
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                </div>
            ))}
        </div>
    );
}
