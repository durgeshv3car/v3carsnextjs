'use client';

interface Props {
    title: string;
    descripation1: string; // HTML
    descripation2: string; // HTML
    descripation3: string; // HTML
}

export default function InsuranceCard({
    title,
    descripation1,
    descripation2,
    descripation3,
}: Props) {
    const insuranceTypes = [descripation1, descripation2, descripation3];

    return (
        <section className="px-4 lg:px-10 py-10">
            <div className="w-full lg:app-container mx-auto">
                {/* Title */}
                <h2 className="text-[22px] md:text-[26px] font-semibold mb-6 text-center md:text-left">
                    {title}
                </h2>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {insuranceTypes.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-[#171717] rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-[#2E2E2E] p-6"
                        >
                            <div
                                className="text-[13px] md:text-[14px] leading-[1.85] space-y-2"
                                dangerouslySetInnerHTML={{ __html: item }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
