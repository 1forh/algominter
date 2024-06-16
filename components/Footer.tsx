import Link from 'next/link';
import { SITE_NAME } from '../config';
import PageContainer from './PageContainer';

function Footer() {
  return (
    <footer className='site-footer mt-8 border-t border-white/25 pb-4 pt-4 text-white/50'>
      <PageContainer>
        <div className='space-y-6'>
          <p className='text-center text-lg'>
            {new Date().getFullYear()} {SITE_NAME}{' '}
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='inline h-2 px-2' fill='currentColor'>
              <path d='M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z' />
            </svg>{' '}
            Created by{' '}
            <a
              href={'https://twitter.com/MinnerAlgo'}
              target={'_blank'}
              rel='noreferrer'
              className='font-medium text-primary-500 underline transition duration-200 hover:text-primary-300'
            >
              minner.algo
            </a>{' '}
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512' className='inline h-2 px-2' fill='currentColor'>
              <path d='M512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256z' />
            </svg>{' '}
            <Link href='/disclaimer' className='font-medium underline transition duration-200'>
              Disclaimer
            </Link>{' '}
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}

export default Footer;
