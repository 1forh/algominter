/* eslint-disable @next/next/no-img-element */
'use client';

import { Menu, Transition } from '@headlessui/react';
import { Provider, useWallet } from '@txnlab/use-wallet';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { Fragment } from 'react';
import Button from './Button';

function ConnectWalletButton({ className }: { className?: string }) {
  const { isReady, providers, activeAccount } = useWallet();
  const formattedAddress = activeAccount ? `${activeAccount.address.slice(0, 4)}...${activeAccount.address.slice(-4)}` : '';

  const activeImage = activeAccount ? (providers || []).find((provider) => provider.metadata.id === activeAccount.providerId)?.metadata.icon : '';

  const onConnect = async (provider: Provider) => {
    await Promise.all((providers || []).map((provider) => provider.disconnect()));
    await provider.connect();
  };

  if (!isReady) return <></>;

  return (
    <Menu as='div' className='relative z-[99] text-left'>
      {({ open }) => (
        <>
          <Menu.Button as={Button} className={clsx('flex h-[42px] items-center gap-3', className)}>
            {activeImage ? (
              <div className='h-7 w-7'>
                <img src={activeImage} alt={activeAccount?.providerId} className='rounded-full' />
              </div>
            ) : (
              <div className='h-5 w-5'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                  <path
                    d='M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z'
                    fill='currentColor'
                  />
                </svg>
              </div>
            )}
            <span className='block shrink-0'>{activeAccount ? formattedAddress : 'Connect Wallet'}</span>
            <motion.div layout animate={{ rotate: open ? '180deg' : 0 }} className='ml-3 w-4'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                <path
                  d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z'
                  fill='currentColor'
                />
              </svg>
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
            <Menu.Items className='absolute right-0 !z-[9999] mt-2 w-[175px] origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='relative py-1 '>
                {(providers || []).map((provider) => (
                  <Menu.Item key={provider.metadata.id}>
                    <div className={clsx('flex items-center gap-2', provider.isActive && 'bg-secondary-900')}>
                      <button
                        type='button'
                        className='flex w-full items-center space-x-3 px-4 py-3 text-gray-100 transition-opacity duration-200 hover:opacity-75'
                        disabled={provider.isActive}
                        onClick={provider.isActive ? undefined : () => onConnect(provider)}
                      >
                        <div className='h-7 w-7'>
                          <img src={provider.metadata.icon} alt={provider.metadata.id} className='rounded-full' />
                        </div>
                        <span>{provider.metadata.name}</span>
                      </button>
                      {provider.isActive && (
                        <button type='button' onClick={provider.disconnect} className='px-4' title='Disconnect'>
                          <span className='sr-only'>Disconnect</span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 512 512'
                            className='h-5 w-5 text-gray-500 transition duration-200 hover:text-gray-100'
                          >
                            <path
                              d='M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z'
                              fill='currentColor'
                            />
                          </svg>
                        </button>
                      )}
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

export default ConnectWalletButton;
