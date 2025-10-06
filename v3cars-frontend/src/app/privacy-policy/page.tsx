'use client'

import { useGetPrivacyPolicyQuery } from "@/redux/api/websiteContentApi";
import Link from "next/link";
import React from "react";

interface PageContent {
  id: number;
  moduleId: number;
  title: string;
  description: string; // Raw HTML content
  createdAt: string;
  updatedAt: string;
}

export default function PrivacyPolicy() {
  const { data: privacyPolicyData, isLoading, isError } = useGetPrivacyPolicyQuery();

  const privacyPolicy: PageContent[] = privacyPolicyData?.rows ?? [];

  if (isLoading) {
    return (
      <div className="text-center py-20 text-white bg-black">Loading Privacy Policy...</div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500 bg-black">
        Failed to load Privacy Policy.
      </div>
    );
  }

  const policy = privacyPolicy[0];

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
          <div className="w-full lg:app-container mx-auto">
          <h1 className=" relative z-10 text-3xl font-semibold text-white w-[500px]">
            {policy ? policy.title : "Privacy Policy for V3Cars.com"}
          </h1>
          </div>
        </div>

        {/* Content */}
        <div className="lg:px-10 px-4">
          <div className="w-full lg:app-container mx-auto my-6 space-y-6 text-white">
            {privacyPolicy.length > 0 ? (
              privacyPolicy.map((policy) => (
                <div key={policy.id}>
                  <div
                    className="prose prose-invert max-w-none leading-loose"
                    dangerouslySetInnerHTML={{ __html: policy.description }}
                  />
                </div>
              ))
            ) : (
              <p>No Privacy Policy found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
