'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Author {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
  socials: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  timeline: string;
}

const authors: Author[] = [
  {
    id: 1,
    name: 'Lakshya Khanna',
    role: 'Head of content',
    image: '/about-us/image1.png',
    description:
      "Lakshya loves to talk about cars and, therefore, he's mostly in the front of the camera doing the talking. He's usually blunt in his opinion – good or bad, and backs it up with logic. Lakshya is a senior member of V3Cars editorial team.",
    socials: {
      facebook: '#',
      instagram: '#',
      twitter: '#',
      linkedin: '#',
    },
    timeline: '2023 – Present',
  },
  {
    id: 2,
    name: 'Lakshya Khanna',
    role: 'Head of content',
    image: '/about-us/image1.png',
    description:
      "Lakshya loves to talk about cars and, therefore, he's mostly in the front of the camera doing the talking. He's usually blunt in his opinion – good or bad, and backs it up with logic. Lakshya is a senior member of V3Cars editorial team.",
    socials: {
      facebook: '#',
      instagram: '#',
      twitter: '#',
      linkedin: '#',
    },
    timeline: '2023 – Present',
  },
  {
    id: 3,
    name: 'Lakshya Khanna',
    role: 'Head of content',
    image: '/about-us/image1.png',
    description:
      "Lakshya loves to talk about cars and, therefore, he's mostly in the front of the camera doing the talking. He's usually blunt in his opinion – good or bad, and backs it up with logic. Lakshya is a senior member of V3Cars editorial team.",
    socials: {
      facebook: '/',
      instagram: '/',
      twitter: '/',
      linkedin: '/',
    },
    timeline: '2023 – Present',
  },
];

const Authors: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#18181b] text-white">
        <div className="px-4 xl:px-10">
          <div className="w-full lg:app-container mx-auto text-sm h-[42px] flex items-center gap-2">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <span className="text-yellow-500">›</span>
            <span className="font-medium text-yellow-500">Authors</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full min-h-[250px] md:min-h-[300px]">
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center dark:invert"
          style={{ backgroundImage: "url('/author/Vector.png')" }}
        />
        <div className="relative w-full lg:app-container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-6 pt-[60px] md:pt-[100px] px-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Meet The <br className="hidden md:block" />
              Authors Of V3Cars
            </h2>
            <p className="text-gray-700 max-w-[500px] dark:text-gray-300 text-sm md:text-base">
              At V3Cars, our team of experts is dedicated to simplifying car buying for India.
              Every review, comparison and insight you read is backed by facts, logic and
              unbiased analysis — delivered by authors who live and breathe cars.
            </p>
          </div>
        </div>
      </div>

      {/* Authors List */}
      <section className="w-full lg:app-container mx-auto my-10 px-4">
        <div className="space-y-10">
          {authors.map((author) => (
            <div
              key={author.id}
              className="flex flex-col lg:flex-row gap-6 border-b border-gray-200 dark:border-[#2E2E2E] pb-6"
            >
              {/* Left: Image + Name + Socials */}
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                <div className="relative shrink-0 self-center sm:self-start">
                  <img
                    src={author.image}
                    alt={author.name}
                    className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-sm"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-bold">{author.name}</h3>
                    <p className="text-sm text-gray-500">{author.role}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-3 text-gray-600">
                    {author.socials.facebook && (
                      <Image
                        src="/author/facebook.png"
                        alt="facebook"
                        width={28}
                        height={28}
                        onClick={() => router.push(author.socials.facebook ?? '/')}
                        className="cursor-pointer"
                      />
                    )}
                    {author.socials.instagram && (
                      <Image
                        src="/author/instagram.png"
                        alt="instagram"
                        width={28}
                        height={28}
                        onClick={() => router.push(author.socials.instagram ?? '/')}
                        className="cursor-pointer"
                      />
                    )}
                    {author.socials.twitter && (
                      <Image
                        src="/author/twitter1.png"
                        alt="twitter"
                        width={28}
                        height={28}
                        onClick={() => router.push(author.socials.twitter ?? '/')}
                        className="cursor-pointer"
                      />
                    )}
                    {author.socials.linkedin && (
                      <Image
                        src="/author/linkedin1.png"
                        alt="linkedin"
                        width={28}
                        height={28}
                        onClick={() => router.push(author.socials.linkedin ?? '/')}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Description + Timeline */}
              <div className="flex flex-col justify-between">
                <p className="text-sm md:text-base leading-relaxed mb-3">
                  {author.description}
                </p>
                <p className="text-xs md:text-sm text-right">
                  <span className="font-semibold">{author.timeline}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Authors;
