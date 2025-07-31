"use client";

import MobileFooter from '@/components/mobile/common/Footer';
import Footer from '@/components/web/common/Footer';
import useIsMobile from "@/hooks/useIsMobile";


export default function Header() {
 
  const isMobile = useIsMobile()


  return isMobile ? <MobileFooter /> : <Footer />;
}
