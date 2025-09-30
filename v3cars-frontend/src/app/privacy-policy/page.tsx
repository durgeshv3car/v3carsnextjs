import Link from "next/link";
import React from "react";

export default function PrivacyPolicy() {
    return (
        <>

            <div className="bg-[#18181b] text-white">
                <div className="px-4 xl:px-10">
                    <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
                        <Link href="/" className="hover:underline">Home</Link>
                        <span className="text-yellow-500">›</span>
                        <span className="font-medium text-yellow-500">Privacy Policy</span>
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
                        Privacy Policy for V3Cars.com <br />
                        website and V3Cars Social Pages
                    </h1>
                </div>

                {/* Content */}
                <div className="lg:px-10 px-4">
                    <div className="w-full lg:app-container mx-auto my-6 space-y-6">
                        <p className="text-sm font-semibold">Effective Date: 2nd December 2024</p>

                        <p>
                            This website and the social media pages of V3Cars are owned and operated by V3Cars Media Private Limited. This
                            Privacy Policy is designed to inform you about how we handle, collect, use, and disclose the information you
                            may provide to us. By using this website or submitting your information, you agree to the practices outlined
                            below. Please read this entire policy carefully.
                        </p>

                        <h2 className="font-bold text-lg">1. Information We Collect</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <span className="font-semibold">Personal Information:</span> Name, email address, phone number, location,
                                and other identifiers that you voluntarily provide.
                            </li>
                            <li>
                                <span className="font-semibold">Sensitive Personal Information:</span> In compliance with Indian law, we may
                                collect financial information (bank account details, credit/debit card information) or other sensitive data
                                only with explicit consent.
                            </li>
                            <li>
                                <span className="font-semibold">Non-Personal Information:</span> Browser type, IP address, pages visited,
                                and other usage data collected via cookies or analytics tools.
                            </li>
                        </ul>

                        <h2 className="font-bold text-lg">2. Use of Information</h2>
                        <p>We use the information collected to:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                Fulfil your requests for our services, such as car-related inquiries or lead forms for car loans, brochures,
                                or offers.
                            </li>
                            <li>Improve our website’s content, user experience, and offerings.</li>
                            <li>Communicate with you about updates, offers, or services that may interest you.</li>
                            <li>Provide interactive features, such as forums and community engagement.</li>
                        </ul>

                        <h2 className="font-bold text-lg">3. Disclosure of Information</h2>
                        <p>
                            We may share your information with our trusted partners, including but not limited to automotive or financial
                            service providers. These partners may contact you to offer relevant products or services, including marketing
                            or sales-related communications. By using our services, you consent to this sharing and understand that these
                            partners are responsible for their use of your data in accordance with their own privacy policies.
                        </p>
                        <p>We may also disclose your information in the following scenarios:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>
                                <span className="font-semibold">Legal Requirements:</span> When required by law, such as in response to a
                                court order or law enforcement request.
                            </li>
                            <li>
                                <span className="font-semibold">Service Providers:</span> To trusted third-party partners, involved in
                                providing car sales, loans, insurance, or related services.
                            </li>
                            <li>
                                <span className="font-semibold">Business Transfers:</span> In the event of a merger, acquisition, or sale of
                                assets, your information may be transferred as part of that transaction.
                            </li>
                        </ul>

                        <h2 className="font-bold text-lg">4. Consent and Control</h2>
                        <ul className="list-disc list-inside space-y-2">
                            <li>We will obtain your consent before collecting sensitive personal data.</li>
                            <li>
                                Users have the right to access, review, and correct their personal data by contacting us at{" "}
                                <span className="font-semibold">editor@v3cars.com</span>.
                            </li>
                            <li>Users can also withdraw consent at any time by emailing us or using the contact details provided.</li>
                        </ul>

                        <h2 className="font-bold text-lg">5. Cookies and Tracking Technologies</h2>
                        <p>We use cookies, web beacons, and similar technologies to:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Enhance your browsing experience by storing preferences.</li>
                            <li>Analyze site usage to improve our services and measure advertising effectiveness.</li>
                            <li>Maintain login sessions and personalization content.</li>
                        </ul>
                        <p>
                            You can control cookies through your browser settings. However, disabling cookies may affect the website’s
                            functionality.
                        </p>

                        <h2 className="font-bold text-lg">6. Data Security</h2>
                        <p>
                            We implement appropriate physical, electronic, and managerial measures to safeguard your data against
                            unauthorized access, loss, or misuse. While we strive to protect your data, no method of transmission over the
                            Internet is 100% secure.
                        </p>

                        <h2 className="font-bold text-lg">7. Grievance Officer</h2>
                        <p>
                            In compliance with Indian regulations, we have appointed a Grievance Officer to address any concerns regarding
                            data privacy. You can contact:
                        </p>
                        <p>
                            <span className="font-semibold">Grievance Officer</span>
                            <br /> Name: V3Cars Media Private Limited
                            <br /> Email: editor@v3cars.com
                        </p>

                        <h2 className="font-bold text-lg">8. User Obligations</h2>
                        <p>
                            Users must not upload, transmit, or share any content that is harmful, offensive, or violates any applicable
                            laws. Users are responsible for ensuring that their use of the site complies with all relevant laws.
                        </p>

                        <h2 className="font-bold text-lg">9. Amendments to this Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time without prior notice. Any changes will be posted on this
                            page, and the “Effective Date” will be updated accordingly.
                        </p>

                        <h2 className="font-bold text-lg">10. Contact Us</h2>
                        <p>
                            If you have questions or concerns about this Privacy Policy, please contact us at:
                            <br />
                            <span className="font-semibold">V3Cars Media Private Limited</span>
                            <br /> Email: editor@v3cars.com
                        </p>

                        <p className="text-sm">
                            By using V3Cars.com, you agree to the terms of this Privacy Policy.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
