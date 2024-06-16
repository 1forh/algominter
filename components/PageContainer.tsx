import { cn } from '@/lib/cn';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const PageContainer = ({ children, className }: Props) => {
  return <div className={cn('mx-auto px-4 md:px-8 max-w-none', className)}>{children}</div>;
};

export default PageContainer;