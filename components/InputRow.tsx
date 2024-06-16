import { cn } from '@/lib/cn';
import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
};

const InputRow = ({ className, children }: Props) => {
  return <div className={cn('flex gap-4', className)}>{children}</div>;
};

export default InputRow;
