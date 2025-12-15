import React from "react";

type Car = {
    id: number;
    name: string;
    image: string;
    price: string;
    details: string;
};

const cars: Car[] = [
    {
        id: 1,
        name: "Hyundai Venue HX 2",
        image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/44707/venue-exterior-right-front-three-quarter.jpeg",
        price: "₹7.90 lakh",
        details: "1199cc | Petrol | Manual",
    },
    {
        id: 2,
        name: "Hyundai Creta E",
        image:
            "https://imgd.aeplcdn.com/664x374/n/cw/ec/136183/creta-exterior-right-front-three-quarter.jpeg",
        price: "₹7.90 lakh",
        details: "1199cc | Petrol | Manual",
    },
];

const SelectCarComparison: React.FC = () => {
    return (
        <div className="bg-white rounded-xl border p-4">
            <div className="grid grid-cols-4 gap-4">
                {/* Left Info Panel */}
                <div className="flex flex-col justify-center p-4 border-r">
                    <h3 className="font-semibold text-sm mb-2">
                        Selected Cars <br /> for Comparison
                    </h3>

                    <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input type="checkbox" />
                        Highlight Differences
                    </label>
                </div>

                {/* Selected Cars */}
                {cars.map((car) => (
                    <div
                        key={car.id}
                        className="border rounded-lg p-4 text-center"
                    >
                        <img
                            src={car.image}
                            alt={car.name}
                            className="w-full h-28 object-contain mb-3"
                        />

                        <h4 className="font-semibold text-sm">{car.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">{car.details}</p>

                        <p className="text-lg font-bold mt-2">{car.price}</p>

                        <button className="text-blue-600 text-xs mt-2 hover:underline">
                            View December Offers
                        </button>
                    </div>
                ))}

                {/* Add Car Placeholder */}
                <div className="border rounded-lg flex flex-col items-center justify-center text-gray-400">
                    <div className="w-12 h-12 flex items-center justify-center border rounded-full mb-2">
                        <span className="text-2xl">+</span>
                    </div>
                    <p className="text-sm">Add car to compare</p>
                </div>
            </div>
        </div>
    );
};

export default SelectCarComparison;
