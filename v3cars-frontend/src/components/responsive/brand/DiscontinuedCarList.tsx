interface DiscontinuedCarListProps {
    title: string;
    cars: string[];
}

export default function DiscontinuedCarList({ title, cars }: DiscontinuedCarListProps) {
    return (
        <div className="bg-white dark:bg-transparent mt-8 rounded-xl overflow-hidden border dark:border-[#2A2A2A]">
            {/* Header */}
            <div className="text-[18px] font-semibold px-4 py-3 border-b dark:border-[#2A2A2A] bg-slate-100 dark:bg-[#171717]">
                {title}
            </div>

            {/* List */}
            <ul className="divide-y dark:divide-[#2A2A2A]">
                {cars.map((car, i) => (
                    <li key={i} className="px-4 py-3 text-sm">
                        {car}
                    </li>
                ))}
            </ul>

        </div>

    );
}
