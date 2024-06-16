import 'styles/globals.css';

// Fix FA for nextjs https://fontawesome.com/docs/web/use-with/react/use-with
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

// Providers
import AppProviders from '@/providers/AppProviders';

// Lib
import Analytics from '@/components/Analytics';
import Footer from '@/components/Footer';
import UserHeader from '@/components/UserHeader/UserHeader';
import { cn } from '@/lib/cn';
import fonts from '@/lib/fonts';
import { getActiveNetwork } from '@/lib/network-server';
import { Toaster } from 'react-hot-toast';

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  const activeNetwork = getActiveNetwork();

  return (
    <html lang='en' className={cn(...fonts, 'min-h-[100dvh]')}>
      <body className='min-h-[100dvh] overflow-hidden'>
        <AppProviders activeNetwork={activeNetwork}>
          <Analytics />
          <Toaster containerStyle={{ zIndex: 10001 }} position='bottom-center' />
          <div className='flex min-h-[100dvh] flex-col'>
            <UserHeader activeNetwork={activeNetwork} />
            <main className='h-full flex-grow'>{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
