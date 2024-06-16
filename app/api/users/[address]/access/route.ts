import { PAID_PLAN_PRICE } from '@/config';
import { algodClient, getTxn } from '@/lib/algo';
import { ResponseError, ResponseJSON } from '@/lib/api';
import { connect } from '@/lib/mongo';
import User from '@/models/User';
import algosdk from 'algosdk';

export type PostRequestInputT = {
  txnId: string;
};
export type ParamT = {
  address: string;
};
export async function POST(request: Request, { params }: { params: ParamT }) {
  // todo - make sure this url can only be called from our app and url and other stuff to prevent abuse

  const { address } = params;
  if (!address) {
    return ResponseError('No address provided.');
  }

  const input = (await request.json()) as PostRequestInputT;

  if (!input.txnId) {
    return ResponseError('No txnId provided.');
  }

  await algosdk.waitForConfirmation(algodClient(), input.txnId, 10);

  const txn = await getTxn(input.txnId);

  if (!txn) {
    return ResponseError('Transaction not found.');
  }

  console.log(address);
  console.log(input);
  console.log('txn', txn);

  if (txn.transaction.sender !== address) {
    return ResponseError('Transaction not sent by the correct address.');
  }

  if (txn.transaction['payment-transaction'].receiver !== process.env.NEXT_PUBLIC_PAYMENT_WALLET_ADDRESS) {
    return ResponseError('Transaction not sent to the correct address.');
  }
  if (txn.transaction['payment-transaction'].amount !== PAID_PLAN_PRICE * 1000000) {
    return ResponseError('Transaction amount is incorrect.');
  }

  await connect();

  const user = await User.findOne({
    address,
  });
  if (!user) {
    await User.create({
      address,
      subscribedOn: new Date(),
    });
  } else {
    user.subscribedOn = new Date();
    await user.save();
  }

  return ResponseJSON(input);
}
