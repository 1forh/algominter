import React from 'react';
import EmptyState from './EmptyState';
import PageContainer from './PageContainer';

type Props = {
  children: React.ReactNode;
};

const NoMobileWrapper = ({ children }: Props) => {
  return (
    <div>
      <div className='hidden lg:block'>{children}</div>
      <PageContainer className="flex items-center justify-center lg:hidden">
        <EmptyState message='AlgoMinter is not available on mobile devices. Please use a desktop or laptop to access the image generator.' />
      </PageContainer>
    </div>
  );
};

export default NoMobileWrapper;
