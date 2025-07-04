'use client';

import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-blue-100 overflow-hidden">
      {/* Background */}
      <Image
        src="/sea.jpg"
        alt="Sea Background"
        fill
        className="object-cover z-0"
        priority
      />

      {/* Seagulls */}
      <div className="absolute top-0 left-0 right-0 flex justify-between p-4 z-10">
        {[...Array(4)].map((_, i) => (
          <Image
            key={i}
            src="/seagull.png"
            alt={`Seagull ${i + 1}`}
            width={50}
            height={50}
            className="animate-float"
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-20 flex flex-col md:flex-row justify-between items-center p-10 gap-10">
        
        {/* Search Box */}
        <div className="bg-white shadow-lg p-6 rounded-lg max-w-md w-full space-y-4">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <span role="img" aria-label="search">🔍</span> SEARCH THE RIGHT CAR
          </h2>

          {/* Tabs */}
          <div className="flex space-x-4">
            <button className="text-sm font-medium py-2 px-4 bg-yellow-400 text-white rounded">
              By Budget
            </button>
            <button className="text-sm font-medium py-2 px-4 border rounded text-gray-600">
              By Model
            </button>
          </div>

          {/* Select Inputs */}
          <select className="w-full border p-2 rounded">
            <option>Select Budget</option>
            <option>5-10 Lakh</option>
            <option>10-15 Lakh</option>
          </select>
          <select className="w-full border p-2 rounded">
            <option>All Vehicle Types</option>
            <option>SUV</option>
            <option>Sedan</option>
          </select>

          {/* Search Button */}
          <button className="w-full bg-yellow-400 py-2 rounded font-medium flex items-center justify-center gap-2">
            <span role="img" aria-label="search">🔍</span> SEARCH
          </button>

          <p className="text-right text-xs text-gray-500 underline cursor-pointer">Advanced Search</p>
        </div>

        {/* Launch Info + Car Image */}
        <div className="text-white max-w-xl space-y-4 text-center md:text-left">
          <p className="text-sm text-yellow-400">Launched</p>
          <h1 className="text-3xl font-bold">
            More Performance,<br /> Big on Features
          </h1>
          <h2 className="text-4xl font-black text-black">
            Tata Altroz<br />Racer
          </h2>

          <button className="mt-4 px-6 py-2 bg-yellow-400 text-black font-semibold rounded shadow hover:bg-yellow-500">
            Know More
          </button>
        </div>

        {/* Car Image */}
        <Image
          src="/car.png"
          alt="Tata Altroz"
          width={500}
          height={300}
          className="z-20"
          priority
        />
      </div>
    </div>
  );
};

export default HeroSection;
