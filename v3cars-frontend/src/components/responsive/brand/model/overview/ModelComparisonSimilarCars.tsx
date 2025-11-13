import React from "react";

interface Car {
    name: string;
    price: string;
    image: string;
    specs: {
        length: string;
        width: string;
        height: string;
        wheelbase: string;
        groundClearance: string;
        safety: string;
        service: string;
        warranty: string;
    };
}

const ModelComparisonSimilarCars: React.FC = () => {
    const cars: Car[] = [
        {
            name: "Tata Nexon",
            price: "Rs.7.32 - 14.05 Lakh*",
            image:
                "/model/tata.png",
            specs: {
                length: "3995mm",
                width: "1804mm",
                height: "1620mm",
                wheelbase: "2498mm",
                groundClearance: "208mm",
                safety: "5 Star",
                service: "Nationwide",
                warranty: "3 years/1,00,000km",
            },
        },
        {
            name: "Mahindra XUV 3XO",
            price: "Rs.7.28 - 14.40 Lakh*",
            image:
                "/model/tata.png",
            specs: {
                length: "3990mm",
                width: "1821mm",
                height: "1647mm",
                wheelbase: "2600mm",
                groundClearance: "201mm",
                safety: "5 Star",
                service: "Nationwide",
                warranty: "3 years/unlimited km",
            },
        },
        {
            name: "Hyundai Venue",
            price: "Rs.7.26 - 12.46 Lakh*",
            image:
                "/model/tata.png",
            specs: {
                length: "3995mm",
                width: "1770mm",
                height: "1617mm",
                wheelbase: "2500mm",
                groundClearance: "190mm",
                safety: "-",
                service: "Nationwide",
                warranty: "3 years/unlimited km",
            },
        },
        {
            name: "Maruti Brezza",
            price: "Rs.8.26 - 13.01 Lakh*",
            image:
                "/model/tata.png",
            specs: {
                length: "3995mm",
                width: "1790mm",
                height: "1685mm",
                wheelbase: "2500mm",
                groundClearance: "200mm",
                safety: "4 Star",
                service: "Nationwide",
                warranty: "Tata Nexon",
            },
        },
        {
            name: "Maruti Fronx",
            price: "Rs.6.85 - 11.98 Lakh*",
            image:
                "/model/tata.png",
            specs: {
                length: "3995mm",
                width: "1765mm",
                height: "1550mm",
                wheelbase: "2520mm",
                groundClearance: "190mm",
                safety: "-",
                service: "Nationwide",
                warranty: "Tata Nexon",
            },
        },
        {
            name: "Kia Sonet",
            price: "Rs.7.30 - 14.0 Lakh*",
            image:
                "/model/tata.png",
            specs: {
                length: "3995mm",
                width: "1790mm",
                height: "1642mm",
                wheelbase: "2500mm",
                groundClearance: "205mm",
                safety: "-",
                service: "Limited",
                warranty: "3 years/unlimited km",
            },
        },
    ];

    const attributes = [
        "Length",
        "Width",
        "Height",
        "Wheelbase",
        "Ground Clearance",
        "Safety Rating",
        "Service Network",
        "Standard Warranty",
    ];

    return (
        <div>
            {/* Header */}
            <h2 className="text-lg font-semibold mb-4">
                Tata Nexon{" "}
                <span className="text-gray-600">Comparison With Similar Cars</span>
            </h2>

            {/* Top Row: Images */}
            <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 overflow-x-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4 min-w-[700px]">
                    {cars.map((car, index) => (
                        <div key={index} className="text-center">
                            <img
                                src={car.image}
                                alt={car.name}
                                className="w-full h-24 object-cover rounded-md mb-2"
                            />
                            <h3 className="text-sm font-semibold text-gray-800">{car.name}</h3>
                            <p className="text-xs text-gray-700 font-medium">{car.price}</p>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="min-w-[700px] border-t border-gray-200">
                    {attributes.map((attr, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 text-sm border-b border-gray-100 py-2"
                        >
                            <div className="font-medium text-gray-800">{attr}</div>
                            {cars.map((car, i) => {
                                const value =
                                    attr === "Length"
                                        ? car.specs.length
                                        : attr === "Width"
                                            ? car.specs.width
                                            : attr === "Height"
                                                ? car.specs.height
                                                : attr === "Wheelbase"
                                                    ? car.specs.wheelbase
                                                    : attr === "Ground Clearance"
                                                        ? car.specs.groundClearance
                                                        : attr === "Safety Rating"
                                                            ? car.specs.safety
                                                            : attr === "Service Network"
                                                                ? car.specs.service
                                                                : attr === "Standard Warranty"
                                                                    ? car.specs.warranty
                                                                    : "";
                                return (
                                    <div key={i} className="text-gray-700 text-sm">
                                        {value}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="text-center mt-4 border-t border-gray-200 pt-3">
                    <p className="text-sm text-gray-700">
                        Still Confused? Compare Tata Nexon with Rivals on{" "}
                        <a href="#" className="text-blue-600 font-medium hover:underline">
                            Specs, Mileage & Price &gt;
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ModelComparisonSimilarCars;
