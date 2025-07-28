'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function ScrollFlipIcon() {
  
  const [show, setShow] = useState<boolean>(false);
  const path = usePathname();

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollY = window.scrollY;
      const vh100 = window.innerHeight;
      setShow(scrollY > vh100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`
        ${path === '/car-loan-emi-calculator' ? 'bottom-[80px] md:bottom-4' : 'bottom-4'}
        fixed z-50 right-4 bg-white border-2 border-[#FFCC00] 
        rounded-full p-3 cursor-pointer 
        transition-opacity duration-[4000ms] ease-in-out 
        ${show ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
      `}
      onClick={scrollToTop}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2.5}
        stroke="currentColor"
        className="text-[#FFCC00] size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
        />
      </svg>
    </div>
  );
}
