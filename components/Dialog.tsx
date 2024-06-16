import React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import Icon from './Icon';
import { cn } from '@/lib/cn';

type Props = {
  maxWidthClass?: string;
  children: React.ReactNode;
  label: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const Dialog = ({ children, label, maxWidthClass, open, onOpenChange }: Props) => {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Trigger>{label}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className='fixed inset-0 z-[999] bg-black/80 bg-opacity-75 transition-opacity' />
        <RadixDialog.Content className='fixed inset-0 z-[999] h-full w-full overflow-scroll'>
          <div className={cn('relative mx-auto mt-12 rounded-lg bg-gray-900 px-6 pb-12 pt-5 text-left text-white shadow-xl transition-all sm:w-full', maxWidthClass ? maxWidthClass : 'max-w-[900px]')}>
            {children}
            <RadixDialog.Close className='absolute right-0 top-0 m-4 text-white/50 transition-all hover:text-white'>
              <span className='sr-only'>Close</span>
              <Icon name='close' className='h-5 w-5' aria-hidden='true' />
            </RadixDialog.Close>
          </div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Dialog;
