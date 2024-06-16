import { ResponseError, ResponseJSON, getParams } from '@/lib/api';
import { connect } from '@/lib/mongo';
import User from '@/models/User';
import { Network } from '@txnlab/use-wallet';
import dayjs from 'dayjs';

export type PostRequestInputT = {
  network: Network;
};
export type ParamT = {
  address: string;
};
export async function GET(request: Request, { params }: { params: ParamT }) {
  const { address } = params;

  if (!address) {
    return ResponseError('No address provided.');
  }

  await connect();

  const user = await User.findOne({
    address,
  });

  const isSubscribed = user?.subscribedOn ? dayjs().isBefore(dayjs(user.subscribedOn).add(1, 'year')) : false;

  return ResponseJSON({
    success: true,
    user: {
      address,
      subscribedOn: user?.subscribedOn,
    },
    isSubscribed,
  });
}
