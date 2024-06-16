import ConnectWalletButton from '@/components/ConnectWalletButton';
import Logo from '@/components/Logo';
import { SITE_NAME, TWITTER_URL } from '@/config';
import { Network } from '@/lib/types';
import PageContainer from 'components/PageContainer';
import Link from 'next/link';
import NetworkButton from '../NetworkButton';
import Navigation from './Navigation';

type Props = {
  activeNetwork: Network;
};

const UserHeader = async ({ activeNetwork }: Props) => {
  return (
    <header className='relative z-[99] mb-5 print:hidden'>
      <div className="bg-primary-500 py-2">
        <PageContainer>
          <p className='text-center font-medium'>AlgoMinter Beta is now live!</p>
        </PageContainer>
      </div>
      <PageContainer>
        <div className='relative flex'>
          <div className='absolute bottom-0 left-0 top-0 flex items-center'>
            <Navigation activeNetwork={activeNetwork} />
          </div>

          <div className='mx-auto flex items-center gap-4 pb-8 pt-8'>
            <Link href='/'>
              <Logo />
            </Link>
          </div>

          <div className='absolute bottom-0 right-0 top-0 flex items-center gap-4'>
            <div className='hidden items-center gap-4 lg:flex'>
              <ConnectWalletButton />
              {/* <NetworkButton activeNetwork={activeNetwork} /> */}
            </div>

            <div>
              <a
                href={TWITTER_URL}
                className='group flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gray-700 p-2 transition duration-200 hover:bg-gray-800'
                target={'_blank'}
                rel='noreferrer'
              >
                <svg viewBox='0 0 1200 1227' fill='none' xmlns='http://www.w3.org/2000/svg' className='w-[20px]'>
                  <path
                    d='M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z'
                    fill='currentColor'
                  ></path>
                </svg>
                <span className='sr-only'>{SITE_NAME} Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </PageContainer>
    </header>
  );
};

export default UserHeader;
