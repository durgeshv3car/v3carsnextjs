interface DiscontinuedCarListProps {
    title: string;
    cars: string[];
}

export default function DiscontinuedCarList({ title, cars }: DiscontinuedCarListProps) {
    return (

        <div className=" rounded-xl overflow-hidden">

            {/* Header */}
            <div className="text-white text-[18px] font-semibold px-2 py-3 border-b border-[#2A2A2A]">
                {title}
            </div>

            {/* List */}
            <ul className="divide-y divide-[#2A2A2A]">
                {cars.map((car, i) => (
                    <li key={i} className="px-4 py-3 text-sm text-white">
                        {car}
                    </li>
                ))}
            </ul>

        </div>

    );
}
