// app/components/LayoutWrapper.tsx
'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

interface Props {
  children: React.ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  const isCartOpen = useSelector((state: RootState) => state.cart.isOpen);

  return (
    <body className={`${isCartOpen ? 'blur-sm transition' : ''}`}>
      {children}
    </body>
  );
};

export default LayoutWrapper;
