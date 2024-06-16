import { Network } from './types';

export const getActiveNetworkIndexerUrl = (network: Network) => {
  if (network === 'MainNet') {
    return 'https://mainnet-idx.algonode.cloud';
  }

  return `https://${network.toLowerCase()}-idx.algonode.cloud`;
};

export const getActiveNetworkApiUrl = (network: Network) => {
  return `https://${network.toLowerCase()}-api.algonode.cloud`;
};
