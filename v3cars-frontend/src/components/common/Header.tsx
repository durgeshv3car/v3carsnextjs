"use client";

import MobileHeader from "../mobile/common/Header";
import WebHeader from "../web/common/Header";
import useIsMobile from "@/hooks/useIsMobile";
import { usePathname } from "next/navigation";


export default function Header() {

  const isMobile = useIsMobile()
  const path = usePathname();

  if (path.startsWith("/web-stories")) {
    return null;
  }


  return isMobile ? <MobileHeader /> : <WebHeader />;



}
