import ErrorMessage from '@/components/ErrorMessage';
import PageContainer from '@/components/PageContainer';
import { getActiveNetwork } from '@/lib/network-server';
import AppProviders from '@/providers/AppProviders';

const NotFound = () => {
  const activeNetwork = getActiveNetwork();

  return (
    <AppProviders activeNetwork={activeNetwork}>
      <div className='relative flex min-h-screen flex-col'>
        <PageContainer className='relative isolate flex h-full flex-col items-center justify-center py-20 text-center sm:py-32'>
          <ErrorMessage error='404: We couldn’t find the page you’re looking for.' />
        </PageContainer>
      </div>
    </AppProviders>
  );
};

export default NotFound;
