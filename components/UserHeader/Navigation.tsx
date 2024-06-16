'use client';

import Icon from '@/components/Icon';
import Logo from '@/components/Logo';
import { cn } from '@/lib/cn';
import { USER_MENU } from '@/lib/navigation';
import { Network } from '@/lib/types';
import { Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import FocusLock from 'react-focus-lock';
import ConnectWalletButton from '../ConnectWalletButton';
import NetworkButton from '../NetworkButton';

type Props = {
  className?: string;
  activeNetwork: Network;
};

const Navigation = ({ className, activeNetwork }: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const escFunction = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  return (
    <>
      <button type='button' onClick={() => setOpen(!open)} title='Toggle menu' className='block lg:hidden'>
        <Icon name='menu' className='h-5 w-5' />
      </button>

      <button
        type='button'
        onClick={() => setOpen(false)}
        aria-label='Close menu'
        className={cn(
          'fixed inset-0 z-50 h-screen w-screen bg-gray-900/75 transition-opacity duration-500',
          open ? 'block opacity-100 lg:pointer-events-none lg:opacity-0' : 'pointer-events-none opacity-0'
        )}
      />

      <FocusLock disabled={!open}>
        <div
          className={cn(
            'transition-all duration-300',
            open
              ? 'h-full flex flex-col pointer-events-auto fixed inset-0 z-50 max-h-screen max-w-xs translate-x-0 overflow-auto bg-gray-800 shadow-xl lg:relative lg:z-auto lg:max-w-none lg:bg-transparent lg:shadow-none'
              : 'pointer-events-none -translate-x-full lg:pointer-events-auto lg:translate-x-0'
          )}
        >
          <div className={cn('container px-8 py-4', open ? 'flex lg:hidden' : '!hidden')}>
            <Logo />
          </div>

          <button
            type='button'
            onClick={() => setOpen(false)}
            title='Close menu'
            className={cn(
              'absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-50',
              open ? 'visible lg:hidden' : 'hidden'
            )}
          >
            <Icon name='close' className='h-5 w-5' />
          </button>

          <nav className={cn('gap-3', open ? 'flex-grow flex flex-col items-start pt-3 pb-8 px-5 lg:flex-row' : 'hidden items-center lg:flex', className)}>
            {USER_MENU.map(({ href, label, children, disabled }, index) =>
              href ? (
                <Link
                  key={index}
                  href={href}
                  className={cn('rounded-md hover:bg-gray-800 px-3 py-2 text-md font-medium transition duration-200', pathname === href ? 'bg-gray-800' : '', disabled ? 'opacity-50 pointer-events-none' : '')}
                >
                  <span>{label}</span>
                </Link>
              ) : (
                <Menu key={index} as='div' className={cn('relative inline-flex items-center text-left', className)}>
                  <div className='flex items-center'>
                    <Menu.Button
                      className={cn(
                        'flex items-center gap-2 rounded-md px-3 py-2 text-md font-medium hover:text-primary-500',
                        pathname === href ? 'text-primary-500' : ''
                      )}
                    >
                      {label}
                      <Icon name='chevronDown' />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute left-0 top-full z-10 mt-2 w-56 origin-top-left rounded-md bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      <div className='py-1'>
                        {children?.map((child, childIndex) => (
                          <Menu.Item key={childIndex}>
                            <Link
                              href={child.href!}
                              className={cn(
                                'duration-250 block px-4 py-2 text-md font-medium transition duration-200 hover:text-primary-500',
                                pathname === child.href ? 'text-primary-500' : '',
                                child.disabled ? 'opacity-50 pointer-events-none' : ''
                              )}
                            >
                              {child.label}
                            </Link>
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )
            )}

            <div className='flex-grow flex lg:hidden flex-col justify-end gap-3'>
              <ConnectWalletButton />
              <NetworkButton activeNetwork={activeNetwork} />
            </div>
          </nav>
        </div>
      </FocusLock>
    </>
  );
};

export default Navigation;
