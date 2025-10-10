'use client'

import ApplicationModel from "@/components/responsive/careers/ApplicationModel";
import DreamCareer from "@/components/responsive/careers/DreamCareer";
import HiringBanner from "@/components/responsive/careers/HiringBanner";
import JobListing from "@/components/responsive/careers/JobListing";
import WorkWithUs from "@/components/responsive/careers/WorkWithUs";
import Link from "next/link";
import { useState } from "react";

function Career() {
    const [showJobModel, setShowJobModel] = useState(false)

    return (
        <>

            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">Careers</span>
                    </div>
                </div>
            </div>

            <div className="space-y-20 my-10">
                <div className="lg:px-10 px-4">
                    <div className="w-full lg:app-container mx-auto">
                        <DreamCareer />
                    </div>
                </div>

                <div className="lg:px-10 px-4 bg-white dark:bg-[#171717] py-4">
                    <div className="w-full lg:app-container mx-auto">
                        <HiringBanner />
                    </div>
                </div>

                <div className="lg:px-10 px-4">
                    <div className="w-full lg:app-container mx-auto">
                        <JobListing showJobModel={showJobModel} setShowJobModel={setShowJobModel} />
                    </div>
                </div>

                <div className="lg:px-10 px-4">
                    <div className="w-full lg:app-container mx-auto">
                        <WorkWithUs />
                    </div>
                </div>
            </div>


            {showJobModel && <ApplicationModel onClose={() => setShowJobModel(false)} />}
        </>
    );
}

export default Career;