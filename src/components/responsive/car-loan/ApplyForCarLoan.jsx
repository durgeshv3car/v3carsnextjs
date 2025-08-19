'use client';

import Image from 'next/image';

const brands = ['Tata', 'Maruti Suzuki', 'Hyundai', 'Mahindra', 'Honda'];
const models = ['Nexon', 'Baleno', 'Creta', 'Scorpio', 'City'];
const variants = ['Base', 'Mid', 'Top'];

export default function ApplyForCarLoan() {

  return (
    <section className="max-w-[1600px] mx-auto px-4 sm:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

        {/* Left: Form Card */}
        <div className="bg-[#E9E9E9] dark:bg-gray-800 rounded-2xl p-5 sm:p-6 md:py-10 md:px-10">

          <h3 className="text-[20px] sm:text-[22px] font-semibold text-gray-800 dark:text-white mb-4">
            APPLY FOR CAR LOAN
          </h3>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-3 text-[14px]"
          >

            {/* Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 dark:text-black">

              <select className="h-[44px] rounded-md px-3 bg-white border border-gray-300 outline-none">
                <option value="">Select Brands</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <select className="h-[44px] rounded-md px-3 bg-white border border-gray-300 outline-none">
                <option value="">Select Model</option>
                {models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <select className="h-[44px] rounded-md px-3 bg-white border border-gray-300 outline-none">
                <option value="">Select Variant</option>
                {variants.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select className="h-[44px] rounded-md px-3 bg-white border border-gray-300 outline-none dark:text-black">
                <option>Mr.</option>
                <option>Ms.</option>
                <option>Mrs.</option>
              </select>

              <input
                type="text"
                placeholder="Full Name As Per Pan Card"
                className="sm:col-span-2 h-[44px] rounded-md px-3 bg-white border border-gray-300 outline-none"
              />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

              <input
                type="email"
                placeholder="Email*"
                className="h-[44px] rounded-md px-3 bg-white border border-gray-300 outline-none"
              />

              <select className="sm:col-span-2 h-[44px] rounded-md px-3 bg-white dark:text-black border border-gray-300 outline-none">
                <option value="">Select Variant</option>
                {variants.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Row 4 */}
            <input
              type="tel"
              placeholder="Mobile"
              className="w-full h-[44px] rounded-md px-3 bg-white border border-gray-300 outline-none"
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full h-[48px] rounded-full bg-[#FFCC00] text-black font-semibold hover:brightness-95 transition mt-1"
            >
              Apply Now
            </button>

            {/* Privacy text */}
            <p className="text-[12px] text-gray-600 mt-1 text-center">
              By proceeding ahead you expressly agree to the{' '}
              <a href="#" className="font-semibold underline">
                V3Cars privacy policy
              </a>
            </p>
          </form>
        </div>

        {/* Right: Illustration */}
        <div className="flex items-center justify-center">
          <Image
            src="/car-loan/car.png"
            alt="Car Loan Illustration"
            width={700}
            height={520}
            className="w-full max-w-[700px] h-auto object-contain"
            priority
          />
        </div>

      </div>
    </section>
  );

}
