'use client'

import Link from "next/link";
import { useState } from "react";
import DreamCareer from "./DreamCareer";
import HiringBanner from "./HiringBanner";
import JobListing from "./JobListing";
import WorkWithUs from "./WorkWithUs";
import ApplicationModel from "./ApplicationModel";

function MainCareersComponent() {
    const [showJobModel, setShowJobModel] = useState(false)

    return (
        <>

            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-primary">›</span>
                        <span className="font-medium text-primary">Careers</span>
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

export default MainCareersComponent;