"use client";

import MobileHeader from "../mobile/common/Header";
import WebHeader from "../web/common/Header";
import useIsMobile from "@/hooks/useIsMobile";


export default function Header() {

  const isMobile = useIsMobile()


  return isMobile ? <MobileHeader /> : <WebHeader />;
}
