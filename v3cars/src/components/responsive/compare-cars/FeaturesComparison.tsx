import Image from "next/image";
import { BiCheckCircle } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

type FeatureRow = {
    label: string;
    col1: boolean;
    col2: boolean;
};

const Section = ({
    title,
    rows,
}: {
    title: string;
    rows: FeatureRow[];
}) => {
    return (
        <div className="overflow-hidden">
            {/* Section Header */}
            <div className="bg-[#EBEBEB] dark:bg-[#2e2e2e] px-5 py-3 text-sm">
                {title}
            </div>

            {/* Table */}
            <table className="w-full bg-white dark:bg-[#171717]">
                <tbody className="divide-y dark:divide-[#2e2e2e] divide-gray-200">
                    {rows.map((row, idx) => (
                        <tr key={idx} className="text-sm">
                            {/* Feature name */}
                            <td className="p-5 text-left border-r dark:border-[#2e2e2e]">
                                {row.label}
                            </td>

                            {/* Column 1 */}
                            <td className="p-5 text-center border-r dark:border-[#2e2e2e]">
                                {row.col1 ? (
                                    <BiCheckCircle className="w-5 h-5 text-yellow-500 inline-block" />
                                ) : (
                                    <span className="text-gray-400">-</span>
                                )}
                            </td>

                            {/* Column 2 */}
                            <td className="p-5 text-center">
                                {row.col2 ? (
                                    <BiCheckCircle className="w-5 h-5 text-yellow-500 inline-block" />
                                ) : (
                                    <span className="text-gray-400">-</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* View More */}
            <div className="bg-white dark:bg-[#292929] border-t dark:border-[#2e2e2e] border-gray-200 text-center py-5 text-sm cursor-pointer hover:bg-gray-50 flex items-center justify-center gap-1">
                View More <IoIosArrowDown />
            </div>
        </div>
    );
};

export default function FeaturesComparison() {
    const rows: FeatureRow[] = [
        {
            label: "Blind View Monitor",
            col1: true,
            col2: false,
        },
        {
            label: "All Wheel Disc Brakes",
            col1: true,
            col2: true,
        },
        {
            label: "Multi Collision Brakes",
            col1: true,
            col2: true,
        },
        {
            label: "Roll Over Protection",
            col1: false,
            col2: true,
        },
        {
            label: "Electronic Differential Lock System",
            col1: true,
            col2: true,
        },
    ];

    return (
        <div className="border rounded-xl overflow-hidden dark:border-[#2e2e2e]">
            {/* Page Header */}
            <div className="flex items-center gap-4 bg-[#DEE2E6] dark:bg-[#292929] px-4 py-3 border-b dark:border-[#2e2e2e]">
                <span className="text-lg bg-white dark:bg-[#171717] p-2 rounded">
                    <Image
                        src={`/compare-car/feature.png`}
                        alt="rs"
                        width={20}
                        height={20}
                        className="dark:invert"
                    />
                </span>
                <h2 className="font-semibold text-sm">
                    Features Comparison
                </h2>
            </div>

            {/* 1st */}
            <div>
                <h2 className="bg-[#D2D3D8] dark:bg-[#232323] p-4 font-semibold">Safety Features </h2>
                <Section title="Standard Safety Features" rows={rows} />
                <Section title="Basic Safety Features" rows={rows} />
                <Section title="Advanced Safety Features" rows={rows} />
                <Section title="Mirror & Parking Aid" rows={rows} />
                <Section title="Lighting" rows={rows} />
            </div>

            {/* 2nd */}
            <div>
                <h2 className="bg-[#D2D3D8] dark:bg-[#232323] p-4 font-semibold">ADAS Features</h2>
                <Section title="Advanced Driver Assistance System" rows={rows} />
            </div>

            {/* 3rd */}
            <div>
                <h2 className="bg-[#D2D3D8] dark:bg-[#232323] p-4 font-semibold">Infotainment Features </h2>
                <Section title="Infotainment & Connectivity" rows={rows} />
            </div>

            {/* 4th */}
            <div>
                <h2 className="bg-[#D2D3D8] dark:bg-[#232323] p-4 font-semibold">Functional Features</h2>
                <Section title="Lighting" rows={rows} />
                <Section title="Mirror & Parking Aid" rows={rows} />
                <Section title="Air Conditioning" rows={rows} />
                <Section title="Storage" rows={rows} />
                <Section title="Seating & Comfort" rows={rows} />
                <Section title="Steering Aid" rows={rows} />
                <Section title="Doors & Windows" rows={rows} />
                <Section title="Driving Aid" rows={rows} />
            </div>

            {/* 5th */}
            <div>
                <h2 className="bg-[#D2D3D8] dark:bg-[#232323] p-4 font-semibold">Style Features</h2>
                <Section title="Styling Basics (Interior)" rows={rows} />
                <Section title="Styling Basics (Exterior)" rows={rows} />
            </div>

        </div>
    );
}
