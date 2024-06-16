import { COOKIE_KEYS } from '@/config';
import { ResponseError, ResponseJSON } from '@/lib/api';
import { Network } from '@txnlab/use-wallet';
import { cookies } from 'next/headers';

export type PostRequestInputT = {
  network: Network;
};
export async function POST(request: Request) {
  const input = (await request.json()) as PostRequestInputT;
  if (!input.network) return ResponseError('Missing network');

  cookies().set(COOKIE_KEYS.NETWORK, input.network);

  return ResponseJSON({ success: true });
}
