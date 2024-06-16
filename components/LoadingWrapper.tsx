import { cn } from '@/lib/cn';
import React from 'react';
import Icon from './Icon';

type Props = {
  loading: boolean;
  loadingClassName?: string;
  className?: string;
  children: React.ReactNode;
};

const LoadingWrapper = ({ loading, loadingClassName, className, children }: Props) => {
  if (loading) {
    return (
      <div className={cn('flex items-center justify-center my-16', loadingClassName)}>
        <Icon name='spinner' size='2x' className='animate-spin text-white/60' />
      </div>
    );
  }
  return <div className={className}>{children}</div>;
};

export default LoadingWrapper;
