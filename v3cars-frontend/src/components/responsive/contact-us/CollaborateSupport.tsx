'use client'

import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";



export default function CollaborateSupport() {
    const sections = [
        {
            title: "Dealer",
            highlight: "Network",
            desc: "Join our exclusive dealer network to share real-world data, brochures, images and pricing updates. Help us bring authentic, insider information to our audience — and get rewarded for your contributions.",
            link: "Join the Network",
        },
        {
            title: "Bug",
            highlight: "Report",
            desc: "Help us improve V3Cars by reporting website bugs or suggesting UI/UX improvements. Your feedback makes our platform stronger — and we plan to reward our most active contributors.",
            link: "Report a Bug",
        },
        {
            title: "Submit",
            highlight: "Press Release",
            desc: "Are you a brand with news or updates to share? Submit your press release here and get featured on V3Cars.",
            link: "Submit Now",
        },
        {
            title: "Support",
            highlight: "V3Cars",
            desc: "Love our work? Support V3Cars by contributing financially or simply saying thank you. Every bit of support helps us stay independent and unbiased.",
            link: "Support Us",
        },
        {
            title: "Review",
            highlight: "My Product",
            desc: "Have a product you’d like V3Cars to review? Share the details and if it fits our schedule, we’ll test it and create unbiased content around it.",
            link: "Submit Product for Review",
        },
        {
            title: "Contribute",
            highlight: "Your Car Story",
            desc: "Own a car and have experiences to share? Tell us your ownership story and we may feature it on our platform.",
            link: "Share My Story",
        },
    ];

    return (
        <div>
            <div className="text-center">
                <h1 className="text-3xl md:text-4xl">
                    Collaborate, Contribute & Support{" "}
                    <span className="text-primary font-semibold">V3Cars</span>
                </h1>
                <p className="text-gray-400 mt-3">
                    Explore different ways to connect with us, share insights and become
                    part of the V3Cars ecosystem.
                </p>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 divide-x divide-y divide-gray-800">
                {sections.map((sec, i) => (
                    <div key={i} className="p-8 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl text-gray-400">
                                {sec.title} <br />
                                <span className="text-primary font-semibold">
                                    {sec.highlight}
                                </span>
                            </h2>
                            <p className="text-sm/loose mt-6">
                                {sec.desc}
                            </p>
                        </div>
                        <Link
                            href="#"
                            className="mt-8 flex items-center justify-between text-sm font-medium"
                        >
                            {sec.link} <BsArrowRight size={16} className="ml-1" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
