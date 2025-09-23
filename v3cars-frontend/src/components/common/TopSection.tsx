'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

interface TopSectionProps {
    title: string;
    description: string;
}

export default function TopSection({ title, description }: TopSectionProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [maxHeight, setMaxHeight] = useState<'3rem' | 'none' | string>('3rem') // 'none' -> no clamp
    const contentRef = useRef<HTMLDivElement>(null)
    const path = usePathname()

    const descriptionText =
        path === "/latest-launched-cars" ? description :
            path === "/popular-cars" ? description :
                path === "/compare-cars" ? description :
                    path === "/car-loan-emi-calculator" ? description :
                        path === "/petrol-price-in-india" ? description :
                            path === "/diesel-price-in-india" ? description :
                                path === "/cng-price-in-india" ? description :
                                    path === "/electric-cars" ? description :
                                        description

    // ✅ Word count & flag for showing Read more/less
    const wordCount = descriptionText.trim().split(/\s+/).filter(Boolean).length
    const hasReadMore = wordCount > 65

    // ✅ Smooth expand/collapse only when long enough; otherwise show full text
    useEffect(() => {
        if (!hasReadMore) {
            setMaxHeight('none') // no clamp for short descriptions
            return
        }
        if (isExpanded && contentRef.current) {
            setMaxHeight(contentRef.current.scrollHeight + "px")
        } else {
            setMaxHeight("3rem") // collapsed height (~2 lines)
        }
    }, [isExpanded, descriptionText, hasReadMore])

    return (
        <section>
            {/* Breadcrumb */}
            <div className='bg-[#18181b] text-white'>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">
                            {path === "/latest-launched-cars" ? "Latest Cars" :
                                path === "/popular-cars" ? "Popular Cars" :
                                    path === "/compare-cars" ? "Compare Cars" :
                                        path === "/car-loan-emi-calculator" ? "Car Loan EMI Calculator" :
                                            path === "/petrol-price-in-india" ? "Petrol Price In India" :
                                                path === "/diesel-price-in-india" ? "Diesel Price In India" :
                                                    path === "/cng-price-in-india" ? "CNG Price In India" :
                                                        path === "/electric-cars" ? "Electric Cars" :
                                                            "Upcoming Cars"}
                        </span>
                    </div>
                </div>
            </div>

            <div className='w-full min-h-[186px] py-[30px] '>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:app-container mx-auto space-y-5">

                        {/* Title */}
                        <h1 className="text-4xl font-semibold">{title}</h1>

                        {/* Description with smooth expand */}
                        <div
                            ref={contentRef}
                            style={{ maxHeight }}
                            className={`${hasReadMore ? 'overflow-hidden transition-all duration-500 ease-in-out' : 'overflow-visible'}`}
                            aria-expanded={hasReadMore ? isExpanded : true}
                        >
                            <p className="text-wrap">{descriptionText}</p>
                        </div>

                        {/* Read More / Read Less — only if > 40 words */}
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-sm text-[#FFCC00] font-medium hover:underline flex items-center gap-1"
                        >
                            {isExpanded ? "Read Less" : "Read More"}
                            <span
                                className={`transform transition-transform ${isExpanded ? "rotate-180" : "rotate-0"}`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
