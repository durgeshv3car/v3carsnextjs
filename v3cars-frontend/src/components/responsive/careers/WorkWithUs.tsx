'use client'


function WorkWithUs() {
    return (
        <>
            <h2 className="text-xl font-semibold my-6 uppercase">Other Ways to Work With Us</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#171717] rounded-3xl p-10 shadow-sm flex flex-col justify-between gap-10">
                    <div>
                        <h3 className="text-lg font-bold mb-3 text-white">Volunteer</h3>
                        <p className="leading-loose text-white">
                            If you’re passionate about cars and want to contribute in your free time,
                            join V3Cars as a volunteer. Share your skills, support our projects,
                            and be part of the journey to simplify car buying for India.
                        </p>
                    </div>
                    <button className="bg-primary rounded-full px-6 py-2 font-semibold text-sm w-fit text-black">Apply as Volunteer</button>
                </div>
                <div className="bg-[#171717] rounded-3xl p-10 shadow-sm flex flex-col justify-between gap-10">
                    <div>
                        <h3 className="text-lg font-bold mb-3 text-white">Internship</h3>
                        <p className="leading-loose text-white">
                            Kickstart your career in automotive media with V3Cars. As an intern,
                            you’ll gain hands-on experience in content creation, research,
                            and analysis — while working with a team that values logic, facts, and clarity.
                        </p>
                    </div>
                    <button className="bg-primary rounded-full px-6 py-2 font-semibold text-sm w-fit text-black">Apply as Intern</button>
                </div>
                <div className="bg-[#171717] rounded-3xl p-10 shadow-sm flex flex-col justify-between gap-10">
                    <div>
                        <h3 className="text-lg font-bold mb-3 text-white">Can’t Find Your Role?</h3>
                        <p className="leading-loose text-white">
                            Don’t see a role that matches your skills just yet?
                            Tell us about yourself and your expertise and we’ll
                            reach out when the perfect opportunity comes along.
                        </p>
                    </div>
                    <button className="bg-primary rounded-full px-6 py-2 font-semibold text-sm w-fit text-black">Register Here</button>
                </div>
            </div>
        </>
    );
}

export default WorkWithUs;