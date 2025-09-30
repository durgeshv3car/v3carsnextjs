import DreamCareer from "@/components/responsive/careers/DreamCareer";
import HiringBanner from "@/components/responsive/careers/HiringBanner";
import JobListing from "@/components/responsive/careers/JobListing";
import Link from "next/link";

function Career() {
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

            <div className="space-y-10 my-10">
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
                        <JobListing />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Career;