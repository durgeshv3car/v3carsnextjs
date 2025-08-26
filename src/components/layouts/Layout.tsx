"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store";

import Header from "../common/Header";
import Footer from "../web/common/Footer";
import useIsMobile from "@/hooks/useIsMobile";
import MobileFooter from "../mobile/common/Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        {children}
        {isMobile ? <MobileFooter /> : <Footer />}
      </PersistGate>
    </Provider>
  );
};

export default Layout;
