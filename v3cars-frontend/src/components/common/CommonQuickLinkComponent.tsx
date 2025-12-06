'use client';

export default function CommonQuickLinkComponent() {
    const links = [
        {
            title: "Mileage Calculator",
            desc: "Estimate Your Vehicle's Fuel Efficiency",
            img: "/emicalculator/mileage.png",
            bg: "bg-[#E4F3FE]",
        },
        {
            title: "Fuel Price in India",
            desc: "Check Latest Fuel Prices Across India",
            img: "/emicalculator/fuel.png",
            bg: "bg-[#FCEFFE]",
        },
        {
            title: "Car Loan EMI Calculator",
            desc: "Calculate Your Monthly Car Loan EMI",
            img: "/emicalculator/emi.png",
            bg: "bg-[#FFF8C9]",
        },
        {
            title: "Compare Cars",
            desc: "Compare Specs, Features & Prices",
            img: "/emicalculator/compare.png",
            bg: "bg-[#E0F8E8]",
        },
    ];

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {links.map((item, index) => (
                    <div
                        key={index}
                        className={`${item.bg} border rounded-xl p-6 flex flex-col items-center justify-between text-center shadow-sm hover:shadow-md transition`}
                    >
                        <div className="flex justify-center items-center flex-grow mb-4">
                            <img src={item.img} alt={item.title} />
                        </div>

                        <div>
                            <p className="font-semibold mb-1 text-black">{item.title}</p>
                            <p className="text-sm text-gray-400 leading-snug">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
