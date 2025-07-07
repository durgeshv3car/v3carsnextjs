"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Lazy load to prevent hydration mismatch on client
const WebHeader = dynamic(() => import("../web/common/Header"), { ssr: false });
const MobileHeader = dynamic(() => import("../mobile/common/Header"), { ssr: false });

export default function Header() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkDevice(); // Initial check
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return isMobile ? <MobileHeader /> : <WebHeader />;
}
