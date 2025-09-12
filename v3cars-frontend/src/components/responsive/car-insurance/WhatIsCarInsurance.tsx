'use client';

export default function WhatIsCarInsurance() {
  return (
    <section className="px-4 lg:px-10 py-6">
      <div className="w-full lg:app-container mx-auto">
      {/* Title + Copy */}
      <h2 className="text-[22px] md:text-[26px] font-semibold text-gray-900 mb-3 dark:text-white">
        What is Car Insurance?
      </h2>

      <div className="text-[13px] md:text-[14px] leading-[1.85] text-gray-800 space-y-2 mb-6 dark:text-white">
        <p>
          In India, car insurance is a mandatory type of insurance policy that offers
          financial protection to car owners against damages or losses resulting from
          unforeseen events. All car owners in India must possess at least a third‑party
          liability insurance policy as mandated by law.
        </p>
        <p>
          There are two main types of car insurance policies available in India:
          Third‑Party Liability Insurance and Comprehensive Insurance.
        </p>
        <p>
          Third‑Party Liability Insurance, the basic policy, covers damages or losses
          caused to a third party, including bodily injury, death, or property damage
          resulting from an accident involving the insured car. This insurance policy
          excludes coverage for damages or losses to the insured car or the policyholder.
        </p>
        <p>
          Comprehensive Insurance, on the other hand, provides extensive coverage to the
          car owner for damages or losses caused to the insured car, third‑party liability,
          and personal accident cover. It encompasses incidents like accidents, theft,
          natural disasters, fire, riots, and other unforeseen events.
        </p>
        <p>
          Car insurance in India also offers additional benefits such as cashless repairs,
          towing facilities, and renewal discounts. The premium for the policy depends on
          various factors like the make and model of the car, the car’s age, the
          policyholder’s driving experience, and the selected coverage type.
        </p>
        <p>
          Having car insurance in India is crucial not just for legal compliance but also
          to safeguard oneself from unforeseen financial losses due to accidents or other
          unfortunate events.
        </p>
      </div>

      {/* Spec Table (as shown in the image) */}
      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full text-[13px] md:text-sm text-gray-900 border border-[#E7E7E7] rounded-xl overflow-hidden">
          <thead>

            <tr className="bg-[#F6F6F6] dark:border-[#2E2E2E] dark:bg-[#171717] text-center dark:text-white">
              <th className="py-3 rounded-tl-xl"></th>
              <th className="py-3 font-semibold border-l border-[#E7E7E7] dark:border-[#2E2E2E]">
                2024 MAHINDRA THAR
                <div className="block text-[10px] text-gray-500 font-medium">
                  POWERTRAIN‑WISE MILEAGE (ARAI)
                </div>
              </th>
              <th className="py-3 font-semibold border-l border-[#E7E7E7] dark:border-[#2E2E2E]">2.2L Diesel</th>
              <th className="py-3 font-semibold border-l border-[#E7E7E7] dark:border-[#2E2E2E] rounded-tr-xl">
                1.5L Diesel
              </th>
            </tr>
          </thead>

          <tbody>
            {/* Engine */}
            <tr className="border-t border-[#E7E7E7] dark:border-[#2E2E2E] dark:text-white ">
              <td className="w-[160px] px-4 py-3 bg-[#FAFAFA] dark:bg-[#171717] font-semibold">Engine</td>
              <td className="px-4 py-3 text-left border-l border-[#E7E7E7] dark:border-[#2E2E2E]">2.0L Turbo Petrol</td>
              <td className="px-4 py-3 text-left border-l border-[#E7E7E7] dark:border-[#2E2E2E]">2.2L Diesel</td>
              <td className="px-4 py-3 text-left border-l border-[#E7E7E7] dark:border-[#2E2E2E]">1.5L Diesel</td>
            </tr>

            {/* Transmission */}
            <tr className="border-t border-[#E7E7E7] dark:border-[#2E2E2E] dark:text-white">
              <td className="px-4 py-3 bg-[#FAFAFA]  dark:bg-[#171717] font-semibold">Transmission</td>
              <td className="px-4 py-3 border-l border-[#E7E7E7] dark:border-[#2E2E2E]">6MT, 6TC</td>
              <td className="px-4 py-3 border-l border-[#E7E7E7] dark:border-[#2E2E2E]">6MT, 6TC</td>
              <td className="px-4 py-3 border-l border-[#E7E7E7] dark:border-[#2E2E2E]">6MT</td>
            </tr>

            {/* Drivetrain */}
            <tr className="border-t border-[#E7E7E7] dark:border-[#2E2E2E] dark:text-white">
              <td className="px-4 py-3 bg-[#FAFAFA]  dark:bg-[#171717] font-semibold">Drivetrain</td>
              <td className="px-4 py-3 border-l border-[#E7E7E7] dark:border-[#2E2E2E]">4WD</td>
              <td className="px-4 py-3 border-l border-[#E7E7E7] dark:border-[#2E2E2E]">4WD</td>
              <td className="px-4 py-3 border-l border-[#E7E7E7] dark:border-[#2E2E2E]">RWD</td>
            </tr>

            {/* Power */}
            <tr className="border-t dark:border-[#2E2E2E] dark:text-white">
              <td className="px-4 py-3 bg-[#FAFAFA]  dark:bg-[#171717] font-semibold">Power</td>
              <td className="px-4 py-3 border-l border-[#E7E7E7] dark:border-[#2E2E2E]">152PS @ 5000rpm</td>
              <td className="px-4 py-3 border-l border-[#E7E7E7] dark:border-[#2E2E2E]">132PS @ 3750rpm</td>
              <td className="px-4 py-3 border-l border-[#E7E7E7] dark:border-[#2E2E2E]">119PS @ 3500rpm</td>
            </tr>

            {/* Torque */}
            <tr className="border-t border-b border-[#E7E7E7] dark:border-[#2E2E2E] dark:text-white">
              <td className="px-4 py-3 bg-[#FAFAFA]  dark:bg-[#171717] font-semibold rounded-bl-xl">Torque</td>
              <td className="px-4 py-3 border-l border-[#E7E7E7] dark:border-[#2E2E2E]">
                300Nm @ 1250–3000rpm (MT)
                <br /> 320Nm @ 1500–3000rpm (AT)
              </td>
              <td className="px-4 py-3 border-l border-[#E7E7E7] dark:border-[#2E2E2E]">300Nm @ 1600–2800rpm</td>
              <td className="px-4 py-3 border-l border-[#E7E7E7] dark:border-[#2E2E2E] rounded-br-xl">
                300Nm @ 1750–2500rpm
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </section>
  );
}
