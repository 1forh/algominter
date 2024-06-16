import 'server-only';

import { COOKIE_KEYS } from '@/config';
import { cookies } from 'next/headers';
import { Network } from './types';

export const getActiveNetwork = () => {
  const cookieStore = cookies();
  const activeNetwork = (cookieStore.get(COOKIE_KEYS.NETWORK)?.value as Network) || 'MainNet';
  return activeNetwork;
};
