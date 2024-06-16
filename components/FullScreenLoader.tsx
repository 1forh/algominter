import { Portal } from '@headlessui/react';
import { motion } from 'framer-motion';
import React from 'react';
import Icon from './Icon';

type Props = {
  loading: boolean;
  label: string;
  children?: React.ReactNode;
};

const FullScreenLoader = ({ loading, label, children }: Props) => {
  if (!loading) return <></>;

  return (
    <Portal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='fixed inset-0 z-[9999] flex h-full w-full items-center justify-center bg-gray-900/95'
      >
        <div className='flex flex-col items-center justify-center gap-10 px-4 md:px-6'>
          {children}
          <Icon name='spinner' size='2x' className='animate-spin text-white' />
          <p className='text-xl mx-auto max-w-sm text-center font-medium text-white'>{label}</p>
        </div>
      </motion.div>
    </Portal>
  );
};

export default FullScreenLoader;
