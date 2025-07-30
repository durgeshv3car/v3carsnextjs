'use client';

import React, { ReactNode } from 'react';
import MobileFooter from '@/components/mobile/common/Footer';
import Footer from '@/components/web/common/Footer';
import useIsMobile from '@/hooks/useIsMobile';

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const isMobile = useIsMobile();

  return (
    <div>
      {children}
      {isMobile ? <MobileFooter /> : <Footer />}
    </div>
  );
};

export default Provider;
