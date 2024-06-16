import { PAID_PLAN_PRICE } from '@/config';
import useMutation from '@/hooks/useMutation';
import { UserT } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { useWallet } from '@txnlab/use-wallet';
import algosdk from 'algosdk';
import { createContext, useCallback, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const algodClient = new algosdk.Algodv2('', 'https://xna-mainnet-api.algonode.cloud', '');

type UserContextT = {
  user?: UserT;
  activeAddress?: string;
  isSubscribed?: boolean;
  loading?: boolean;
  getAccess?: () => void;
};

const UserContext = createContext<UserContextT>({
  user: undefined,
  activeAddress: '',
});
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { activeAddress, signTransactions, sendTransactions } = useWallet();
  const [loading, setLoading] = useState(false);

  const { data, refetch } = useQuery<{ user: UserT; isSubscribed: boolean }>({
    queryKey: [`/api/users/${activeAddress}`],
    enabled: !!activeAddress,
  });
  const user = data?.user;
  const isSubscribed = data?.isSubscribed;

  const { mutate } = useMutation({
    url: `/api/users/${activeAddress}/access`,
    method: 'POST',
  });

  const getAccess = useCallback(async () => {
    if (!activeAddress) {
      return toast.error('Please connect your wallet first.');
    }

    if (isSubscribed) {
      return toast.error('You are already subscribed.');
    }
    setLoading(true);

    try {
      const suggestedParams = await algodClient.getTransactionParams().do();
      const enc = new TextEncoder();
      const note = enc.encode('AlgoMinter subscription payment');

      const transactions = [
        algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from: activeAddress,
          to: process.env.NEXT_PUBLIC_PAYMENT_WALLET_ADDRESS as string,
          amount: PAID_PLAN_PRICE * 1000000,
          suggestedParams,
          note,
        }),
      ];

      const encodedTransactions = transactions.map((txn) => algosdk.encodeUnsignedTransaction(txn));
      const signedTxns = await signTransactions(encodedTransactions);
      const sentTransaction = await sendTransactions(signedTxns);

      mutate(
        {
          txnId: sentTransaction.txId,
        },
        {
          onSuccess: () => {
            refetch();
            toast.success('Subscription successful.');
          },
          onError: (error) => {
            console.error(error);
            toast.error(error?.message || 'Something went wrong. Please try again later.');
          },
          onSettled: () => {
            setLoading(false);
          },
        }
      );
    } catch (error: any) {
      console.error(error);
      setLoading(false);
      toast.error(error?.message || 'Something went wrong. Please try again later.');
    }
  }, [activeAddress, isSubscribed]);

  return (
    <UserContext.Provider
      value={{
        user,
        activeAddress,
        getAccess,
        isSubscribed,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
