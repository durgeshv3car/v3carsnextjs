import AboutComponent from "@/components/responsive/authors/About";
import ArticleList from "@/components/responsive/authors/ArticleList";
import ProfileSection from "@/components/responsive/authors/ProfileSection";
import SideBar from "@/components/responsive/authors/SideBar";
import Link from "next/link";

function Authors() {
    return (
        <>
            <div className='bg-[#18181b] text-white'>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">
                            Authors
                        </span>
                    </div>
                </div>
            </div>

            <div className="app-container mx-auto w-full my-6 flex gap-5">
                <div className="w-full lg:min-w-[74%] space-y-6">
                    <ProfileSection />
                    <AboutComponent />
                    <ArticleList />
                </div>

                <div className="w-full lg:min-w-[24%] space-y-6">
                    <SideBar />
                </div>
            </div>
        </>
    );
}

export default Authors;