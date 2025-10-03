import Link from "next/link";
import React from "react";

export default function TermsOfUse() {
    return (
        <>

            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">Terms of Uses</span>
                    </div>
                </div>
            </div>

            <div>
                {/* Header */}
                <div className="relative p-4 flex items-center min-h-[225px] justify-between overflow-hidden bg-black border-b-[12px] border-[#FFCC00] mt-[1px]">
                    <div
                        className="absolute inset-0 top-0 right-0 bg-no-repeat bg-right"
                        style={{ backgroundImage: "url('/term/image.png')" }}
                    />

                    {/* Foreground Content */}
                    <h1 className="relative z-10 text-2xl font-semibold w-full lg:app-container mx-auto text-white">
                        V3cars.com | Terms of Uses
                    </h1>
                </div>

                {/* Content */}
                <div className="lg:px-10 px-4">
                    <div className="w-full lg:app-container mx-auto my-6 space-y-6">
                        <p className="text-sm font-semibold">Effective Date: 2nd December 2024</p>

                        <p>
                            Welcome to V3Cars.com. By accessing or using our website, you agree to be bound by these Terms of Use
                            ("Terms"). Please read them carefully before using the website. If you do not agree to these Terms, you
                            should discontinue use of the website.
                        </p>

                        <h2 className="font-bold text-lg">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using V3Cars.com, you agree that you are at least 18 years old or have the legal capacity to
                            enter into a binding agreement. Your use of the website signifies your acceptance of these Terms and your
                            consent to comply with them.
                        </p>

                        <h2 className="font-bold text-lg">2. Use of Website</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                You agree to use this website only for informational and non-commercial purposes unless otherwise expressly
                                authorized by V3Cars.com.
                            </li>
                            <li>
                                You shall not use this website to distribute harmful software, spam, or any unlawful content. You shall not
                                modify, copy, reproduce, republish, or distribute any material without prior written consent from V3Cars.com.
                            </li>
                        </ul>

                        <h2 className="font-bold text-lg">3. Intellectual Property</h2>
                        <p>
                            All materials on this website, including text, graphics, logos, images, videos, and software, are the property
                            of V3Cars Media Private Limited or its licensors and are protected by intellectual property laws. Unauthorized
                            use is prohibited.
                        </p>

                        <h2 className="font-bold text-lg">4. User Content</h2>
                        <p>
                            By submitting content to this website (e.g., reviews, comments, feedback), you grant V3Cars.com a worldwide,
                            royalty-free, perpetual license to use, reproduce, modify, adapt, publish, and display such content.
                        </p>

                        <h2 className="font-bold text-lg">5. Disclaimer</h2>
                        <p>
                            The information provided on this website is for general informational purposes only. V3Cars.com makes no
                            representations or warranties of any kind regarding accuracy, reliability, or completeness. Use of the website
                            is at your own risk.
                        </p>

                        <h2 className="font-bold text-lg">6. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, V3Cars.com shall not be liable for any direct, indirect, incidental,
                            consequential, or punitive damages arising out of or in connection with the use of this website.
                        </p>

                        <h2 className="font-bold text-lg">7. Indemnification</h2>
                        <p>
                            You agree to indemnify and hold harmless V3Cars.com, its affiliates, employees, and agents from any claims,
                            damages, liabilities, or expenses arising out of your use of the website or violation of these Terms.
                        </p>

                        <h2 className="font-bold text-lg">8. External Links</h2>
                        <p>
                            This website may contain links to third-party websites. V3Cars.com is not responsible for the content or
                            practices of such websites and does not endorse them.
                        </p>

                        <h2 className="font-bold text-lg">9. Termination</h2>
                        <p>
                            V3Cars.com reserves the right to suspend or terminate your access to the website at its sole discretion,
                            without notice, for any violation of these Terms or any other reason.
                        </p>

                        <h2 className="font-bold text-lg">10. Changes to Terms</h2>
                        <p>
                            V3Cars.com reserves the right to modify or update these Terms at any time. Any updates will be effective upon
                            posting on this page. Continued use of the website following the posting of changes constitutes acceptance of
                            those changes.
                        </p>

                        <h2 className="font-bold text-lg">11. Governing Law</h2>
                        <p>
                            These Terms of Use shall be governed by and construed in accordance with the laws of India. Any disputes shall
                            be subject to the exclusive jurisdiction of the courts in New Delhi, India.
                        </p>

                        <h2 className="font-bold text-lg">12. Contact Us</h2>
                        <p>
                            For any questions regarding these Terms of Use, you may contact us at:
                            <br />
                            <span className="font-semibold">V3Cars Media Private Limited</span>
                            <br />
                            Email: support@v3cars.com
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
