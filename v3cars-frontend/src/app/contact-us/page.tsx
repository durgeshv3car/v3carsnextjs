'use client'

import CommonFaqAccordion from "@/components/common/CommonFaqAccordion";
import CollaborateSupport from "@/components/responsive/contact-us/CollaborateSupport";
import HelpSection from "@/components/responsive/contact-us/HelpSection";
import OurOffices from "@/components/responsive/contact-us/OurOffices";
import { useGetFAQByModuleQuery } from "@/redux/api/commonApi";
import Link from "next/link";

function ContactUs() {
    const { data: faqByModuleData, error, isLoading } = useGetFAQByModuleQuery({ moduleId: 7 });

    const faqByModule = faqByModuleData?.rows ?? [];

    return (
        <>

            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">Contact Us</span>
                    </div>
                </div>
            </div>

            <div className="relative mt-20">
                <div
                    className="absolute inset-x-0 bottom-0 h-[400px] bg-no-repeat bg-bottom bg-contain"
                    style={{ backgroundImage: "url('/contact-us/helpbg.png')" }}
                />

                <div className="relative lg:px-10 px-4">
                    <div className="w-full lg:app-container mx-auto">
                        <HelpSection />
                    </div>
                </div>
            </div>

            <div className="lg:px-10 px-4 bg-black text-white border-t-8 border-[#FFA800]">
                <div className="w-full lg:app-container mx-auto py-16">
                    <CollaborateSupport />
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-x-0 top-0 h-[700px] bg-no-repeat bg-bottom bg-cover"
                    style={{ backgroundImage: "url('/contact-us/bg-map.png')" }}>

                    {/* transparent gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F9F9FB] dark:to-[#0a0a0a]" />
                </div>
                <div className=" relative lg:px-10 px-4 ">
                    <div className="w-full lg:app-container mx-auto py-16">
                        <OurOffices />
                    </div>
                </div>
            </div>

            <div className="px-4 lg:px-10 py-6">
                <div className="w-full lg:app-container mx-auto">
                    <CommonFaqAccordion faqData={faqByModule} />
                </div>
            </div>
        </>
    );
}

export default ContactUs;