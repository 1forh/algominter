'use client';

import { get } from '@/lib/helpers';
import { getActiveNetworkApiUrl } from '@/lib/network';
import { Network } from '@/lib/types';
import { DeflyWalletConnect } from '@blockshake/defly-connect';
import { PeraWalletConnect } from '@perawallet/connect';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PROVIDER_ID, WalletProvider, useInitializeProviders } from '@txnlab/use-wallet';
import React from 'react';
import ProjectProvider from './ProjectProvider';
import { UserProvider } from './UserProvider';

type Props = {
  activeNetwork: Network;
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => get(queryKey[0] as string, (queryKey[1] || {}) as any),
    },
  },
});

const AppProviders = ({ children, activeNetwork }: Props) => {
  const providers = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
    ],
    nodeConfig: {
      network: activeNetwork.toLowerCase(),
      nodeServer: getActiveNetworkApiUrl(activeNetwork),
      nodeToken: '',
      nodePort: '443'
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider value={providers}>
        <UserProvider>
          <ProjectProvider>
            {children}
          </ProjectProvider>
        </UserProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
