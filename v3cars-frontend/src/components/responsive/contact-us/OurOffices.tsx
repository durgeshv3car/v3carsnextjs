'use client'

import React, { useState } from "react";

export default function OurOffices() {
    const offices = [
        {
            city: "Delhi NCR",
            type: "Head Office",
            company: "V3Cars Media",
            address:
                "537, 5th Floor, JMD Megapolis Sohna Road, Sector 48, Gurgaon, Haryana, 122018",
            hours: "Mon – Fri, 10:00 AM – 6:00 PM",
            mapEmbed:
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.991547951227!2d77.03614197617894!3d28.419511893721094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d238a62d5c579%3A0xf2880142912c7b07!2sV3Cars!5e0!3m2!1sen!2sin!4v1759747668290!5m2!1sen!2sin",
        },
        {
            city: "Jaipur",
            type: "Registered Office",
            company: "V3Cars Media Pvt. Ltd.",
            address:
                "IT-2005 Part B, Ramchandrapura, Industrial Area, RIICO IT Zone, Sitapura, Jaipur, Rajasthan, 302020",
            hours: "Mon – Fri, 10:00 AM – 6:00 PM",
            mapEmbed:
                "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56973.9077337979!2d75.77937059748038!3d26.812292091302893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc8fbbdd5aca7%3A0x1ef6b5fc2d73af71!2sPhoenix%20Advanced%20Softwares%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1759747822040!5m2!1sen!2sin",
        },
    ];

    // Initial map office = Head Office
    const [selectedOffice, setSelectedOffice] = useState(
        offices.find((office) => office.type === "Head Office") || offices[0]
    );

    return (
        <div>
            {/* Header */}
            <div className="text-left mb-10">
                <h2 className="text-5xl">Our Offices</h2>
                <p className="text-xl mt-3">
                    Reach out to us at our registered office or connect with our team at
                    our head office.
                </p>
            </div>

            {/* Layout */}
            <div className="flex gap-6 flex-col lg:flex-row">
                {/* Office Info */}
                <div className="flex flex-col gap-6 w-full lg:max-w-[450px]">
                    {offices.map((office, i) => (
                        <div
                            key={i}
                            onClick={() => setSelectedOffice(office)}
                            className={`cursor-pointer bg-white dark:bg-[#171717] rounded-2xl shadow-sm p-8 ${selectedOffice.city === office.city
                                    ? "border-2 border-yellow-400"
                                    : ""
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <span className="w-[3px] h-10 bg-yellow-400 inline-block rounded-sm"></span>
                                <div>
                                    <h3 className="text-2xl font-semibold">{office.city}</h3>
                                    <p className="text-xs">{office.type}</p>
                                </div>
                            </div>

                            <p className="mt-4 font-semibold">{office.company}</p>
                            <p className="text-gray-500 mt-1 leading-relaxed w-[300px]">
                                {office.address}
                            </p>

                            <p className="mt-3 text-sm text-gray-500 font-medium">
                                <span className="font-semibold">Working Hours:</span> {office.hours}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Map Embed */}
                {selectedOffice.mapEmbed && (
                    <div className="rounded-2xl overflow-hidden border-2 border-gray-400 dark:border-[#2E2E2E] shadow-sm w-full">
                        <iframe
                            src={selectedOffice.mapEmbed}
                            width="100%"
                            height="500"
                            allowFullScreen
                            loading="lazy"
                            className="w-full h-full dark:invert dark:hue-rotate-180"
                        ></iframe>
                    </div>
                )}
            </div>
        </div>
    );
}
