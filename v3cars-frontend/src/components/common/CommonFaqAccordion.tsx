'use client'

import React, { useState } from 'react';

interface CommonFaqAccordionProps {
  faqData: FAQ[];
}

interface FAQ {
  id: number;
  moduleId: number;
  que: string;
  ans: string;
  sequance: number;
  addedBy: string | null;
  updatedBy: string | null;
  careateDateTime: string;  // ISO date string
  updateDateTime: string | null; // ISO date string or null
}

const CommonFaqAccordion: React.FC<CommonFaqAccordionProps> = ({ faqData }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='mb-5'>
      <h2 className="text-center text-2xl mb-6 text-gray-900 dark:text-gray-100">
        Frequently Asked <span className="font-bold">Questions</span> (FAQ)
      </h2>

      <div className="space-y-3">
        {faqData.map((item, index) => (
          <div key={item.id}>
            {/* Question Block */}
            <button
              type="button"
              aria-expanded={openIndex === index}
              onClick={() => toggle(index)}
              className={[
                'w-full text-left transition-colors px-4 py-3 cursor-pointer flex items-center justify-between',
                openIndex === index ? 'rounded-t-2xl' : 'rounded-2xl',
                'bg-gray-100 hover:bg-gray-200 border border-gray-200',
                'dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:border-neutral-700',
              ].join(' ')}
            >
              <div className="flex items-center gap-3">
                <div className="bg-yellow-400 text-black font-bold w-7 h-7 flex items-center justify-center rounded-full text-sm">
                  Q
                </div>
                <p className="text-sm sm:text-base text-gray-900 dark:text-gray-100">
                  {item.que}
                </p>
              </div>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`size-4 text-gray-700 dark:text-gray-200 transition-transform duration-500 ${openIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {/* Smooth Answer Block */}
            <div
              className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
            >
              <div
                className={[
                  'rounded-b-2xl p-4 text-sm',
                  'bg-white text-gray-700 border-x border-b border-gray-200',
                  'dark:bg-neutral-900 dark:text-neutral-200 dark:border-neutral-700',
                ].join(' ')}
              >
                {item.ans}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonFaqAccordion;
