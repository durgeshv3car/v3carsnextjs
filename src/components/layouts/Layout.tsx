'use client'

import React, { ReactNode } from 'react';
import Header from '../common/Header';
import Footer from '../web/common/Footer';
import useIsMobile from '@/hooks/useIsMobile';
import MobileFooter from '../mobile/common/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div>
      <Header />
      {children}
      {isMobile ? <MobileFooter /> : <Footer />}
    </div>
  );
};

export default Layout;
