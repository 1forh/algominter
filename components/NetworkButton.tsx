'use client';

import useMutation from '@/hooks/useMutation';
import { cn } from '@/lib/cn';
import { Network } from '@/lib/types';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Fragment } from 'react';
import Button from './Button';
import Icon from './Icon';

function NetworkButton({ className, activeNetwork }: { className?: string; activeNetwork: Network }) {
  const networks = ['MainNet', 'TestNet', 'BetaNet'] as Network[];

  const networkMutation = useMutation({
    url: '/api/network',
    method: 'POST',
    onSuccess: () => {
      window.location.reload();
    },
  });

  const onClick = (network: Network) => {
    networkMutation.mutate({ network });
  };

  return (
    <Menu as='div' className='relative text-left'>
      {({ open }) => (
        <>
          <Menu.Button as={Button} className={cn('flex min-w-[125px] justify-between', className)} color="outline">
            <span className='shrink-0'>{activeNetwork}</span>
            <motion.div layout animate={{ rotate: open ? '180deg' : 0 }} className='ml-3 h-6 w-6'>
              <Icon name='chevronDown' />
            </motion.div>
          </Menu.Button>

          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute left-0 !z-[9999] mt-2 w-36 origin-top-left rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='relative py-1 '>
                {networks.map((network, index) => (
                  <Menu.Item key={index}>
                    <div className={clsx('flex items-center gap-2', network === activeNetwork && 'bg-gray-700')}>
                      <button
                        type='button'
                        className='flex w-full items-center justify-between space-x-3 px-4 py-3 text-gray-100 transition-opacity duration-200 hover:opacity-75'
                        disabled={network === activeNetwork}
                        onClick={network === activeNetwork ? undefined : () => onClick(network)}
                      >
                        <span>{network}</span>
                        {network === activeNetwork && <Icon name='check' />}
                      </button>
                    </div>
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

export default NetworkButton;
