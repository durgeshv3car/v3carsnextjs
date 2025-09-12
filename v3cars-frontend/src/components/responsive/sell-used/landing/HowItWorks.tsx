'use client'


export default function HowItWorks() {
    const steps = [
        {
            step: "STEP 1",
            title: "Enter Car Details",
            desc: "Fill in your car details to get the best evaluation instantly.",
            bg: "bg-[#EAEAFF]",
            logo: "./logo/v3.svg",
            image: "./sell-used-car/work1.png",
            imageClass: "absolute -bottom-20 -right-4 w-72",
        },
        {
            step: "STEP 2",
            title: "Share Contact Details",
            desc: "Share your personal details and our experts will get in touch with you.",
            bg: "bg-[#E7F4FF]",
            logo: "./logo/v3.svg",
            image: "./sell-used-car/work2.png",
            imageClass: "absolute -bottom-20 -right-20 rotate-[25deg] w-72",
        },
        {
            step: "STEP 3",
            title: "Book Inspection",
            desc: "Book your car inspection to get the best offer on your used car.",
            bg: "bg-[#FFECE8]",
            logo: "./logo/v3.svg",
            image: "./sell-used-car/work3.png",
            imageClass: "absolute -bottom-20 -right-8 w-72",
        },
    ];

    return (
        <section className="space-y-4 py-16 overflow-hidden">
            <h2 className="text-2xl font-bold">How This Works?</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-6">
                {steps.map((item, index) => (
                    <div key={index} className="relative flex flex-col gap-2">
                        <h2 className="text-lg font-semibold">{item.step}</h2>
                        <div
                            className={`${item.bg} rounded-xl p-4 flex flex-col gap-4 flex-grow`}
                        >
                            <h3 className="text-xl font-bold text-blue-900">{item.title}</h3>
                            <p className="text-gray-500">{item.desc}</p>

                            <div className="flex justify-between items-end flex-grow">
                                <div className="rotate-[14deg]">
                                    <img
                                        src={item.logo}
                                        alt="Logo"
                                        className="w-24 opacity-5 filter invert"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Step Image */}
                        <div className={`${item.imageClass}`}>
                            <img src={item.image} alt={item.title} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
