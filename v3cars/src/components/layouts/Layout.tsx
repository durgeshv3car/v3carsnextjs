"use client";

import React, { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";

import Header from "../common/Header";
import Footer from "../web/common/Footer";
import useIsMobile from "@/hooks/useIsMobile";
import MobileFooter from "../mobile/common/Footer";
import GutterBoot from "./GutterBoot";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const shouldUseDark = saved === 'dark' || (!saved && prefersDark)
    document.documentElement.classList.toggle('dark', shouldUseDark)
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <GutterBoot />
        <Header />
        {children}
        {isMobile ? <MobileFooter /> : <Footer />}
      </PersistGate>
    </Provider>
  );
};


export default Layout;





