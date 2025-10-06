import MidSection from "@/components/responsive/about-us/MidSection";
import TeamSection from "@/components/responsive/about-us/TeamSection";
import TrustedCarGuide from "@/components/responsive/about-us/TrustedCarGuide";
import Link from "next/link";

function AboutUs() {
    return (
        <>
            <div className='bg-[#18181b] text-white'>
                <div className='px-4 xl:px-10'>
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">
                            About Us
                        </span>
                    </div>
                </div>
            </div>

            <div className="relative w-full min-h-[250px] md:min-h-[300px]">
                <div
                    className="absolute inset-0 bg-no-repeat bg-cover bg-center dark:invert"
                    style={{ backgroundImage: "url('/author/Vector.png')" }}
                />
                <div className="relative w-full lg:app-container mx-auto">
                    <div className="pt-[60px] md:pt-[100px] px-4">
                        <h1 className="text-3xl/tight md:text-4xl/tight">
                            India’s Most <br />
                            <span className="text-yellow-400 font-bold">Trusted Car Guide</span>
                        </h1>
                        <div className="h-[3px] bg-yellow-400 w-[100px] my-3" />
                    </div>
                </div>
            </div>

            <div className="px-4 xl:px-10">
                <div className="lg:app-container mx-auto w-full my-16 ">
                    <TrustedCarGuide />
                </div>
            </div>

            <div className="bg-white dark:bg-transparent">
                <div className="px-4 xl:px-10">
                    <div className="lg:app-container mx-auto w-full my-16">
                        <MidSection />
                    </div>
                </div>
            </div>

            <div className="relative">
                <div
                    className="absolute top-12 right-0 w-[300px] h-[300px] dark:invert pointer-events-none"
                    style={{
                        backgroundImage: "url('/about-us/bg.png')",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                    }}
                ></div>

                <div className="px-4 xl:px-10">
                    <div className="lg:app-container mx-auto w-full my-20 relative z-10">
                        <TeamSection />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutUs;