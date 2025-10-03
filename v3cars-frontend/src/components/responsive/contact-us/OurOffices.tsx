'use client'

export default function OurOffices() {
    const offices = [
        {
            city: "Delhi NCR",
            type: "Head Office",
            company: "V3Cars Media",
            address:
                "537, 5th Floor, JMD Megapolis Sohna Road, Sector 48, Gurgaon, Haryana, 122018",
            hours: "Mon – Fri, 10:00 AM – 6:00 PM",
        },
        {
            city: "Jaipur",
            type: "Registered Office",
            company: "V3Cars Media Pvt. Ltd.",
            address:
                "IT-2005 Part B, Ramchandrapura, Industrial Area, RIICO IT Zone, Sitapura, Jaipur, Rajasthan, 302020",
            hours: "Mon – Fri, 10:00 AM – 6:00 PM",
        },
    ];

    return (
        <div >
            {/* Header */}
            <div className="text-left mb-10">
                <h2 className="text-5xl">Our Offices</h2>
                <p className="text-xl mt-3">
                    Reach out to us at our registered office or connect with our team at
                    our head office.
                </p>
            </div>

            {/* Layout */}
            <div className="flex gap-6">
                {/* Office Info */}
                <div className="flex flex-col gap-6 w-full lg:max-w-[450px]">
                    {offices.map((office, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl shadow-sm p-8"
                        >
                            <div className="flex items-center gap-4">
                                <span className="w-[3px] h-10 bg-yellow-400 inline-block rounded-sm"></span>
                                <div>
                                    <h3 className="text-2xl font-semibold text-gray-900">
                                        {office.city}
                                    </h3>
                                    <p className="text-xs">{office.type}</p>
                                </div>
                            </div>

                            <p className="mt-4 font-semibold text-gray-900">
                                {office.company}
                            </p>
                            <p className="text-gray-600 mt-1 leading-relaxed w-[300px]">
                                {office.address}
                            </p>

                            <p className="mt-3 text-sm text-gray-700 font-medium">
                                <span className="font-semibold">Working Hours:</span>{" "}
                                {office.hours}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Map Embed */}
                <div className="rounded-2xl overflow-hidden border-2 border-gray-400 shadow-sm w-full">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.4439023012394!2d77.04261887549508!3d28.61687987566873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d2291f6e8e8d5%3A0x418f07d5e79f3c19!2sJMD%20Megapolis!5e0!3m2!1sen!2sin!4v1696000000000!5m2!1sen!2sin"
                        width="100%"
                        height="500"
                        allowFullScreen
                        loading="lazy"
                        className="w-full h-full"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
