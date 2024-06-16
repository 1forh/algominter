import { cn } from '@/lib/cn';
import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const InputStack = ({ className, children }: Props) => {
  return <div className={cn('flex flex-col gap-4', className)}>{children}</div>;
};

export default InputStack;
