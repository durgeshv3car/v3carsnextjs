'use client'

import Link from "next/link";
import ProfileSection from "./ProfileSection";
import ArticleList from "./ArticleList";
import SideBar from "./SideBar";

function MainAuthorDetailsComponent() {
    return (
        <>
            <div className='bg-[#18181b] text-white'>
                <div className=''>
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="">›</span>
                        <Link href="/authors" className="font-medium hover:underline">
                            Authors
                        </Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">
                            Authors Details
                        </span>
                    </div>
                </div>
            </div>

            <div className="px-4 xl:px-10">
                <div className="lg:app-container mx-auto w-full my-6 flex flex-col lg:flex-row gap-5">
                    <div className="w-full lg:min-w-[74%] space-y-6">
                        <ProfileSection />
                        <ArticleList />
                    </div>

                    <div className="w-full lg:min-w-[24%] space-y-6">
                        <SideBar />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainAuthorDetailsComponent;

