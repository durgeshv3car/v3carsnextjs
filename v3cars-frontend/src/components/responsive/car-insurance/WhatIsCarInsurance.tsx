'use client';

interface Props {
  title: string;
  descripation: string; // HTML
}

export default function WhatIsCarInsurance({ title, descripation }: Props) {
  // Remove inline color styles
  const sanitizedDescription = descripation.replace(/color:\s*[^;"]+;?/gi, '');

  return (
    <section className="px-4 lg:px-10 py-6">
      <div className="w-full lg:app-container mx-auto">
        {/* Title */}
        <h2 className="text-[22px] md:text-[26px] font-semibold text-gray-900 mb-3 dark:text-white">
          {title}
        </h2>

        {/* Dynamic Description (HTML safe render) */}
        <div
          className="text-[13px] md:text-[14px] leading-[1.85] text-gray-800 space-y-2 mb-6 dark:text-white"
          dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
        />
      </div>
    </section>
  );
}
